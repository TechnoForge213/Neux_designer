import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Sparkles, Loader2, MessageSquare, Send, Box, Gamepad2, Upload, Bot, Palette, Settings2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SceneCanvas } from "@/components/studio/SceneCanvas";
import { LayersPanel } from "@/components/studio/LayersPanel";
import { PropertiesPanel } from "@/components/studio/PropertiesPanel";
import { ToolsPanel } from "@/components/studio/ToolsPanel";
import { SceneObject } from "@/components/studio/types";
import { GameDevModule } from "@/components/game-dev/GameDevModule";
import { ModelImportExport } from "@/components/studio/ModelImportExport";
import { AIAssistant } from "@/components/studio/AIAssistant";
import { MaterialEditor } from "@/components/studio/MaterialEditor";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const DesignStudio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [roomType, setRoomType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // 3D Scene State
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([
    {
      id: '1',
      name: 'Table',
      type: 'furniture',
      position: { x: 0, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 2, y: 0.1, z: 1 },
      color: '#8b4513',
      visible: true,
      locked: false,
    }
  ]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [roomDimensions, setRoomDimensions] = useState({ width: 10, length: 10, height: 3 });
  const [activeTool, setActiveTool] = useState('move');

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
        if (projectId) {
          loadProject(projectId);
        }
      }
    });
  }, [navigate, projectId]);

  const loadProject = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setProjectName(data.name);
      setDescription(data.description || '');
      setRoomType(data.room_type || '');
    } catch (error: any) {
      console.error('Error loading project:', error);
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive",
      });
    }
  };

  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const projectData = {
        user_id: userId!,
        name: projectName,
        description,
        room_type: roomType,
        data: { messages, sceneObjects, roomDimensions } as any,
      };

      if (projectId) {
        // Update existing
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
      }

      toast({
        title: "Success!",
        description: "Project saved successfully",
      });
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsStreaming(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-design-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: inputMessage,
            roomType: roomType || undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";

      // Add empty assistant message to update progressively
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              // Update the last message
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error: any) {
      console.error('AI error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive",
      });
      // Remove the empty assistant message
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleAddObject = () => {
    const newObject: SceneObject = {
      id: Date.now().toString(),
      name: `Object ${sceneObjects.length + 1}`,
      type: 'furniture',
      position: { x: 0, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      color: '#3b82f6',
      visible: true,
      locked: false,
    };
    setSceneObjects([...sceneObjects, newObject]);
    setSelectedObjectId(newObject.id);
  };

  const handleUpdateObject = (id: string, updates: Partial<SceneObject>) => {
    setSceneObjects(sceneObjects.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  };

  const handleToggleVisibility = (id: string) => {
    setSceneObjects(sceneObjects.map(obj => 
      obj.id === id ? { ...obj, visible: !obj.visible } : obj
    ));
  };

  const handleToggleLock = (id: string) => {
    setSceneObjects(sceneObjects.map(obj => 
      obj.id === id ? { ...obj, locked: !obj.locked } : obj
    ));
  };

  const handleDeleteObject = (id: string) => {
    setSceneObjects(sceneObjects.filter(obj => obj.id !== id));
    if (selectedObjectId === id) setSelectedObjectId(null);
  };

  const selectedObject = sceneObjects.find(obj => obj.id === selectedObjectId) || null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Design Studio</h1>
            </div>
          </div>

          <Button onClick={handleSaveProject} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 h-[calc(100vh-80px)]">
        <Tabs defaultValue="3d-editor" className="h-full flex flex-col">
          <TabsList className="mb-4 bg-background/50 backdrop-blur-xl border border-primary/20">
            <TabsTrigger value="3d-editor">
              <Box className="w-4 h-4 mr-2" />
              3D Editor
            </TabsTrigger>
            <TabsTrigger value="gamedev">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Game Dev
            </TabsTrigger>
            <TabsTrigger value="import">
              <Upload className="w-4 h-4 mr-2" />
              Import/Export
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="materials">
              <Palette className="w-4 h-4 mr-2" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="project-settings">
              <Settings2 className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* 3D Editor Tab */}
          <TabsContent value="3d-editor" className="flex-1 m-0">
            <div className="grid grid-cols-[240px_1fr_280px] gap-4 h-full">
              {/* Left Panel - Tools & Layers */}
              <div className="space-y-4 overflow-auto">
                <ToolsPanel
                  roomDimensions={roomDimensions}
                  onUpdateRoomDimensions={setRoomDimensions}
                  activeTool={activeTool}
                  onToolChange={setActiveTool}
                />
                <LayersPanel
                  objects={sceneObjects}
                  selectedId={selectedObjectId}
                  onSelectObject={setSelectedObjectId}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleLock={handleToggleLock}
                  onDeleteObject={handleDeleteObject}
                  onAddObject={handleAddObject}
                />
              </div>

              {/* Center - 3D Canvas */}
              <Card className="overflow-hidden">
                <SceneCanvas
                  objects={sceneObjects.filter(obj => obj.visible)}
                  selectedId={selectedObjectId}
                  onSelectObject={setSelectedObjectId}
                  onUpdateObject={handleUpdateObject}
                  roomDimensions={roomDimensions}
                />
              </Card>

              {/* Right Panel - Properties */}
              <div className="overflow-auto">
                <PropertiesPanel
                  selectedObject={selectedObject}
                  onUpdateObject={handleUpdateObject}
                />
              </div>
            </div>
          </TabsContent>

          {/* Game Dev Tab */}
          <TabsContent value="gamedev" className="flex-1 m-0">
            <GameDevModule />
          </TabsContent>

          {/* Import/Export Tab */}
          <TabsContent value="import" className="flex-1 m-0">
            <ModelImportExport />
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="flex-1 m-0">
            <AIAssistant />
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="flex-1 m-0">
            <MaterialEditor />
          </TabsContent>

          {/* Project Settings Tab */}
          <TabsContent value="project-settings" className="flex-1 m-0">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Set up your room design project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="My Living Room Design"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger id="room-type">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="living-room">Living Room</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="bathroom">Bathroom</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="dining-room">Dining Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your vision for this space..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="flex-1 m-0">
            <div className="max-w-4xl mx-auto h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    AI Design Assistant
                  </CardTitle>
                  <CardDescription>
                    Get personalized design suggestions and advice
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 h-[500px] pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/50 animate-pulse-glow" />
                          <p>Ask me anything about interior design!</p>
                          <p className="text-sm mt-2">
                            "What colors work well for a modern living room?"
                          </p>
                        </div>
                      ) : (
                        messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-4 rounded-lg ${
                                msg.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                      {isStreaming && messages[messages.length - 1]?.content === '' && (
                        <div className="flex justify-start">
                          <div className="bg-muted p-4 rounded-lg">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask for design suggestions..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isStreaming}
                    />
                    <Button onClick={handleSendMessage} disabled={isStreaming || !inputMessage.trim()}>
                      {isStreaming ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignStudio;

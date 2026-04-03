import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Code, 
  Boxes, 
  Wand2, 
  Play, 
  Save, 
  Download,
  Plus,
  Zap,
  Brain,
  Sparkles
} from "lucide-react";

interface CodeBlock {
  id: string;
  type: "event" | "action" | "condition" | "variable";
  label: string;
  color: string;
  inputs?: string[];
  outputs?: string[];
}

const blockCategories = {
  events: [
    { id: "on-start", label: "On Start", type: "event", color: "bg-green-500" },
    { id: "on-click", label: "On Click", type: "event", color: "bg-green-500" },
    { id: "on-collision", label: "On Collision", type: "event", color: "bg-green-500" },
    { id: "on-key-press", label: "On Key Press", type: "event", color: "bg-green-500" }
  ],
  actions: [
    { id: "move", label: "Move Object", type: "action", color: "bg-blue-500" },
    { id: "rotate", label: "Rotate Object", type: "action", color: "bg-blue-500" },
    { id: "play-sound", label: "Play Sound", type: "action", color: "bg-blue-500" },
    { id: "spawn", label: "Spawn Object", type: "action", color: "bg-blue-500" }
  ],
  conditions: [
    { id: "if", label: "If", type: "condition", color: "bg-yellow-500" },
    { id: "compare", label: "Compare", type: "condition", color: "bg-yellow-500" },
    { id: "and", label: "And", type: "condition", color: "bg-yellow-500" },
    { id: "or", label: "Or", type: "condition", color: "bg-yellow-500" }
  ],
  variables: [
    { id: "get-var", label: "Get Variable", type: "variable", color: "bg-purple-500" },
    { id: "set-var", label: "Set Variable", type: "variable", color: "bg-purple-500" },
    { id: "math", label: "Math Operation", type: "variable", color: "bg-purple-500" }
  ]
};

export const VisualCodingEditor = () => {
  const [activeTab, setActiveTab] = useState("blocks");
  const [placedBlocks, setPlacedBlocks] = useState<CodeBlock[]>([]);

  const handleAddBlock = (block: CodeBlock) => {
    setPlacedBlocks([...placedBlocks, { ...block, id: `${block.id}-${Date.now()}` }]);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Boxes className="w-6 h-6 text-primary" />
            Visual Coding Studio
          </h2>
          <p className="text-sm text-muted-foreground">
            Create game logic with block coding or AI-powered "Vibe Coding"
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-primary">
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="w-full grid grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="blocks">
            <Boxes className="w-4 h-4 mr-2" />
            Block Coding
          </TabsTrigger>
          <TabsTrigger value="vibe">
            <Wand2 className="w-4 h-4 mr-2" />
            Vibe Coding
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="w-4 h-4 mr-2" />
            Code View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="flex-1 mt-4">
          <div className="grid grid-cols-[280px_1fr] gap-4 h-[600px]">
            {/* Block Palette */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Block Palette</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[520px]">
                  <div className="space-y-4 p-4">
                    {Object.entries(blockCategories).map(([category, blocks]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                          {category}
                        </h3>
                        {blocks.map((block) => (
                          <Button
                            key={block.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => handleAddBlock(block as CodeBlock)}
                          >
                            <Plus className="w-3 h-3 mr-2" />
                            {block.label}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="bg-card/30 backdrop-blur-sm border-dashed">
              <CardContent className="h-full p-6">
                <div className="h-full border-2 border-dashed border-border rounded-lg p-4">
                  {placedBlocks.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="space-y-2">
                        <Boxes className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Drag blocks here to start coding
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {placedBlocks.map((block, idx) => (
                        <div
                          key={block.id}
                          className={`${block.color} text-white p-3 rounded-lg shadow-lg animate-fade-in`}
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {block.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vibe" className="flex-1 mt-4">
          <Card className="h-[600px] bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI-Powered Vibe Coding
              </CardTitle>
              <CardDescription>
                Describe what you want in natural language and watch AI generate the code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Quick Action</h4>
                    <p className="text-xs text-muted-foreground">
                      "Make the player jump when spacebar is pressed"
                    </p>
                  </CardContent>
                </Card>
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">AI Generation</h4>
                    <p className="text-xs text-muted-foreground">
                      "Create a enemy that patrols between waypoints"
                    </p>
                  </CardContent>
                </Card>
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Complex Logic</h4>
                    <p className="text-xs text-muted-foreground">
                      "Build a inventory system with drag and drop"
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <textarea
                  className="w-full h-32 p-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Describe what you want to create... (e.g., 'Create a character controller that can run, jump, and crouch with smooth animations')"
                />
                <Button className="w-full bg-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary">Pro Tip</Badge>
                  <p className="text-sm text-muted-foreground">
                    Be specific about animations, physics, and behavior. The more detail you provide,
                    the better the AI can generate optimized code for your game.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="flex-1 mt-4">
          <Card className="h-[600px] bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Generated Code
              </CardTitle>
              <CardDescription>View and edit the generated code</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[480px]">
                <pre className="text-sm bg-background p-4 rounded-lg font-mono">
                  <code>{`// Auto-generated game code
class GameController {
  constructor() {
    this.player = new Player();
    this.enemies = [];
    this.score = 0;
  }
  
  update(deltaTime) {
    this.player.update(deltaTime);
    this.updateEnemies(deltaTime);
    this.checkCollisions();
  }
  
  // Your blocks will generate code here
}`}</code>
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
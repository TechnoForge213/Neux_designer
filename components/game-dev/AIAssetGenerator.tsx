import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Sparkles, 
  Box,
  Palette,
  Image as ImageIcon,
  Loader2,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedAsset {
  id: string;
  type: "model" | "texture" | "material";
  prompt: string;
  thumbnail?: string;
  createdAt: Date;
}

export const AIAssetGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [activeTab, setActiveTab] = useState("models");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Generating...",
      description: "AI is creating your asset",
    });

    // Simulate AI generation
    setTimeout(() => {
      const newAsset: GeneratedAsset = {
        id: Date.now().toString(),
        type: activeTab as any,
        prompt: prompt,
        createdAt: new Date(),
      };

      setGeneratedAssets([newAsset, ...generatedAssets]);
      setIsGenerating(false);
      setPrompt("");
      
      toast({
        title: "Success!",
        description: "Asset generated successfully",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary animate-pulse-glow" />
            AI Asset Generator
          </h2>
          <p className="text-sm text-muted-foreground">
            Generate 3D models, textures, and materials from text descriptions
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="models">
            <Box className="w-4 h-4 mr-2" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="textures">
            <ImageIcon className="w-4 h-4 mr-2" />
            Textures
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Palette className="w-4 h-4 mr-2" />
            Materials
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          {/* Generator Input */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Describe Your Asset
              </CardTitle>
              <CardDescription>
                Be specific about style, colors, materials, and details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`Example: "A futuristic sci-fi weapon with glowing blue energy core, metallic silver body with worn edges, holographic display on the side, photorealistic PBR materials"`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none bg-background border-primary/20 focus:border-primary"
              />
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-primary" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Asset
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={isGenerating}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Quick Prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Medieval sword with engravings",
                    "Sci-fi energy shield",
                    "Rusty metal texture",
                    "Neon city building",
                    "Organic alien creature"
                  ].map((quickPrompt) => (
                    <Badge
                      key={quickPrompt}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/20 hover:border-primary"
                      onClick={() => setPrompt(quickPrompt)}
                    >
                      {quickPrompt}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Assets */}
          <TabsContent value={activeTab} className="mt-0">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Generated {activeTab}</CardTitle>
                <CardDescription>
                  {generatedAssets.filter(a => a.type === activeTab).length} assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {generatedAssets.filter(a => a.type === activeTab).length === 0 ? (
                    <div className="h-[350px] flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Box className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">No assets generated yet</p>
                        <p className="text-xs text-muted-foreground">
                          Describe an asset above to get started
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {generatedAssets
                        .filter(a => a.type === activeTab)
                        .map((asset, idx) => (
                          <Card 
                            key={asset.id}
                            className="group hover:border-primary/50 transition-all cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <CardContent className="p-4">
                              <div className="aspect-square bg-muted/50 rounded-lg mb-3 flex items-center justify-center">
                                {asset.type === "model" && <Box className="w-12 h-12 text-primary" />}
                                {asset.type === "texture" && <ImageIcon className="w-12 h-12 text-primary" />}
                                {asset.type === "material" && <Palette className="w-12 h-12 text-primary" />}
                              </div>
                              <p className="text-sm font-medium mb-2 line-clamp-2">
                                {asset.prompt}
                              </p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Download className="w-3 h-3 mr-1" />
                                  Use
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Powered by Advanced AI</p>
              <p className="text-xs text-muted-foreground">
                Our AI generates production-ready game assets with proper topology, UV mapping, and PBR materials. 
                All generated assets are optimized for real-time rendering and compatible with industry-standard formats (FBX, OBJ, GLTF).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
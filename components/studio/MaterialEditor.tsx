import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Droplets, Sparkles } from "lucide-react";
import { useState } from "react";

export const MaterialEditor = () => {
  const [metalness, setMetalness] = useState([0.5]);
  const [roughness, setRoughness] = useState([0.5]);
  const [opacity, setOpacity] = useState([1]);
  const [emissive, setEmissive] = useState([0]);

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/10">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        Advanced Material Editor
      </h3>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-xl border border-primary/20">
          <TabsTrigger value="physical" className="gap-2">
            <Droplets className="h-4 w-4" />
            Physical
          </TabsTrigger>
          <TabsTrigger value="shader" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Shader
          </TabsTrigger>
          <TabsTrigger value="textures" className="gap-2">
            <Palette className="h-4 w-4" />
            Textures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div>
              <Label className="flex items-center justify-between mb-2">
                <span>Metalness</span>
                <span className="text-sm text-muted-foreground">{metalness[0].toFixed(2)}</span>
              </Label>
              <Slider
                value={metalness}
                onValueChange={setMetalness}
                max={1}
                step={0.01}
                className="[&_[role=slider]]:border-primary [&_[role=slider]]:bg-primary"
              />
            </div>

            <div>
              <Label className="flex items-center justify-between mb-2">
                <span>Roughness</span>
                <span className="text-sm text-muted-foreground">{roughness[0].toFixed(2)}</span>
              </Label>
              <Slider
                value={roughness}
                onValueChange={setRoughness}
                max={1}
                step={0.01}
                className="[&_[role=slider]]:border-primary [&_[role=slider]]:bg-primary"
              />
            </div>

            <div>
              <Label className="flex items-center justify-between mb-2">
                <span>Opacity</span>
                <span className="text-sm text-muted-foreground">{opacity[0].toFixed(2)}</span>
              </Label>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={1}
                step={0.01}
                className="[&_[role=slider]]:border-primary [&_[role=slider]]:bg-primary"
              />
            </div>

            <div>
              <Label className="flex items-center justify-between mb-2">
                <span>Emissive Intensity</span>
                <span className="text-sm text-muted-foreground">{emissive[0].toFixed(2)}</span>
              </Label>
              <Slider
                value={emissive}
                onValueChange={setEmissive}
                max={5}
                step={0.1}
                className="[&_[role=slider]]:border-secondary [&_[role=slider]]:bg-secondary"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <p className="text-sm text-muted-foreground">
              Real-time PBR (Physically Based Rendering) with advanced material properties
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shader" className="pt-4">
          <div className="p-8 text-center text-muted-foreground border border-dashed border-primary/20 rounded-lg">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p>Visual Shader Graph Editor</p>
            <p className="text-sm mt-2">Node-based shader creation coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="textures" className="pt-4">
          <div className="p-8 text-center text-muted-foreground border border-dashed border-primary/20 rounded-lg">
            <Palette className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p>Texture Management</p>
            <p className="text-sm mt-2">PBR texture slots: Albedo, Normal, Roughness, Metalness, AO</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

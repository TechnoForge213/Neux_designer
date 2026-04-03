import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Monitor, Sparkles, Zap, Film } from "lucide-react";

interface GraphicsSettings {
  quality: string;
  resolution: string;
  antiAliasing: boolean;
  shadows: boolean;
  shadowQuality: string;
  reflections: boolean;
  globalIllumination: boolean;
  rayTracing: boolean;
  motionBlur: boolean;
  depthOfField: boolean;
  bloom: boolean;
  ambientOcclusion: boolean;
  renderScale: number;
  fov: number;
  fps: number;
}

export const GraphicsControls = () => {
  const [settings, setSettings] = useState<GraphicsSettings>({
    quality: "ultra",
    resolution: "8k",
    antiAliasing: true,
    shadows: true,
    shadowQuality: "ultra",
    reflections: true,
    globalIllumination: true,
    rayTracing: true,
    motionBlur: true,
    depthOfField: true,
    bloom: true,
    ambientOcclusion: true,
    renderScale: 100,
    fov: 90,
    fps: 120
  });

  const updateSetting = <K extends keyof GraphicsSettings>(
    key: K,
    value: GraphicsSettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Monitor className="w-6 h-6 text-primary" />
            Graphics Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure cinematic quality graphics and rendering
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Film className="w-4 h-4 mr-2" />
          Cinematic Mode
        </Badge>
      </div>

      <Tabs defaultValue="quality" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="quality">
            <Sparkles className="w-4 h-4 mr-2" />
            Quality
          </TabsTrigger>
          <TabsTrigger value="effects">
            <Zap className="w-4 h-4 mr-2" />
            Effects
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Monitor className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="space-y-4 mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Overall Quality</CardTitle>
              <CardDescription>Ultra-high fidelity rendering settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Graphics Preset</Label>
                <Select value={settings.quality} onValueChange={(v) => updateSetting("quality", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra">Ultra</SelectItem>
                    <SelectItem value="cinematic">Cinematic (Movie Quality)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resolution</Label>
                <Select value={settings.resolution} onValueChange={(v) => updateSetting("resolution", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1080p">1920x1080 (Full HD)</SelectItem>
                    <SelectItem value="1440p">2560x1440 (2K)</SelectItem>
                    <SelectItem value="4k">3840x2160 (4K Ultra HD)</SelectItem>
                    <SelectItem value="8k">7680x4320 (8K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Render Scale: {settings.renderScale}%</Label>
                  <Badge variant="outline">Hyper Realistic</Badge>
                </div>
                <Slider
                  value={[settings.renderScale]}
                  onValueChange={([v]) => updateSetting("renderScale", v)}
                  min={50}
                  max={200}
                  step={10}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Advanced Lighting</CardTitle>
              <CardDescription>Movie-grade lighting and shadows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ray Tracing</Label>
                  <p className="text-xs text-muted-foreground">Real-time ray traced lighting</p>
                </div>
                <Switch
                  checked={settings.rayTracing}
                  onCheckedChange={(v) => updateSetting("rayTracing", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Global Illumination</Label>
                  <p className="text-xs text-muted-foreground">Realistic indirect lighting</p>
                </div>
                <Switch
                  checked={settings.globalIllumination}
                  onCheckedChange={(v) => updateSetting("globalIllumination", v)}
                />
              </div>

              <div className="space-y-2">
                <Label>Shadow Quality</Label>
                <Select value={settings.shadowQuality} onValueChange={(v) => updateSetting("shadowQuality", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra">Ultra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4 mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Post-Processing Effects</CardTitle>
              <CardDescription>Cinematic visual effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Motion Blur</Label>
                  <p className="text-xs text-muted-foreground">Smooth cinematic movement</p>
                </div>
                <Switch
                  checked={settings.motionBlur}
                  onCheckedChange={(v) => updateSetting("motionBlur", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Depth of Field</Label>
                  <p className="text-xs text-muted-foreground">Camera focus effects</p>
                </div>
                <Switch
                  checked={settings.depthOfField}
                  onCheckedChange={(v) => updateSetting("depthOfField", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bloom</Label>
                  <p className="text-xs text-muted-foreground">Luminous glow effects</p>
                </div>
                <Switch
                  checked={settings.bloom}
                  onCheckedChange={(v) => updateSetting("bloom", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ambient Occlusion</Label>
                  <p className="text-xs text-muted-foreground">Contact shadows</p>
                </div>
                <Switch
                  checked={settings.ambientOcclusion}
                  onCheckedChange={(v) => updateSetting("ambientOcclusion", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Screen Space Reflections</Label>
                  <p className="text-xs text-muted-foreground">Real-time reflections</p>
                </div>
                <Switch
                  checked={settings.reflections}
                  onCheckedChange={(v) => updateSetting("reflections", v)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Optimize for smooth gameplay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Target FPS: {settings.fps}</Label>
                <Slider
                  value={[settings.fps]}
                  onValueChange={([v]) => updateSetting("fps", v)}
                  min={30}
                  max={240}
                  step={30}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 FPS</span>
                  <span>60 FPS</span>
                  <span>120 FPS</span>
                  <span>240 FPS</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Field of View: {settings.fov}°</Label>
                <Slider
                  value={[settings.fov]}
                  onValueChange={([v]) => updateSetting("fov", v)}
                  min={60}
                  max={120}
                  step={5}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anti-Aliasing</Label>
                  <p className="text-xs text-muted-foreground">Smooth edges</p>
                </div>
                <Switch
                  checked={settings.antiAliasing}
                  onCheckedChange={(v) => updateSetting("antiAliasing", v)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Optimized for AAA Gaming</p>
                  <p className="text-xs text-muted-foreground">
                    These settings are configured for professional game development with movie-quality
                    visuals and buttery-smooth performance at up to 8K resolution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
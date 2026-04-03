import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, Moon, Lightbulb, Sparkles, Eye, Layers, 
  Maximize, Grid3X3, Droplets, Wind, Mountain
} from "lucide-react";

interface RenderSettings {
  // Global Illumination
  giMethod: "lumen" | "raytraced" | "screenspace" | "none";
  giQuality: number;
  giDistance: number;
  indirectBounces: number;
  
  // Nanite
  naniteEnabled: boolean;
  nanitePixelsPerEdge: number;
  naniteMaxPixels: number;
  
  // Ray Tracing
  rtxEnabled: boolean;
  rtxReflections: boolean;
  rtxShadows: boolean;
  rtxAO: boolean;
  rtxGI: boolean;
  rtxTranslucency: boolean;
  rtxSamplesPerPixel: number;
  
  // Shadows
  shadowMethod: "cascaded" | "raytraced" | "contact" | "virtual";
  shadowDistance: number;
  cascadeCount: number;
  shadowResolution: number;
  contactShadowLength: number;
  
  // Reflections
  reflectionMethod: "screenspace" | "raytraced" | "planar" | "cube";
  ssrQuality: number;
  ssrMaxRoughness: number;
  
  // Volumetrics
  volumetricFog: boolean;
  fogDensity: number;
  volumetricClouds: boolean;
  cloudDensity: number;
  godRays: boolean;
  
  // LOD
  lodBias: number;
  lodDistance: number;
  hlod: boolean;
  
  // Occlusion
  occlusionCulling: boolean;
  softwareOcclusion: boolean;
  hierarchicalZ: boolean;
  
  // Anti-Aliasing
  aaMethod: "taa" | "fxaa" | "smaa" | "dlss" | "fsr" | "xess";
  taaSharpness: number;
  
  // Post Processing
  bloom: boolean;
  bloomIntensity: number;
  motionBlur: boolean;
  motionBlurAmount: number;
  dof: boolean;
  dofAperture: number;
  chromaticAberration: boolean;
  vignette: boolean;
  filmGrain: boolean;
  lensFlare: boolean;
  
  // Color Grading
  tonemapper: "aces" | "filmic" | "reinhard" | "neutral";
  exposure: number;
  contrast: number;
  saturation: number;
  temperature: number;
  tint: number;
}

export const RenderingSystem = () => {
  const [settings, setSettings] = useState<RenderSettings>({
    giMethod: "lumen",
    giQuality: 80,
    giDistance: 10000,
    indirectBounces: 3,
    naniteEnabled: true,
    nanitePixelsPerEdge: 1,
    naniteMaxPixels: 300,
    rtxEnabled: true,
    rtxReflections: true,
    rtxShadows: true,
    rtxAO: true,
    rtxGI: false,
    rtxTranslucency: true,
    rtxSamplesPerPixel: 1,
    shadowMethod: "cascaded",
    shadowDistance: 20000,
    cascadeCount: 4,
    shadowResolution: 2048,
    contactShadowLength: 0.5,
    reflectionMethod: "screenspace",
    ssrQuality: 75,
    ssrMaxRoughness: 0.6,
    volumetricFog: true,
    fogDensity: 0.02,
    volumetricClouds: true,
    cloudDensity: 0.5,
    godRays: true,
    lodBias: 0,
    lodDistance: 5000,
    hlod: true,
    occlusionCulling: true,
    softwareOcclusion: true,
    hierarchicalZ: true,
    aaMethod: "taa",
    taaSharpness: 0.5,
    bloom: true,
    bloomIntensity: 0.5,
    motionBlur: true,
    motionBlurAmount: 0.5,
    dof: true,
    dofAperture: 2.8,
    chromaticAberration: false,
    vignette: true,
    filmGrain: false,
    lensFlare: true,
    tonemapper: "aces",
    exposure: 1,
    contrast: 1,
    saturation: 1,
    temperature: 6500,
    tint: 0,
  });

  const updateSetting = <K extends keyof RenderSettings>(key: K, value: RenderSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Advanced Rendering System
          </h2>
          <p className="text-sm text-muted-foreground">
            Lumen GI, Nanite, Ray Tracing, and cinematic post-processing
          </p>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary">
          {settings.rtxEnabled ? "RTX ON" : "Rasterized"}
        </Badge>
      </div>

      <Tabs defaultValue="gi" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="gi"><Sun className="w-4 h-4 mr-2" />GI</TabsTrigger>
          <TabsTrigger value="rtx"><Sparkles className="w-4 h-4 mr-2" />RTX</TabsTrigger>
          <TabsTrigger value="shadows"><Moon className="w-4 h-4 mr-2" />Shadows</TabsTrigger>
          <TabsTrigger value="volumetrics"><Wind className="w-4 h-4 mr-2" />Volumetrics</TabsTrigger>
          <TabsTrigger value="postprocess"><Eye className="w-4 h-4 mr-2" />Post FX</TabsTrigger>
          <TabsTrigger value="color"><Droplets className="w-4 h-4 mr-2" />Color</TabsTrigger>
        </TabsList>

        <TabsContent value="gi" className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Global Illumination (Lumen)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>GI Method</Label>
                  <Select value={settings.giMethod} onValueChange={(v: any) => updateSetting("giMethod", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lumen">Lumen (Software)</SelectItem>
                      <SelectItem value="raytraced">Hardware Ray Tracing</SelectItem>
                      <SelectItem value="screenspace">Screen Space GI</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Quality</Label>
                    <span className="text-muted-foreground">{settings.giQuality}%</span>
                  </div>
                  <Slider value={[settings.giQuality]} onValueChange={([v]) => updateSetting("giQuality", v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Indirect Bounces</Label>
                    <span className="text-muted-foreground">{settings.indirectBounces}</span>
                  </div>
                  <Slider value={[settings.indirectBounces]} onValueChange={([v]) => updateSetting("indirectBounces", v)} max={8} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4 text-primary" />
                  Nanite (Virtualized Geometry)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Nanite</Label>
                  <Switch checked={settings.naniteEnabled} onCheckedChange={(v) => updateSetting("naniteEnabled", v)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Pixels Per Edge</Label>
                    <span className="text-muted-foreground">{settings.nanitePixelsPerEdge}px</span>
                  </div>
                  <Slider value={[settings.nanitePixelsPerEdge]} onValueChange={([v]) => updateSetting("nanitePixelsPerEdge", v)} min={0.5} max={4} step={0.1} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Max Pixels</Label>
                    <span className="text-muted-foreground">{settings.naniteMaxPixels}M</span>
                  </div>
                  <Slider value={[settings.naniteMaxPixels]} onValueChange={([v]) => updateSetting("naniteMaxPixels", v)} max={1000} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">LOD & Occlusion</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>LOD Bias</Label>
                  <span className="text-muted-foreground">{settings.lodBias}</span>
                </div>
                <Slider value={[settings.lodBias + 2]} onValueChange={([v]) => updateSetting("lodBias", v - 2)} max={4} />
              </div>
              <div className="flex items-center justify-between">
                <Label>HLOD</Label>
                <Switch checked={settings.hlod} onCheckedChange={(v) => updateSetting("hlod", v)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Occlusion Culling</Label>
                <Switch checked={settings.occlusionCulling} onCheckedChange={(v) => updateSetting("occlusionCulling", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rtx" className="mt-6 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Ray Tracing Features
              </CardTitle>
              <CardDescription>Hardware-accelerated ray tracing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable RTX</Label>
                  <p className="text-xs text-muted-foreground">Requires RTX 20/30/40 series GPU</p>
                </div>
                <Switch checked={settings.rtxEnabled} onCheckedChange={(v) => updateSetting("rtxEnabled", v)} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label>RT Reflections</Label>
                  <Switch checked={settings.rtxReflections} onCheckedChange={(v) => updateSetting("rtxReflections", v)} disabled={!settings.rtxEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label>RT Shadows</Label>
                  <Switch checked={settings.rtxShadows} onCheckedChange={(v) => updateSetting("rtxShadows", v)} disabled={!settings.rtxEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label>RT Ambient Occlusion</Label>
                  <Switch checked={settings.rtxAO} onCheckedChange={(v) => updateSetting("rtxAO", v)} disabled={!settings.rtxEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label>RT Global Illumination</Label>
                  <Switch checked={settings.rtxGI} onCheckedChange={(v) => updateSetting("rtxGI", v)} disabled={!settings.rtxEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <Label>RT Translucency</Label>
                  <Switch checked={settings.rtxTranslucency} onCheckedChange={(v) => updateSetting("rtxTranslucency", v)} disabled={!settings.rtxEnabled} />
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-background/50">
                  <div className="flex justify-between text-sm">
                    <Label>Samples Per Pixel</Label>
                    <span className="text-muted-foreground">{settings.rtxSamplesPerPixel}</span>
                  </div>
                  <Slider value={[settings.rtxSamplesPerPixel]} onValueChange={([v]) => updateSetting("rtxSamplesPerPixel", v)} min={1} max={8} disabled={!settings.rtxEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shadows" className="mt-6 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Shadow System</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Shadow Method</Label>
                  <Select value={settings.shadowMethod} onValueChange={(v: any) => updateSetting("shadowMethod", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cascaded">Cascaded Shadow Maps</SelectItem>
                      <SelectItem value="raytraced">Ray Traced Shadows</SelectItem>
                      <SelectItem value="contact">Contact Shadows</SelectItem>
                      <SelectItem value="virtual">Virtual Shadow Maps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Shadow Distance</Label>
                    <span className="text-muted-foreground">{settings.shadowDistance}m</span>
                  </div>
                  <Slider value={[settings.shadowDistance]} onValueChange={([v]) => updateSetting("shadowDistance", v)} max={50000} step={100} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Cascade Count</Label>
                    <span className="text-muted-foreground">{settings.cascadeCount}</span>
                  </div>
                  <Slider value={[settings.cascadeCount]} onValueChange={([v]) => updateSetting("cascadeCount", v)} min={1} max={8} />
                </div>
                <div className="space-y-2">
                  <Label>Shadow Resolution</Label>
                  <Select value={settings.shadowResolution.toString()} onValueChange={(v) => updateSetting("shadowResolution", parseInt(v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="512">512</SelectItem>
                      <SelectItem value="1024">1024</SelectItem>
                      <SelectItem value="2048">2048</SelectItem>
                      <SelectItem value="4096">4096</SelectItem>
                      <SelectItem value="8192">8192</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volumetrics" className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Wind className="w-4 h-4 text-primary" />
                  Volumetric Fog
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable</Label>
                  <Switch checked={settings.volumetricFog} onCheckedChange={(v) => updateSetting("volumetricFog", v)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Fog Density</Label>
                    <span className="text-muted-foreground">{settings.fogDensity.toFixed(3)}</span>
                  </div>
                  <Slider value={[settings.fogDensity * 100]} onValueChange={([v]) => updateSetting("fogDensity", v / 100)} max={10} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>God Rays</Label>
                  <Switch checked={settings.godRays} onCheckedChange={(v) => updateSetting("godRays", v)} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-primary" />
                  Volumetric Clouds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable</Label>
                  <Switch checked={settings.volumetricClouds} onCheckedChange={(v) => updateSetting("volumetricClouds", v)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Cloud Density</Label>
                    <span className="text-muted-foreground">{settings.cloudDensity.toFixed(2)}</span>
                  </div>
                  <Slider value={[settings.cloudDensity * 100]} onValueChange={([v]) => updateSetting("cloudDensity", v / 100)} max={100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="postprocess" className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Anti-Aliasing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>AA Method</Label>
                  <Select value={settings.aaMethod} onValueChange={(v: any) => updateSetting("aaMethod", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taa">TAA (Temporal)</SelectItem>
                      <SelectItem value="fxaa">FXAA</SelectItem>
                      <SelectItem value="smaa">SMAA</SelectItem>
                      <SelectItem value="dlss">DLSS 3.5</SelectItem>
                      <SelectItem value="fsr">FSR 3.0</SelectItem>
                      <SelectItem value="xess">XeSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Cinematic Effects</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Bloom</Label>
                  <Switch checked={settings.bloom} onCheckedChange={(v) => updateSetting("bloom", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Motion Blur</Label>
                  <Switch checked={settings.motionBlur} onCheckedChange={(v) => updateSetting("motionBlur", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Depth of Field</Label>
                  <Switch checked={settings.dof} onCheckedChange={(v) => updateSetting("dof", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Chromatic Aberration</Label>
                  <Switch checked={settings.chromaticAberration} onCheckedChange={(v) => updateSetting("chromaticAberration", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Vignette</Label>
                  <Switch checked={settings.vignette} onCheckedChange={(v) => updateSetting("vignette", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Film Grain</Label>
                  <Switch checked={settings.filmGrain} onCheckedChange={(v) => updateSetting("filmGrain", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Lens Flare</Label>
                  <Switch checked={settings.lensFlare} onCheckedChange={(v) => updateSetting("lensFlare", v)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="color" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Color Grading</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tonemapper</Label>
                <Select value={settings.tonemapper} onValueChange={(v: any) => updateSetting("tonemapper", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aces">ACES Filmic</SelectItem>
                    <SelectItem value="filmic">Filmic</SelectItem>
                    <SelectItem value="reinhard">Reinhard</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Exposure</Label>
                  <span className="text-muted-foreground">{settings.exposure.toFixed(1)}</span>
                </div>
                <Slider value={[settings.exposure * 50]} onValueChange={([v]) => updateSetting("exposure", v / 50)} max={100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Contrast</Label>
                  <span className="text-muted-foreground">{settings.contrast.toFixed(2)}</span>
                </div>
                <Slider value={[settings.contrast * 50]} onValueChange={([v]) => updateSetting("contrast", v / 50)} max={100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Saturation</Label>
                  <span className="text-muted-foreground">{settings.saturation.toFixed(2)}</span>
                </div>
                <Slider value={[settings.saturation * 50]} onValueChange={([v]) => updateSetting("saturation", v / 50)} max={100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Temperature</Label>
                  <span className="text-muted-foreground">{settings.temperature}K</span>
                </div>
                <Slider value={[settings.temperature]} onValueChange={([v]) => updateSetting("temperature", v)} min={2000} max={12000} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Tint</Label>
                  <span className="text-muted-foreground">{settings.tint}</span>
                </div>
                <Slider value={[settings.tint + 50]} onValueChange={([v]) => updateSetting("tint", v - 50)} max={100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

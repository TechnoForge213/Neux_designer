import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Package, Monitor, Smartphone, Gamepad2, Settings, 
  Play, Download, Upload, CheckCircle2, XCircle, Clock,
  Cpu, HardDrive, Zap, Shield
} from "lucide-react";

interface BuildConfig {
  id: string;
  name: string;
  platform: string;
  status: "idle" | "building" | "success" | "failed";
  progress?: number;
  size?: string;
}

const buildConfigs: BuildConfig[] = [
  { id: "1", name: "Windows x64", platform: "windows", status: "success", size: "4.2 GB" },
  { id: "2", name: "Windows ARM64", platform: "windows", status: "idle" },
  { id: "3", name: "macOS Universal", platform: "macos", status: "idle" },
  { id: "4", name: "Linux x64", platform: "linux", status: "idle" },
  { id: "5", name: "PlayStation 5", platform: "ps5", status: "idle" },
  { id: "6", name: "Xbox Series X", platform: "xbox", status: "idle" },
  { id: "7", name: "Nintendo Switch", platform: "switch", status: "idle" },
  { id: "8", name: "Android", platform: "android", status: "building", progress: 45 },
  { id: "9", name: "iOS", platform: "ios", status: "failed" },
];

export const BuildSystem = () => {
  const [configs, setConfigs] = useState<BuildConfig[]>(buildConfigs);
  const [selectedConfig, setSelectedConfig] = useState("1");
  
  // Build settings
  const [developmentBuild, setDevelopmentBuild] = useState(false);
  const [debugSymbols, setDebugSymbols] = useState(false);
  const [compression, setCompression] = useState("lz4");
  const [scriptingBackend, setScriptingBackend] = useState("il2cpp");
  
  // Optimization settings
  const [stripEngineCode, setStripEngineCode] = useState(true);
  const [scriptCallOptimization, setScriptCallOptimization] = useState(true);
  const [incrementalGC, setIncrementalGC] = useState(true);
  
  // Packaging settings
  const [createInstaller, setCreateInstaller] = useState(true);
  const [includeDebugFiles, setIncludeDebugFiles] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "windows":
      case "macos":
      case "linux":
        return Monitor;
      case "android":
      case "ios":
        return Smartphone;
      case "ps5":
      case "xbox":
      case "switch":
        return Gamepad2;
      default:
        return Monitor;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Success</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case "building":
        return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" />Building</Badge>;
      default:
        return <Badge variant="outline">Idle</Badge>;
    }
  };

  const startBuild = (id: string) => {
    setConfigs(configs.map(c => 
      c.id === id ? { ...c, status: "building", progress: 0 } : c
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Build & Deploy System
          </h2>
          <p className="text-sm text-muted-foreground">
            Multi-platform builds, optimization, and distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Player Settings
          </Button>
          <Button size="sm" className="bg-primary">
            <Play className="w-4 h-4 mr-2" />
            Build All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Build Configurations */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Build Configurations</CardTitle>
            <CardDescription>Select platform and start build</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {configs.map((config) => {
                const Icon = getPlatformIcon(config.platform);
                return (
                  <Card
                    key={config.id}
                    className={`cursor-pointer transition-all hover:border-primary/50 ${
                      selectedConfig === config.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedConfig(config.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                        {getStatusBadge(config.status)}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{config.name}</h4>
                      {config.size && (
                        <p className="text-xs text-muted-foreground">{config.size}</p>
                      )}
                      {config.status === "building" && config.progress !== undefined && (
                        <div className="mt-2">
                          <Progress value={config.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-1">{config.progress}%</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => { e.stopPropagation(); startBuild(config.id); }}
                          disabled={config.status === "building"}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Build
                        </Button>
                        {config.status === "success" && (
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="build" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50">
              <TabsTrigger value="build">Build</TabsTrigger>
              <TabsTrigger value="optimize">Optimize</TabsTrigger>
              <TabsTrigger value="package">Package</TabsTrigger>
            </TabsList>

            <TabsContent value="build" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    Build Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Development Build</Label>
                      <p className="text-xs text-muted-foreground">Enable profiler & debugging</p>
                    </div>
                    <Switch checked={developmentBuild} onCheckedChange={setDevelopmentBuild} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Debug Symbols</Label>
                      <p className="text-xs text-muted-foreground">Include debug information</p>
                    </div>
                    <Switch checked={debugSymbols} onCheckedChange={setDebugSymbols} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Compression</Label>
                    <Select value={compression} onValueChange={setCompression}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="lz4">LZ4 (Fast)</SelectItem>
                        <SelectItem value="lz4hc">LZ4HC (High)</SelectItem>
                        <SelectItem value="lzma">LZMA (Best)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Scripting Backend</Label>
                    <Select value={scriptingBackend} onValueChange={setScriptingBackend}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mono">Mono</SelectItem>
                        <SelectItem value="il2cpp">IL2CPP (Recommended)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimize" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Strip Engine Code</Label>
                      <p className="text-xs text-muted-foreground">Remove unused engine features</p>
                    </div>
                    <Switch checked={stripEngineCode} onCheckedChange={setStripEngineCode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Script Call Optimization</Label>
                      <p className="text-xs text-muted-foreground">Fast but no exceptions</p>
                    </div>
                    <Switch checked={scriptCallOptimization} onCheckedChange={setScriptCallOptimization} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Incremental GC</Label>
                      <p className="text-xs text-muted-foreground">Spread GC across frames</p>
                    </div>
                    <Switch checked={incrementalGC} onCheckedChange={setIncrementalGC} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Size Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: "Textures", size: "1.2 GB", percent: 45 },
                    { name: "Meshes", size: "800 MB", percent: 30 },
                    { name: "Audio", size: "400 MB", percent: 15 },
                    { name: "Scripts", size: "200 MB", percent: 8 },
                    { name: "Other", size: "50 MB", percent: 2 },
                  ].map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.size}</span>
                      </div>
                      <Progress value={item.percent} className="h-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="package" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Packaging Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Create Installer</Label>
                      <p className="text-xs text-muted-foreground">Generate platform installer</p>
                    </div>
                    <Switch checked={createInstaller} onCheckedChange={setCreateInstaller} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Include Debug Files</Label>
                      <p className="text-xs text-muted-foreground">Ship debug symbols</p>
                    </div>
                    <Switch checked={includeDebugFiles} onCheckedChange={setIncludeDebugFiles} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Code Signing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Signing Certificate</Label>
                    <Select defaultValue="none">
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="dev">Development</SelectItem>
                        <SelectItem value="prod">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Certificate
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Build Log */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Build Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                <div className="p-3 font-mono text-xs space-y-1">
                  <p className="text-green-500">[INFO] Starting build for Windows x64...</p>
                  <p className="text-muted-foreground">[INFO] Compiling scripts...</p>
                  <p className="text-muted-foreground">[INFO] Processing assets...</p>
                  <p className="text-muted-foreground">[INFO] Building player...</p>
                  <p className="text-yellow-500">[WARN] 3 materials are not optimized</p>
                  <p className="text-muted-foreground">[INFO] Compressing data...</p>
                  <p className="text-green-500">[SUCCESS] Build completed in 4m 32s</p>
                  <p className="text-muted-foreground">[INFO] Output: Builds/Windows/Game.exe</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, TreeDeciduous, Droplets, Paintbrush, 
  Layers, Sun, Wind, Sparkles, Download, Upload
} from "lucide-react";

interface TerrainLayer {
  id: string;
  name: string;
  texture: string;
  tiling: number;
  metallic: number;
  smoothness: number;
}

const sampleLayers: TerrainLayer[] = [
  { id: "1", name: "Grass", texture: "grass_albedo", tiling: 15, metallic: 0, smoothness: 0.3 },
  { id: "2", name: "Dirt", texture: "dirt_albedo", tiling: 20, metallic: 0, smoothness: 0.2 },
  { id: "3", name: "Rock", texture: "rock_albedo", tiling: 8, metallic: 0.1, smoothness: 0.4 },
  { id: "4", name: "Sand", texture: "sand_albedo", tiling: 25, metallic: 0, smoothness: 0.1 },
];

export const TerrainEditor = () => {
  const [layers] = useState<TerrainLayer[]>(sampleLayers);
  const [selectedLayer, setSelectedLayer] = useState("1");
  const [activeTool, setActiveTool] = useState("sculpt");
  
  // Sculpt settings
  const [brushSize, setBrushSize] = useState(50);
  const [brushStrength, setBrushStrength] = useState(50);
  const [brushFalloff, setBrushFalloff] = useState(50);
  
  // Terrain settings
  const [terrainWidth, setTerrainWidth] = useState(1000);
  const [terrainLength, setTerrainLength] = useState(1000);
  const [terrainHeight, setTerrainHeight] = useState(600);
  const [heightmapResolution, setHeightmapResolution] = useState(513);
  const [detailResolution, setDetailResolution] = useState(1024);
  
  // Foliage settings
  const [foliageDensity, setFoliageDensity] = useState(50);
  const [windStrength, setWindStrength] = useState(30);
  const [lodBias, setLodBias] = useState(0);
  
  // Procedural settings
  const [noiseScale, setNoiseScale] = useState(100);
  const [octaves, setOctaves] = useState(6);
  const [persistence, setPersistence] = useState(50);
  const [lacunarity, setLacunarity] = useState(200);
  const [seed, setSeed] = useState(12345);

  const tools = [
    { id: "sculpt", name: "Sculpt", icon: Mountain },
    { id: "smooth", name: "Smooth", icon: Wind },
    { id: "flatten", name: "Flatten", icon: Layers },
    { id: "paint", name: "Paint", icon: Paintbrush },
    { id: "foliage", name: "Foliage", icon: TreeDeciduous },
    { id: "water", name: "Water", icon: Droplets },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mountain className="w-6 h-6 text-primary" />
            Terrain Editor
          </h2>
          <p className="text-sm text-muted-foreground">
            Landscape sculpting, painting, foliage, and procedural generation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Heightmap
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      {/* Tool Bar */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-2">
          <div className="flex items-center gap-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTool(tool.id)}
                className="flex-1"
              >
                <tool.icon className="w-4 h-4 mr-2" />
                {tool.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* Terrain Canvas */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="h-[500px] bg-gradient-to-b from-sky-900 to-green-900 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Mountain className="w-24 h-24 mx-auto text-foreground/20" />
                <p className="text-foreground/50">3D Terrain Viewport</p>
                <p className="text-xs text-foreground/30">Click and drag to sculpt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="brush" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/50">
              <TabsTrigger value="brush" className="text-xs">Brush</TabsTrigger>
              <TabsTrigger value="terrain" className="text-xs">Terrain</TabsTrigger>
              <TabsTrigger value="layers" className="text-xs">Layers</TabsTrigger>
              <TabsTrigger value="proc" className="text-xs">Proc</TabsTrigger>
            </TabsList>

            <TabsContent value="brush" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Brush Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Size</Label>
                      <span className="text-muted-foreground">{brushSize}</span>
                    </div>
                    <Slider value={[brushSize]} onValueChange={([v]) => setBrushSize(v)} max={200} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Strength</Label>
                      <span className="text-muted-foreground">{brushStrength}%</span>
                    </div>
                    <Slider value={[brushStrength]} onValueChange={([v]) => setBrushStrength(v)} max={100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Falloff</Label>
                      <span className="text-muted-foreground">{brushFalloff}%</span>
                    </div>
                    <Slider value={[brushFalloff]} onValueChange={([v]) => setBrushFalloff(v)} max={100} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terrain" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Terrain Size</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Width</Label>
                      <Slider value={[terrainWidth / 40]} onValueChange={([v]) => setTerrainWidth(v * 40)} max={100} />
                      <span className="text-xs text-muted-foreground">{terrainWidth}m</span>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Length</Label>
                      <Slider value={[terrainLength / 40]} onValueChange={([v]) => setTerrainLength(v * 40)} max={100} />
                      <span className="text-xs text-muted-foreground">{terrainLength}m</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Max Height</Label>
                      <span className="text-muted-foreground">{terrainHeight}m</span>
                    </div>
                    <Slider value={[terrainHeight / 20]} onValueChange={([v]) => setTerrainHeight(v * 20)} max={100} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Heightmap Resolution</Label>
                    <Select value={heightmapResolution.toString()} onValueChange={(v) => setHeightmapResolution(parseInt(v))}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[129, 257, 513, 1025, 2049, 4097].map((res) => (
                          <SelectItem key={res} value={res.toString()}>{res} x {res}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layers" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Terrain Layers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {layers.map((layer) => (
                    <div
                      key={layer.id}
                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                        selectedLayer === layer.id
                          ? "bg-primary/20 border border-primary"
                          : "bg-background/50 hover:bg-muted"
                      }`}
                      onClick={() => setSelectedLayer(layer.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{layer.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {layer.tiling}x
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Add Layer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proc" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Procedural Generation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Noise Scale</Label>
                      <span className="text-muted-foreground">{noiseScale}</span>
                    </div>
                    <Slider value={[noiseScale]} onValueChange={([v]) => setNoiseScale(v)} max={500} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Octaves</Label>
                      <span className="text-muted-foreground">{octaves}</span>
                    </div>
                    <Slider value={[octaves]} onValueChange={([v]) => setOctaves(v)} min={1} max={12} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Persistence</Label>
                      <span className="text-muted-foreground">{persistence}%</span>
                    </div>
                    <Slider value={[persistence]} onValueChange={([v]) => setPersistence(v)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Lacunarity</Label>
                      <span className="text-muted-foreground">{(lacunarity / 100).toFixed(1)}</span>
                    </div>
                    <Slider value={[lacunarity]} onValueChange={([v]) => setLacunarity(v)} max={400} />
                  </div>
                  <Button className="w-full" size="sm">Generate Terrain</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Foliage Quick Settings */}
          {activeTool === "foliage" && (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TreeDeciduous className="w-4 h-4 text-primary" />
                  Foliage Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Density</Label>
                    <span className="text-muted-foreground">{foliageDensity}%</span>
                  </div>
                  <Slider value={[foliageDensity]} onValueChange={([v]) => setFoliageDensity(v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Wind Strength</Label>
                    <span className="text-muted-foreground">{windStrength}%</span>
                  </div>
                  <Slider value={[windStrength]} onValueChange={([v]) => setWindStrength(v)} max={100} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Cast Shadows</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

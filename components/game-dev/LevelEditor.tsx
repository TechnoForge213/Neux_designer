import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Layers, Box, Grid3X3, Puzzle, Eye, EyeOff,
  Lock, Unlock, Trash2, Copy, Plus, FolderTree
} from "lucide-react";

interface SceneObject {
  id: string;
  name: string;
  type: "mesh" | "light" | "camera" | "trigger" | "prefab";
  visible: boolean;
  locked: boolean;
  children?: SceneObject[];
}

interface Prefab {
  id: string;
  name: string;
  category: string;
  thumbnail?: string;
}

const sampleHierarchy: SceneObject[] = [
  { id: "1", name: "Environment", type: "mesh", visible: true, locked: false, children: [
    { id: "1-1", name: "Terrain", type: "mesh", visible: true, locked: true },
    { id: "1-2", name: "Foliage", type: "mesh", visible: true, locked: false },
    { id: "1-3", name: "Buildings", type: "mesh", visible: true, locked: false },
  ]},
  { id: "2", name: "Lighting", type: "light", visible: true, locked: false, children: [
    { id: "2-1", name: "Directional Light", type: "light", visible: true, locked: false },
    { id: "2-2", name: "Point Lights", type: "light", visible: true, locked: false },
  ]},
  { id: "3", name: "Gameplay", type: "trigger", visible: true, locked: false, children: [
    { id: "3-1", name: "Player Start", type: "trigger", visible: true, locked: true },
    { id: "3-2", name: "Spawn Points", type: "trigger", visible: true, locked: false },
    { id: "3-3", name: "Trigger Volumes", type: "trigger", visible: true, locked: false },
  ]},
  { id: "4", name: "Main Camera", type: "camera", visible: true, locked: true },
];

const samplePrefabs: Prefab[] = [
  { id: "1", name: "Barrel", category: "Props" },
  { id: "2", name: "Crate", category: "Props" },
  { id: "3", name: "Door", category: "Architecture" },
  { id: "4", name: "Window", category: "Architecture" },
  { id: "5", name: "Tree_Oak", category: "Foliage" },
  { id: "6", name: "Tree_Pine", category: "Foliage" },
  { id: "7", name: "Rock_Large", category: "Environment" },
  { id: "8", name: "Grass_Patch", category: "Environment" },
  { id: "9", name: "NPC_Guard", category: "Characters" },
  { id: "10", name: "Vehicle_Car", category: "Vehicles" },
];

export const LevelEditor = () => {
  const [hierarchy, setHierarchy] = useState<SceneObject[]>(sampleHierarchy);
  const [prefabs] = useState<Prefab[]>(samplePrefabs);
  const [selectedObject, setSelectedObject] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [prefabCategory, setPrefabCategory] = useState("all");
  
  // Level streaming
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [worldPartition, setWorldPartition] = useState(true);
  
  const toggleVisibility = (id: string) => {
    const updateVisibility = (objects: SceneObject[]): SceneObject[] => {
      return objects.map(obj => {
        if (obj.id === id) {
          return { ...obj, visible: !obj.visible };
        }
        if (obj.children) {
          return { ...obj, children: updateVisibility(obj.children) };
        }
        return obj;
      });
    };
    setHierarchy(updateVisibility(hierarchy));
  };

  const toggleLock = (id: string) => {
    const updateLock = (objects: SceneObject[]): SceneObject[] => {
      return objects.map(obj => {
        if (obj.id === id) {
          return { ...obj, locked: !obj.locked };
        }
        if (obj.children) {
          return { ...obj, children: updateLock(obj.children) };
        }
        return obj;
      });
    };
    setHierarchy(updateLock(hierarchy));
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "mesh": return "📦";
      case "light": return "💡";
      case "camera": return "📷";
      case "trigger": return "🎯";
      case "prefab": return "🧩";
      default: return "📦";
    }
  };

  const renderHierarchyItem = (obj: SceneObject, depth: number = 0) => {
    return (
      <div key={obj.id}>
        <div
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-muted ${
            selectedObject === obj.id ? "bg-primary/20 border border-primary" : ""
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => setSelectedObject(obj.id)}
        >
          <span className="text-xs">{getTypeEmoji(obj.type)}</span>
          <span className="flex-1 text-sm truncate">{obj.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => { e.stopPropagation(); toggleVisibility(obj.id); }}
          >
            {obj.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => { e.stopPropagation(); toggleLock(obj.id); }}
          >
            {obj.locked ? <Lock className="h-3 w-3 text-yellow-500" /> : <Unlock className="h-3 w-3 text-muted-foreground" />}
          </Button>
        </div>
        {obj.children?.map(child => renderHierarchyItem(child, depth + 1))}
      </div>
    );
  };

  const filteredPrefabs = prefabs.filter(p => 
    (prefabCategory === "all" || p.category === prefabCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["all", ...new Set(prefabs.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Level Editor
          </h2>
          <p className="text-sm text-muted-foreground">
            Scene hierarchy, prefabs, and world partition
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Object
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr_280px] gap-4">
        {/* Hierarchy Panel */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <FolderTree className="w-4 h-4" />
                Hierarchy
              </CardTitle>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[550px]">
              <div className="p-2 space-y-1">
                {hierarchy.map(obj => renderHierarchyItem(obj))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Viewport */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="h-[600px] bg-gradient-to-br from-muted to-background rounded-lg flex items-center justify-center relative">
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="outline">Perspective</Badge>
                <Badge variant="outline">Lit</Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="outline">Ortho</Button>
                <Button size="sm" variant="outline">
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center">
                <Box className="w-24 h-24 mx-auto text-primary/20" />
                <p className="text-muted-foreground mt-4">3D Scene Viewport</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                <span>Objects: 156</span>
                <span>Triangles: 2.4M</span>
                <span>Draw Calls: 89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prefabs & Settings */}
        <div className="space-y-4">
          <Tabs defaultValue="prefabs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50">
              <TabsTrigger value="prefabs">Prefabs</TabsTrigger>
              <TabsTrigger value="streaming">Streaming</TabsTrigger>
            </TabsList>

            <TabsContent value="prefabs" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <Input
                    placeholder="Search prefabs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8"
                  />
                </CardHeader>
                <CardContent className="p-2">
                  <Select value={prefabCategory} onValueChange={setPrefabCategory}>
                    <SelectTrigger className="h-8 mb-2">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ScrollArea className="h-[400px]">
                    <div className="grid grid-cols-2 gap-2">
                      {filteredPrefabs.map((prefab) => (
                        <div
                          key={prefab.id}
                          className="p-3 rounded-lg bg-background/50 hover:bg-muted cursor-pointer transition-all border border-transparent hover:border-primary/50"
                          draggable
                        >
                          <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                            <Puzzle className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-xs font-medium truncate">{prefab.name}</p>
                          <p className="text-xs text-muted-foreground">{prefab.category}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="streaming" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Level Streaming</CardTitle>
                  <CardDescription className="text-xs">Configure world partition and streaming</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">World Partition</Label>
                      <p className="text-xs text-muted-foreground">Auto-partition large worlds</p>
                    </div>
                    <Switch checked={worldPartition} onCheckedChange={setWorldPartition} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Level Streaming</Label>
                      <p className="text-xs text-muted-foreground">Stream levels dynamically</p>
                    </div>
                    <Switch checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
                  </div>

                  {worldPartition && (
                    <div className="space-y-3 pt-2 border-t border-border">
                      <div className="space-y-1">
                        <Label className="text-xs">Cell Size</Label>
                        <Select defaultValue="12800">
                          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6400">6400 units</SelectItem>
                            <SelectItem value="12800">12800 units</SelectItem>
                            <SelectItem value="25600">25600 units</SelectItem>
                            <SelectItem value="51200">51200 units</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Loading Range</Label>
                        <Select defaultValue="3">
                          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 cell</SelectItem>
                            <SelectItem value="2">2 cells</SelectItem>
                            <SelectItem value="3">3 cells</SelectItem>
                            <SelectItem value="4">4 cells</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border">
                    <Label className="text-xs mb-2 block">Streaming Levels</Label>
                    <div className="space-y-1">
                      {["Level_Gameplay", "Level_Environment", "Level_Audio", "Level_Lighting"].map((level) => (
                        <div key={level} className="flex items-center justify-between p-2 rounded bg-background/50">
                          <span className="text-xs">{level}</span>
                          <Badge variant="outline" className="text-xs">Loaded</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

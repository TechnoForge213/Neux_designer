import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, TreeDeciduous, Route, Eye, Users, 
  Target, Shield, Swords, Heart, Plus, Play
} from "lucide-react";

interface BehaviorNode {
  id: string;
  type: "selector" | "sequence" | "task" | "decorator" | "condition";
  name: string;
  children?: string[];
}

const sampleBehaviorTree: BehaviorNode[] = [
  { id: "root", type: "selector", name: "AI Root", children: ["combat", "patrol", "idle"] },
  { id: "combat", type: "sequence", name: "Combat Behavior", children: ["see_enemy", "attack"] },
  { id: "patrol", type: "sequence", name: "Patrol Behavior", children: ["has_waypoints", "move_to_waypoint"] },
  { id: "idle", type: "task", name: "Idle" },
  { id: "see_enemy", type: "condition", name: "Can See Enemy?" },
  { id: "attack", type: "task", name: "Attack Target" },
  { id: "has_waypoints", type: "condition", name: "Has Waypoints?" },
  { id: "move_to_waypoint", type: "task", name: "Move To Waypoint" },
];

const aiStates = [
  { name: "Idle", icon: Heart, color: "text-green-500" },
  { name: "Patrol", icon: Route, color: "text-blue-500" },
  { name: "Alert", icon: Eye, color: "text-yellow-500" },
  { name: "Combat", icon: Swords, color: "text-red-500" },
  { name: "Flee", icon: Shield, color: "text-purple-500" },
];

export const AIBehaviorSystem = () => {
  const [nodes] = useState<BehaviorNode[]>(sampleBehaviorTree);
  const [selectedNode, setSelectedNode] = useState<string>("root");
  
  // NavMesh settings
  const [agentRadius, setAgentRadius] = useState(0.5);
  const [agentHeight, setAgentHeight] = useState(2);
  const [stepHeight, setStepHeight] = useState(0.4);
  const [maxSlope, setMaxSlope] = useState(45);
  const [cellSize, setCellSize] = useState(0.3);
  const [cellHeight, setCellHeight] = useState(0.2);
  
  // Perception settings
  const [sightRadius, setSightRadius] = useState(20);
  const [sightAngle, setSightAngle] = useState(90);
  const [hearingRadius, setHearingRadius] = useState(15);
  const [loseTargetTime, setLoseTargetTime] = useState(5);
  
  // Crowd settings
  const [avoidanceQuality, setAvoidanceQuality] = useState("medium");
  const [separationWeight, setSeparationWeight] = useState(50);
  const [cohesionWeight, setCohesionWeight] = useState(30);
  const [alignmentWeight, setAlignmentWeight] = useState(20);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "selector": return "bg-purple-500/20 border-purple-500";
      case "sequence": return "bg-blue-500/20 border-blue-500";
      case "task": return "bg-green-500/20 border-green-500";
      case "decorator": return "bg-yellow-500/20 border-yellow-500";
      case "condition": return "bg-orange-500/20 border-orange-500";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Behavior System
          </h2>
          <p className="text-sm text-muted-foreground">
            Behavior trees, navigation mesh, perception, and crowd simulation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New AI Agent
          </Button>
          <Button size="sm" className="bg-primary">
            <Play className="w-4 h-4 mr-2" />
            Simulate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="behavior" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="behavior"><TreeDeciduous className="w-4 h-4 mr-2" />Behavior Tree</TabsTrigger>
          <TabsTrigger value="navmesh"><Route className="w-4 h-4 mr-2" />NavMesh</TabsTrigger>
          <TabsTrigger value="perception"><Eye className="w-4 h-4 mr-2" />Perception</TabsTrigger>
          <TabsTrigger value="crowd"><Users className="w-4 h-4 mr-2" />Crowd</TabsTrigger>
          <TabsTrigger value="eqs"><Target className="w-4 h-4 mr-2" />EQS</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="mt-6">
          <div className="grid grid-cols-[300px_1fr_280px] gap-4">
            {/* Node Palette */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Node Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { type: "selector", name: "Selector", desc: "Runs children until one succeeds" },
                  { type: "sequence", name: "Sequence", desc: "Runs children until one fails" },
                  { type: "task", name: "Task", desc: "Executes an action" },
                  { type: "condition", name: "Condition", desc: "Checks a condition" },
                  { type: "decorator", name: "Decorator", desc: "Modifies child behavior" },
                ].map((node) => (
                  <div
                    key={node.type}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${getNodeColor(node.type)}`}
                    draggable
                  >
                    <div className="font-medium text-sm">{node.name}</div>
                    <div className="text-xs text-muted-foreground">{node.desc}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Behavior Tree Canvas */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Behavior Tree Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4 p-4">
                    {nodes.map((node) => (
                      <div
                        key={node.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedNode === node.id ? "ring-2 ring-primary" : ""
                        } ${getNodeColor(node.type)}`}
                        onClick={() => setSelectedNode(node.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{node.name}</span>
                          <Badge variant="outline" className="text-xs">{node.type}</Badge>
                        </div>
                        {node.children && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Children: {node.children.join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* AI States */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiStates.map((state) => (
                  <div key={state.name} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <state.icon className={`w-5 h-5 ${state.color}`} />
                    <span className="text-sm">{state.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navmesh" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Route className="w-4 h-4 text-primary" />
                  Navigation Mesh Settings
                </CardTitle>
                <CardDescription>Configure pathfinding parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Agent Radius</Label>
                      <span className="text-muted-foreground">{agentRadius}m</span>
                    </div>
                    <Slider value={[agentRadius * 10]} onValueChange={([v]) => setAgentRadius(v / 10)} max={30} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Agent Height</Label>
                      <span className="text-muted-foreground">{agentHeight}m</span>
                    </div>
                    <Slider value={[agentHeight * 10]} onValueChange={([v]) => setAgentHeight(v / 10)} max={50} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Step Height</Label>
                      <span className="text-muted-foreground">{stepHeight}m</span>
                    </div>
                    <Slider value={[stepHeight * 10]} onValueChange={([v]) => setStepHeight(v / 10)} max={10} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Max Slope</Label>
                      <span className="text-muted-foreground">{maxSlope}°</span>
                    </div>
                    <Slider value={[maxSlope]} onValueChange={([v]) => setMaxSlope(v)} max={90} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Voxelization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Cell Size</Label>
                    <span className="text-muted-foreground">{cellSize}m</span>
                  </div>
                  <Slider value={[cellSize * 100]} onValueChange={([v]) => setCellSize(v / 100)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Cell Height</Label>
                    <span className="text-muted-foreground">{cellHeight}m</span>
                  </div>
                  <Slider value={[cellHeight * 100]} onValueChange={([v]) => setCellHeight(v / 100)} max={50} />
                </div>
                <Button className="w-full">Rebuild NavMesh</Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">NavMesh Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: "Walkable", cost: 1, color: "bg-green-500" },
                    { name: "Road", cost: 0.5, color: "bg-gray-500" },
                    { name: "Grass", cost: 1.5, color: "bg-lime-500" },
                    { name: "Water", cost: 10, color: "bg-blue-500" },
                    { name: "Obstacle", cost: -1, color: "bg-red-500" },
                    { name: "Jump", cost: 2, color: "bg-yellow-500" },
                    { name: "Crouch", cost: 3, color: "bg-orange-500" },
                    { name: "Custom", cost: 1, color: "bg-purple-500" },
                  ].map((area) => (
                    <div key={area.name} className="p-3 rounded-lg bg-background/50 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${area.color}`} />
                        <span className="font-medium text-sm">{area.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Cost: {area.cost < 0 ? "Blocked" : area.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="perception" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Sight Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Sight Radius</Label>
                    <span className="text-muted-foreground">{sightRadius}m</span>
                  </div>
                  <Slider value={[sightRadius]} onValueChange={([v]) => setSightRadius(v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Peripheral Vision Angle</Label>
                    <span className="text-muted-foreground">{sightAngle}°</span>
                  </div>
                  <Slider value={[sightAngle]} onValueChange={([v]) => setSightAngle(v)} max={180} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Succeed On Friendly</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Detect Neutrals</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Hearing Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Hearing Radius</Label>
                    <span className="text-muted-foreground">{hearingRadius}m</span>
                  </div>
                  <Slider value={[hearingRadius]} onValueChange={([v]) => setHearingRadius(v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Lose Target Time</Label>
                    <span className="text-muted-foreground">{loseTargetTime}s</span>
                  </div>
                  <Slider value={[loseTargetTime]} onValueChange={([v]) => setLoseTargetTime(v)} max={30} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Hear Through Walls</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Senses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {["Sight", "Hearing", "Touch", "Damage", "Team"].map((sense) => (
                    <div key={sense} className="p-4 rounded-lg bg-background/50 text-center">
                      <div className="font-medium mb-2">{sense}</div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crowd" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Crowd Simulation
              </CardTitle>
              <CardDescription>Configure group behavior and avoidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Avoidance Quality</Label>
                <Select value={avoidanceQuality} onValueChange={setAvoidanceQuality}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="low">Low (4 samples)</SelectItem>
                    <SelectItem value="medium">Medium (8 samples)</SelectItem>
                    <SelectItem value="high">High (16 samples)</SelectItem>
                    <SelectItem value="ultra">Ultra (32 samples)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Separation Weight</Label>
                    <span className="text-muted-foreground">{separationWeight}%</span>
                  </div>
                  <Slider value={[separationWeight]} onValueChange={([v]) => setSeparationWeight(v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Cohesion Weight</Label>
                    <span className="text-muted-foreground">{cohesionWeight}%</span>
                  </div>
                  <Slider value={[cohesionWeight]} onValueChange={([v]) => setCohesionWeight(v)} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>Alignment Weight</Label>
                    <span className="text-muted-foreground">{alignmentWeight}%</span>
                  </div>
                  <Slider value={[alignmentWeight]} onValueChange={([v]) => setAlignmentWeight(v)} max={100} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>Obstacle Avoidance</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Priority-Based Avoidance</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eqs" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Environment Query System (EQS)
              </CardTitle>
              <CardDescription>Define how AI evaluates positions in the world</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border-2 border-dashed border-border rounded-lg p-6 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Target className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">EQS Query Editor</p>
                  <p className="text-xs text-muted-foreground">
                    Create queries to find optimal positions based on distance, visibility, cover, and more
                  </p>
                  <Button className="mt-4">Create New Query</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Atom, 
  Boxes, 
  Zap, 
  Wind,
  Waves,
  Flame,
  Play,
  Settings
} from "lucide-react";

export const PhysicsEngine = () => {
  const [gravity, setGravity] = useState(9.81);
  const [timeScale, setTimeScale] = useState(1.0);
  const [collisionEnabled, setCollisionEnabled] = useState(true);
  const [softBodyEnabled, setSoftBodyEnabled] = useState(true);
  const [destructionEnabled, setDestructionEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Atom className="w-6 h-6 text-primary animate-pulse-glow" />
            Advanced Physics Engine
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time physics simulation for AAA game experiences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button size="sm" className="bg-primary">
            <Play className="w-4 h-4 mr-2" />
            Test Physics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="general">
            <Atom className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="rigidbody">
            <Boxes className="w-4 h-4 mr-2" />
            Rigid Body
          </TabsTrigger>
          <TabsTrigger value="softbody">
            <Wind className="w-4 h-4 mr-2" />
            Soft Body
          </TabsTrigger>
          <TabsTrigger value="fluids">
            <Waves className="w-4 h-4 mr-2" />
            Fluids
          </TabsTrigger>
          <TabsTrigger value="destruction">
            <Flame className="w-4 h-4 mr-2" />
            Destruction
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>World Physics Settings</CardTitle>
              <CardDescription>Configure global physics parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Gravity (m/s²)</Label>
                  <Input
                    type="number"
                    value={gravity}
                    onChange={(e) => setGravity(parseFloat(e.target.value))}
                    className="w-24 text-right"
                  />
                </div>
                <Slider
                  value={[gravity]}
                  onValueChange={([v]) => setGravity(v)}
                  min={0}
                  max={20}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Time Scale</Label>
                  <Badge variant="outline">{timeScale}x</Badge>
                </div>
                <Slider
                  value={[timeScale]}
                  onValueChange={([v]) => setTimeScale(v)}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Collision Detection</Label>
                  <p className="text-xs text-muted-foreground">
                    High-precision collision system
                  </p>
                </div>
                <Switch checked={collisionEnabled} onCheckedChange={setCollisionEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
              <CardDescription>Balance quality and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-background/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">60</div>
                    <p className="text-xs text-muted-foreground">Physics FPS</p>
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1024</div>
                    <p className="text-xs text-muted-foreground">Max Objects</p>
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">8</div>
                    <p className="text-xs text-muted-foreground">Substeps</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rigidbody" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Rigid Body Dynamics</CardTitle>
              <CardDescription>
                Configure mass, friction, and collision properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mass (kg)</Label>
                  <Input type="number" defaultValue="1.0" />
                </div>
                <div className="space-y-2">
                  <Label>Drag</Label>
                  <Input type="number" defaultValue="0.05" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>Friction</Label>
                  <Slider defaultValue={[0.5]} max={1} step={0.01} />
                </div>
                <div className="space-y-2">
                  <Label>Bounciness</Label>
                  <Slider defaultValue={[0.3]} max={1} step={0.01} />
                </div>
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Continuous Collision Detection</p>
                      <p className="text-xs text-muted-foreground">
                        Prevents fast-moving objects from passing through walls. Essential for realistic physics in action games.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="softbody" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-primary" />
                Soft Body Physics
              </CardTitle>
              <CardDescription>
                Deformable objects and cloth simulation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Soft Body Simulation</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable deformable materials
                  </p>
                </div>
                <Switch checked={softBodyEnabled} onCheckedChange={setSoftBodyEnabled} />
              </div>

              {softBodyEnabled && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Stiffness</Label>
                      <Slider defaultValue={[70]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <Label>Damping</Label>
                      <Slider defaultValue={[20]} max={100} step={1} />
                    </div>
                  </div>

                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">Cloth Simulation</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Iterations</span>
                          <Badge variant="outline">16</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Air Resistance</span>
                          <Badge variant="outline">0.15</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Self Collision</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fluids" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-primary" />
                Fluid Simulation
              </CardTitle>
              <CardDescription>
                Realistic water, smoke, and particle effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {["Water", "Smoke", "Fire"].map((type) => (
                  <Card key={type} className="group hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Waves className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">{type}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Simulate {type.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-background/50">
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-semibold">Particle System</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Particle Count</Label>
                      <Slider defaultValue={[10000]} min={100} max={100000} step={100} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Viscosity</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destruction" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Destructible Environments
              </CardTitle>
              <CardDescription>
                Real-time fracturing and destruction physics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Destruction System</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable real-time object fracturing
                  </p>
                </div>
                <Switch checked={destructionEnabled} onCheckedChange={setDestructionEnabled} />
              </div>

              {destructionEnabled && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fracture Threshold</Label>
                      <Slider defaultValue={[100]} min={10} max={1000} step={10} />
                    </div>
                    <div className="space-y-2">
                      <Label>Fragment Count</Label>
                      <Slider defaultValue={[50]} min={5} max={200} step={5} />
                    </div>
                  </div>

                  <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Flame className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">GTA VI-Level Destruction</p>
                          <p className="text-xs text-muted-foreground">
                            Advanced Voronoi fracturing with realistic debris physics. Supports wood, concrete, glass, and metal materials with accurate breaking patterns.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
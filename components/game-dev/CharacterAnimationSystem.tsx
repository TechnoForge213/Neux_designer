import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Play, 
  Pause, 
  SkipForward, 
  Upload, 
  Film,
  Zap,
  Layers,
  Sparkles
} from "lucide-react";

interface Animation {
  id: string;
  name: string;
  duration: number;
  type: "idle" | "walk" | "run" | "jump" | "custom";
  blendWeight: number;
}

const presetAnimations: Animation[] = [
  { id: "1", name: "Idle", duration: 2.5, type: "idle", blendWeight: 100 },
  { id: "2", name: "Walk", duration: 1.2, type: "walk", blendWeight: 0 },
  { id: "3", name: "Run", duration: 0.8, type: "run", blendWeight: 0 },
  { id: "4", name: "Jump", duration: 0.6, type: "jump", blendWeight: 0 },
];

export const CharacterAnimationSystem = () => {
  const [animations, setAnimations] = useState<Animation[]>(presetAnimations);
  const [selectedAnim, setSelectedAnim] = useState<string>("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [mocapEnabled, setMocapEnabled] = useState(false);
  const [ikEnabled, setIkEnabled] = useState(true);
  const [blendingEnabled, setBlendingEnabled] = useState(true);

  const handleBlendWeightChange = (id: string, weight: number) => {
    setAnimations(animations.map(anim => 
      anim.id === id ? { ...anim, blendWeight: weight } : anim
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Character Animation System
          </h2>
          <p className="text-sm text-muted-foreground">
            Movie-quality character animations with motion capture and advanced blending
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button size="sm" className="bg-primary">
            <Film className="w-4 h-4 mr-2" />
            Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="animator" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="animator">
            <Play className="w-4 h-4 mr-2" />
            Animator
          </TabsTrigger>
          <TabsTrigger value="mocap">
            <Film className="w-4 h-4 mr-2" />
            Motion Capture
          </TabsTrigger>
          <TabsTrigger value="ik">
            <Layers className="w-4 h-4 mr-2" />
            IK System
          </TabsTrigger>
          <TabsTrigger value="blending">
            <Zap className="w-4 h-4 mr-2" />
            Blend Trees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="animator" className="mt-6">
          <div className="grid grid-cols-[280px_1fr] gap-4">
            {/* Animation List */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Animations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2 p-4">
                    {animations.map((anim) => (
                      <div
                        key={anim.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedAnim === anim.id
                            ? "bg-primary/20 border border-primary"
                            : "bg-background hover:bg-muted"
                        }`}
                        onClick={() => setSelectedAnim(anim.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{anim.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {anim.duration}s
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Blend</span>
                            <span>{anim.blendWeight}%</span>
                          </div>
                          <Slider
                            value={[anim.blendWeight]}
                            onValueChange={([v]) => handleBlendWeightChange(anim.id, v)}
                            max={100}
                            step={1}
                            className="h-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Preview & Controls */}
            <div className="space-y-4">
              <Card className="bg-card/30 backdrop-blur-sm border-dashed h-[400px]">
                <CardContent className="h-full p-6 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-muted-foreground">3D Character Preview</p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant={isPlaying ? "secondary" : "default"}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Animation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Smooth Blending</Label>
                      <p className="text-xs text-muted-foreground">Cinematic transition quality</p>
                    </div>
                    <Switch checked={blendingEnabled} onCheckedChange={setBlendingEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inverse Kinematics</Label>
                      <p className="text-xs text-muted-foreground">Realistic limb movement</p>
                    </div>
                    <Switch checked={ikEnabled} onCheckedChange={setIkEnabled} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mocap" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="w-5 h-5 text-primary" />
                Motion Capture Integration
              </CardTitle>
              <CardDescription>
                Real-time motion capture for hyper-realistic character movement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Film className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Live Capture</h4>
                    <p className="text-xs text-muted-foreground">
                      Real-time motion tracking
                    </p>
                  </CardContent>
                </Card>
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Import BVH</h4>
                    <p className="text-xs text-muted-foreground">
                      Industry standard formats
                    </p>
                  </CardContent>
                </Card>
                <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">AI Retargeting</h4>
                    <p className="text-xs text-muted-foreground">
                      Auto-adapt to any rig
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Motion Capture Enabled</Label>
                  <p className="text-xs text-muted-foreground">
                    Activate real-time motion tracking
                  </p>
                </div>
                <Switch checked={mocapEnabled} onCheckedChange={setMocapEnabled} />
              </div>

              {mocapEnabled && (
                <Card className="bg-primary/10 border-primary/20 animate-fade-in">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Active Motion Capture</p>
                        <p className="text-xs text-muted-foreground">
                          All movements are being tracked and recorded in real-time with professional-grade accuracy.
                          Supports full body tracking, facial expressions, and finger movements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ik" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Inverse Kinematics System</CardTitle>
              <CardDescription>
                Procedural animation for realistic limb positioning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["Left Hand", "Right Hand", "Left Foot", "Right Foot"].map((limb) => (
                  <Card key={limb} className="bg-background/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">{limb} IK</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Target Weight</Label>
                          <Slider defaultValue={[100]} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Blend Speed</Label>
                          <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blending" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Animation Blend Trees</CardTitle>
              <CardDescription>
                Create smooth transitions between multiple animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border-2 border-dashed border-border rounded-lg p-6 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Layers className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Visual Blend Tree Editor</p>
                  <p className="text-xs text-muted-foreground">
                    Drag animations to create complex blending systems
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
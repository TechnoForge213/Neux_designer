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
  Sparkles, Flame, Droplets, Wind, Cloud,
  Zap, Star, Play, Pause, Plus, RotateCcw
} from "lucide-react";

interface ParticleEmitter {
  id: string;
  name: string;
  type: string;
  maxParticles: number;
  active: boolean;
}

const presetEmitters: ParticleEmitter[] = [
  { id: "1", name: "Fire", type: "flame", maxParticles: 500, active: true },
  { id: "2", name: "Smoke", type: "cloud", maxParticles: 200, active: true },
  { id: "3", name: "Sparks", type: "spark", maxParticles: 100, active: false },
  { id: "4", name: "Rain", type: "drop", maxParticles: 1000, active: false },
];

export const ParticleSystem = () => {
  const [emitters, setEmitters] = useState<ParticleEmitter[]>(presetEmitters);
  const [selectedEmitter, setSelectedEmitter] = useState("1");
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Emission settings
  const [emissionRate, setEmissionRate] = useState(50);
  const [burstCount, setBurstCount] = useState(10);
  const [duration, setDuration] = useState(5);
  const [looping, setLooping] = useState(true);
  
  // Particle settings
  const [startLifetime, setStartLifetime] = useState(2);
  const [startSpeed, setStartSpeed] = useState(5);
  const [startSize, setStartSize] = useState(1);
  const [startRotation, setStartRotation] = useState(0);
  const [gravityModifier, setGravityModifier] = useState(0);
  const [simulationSpace, setSimulationSpace] = useState("world");
  
  // Shape settings
  const [shapeType, setShapeType] = useState("cone");
  const [shapeAngle, setShapeAngle] = useState(25);
  const [shapeRadius, setShapeRadius] = useState(1);
  
  // Color & Size over lifetime
  const [colorOverLifetime, setColorOverLifetime] = useState(true);
  const [sizeOverLifetime, setSizeOverLifetime] = useState(true);
  
  // Velocity settings
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(5);
  const [velocityZ, setVelocityZ] = useState(0);
  
  // Noise settings
  const [noiseEnabled, setNoiseEnabled] = useState(true);
  const [noiseStrength, setNoiseStrength] = useState(1);
  const [noiseFrequency, setNoiseFrequency] = useState(0.5);
  
  // Collision settings
  const [collisionEnabled, setCollisionEnabled] = useState(false);
  const [bounce, setBounce] = useState(0.5);
  const [lifetimeLoss, setLifetimeLoss] = useState(0);

  const getEmitterIcon = (type: string) => {
    switch (type) {
      case "flame": return Flame;
      case "cloud": return Cloud;
      case "spark": return Zap;
      case "drop": return Droplets;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Particle System (Niagara/VFX Graph)
          </h2>
          <p className="text-sm text-muted-foreground">
            GPU-accelerated particles with advanced simulation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isPlaying ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          <Button size="sm" className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            New System
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[250px_1fr_300px] gap-4">
        {/* Emitter List */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Emitters</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-2">
                {emitters.map((emitter) => {
                  const Icon = getEmitterIcon(emitter.type);
                  return (
                    <div
                      key={emitter.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedEmitter === emitter.id
                          ? "bg-primary/20 border border-primary"
                          : "bg-background/50 hover:bg-muted"
                      }`}
                      onClick={() => setSelectedEmitter(emitter.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">{emitter.name}</span>
                        </div>
                        <Switch
                          checked={emitter.active}
                          onCheckedChange={(checked) => {
                            setEmitters(emitters.map(e => 
                              e.id === emitter.id ? { ...e, active: checked } : e
                            ));
                          }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max: {emitter.maxParticles} particles
                      </div>
                    </div>
                  );
                })}
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Emitter
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Particle Preview */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="h-[630px] bg-gradient-to-b from-background to-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulated particle effect visualization */}
                <div className="relative">
                  <Flame className="w-32 h-32 text-orange-500 animate-pulse" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    {[...Array(20)].map((_, i) => (
                      <Star
                        key={i}
                        className="absolute text-yellow-500/50 animate-ping"
                        style={{
                          width: 8 + Math.random() * 8,
                          height: 8 + Math.random() * 8,
                          left: Math.random() * 100 - 50,
                          top: Math.random() * -100,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random()}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Active Particles: 342</span>
                  <span>Draw Calls: 1</span>
                  <span>GPU Time: 0.12ms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="emission" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 h-auto">
              <TabsTrigger value="emission" className="text-xs py-1">Emit</TabsTrigger>
              <TabsTrigger value="shape" className="text-xs py-1">Shape</TabsTrigger>
              <TabsTrigger value="velocity" className="text-xs py-1">Velocity</TabsTrigger>
              <TabsTrigger value="modules" className="text-xs py-1">Modules</TabsTrigger>
            </TabsList>

            <TabsContent value="emission" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Emission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Rate Over Time</Label>
                      <span className="text-muted-foreground">{emissionRate}/s</span>
                    </div>
                    <Slider value={[emissionRate]} onValueChange={([v]) => setEmissionRate(v)} max={500} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Burst Count</Label>
                      <span className="text-muted-foreground">{burstCount}</span>
                    </div>
                    <Slider value={[burstCount]} onValueChange={([v]) => setBurstCount(v)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Duration</Label>
                      <span className="text-muted-foreground">{duration}s</span>
                    </div>
                    <Slider value={[duration]} onValueChange={([v]) => setDuration(v)} max={30} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Looping</Label>
                    <Switch checked={looping} onCheckedChange={setLooping} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Particle Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Start Lifetime</Label>
                      <span className="text-muted-foreground">{startLifetime}s</span>
                    </div>
                    <Slider value={[startLifetime * 10]} onValueChange={([v]) => setStartLifetime(v / 10)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Start Speed</Label>
                      <span className="text-muted-foreground">{startSpeed}</span>
                    </div>
                    <Slider value={[startSpeed]} onValueChange={([v]) => setStartSpeed(v)} max={50} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Start Size</Label>
                      <span className="text-muted-foreground">{startSize}</span>
                    </div>
                    <Slider value={[startSize * 10]} onValueChange={([v]) => setStartSize(v / 10)} max={50} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Gravity Modifier</Label>
                      <span className="text-muted-foreground">{gravityModifier}</span>
                    </div>
                    <Slider value={[gravityModifier + 50]} onValueChange={([v]) => setGravityModifier(v - 50)} max={100} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shape" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Emitter Shape</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Shape</Label>
                    <Select value={shapeType} onValueChange={setShapeType}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sphere">Sphere</SelectItem>
                        <SelectItem value="hemisphere">Hemisphere</SelectItem>
                        <SelectItem value="cone">Cone</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                        <SelectItem value="mesh">Mesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Angle</Label>
                      <span className="text-muted-foreground">{shapeAngle}°</span>
                    </div>
                    <Slider value={[shapeAngle]} onValueChange={([v]) => setShapeAngle(v)} max={90} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Radius</Label>
                      <span className="text-muted-foreground">{shapeRadius}</span>
                    </div>
                    <Slider value={[shapeRadius * 10]} onValueChange={([v]) => setShapeRadius(v / 10)} max={100} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="velocity" className="mt-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Velocity Over Lifetime</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>X</Label>
                      <span className="text-muted-foreground">{velocityX}</span>
                    </div>
                    <Slider value={[velocityX + 50]} onValueChange={([v]) => setVelocityX(v - 50)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Y</Label>
                      <span className="text-muted-foreground">{velocityY}</span>
                    </div>
                    <Slider value={[velocityY + 50]} onValueChange={([v]) => setVelocityY(v - 50)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label>Z</Label>
                      <span className="text-muted-foreground">{velocityZ}</span>
                    </div>
                    <Slider value={[velocityZ + 50]} onValueChange={([v]) => setVelocityZ(v - 50)} max={100} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Space</Label>
                    <Select value={simulationSpace} onValueChange={setSimulationSpace}>
                      <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="world">World</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules" className="mt-4 space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Modules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: "Color over Lifetime", enabled: colorOverLifetime, set: setColorOverLifetime },
                    { name: "Size over Lifetime", enabled: sizeOverLifetime, set: setSizeOverLifetime },
                    { name: "Noise", enabled: noiseEnabled, set: setNoiseEnabled },
                    { name: "Collision", enabled: collisionEnabled, set: setCollisionEnabled },
                  ].map((mod) => (
                    <div key={mod.name} className="flex items-center justify-between p-2 rounded bg-background/50">
                      <span className="text-xs">{mod.name}</span>
                      <Switch checked={mod.enabled} onCheckedChange={mod.set} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {noiseEnabled && (
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Wind className="w-4 h-4 text-primary" />
                      Noise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <Label>Strength</Label>
                        <span className="text-muted-foreground">{noiseStrength}</span>
                      </div>
                      <Slider value={[noiseStrength * 10]} onValueChange={([v]) => setNoiseStrength(v / 10)} max={50} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <Label>Frequency</Label>
                        <span className="text-muted-foreground">{noiseFrequency}</span>
                      </div>
                      <Slider value={[noiseFrequency * 100]} onValueChange={([v]) => setNoiseFrequency(v / 100)} max={100} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {collisionEnabled && (
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Collision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <Label>Bounce</Label>
                        <span className="text-muted-foreground">{bounce}</span>
                      </div>
                      <Slider value={[bounce * 100]} onValueChange={([v]) => setBounce(v / 100)} max={100} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <Label>Lifetime Loss</Label>
                        <span className="text-muted-foreground">{lifetimeLoss}</span>
                      </div>
                      <Slider value={[lifetimeLoss * 100]} onValueChange={([v]) => setLifetimeLoss(v / 100)} max={100} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

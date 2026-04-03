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
  Volume2, Music, Radio, Waves, Settings, 
  Play, Pause, Plus, Upload, Mic, Headphones
} from "lucide-react";

interface AudioClip {
  id: string;
  name: string;
  type: "sfx" | "music" | "ambient" | "voice";
  duration: number;
  volume: number;
  is3D: boolean;
}

interface ReverbZone {
  id: string;
  name: string;
  preset: string;
  dryLevel: number;
  wetLevel: number;
}

const sampleClips: AudioClip[] = [
  { id: "1", name: "Footstep_Concrete", type: "sfx", duration: 0.3, volume: 80, is3D: true },
  { id: "2", name: "Gunshot_Rifle", type: "sfx", duration: 0.5, volume: 100, is3D: true },
  { id: "3", name: "Ambient_Forest", type: "ambient", duration: 120, volume: 60, is3D: false },
  { id: "4", name: "Music_Combat", type: "music", duration: 180, volume: 70, is3D: false },
  { id: "5", name: "Voice_NPC_Greeting", type: "voice", duration: 2.5, volume: 90, is3D: true },
];

const reverbPresets = [
  "Off", "Generic", "Padded Cell", "Room", "Bathroom", "Living Room", 
  "Stone Room", "Auditorium", "Concert Hall", "Cave", "Arena", 
  "Hangar", "Carpeted Hallway", "Hallway", "Stone Corridor", 
  "Alley", "Forest", "City", "Mountains", "Quarry", "Plain", 
  "Parking Lot", "Sewer Pipe", "Underwater"
];

export const AudioSystem = () => {
  const [clips] = useState<AudioClip[]>(sampleClips);
  const [selectedClip, setSelectedClip] = useState<string>("1");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [masterVolume, setMasterVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(80);
  const [sfxVolume, setSfxVolume] = useState(100);
  const [voiceVolume, setVoiceVolume] = useState(100);
  const [ambientVolume, setAmbientVolume] = useState(70);
  
  const [spatialBlend, setSpatialBlend] = useState(100);
  const [dopplerLevel, setDopplerLevel] = useState(50);
  const [spreadAngle, setSpreadAngle] = useState(0);
  const [minDistance, setMinDistance] = useState(1);
  const [maxDistance, setMaxDistance] = useState(500);
  const [rolloffMode, setRolloffMode] = useState("logarithmic");
  
  const [hrtfEnabled, setHrtfEnabled] = useState(true);
  const [occlusionEnabled, setOcclusionEnabled] = useState(true);
  const [realtimeReverb, setRealtimeReverb] = useState(true);
  
  const [reverbZones] = useState<ReverbZone[]>([
    { id: "1", name: "Indoor_Main", preset: "Room", dryLevel: 0, wetLevel: -6 },
    { id: "2", name: "Cave_System", preset: "Cave", dryLevel: -3, wetLevel: 0 },
    { id: "3", name: "Outdoor_Forest", preset: "Forest", dryLevel: 0, wetLevel: -12 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-primary" />
            3D Audio System
          </h2>
          <p className="text-sm text-muted-foreground">
            Spatial audio, HRTF, reverb zones, and dynamic mixing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Audio
          </Button>
          <Button size="sm" className="bg-primary">
            <Mic className="w-4 h-4 mr-2" />
            Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mixer" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="mixer"><Settings className="w-4 h-4 mr-2" />Mixer</TabsTrigger>
          <TabsTrigger value="clips"><Music className="w-4 h-4 mr-2" />Clips</TabsTrigger>
          <TabsTrigger value="spatial"><Headphones className="w-4 h-4 mr-2" />Spatial</TabsTrigger>
          <TabsTrigger value="reverb"><Waves className="w-4 h-4 mr-2" />Reverb</TabsTrigger>
          <TabsTrigger value="advanced"><Radio className="w-4 h-4 mr-2" />Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="mixer" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Audio Mixer</CardTitle>
              <CardDescription>Master volume and channel controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-6">
                {[
                  { name: "Master", value: masterVolume, set: setMasterVolume, color: "bg-primary" },
                  { name: "Music", value: musicVolume, set: setMusicVolume, color: "bg-purple-500" },
                  { name: "SFX", value: sfxVolume, set: setSfxVolume, color: "bg-green-500" },
                  { name: "Voice", value: voiceVolume, set: setVoiceVolume, color: "bg-yellow-500" },
                  { name: "Ambient", value: ambientVolume, set: setAmbientVolume, color: "bg-blue-500" },
                ].map((channel) => (
                  <div key={channel.name} className="flex flex-col items-center space-y-4">
                    <div className="h-48 relative flex items-end">
                      <div className="w-8 bg-muted rounded-t-lg relative overflow-hidden h-full">
                        <div 
                          className={`absolute bottom-0 w-full ${channel.color} transition-all rounded-t-lg`}
                          style={{ height: `${channel.value}%` }}
                        />
                      </div>
                    </div>
                    <Slider
                      orientation="horizontal"
                      value={[channel.value]}
                      onValueChange={([v]) => channel.set(v)}
                      max={100}
                      className="w-20"
                    />
                    <span className="text-sm font-medium">{channel.name}</span>
                    <span className="text-xs text-muted-foreground">{channel.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clips" className="mt-6">
          <div className="grid grid-cols-[300px_1fr] gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Audio Clips</CardTitle>
                  <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-1 p-2">
                    {clips.map((clip) => (
                      <div
                        key={clip.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedClip === clip.id
                            ? "bg-primary/20 border border-primary"
                            : "bg-background hover:bg-muted"
                        }`}
                        onClick={() => setSelectedClip(clip.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">{clip.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {clip.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{clip.duration}s</span>
                          <span>{clip.is3D ? "3D" : "2D"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Clip Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <div className="flex-1 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <Waves className="w-full h-12 text-primary opacity-50" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <Slider defaultValue={[80]} max={100} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pitch</Label>
                    <Slider defaultValue={[50]} max={100} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pan</Label>
                    <Slider defaultValue={[50]} max={100} />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Slider defaultValue={[128]} max={256} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Loop</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Play On Awake</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Bypass Effects</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Ignore Listener Pause</Label>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spatial" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4 text-primary" />
                3D Spatial Audio Settings
              </CardTitle>
              <CardDescription>Configure realistic positional audio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="space-y-0.5">
                    <Label>HRTF (Binaural)</Label>
                    <p className="text-xs text-muted-foreground">Head-related transfer function</p>
                  </div>
                  <Switch checked={hrtfEnabled} onCheckedChange={setHrtfEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="space-y-0.5">
                    <Label>Occlusion</Label>
                    <p className="text-xs text-muted-foreground">Sound blocked by geometry</p>
                  </div>
                  <Switch checked={occlusionEnabled} onCheckedChange={setOcclusionEnabled} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="space-y-0.5">
                    <Label>Realtime Reverb</Label>
                    <p className="text-xs text-muted-foreground">Dynamic reverb calculation</p>
                  </div>
                  <Switch checked={realtimeReverb} onCheckedChange={setRealtimeReverb} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Spatial Blend (2D → 3D)</Label>
                      <span className="text-muted-foreground">{spatialBlend}%</span>
                    </div>
                    <Slider value={[spatialBlend]} onValueChange={([v]) => setSpatialBlend(v)} max={100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Doppler Level</Label>
                      <span className="text-muted-foreground">{dopplerLevel}%</span>
                    </div>
                    <Slider value={[dopplerLevel]} onValueChange={([v]) => setDopplerLevel(v)} max={100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Spread Angle</Label>
                      <span className="text-muted-foreground">{spreadAngle}°</span>
                    </div>
                    <Slider value={[spreadAngle]} onValueChange={([v]) => setSpreadAngle(v)} max={360} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rolloff Mode</Label>
                    <Select value={rolloffMode} onValueChange={setRolloffMode}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logarithmic">Logarithmic</SelectItem>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="custom">Custom Curve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Min Distance</Label>
                      <span className="text-muted-foreground">{minDistance}m</span>
                    </div>
                    <Slider value={[minDistance]} onValueChange={([v]) => setMinDistance(v)} min={0.1} max={100} step={0.1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Max Distance</Label>
                      <span className="text-muted-foreground">{maxDistance}m</span>
                    </div>
                    <Slider value={[maxDistance]} onValueChange={([v]) => setMaxDistance(v)} max={10000} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reverb" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Reverb Zones</CardTitle>
              <CardDescription>Define acoustic spaces in your game world</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {reverbZones.map((zone) => (
                  <Card key={zone.id} className="bg-background/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{zone.name}</span>
                        <Badge variant="outline">{zone.preset}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Preset</Label>
                        <Select defaultValue={zone.preset}>
                          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {reverbPresets.map((preset) => (
                              <SelectItem key={preset} value={preset}>{preset}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Dry Level</Label>
                          <Slider defaultValue={[50]} max={100} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Wet Level</Label>
                          <Slider defaultValue={[50]} max={100} className="h-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-background/50 border-dashed cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="h-full p-4 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm">Add Reverb Zone</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Audio Effects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Low Pass Filter", "High Pass Filter", "Distortion", "Echo", "Chorus", "Flange", "Compressor", "Limiter"].map((effect) => (
                  <div key={effect} className="flex items-center justify-between p-2 rounded bg-background/50">
                    <span className="text-sm">{effect}</span>
                    <Switch />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">DSP Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Speaker Mode</Label>
                  <Select defaultValue="surround71">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mono">Mono</SelectItem>
                      <SelectItem value="stereo">Stereo</SelectItem>
                      <SelectItem value="quad">Quad</SelectItem>
                      <SelectItem value="surround51">5.1 Surround</SelectItem>
                      <SelectItem value="surround71">7.1 Surround</SelectItem>
                      <SelectItem value="dolbyatmos">Dolby Atmos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sample Rate</Label>
                  <Select defaultValue="48000">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22050">22050 Hz</SelectItem>
                      <SelectItem value="44100">44100 Hz</SelectItem>
                      <SelectItem value="48000">48000 Hz</SelectItem>
                      <SelectItem value="96000">96000 Hz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>DSP Buffer Size</Label>
                  <Select defaultValue="512">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="256">256 (Low Latency)</SelectItem>
                      <SelectItem value="512">512 (Default)</SelectItem>
                      <SelectItem value="1024">1024 (Best Performance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

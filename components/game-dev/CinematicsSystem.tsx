import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Video, Camera, Film, Play, Pause, SkipBack, SkipForward,
  ChevronLeft, ChevronRight, Plus, Scissors, Copy, Lock, Unlock
} from "lucide-react";

interface Track {
  id: string;
  name: string;
  type: "camera" | "actor" | "audio" | "event" | "fade";
  locked: boolean;
  keyframes: number[];
}

const sampleTracks: Track[] = [
  { id: "1", name: "Camera_Main", type: "camera", locked: false, keyframes: [0, 30, 60, 120, 180] },
  { id: "2", name: "Actor_Hero", type: "actor", locked: false, keyframes: [0, 45, 90, 135] },
  { id: "3", name: "Actor_Villain", type: "actor", locked: false, keyframes: [30, 60, 90, 150] },
  { id: "4", name: "Dialog_Track", type: "audio", locked: true, keyframes: [0, 60, 120] },
  { id: "5", name: "Music_Track", type: "audio", locked: true, keyframes: [0] },
  { id: "6", name: "Fade_Track", type: "fade", locked: false, keyframes: [0, 180] },
  { id: "7", name: "Event_Explosion", type: "event", locked: false, keyframes: [90] },
];

export const CinematicsSystem = () => {
  const [tracks, setTracks] = useState<Track[]>(sampleTracks);
  const [selectedTrack, setSelectedTrack] = useState<string | null>("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames] = useState(300);
  const [zoom, setZoom] = useState(100);
  
  // Camera settings
  const [fov, setFov] = useState(60);
  const [focusDistance, setFocusDistance] = useState(500);
  const [aperture, setAperture] = useState(2.8);
  const [cameraShake, setCameraShake] = useState(0);
  
  // Playback settings
  const [frameRate, setFrameRate] = useState("24");
  const [looping, setLooping] = useState(false);

  const toggleLock = (id: string) => {
    setTracks(tracks.map(t => 
      t.id === id ? { ...t, locked: !t.locked } : t
    ));
  };

  const getTrackColor = (type: string) => {
    switch (type) {
      case "camera": return "bg-blue-500";
      case "actor": return "bg-green-500";
      case "audio": return "bg-purple-500";
      case "event": return "bg-orange-500";
      case "fade": return "bg-gray-500";
      default: return "bg-primary";
    }
  };

  const formatTime = (frame: number) => {
    const seconds = Math.floor(frame / parseInt(frameRate));
    const frames = frame % parseInt(frameRate);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            Cinematics / Sequencer
          </h2>
          <p className="text-sm text-muted-foreground">
            Timeline editor for cutscenes, camera movements, and animations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Scissors className="w-4 h-4 mr-2" />
            Split
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button size="sm" className="bg-primary">
            <Video className="w-4 h-4 mr-2" />
            Render
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* Main Timeline Area */}
        <div className="space-y-4">
          {/* Viewport Preview */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="h-[300px] bg-gradient-to-br from-muted to-background rounded-lg flex items-center justify-center relative">
                <div className="absolute top-4 left-4">
                  <Badge variant="outline">Cinematic View</Badge>
                </div>
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto text-primary/20" />
                  <p className="text-muted-foreground mt-2">Camera Preview</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Frame: {currentFrame}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(currentFrame)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Controls */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setCurrentFrame(0)}>
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  className={isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-primary"}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentFrame(Math.min(totalFrames, currentFrame + 1))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentFrame(totalFrames)}>
                  <SkipForward className="w-4 h-4" />
                </Button>
                <div className="ml-4 flex items-center gap-2">
                  <Label className="text-xs">Loop</Label>
                  <Switch checked={looping} onCheckedChange={setLooping} />
                </div>
                <div className="ml-4">
                  <Select value={frameRate} onValueChange={setFrameRate}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 fps</SelectItem>
                      <SelectItem value="30">30 fps</SelectItem>
                      <SelectItem value="60">60 fps</SelectItem>
                      <SelectItem value="120">120 fps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Timeline</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Track
                  </Button>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Zoom</Label>
                    <Slider
                      value={[zoom]}
                      onValueChange={([v]) => setZoom(v)}
                      min={25}
                      max={400}
                      className="w-24"
                    />
                    <span className="text-xs w-12">{zoom}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Timeline Ruler */}
              <div className="h-6 border-b border-border bg-muted/50 relative">
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                  style={{ left: `${(currentFrame / totalFrames) * 100}%` }}
                />
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full flex flex-col justify-end text-xs text-muted-foreground"
                    style={{ left: `${i * 10}%` }}
                  >
                    <span className="px-1">{Math.floor((i / 10) * totalFrames)}</span>
                    <div className="h-2 w-px bg-border" />
                  </div>
                ))}
              </div>

              {/* Tracks */}
              <ScrollArea className="h-[300px]">
                <div className="space-y-1 p-2">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className={`flex items-stretch rounded-lg overflow-hidden ${
                        selectedTrack === track.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedTrack(track.id)}
                    >
                      {/* Track Header */}
                      <div className="w-40 p-2 bg-muted/50 flex items-center gap-2 shrink-0">
                        <div className={`w-2 h-2 rounded-full ${getTrackColor(track.type)}`} />
                        <span className="text-xs font-medium truncate flex-1">{track.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => { e.stopPropagation(); toggleLock(track.id); }}
                        >
                          {track.locked ? 
                            <Lock className="h-3 w-3 text-yellow-500" /> : 
                            <Unlock className="h-3 w-3 text-muted-foreground" />
                          }
                        </Button>
                      </div>

                      {/* Track Content */}
                      <div className="flex-1 bg-muted/20 relative h-8">
                        {/* Keyframes */}
                        {track.keyframes.map((frame, i) => (
                          <div
                            key={i}
                            className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${getTrackColor(track.type)} cursor-pointer hover:scale-150 transition-transform`}
                            style={{ left: `${(frame / totalFrames) * 100}%` }}
                          />
                        ))}
                        {/* Playhead */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                          style={{ left: `${(currentFrame / totalFrames) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Frame Scrubber */}
              <div className="p-2 border-t border-border">
                <Slider
                  value={[currentFrame]}
                  onValueChange={([v]) => setCurrentFrame(v)}
                  max={totalFrames}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Panel */}
        <div className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" />
                Camera Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Field of View</Label>
                  <span className="text-muted-foreground">{fov}°</span>
                </div>
                <Slider value={[fov]} onValueChange={([v]) => setFov(v)} min={10} max={120} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Focus Distance</Label>
                  <span className="text-muted-foreground">{focusDistance}cm</span>
                </div>
                <Slider value={[focusDistance]} onValueChange={([v]) => setFocusDistance(v)} max={5000} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Aperture (f-stop)</Label>
                  <span className="text-muted-foreground">f/{aperture}</span>
                </div>
                <Slider value={[aperture * 10]} onValueChange={([v]) => setAperture(v / 10)} min={10} max={220} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Camera Shake</Label>
                  <span className="text-muted-foreground">{cameraShake}%</span>
                </div>
                <Slider value={[cameraShake]} onValueChange={([v]) => setCameraShake(v)} max={100} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Camera Presets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Wide Shot", fov: 90 },
                { name: "Medium Shot", fov: 60 },
                { name: "Close Up", fov: 35 },
                { name: "Extreme Close Up", fov: 20 },
                { name: "Bird's Eye", fov: 75 },
                { name: "Dutch Angle", fov: 50 },
              ].map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFov(preset.fov)}
                >
                  {preset.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Render Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Resolution</Label>
                <Select defaultValue="4k">
                  <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1080p">1920x1080 (HD)</SelectItem>
                    <SelectItem value="2k">2560x1440 (2K)</SelectItem>
                    <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                    <SelectItem value="8k">7680x4320 (8K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Output Format</Label>
                <Select defaultValue="mp4">
                  <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                    <SelectItem value="mov">MOV (ProRes)</SelectItem>
                    <SelectItem value="avi">AVI</SelectItem>
                    <SelectItem value="exr">EXR Sequence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Render Sequence
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

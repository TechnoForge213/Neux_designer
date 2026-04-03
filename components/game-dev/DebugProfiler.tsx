import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, Cpu, HardDrive, Wifi, Bug, 
  Play, Pause, Trash2, Download, Eye
} from "lucide-react";

interface ProfilerSample {
  name: string;
  selfMs: number;
  totalMs: number;
  calls: number;
  gcAlloc: string;
}

const sampleProfilerData: ProfilerSample[] = [
  { name: "PlayerUpdate()", selfMs: 2.1, totalMs: 3.4, calls: 1, gcAlloc: "0 B" },
  { name: "Rendering", selfMs: 8.2, totalMs: 8.2, calls: 1, gcAlloc: "0 B" },
  { name: "Physics.Simulate()", selfMs: 1.8, totalMs: 1.8, calls: 1, gcAlloc: "0 B" },
  { name: "Animation.Update()", selfMs: 0.9, totalMs: 1.2, calls: 45, gcAlloc: "1.2 KB" },
  { name: "AI.BehaviorTree()", selfMs: 0.6, totalMs: 0.6, calls: 12, gcAlloc: "0 B" },
  { name: "UI.Layout()", selfMs: 0.4, totalMs: 0.4, calls: 1, gcAlloc: "256 B" },
  { name: "Audio.Update()", selfMs: 0.3, totalMs: 0.3, calls: 1, gcAlloc: "0 B" },
  { name: "Scripts.Update()", selfMs: 1.5, totalMs: 2.8, calls: 156, gcAlloc: "4.5 KB" },
];

interface DebugMessage {
  id: string;
  type: "log" | "warning" | "error";
  message: string;
  timestamp: string;
  stackTrace?: string;
}

const sampleLogs: DebugMessage[] = [
  { id: "1", type: "log", message: "Game initialized successfully", timestamp: "00:00:01" },
  { id: "2", type: "log", message: "Player spawned at position (0, 0, 0)", timestamp: "00:00:02" },
  { id: "3", type: "warning", message: "Material 'Stone_Wall' is using deprecated shader", timestamp: "00:00:05" },
  { id: "4", type: "log", message: "AI agents activated: 12", timestamp: "00:00:08" },
  { id: "5", type: "error", message: "NullReferenceException in EnemyController.cs:142", timestamp: "00:00:15", stackTrace: "at EnemyController.Update()" },
  { id: "6", type: "warning", message: "Audio clip 'explosion' is not loaded", timestamp: "00:00:18" },
  { id: "7", type: "log", message: "Checkpoint saved", timestamp: "00:01:30" },
];

export const DebugProfiler = () => {
  const [profilerData] = useState<ProfilerSample[]>(sampleProfilerData);
  const [logs] = useState<DebugMessage[]>(sampleLogs);
  const [isProfiling, setIsProfiling] = useState(true);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  
  // Stats
  const [fps] = useState(60);
  const [frameTime] = useState(16.67);
  const [cpuTime] = useState(12.4);
  const [gpuTime] = useState(8.2);
  const [memoryUsed] = useState(2.4);
  const [memoryTotal] = useState(8);
  const [drawCalls] = useState(892);
  const [triangles] = useState(2.4);
  const [batches] = useState(156);
  
  // Filters
  const [showLogs, setShowLogs] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [showErrors, setShowErrors] = useState(true);

  const getLogColor = (type: string) => {
    switch (type) {
      case "error": return "text-red-500";
      case "warning": return "text-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  const filteredLogs = logs.filter(log => {
    if (log.type === "log" && !showLogs) return false;
    if (log.type === "warning" && !showWarnings) return false;
    if (log.type === "error" && !showErrors) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Debug & Profiler
          </h2>
          <p className="text-sm text-muted-foreground">
            Performance analysis, memory tracking, and debugging tools
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isProfiling ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsProfiling(!isProfiling)}
          >
            {isProfiling ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isProfiling ? "Pause" : "Record"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{fps}</p>
            <p className="text-xs text-muted-foreground">FPS</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{frameTime.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Frame (ms)</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">{cpuTime.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">CPU (ms)</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{gpuTime.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">GPU (ms)</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-purple-500">{memoryUsed.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Memory (GB)</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-orange-500">{drawCalls}</p>
            <p className="text-xs text-muted-foreground">Draw Calls</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profiler" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="profiler"><Cpu className="w-4 h-4 mr-2" />CPU Profiler</TabsTrigger>
          <TabsTrigger value="memory"><HardDrive className="w-4 h-4 mr-2" />Memory</TabsTrigger>
          <TabsTrigger value="rendering"><Eye className="w-4 h-4 mr-2" />Rendering</TabsTrigger>
          <TabsTrigger value="console"><Bug className="w-4 h-4 mr-2" />Console</TabsTrigger>
        </TabsList>

        <TabsContent value="profiler" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">CPU Hierarchy</CardTitle>
              <CardDescription>Time spent in each function</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Function</th>
                      <th className="text-right p-2">Self (ms)</th>
                      <th className="text-right p-2">Total (ms)</th>
                      <th className="text-right p-2">Calls</th>
                      <th className="text-right p-2">GC Alloc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profilerData.map((sample, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="p-2 font-mono text-xs">{sample.name}</td>
                        <td className="p-2 text-right">{sample.selfMs.toFixed(2)}</td>
                        <td className="p-2 text-right">{sample.totalMs.toFixed(2)}</td>
                        <td className="p-2 text-right">{sample.calls}</td>
                        <td className="p-2 text-right text-muted-foreground">{sample.gcAlloc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Timeline visualization placeholder */}
          <Card className="bg-card/50 backdrop-blur-sm mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Frame Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted/50 rounded-lg flex items-end p-2 gap-0.5">
                {[...Array(60)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/70 rounded-t"
                    style={{ height: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0ms</span>
                <span>16.67ms (60 FPS target)</span>
                <span>33.33ms</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Memory Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used Memory</span>
                    <span>{memoryUsed.toFixed(2)} / {memoryTotal} GB</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(memoryUsed / memoryTotal) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold">1.2 GB</p>
                    <p className="text-xs text-muted-foreground">Textures</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold">450 MB</p>
                    <p className="text-xs text-muted-foreground">Meshes</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold">380 MB</p>
                    <p className="text-xs text-muted-foreground">Audio</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold">320 MB</p>
                    <p className="text-xs text-muted-foreground">Scripts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">GC Allocations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/50 rounded-lg flex items-end p-2 gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${Math.random() > 0.8 ? 'bg-red-500' : 'bg-green-500/70'}`}
                      style={{ height: `${5 + Math.random() * 30}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Red spikes indicate large allocations that may cause GC stutters
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rendering" className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Rendering Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Draw Calls</span>
                  <Badge variant="outline">{drawCalls}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Triangles</span>
                  <Badge variant="outline">{triangles}M</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Batches</span>
                  <Badge variant="outline">{batches}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Set-Pass Calls</span>
                  <Badge variant="outline">89</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shadow Casters</span>
                  <Badge variant="outline">234</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Visible Objects</span>
                  <Badge variant="outline">1,456</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">GPU Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Shadows", ms: 2.1, percent: 25 },
                  { name: "G-Buffer", ms: 1.8, percent: 22 },
                  { name: "Lighting", ms: 1.5, percent: 18 },
                  { name: "Post Process", ms: 1.2, percent: 15 },
                  { name: "Transparent", ms: 0.9, percent: 11 },
                  { name: "UI", ms: 0.7, percent: 9 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.ms}ms</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Debug Views</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Wireframe",
                  "Overdraw",
                  "Mip Levels",
                  "Light Complexity",
                  "Shader Complexity",
                  "Motion Vectors",
                  "Normals",
                  "Depth Buffer",
                ].map((view) => (
                  <Button key={view} variant="outline" size="sm" className="w-full justify-start">
                    {view}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="console" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Console Output</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={showLogs} onCheckedChange={setShowLogs} />
                    <Label className="text-xs">Logs</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={showWarnings} onCheckedChange={setShowWarnings} />
                    <Label className="text-xs text-yellow-500">Warnings</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={showErrors} onCheckedChange={setShowErrors} />
                    <Label className="text-xs text-red-500">Errors</Label>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-2 rounded font-mono text-xs cursor-pointer hover:bg-muted/50 ${
                        selectedLog === log.id ? "bg-muted" : ""
                      } ${getLogColor(log.type)}`}
                      onClick={() => setSelectedLog(log.id)}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
                        <span>{log.message}</span>
                      </div>
                      {selectedLog === log.id && log.stackTrace && (
                        <div className="mt-2 pl-4 text-muted-foreground border-l-2 border-border">
                          {log.stackTrace}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

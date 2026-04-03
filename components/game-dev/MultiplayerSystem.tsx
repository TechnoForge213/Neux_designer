import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Server, 
  Globe, 
  Shield,
  Zap,
  Activity,
  Network,
  Settings
} from "lucide-react";

export const MultiplayerSystem = () => {
  const [serverEnabled, setServerEnabled] = useState(false);
  const [matchmakingEnabled, setMatchmakingEnabled] = useState(true);
  const [maxPlayers, setMaxPlayers] = useState(32);
  const [tickRate, setTickRate] = useState(60);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary animate-pulse-glow" />
            Multiplayer Networking
          </h2>
          <p className="text-sm text-muted-foreground">
            Professional multiplayer system with server authority and lag compensation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={serverEnabled ? "default" : "secondary"} className="animate-pulse">
            {serverEnabled ? "Server Active" : "Offline"}
          </Badge>
          <Button size="sm" className="bg-primary">
            <Activity className="w-4 h-4 mr-2" />
            Test Server
          </Button>
        </div>
      </div>

      <Tabs defaultValue="server" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="server">
            <Server className="w-4 h-4 mr-2" />
            Server
          </TabsTrigger>
          <TabsTrigger value="networking">
            <Network className="w-4 h-4 mr-2" />
            Networking
          </TabsTrigger>
          <TabsTrigger value="matchmaking">
            <Globe className="w-4 h-4 mr-2" />
            Matchmaking
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="mt-6 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Server Configuration</CardTitle>
              <CardDescription>
                Configure dedicated server settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Dedicated Server</Label>
                  <p className="text-xs text-muted-foreground">
                    Server authoritative architecture
                  </p>
                </div>
                <Switch checked={serverEnabled} onCheckedChange={setServerEnabled} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Players</Label>
                  <Input
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Server Tick Rate</Label>
                  <Select value={tickRate.toString()} onValueChange={(v) => setTickRate(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Hz</SelectItem>
                      <SelectItem value="60">60 Hz</SelectItem>
                      <SelectItem value="120">120 Hz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-background/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Server Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Connected Players</p>
                      <p className="text-2xl font-bold text-primary">0 / {maxPlayers}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Server Uptime</p>
                      <p className="text-2xl font-bold text-primary">0:00:00</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Bandwidth</p>
                      <p className="text-lg font-bold">0 MB/s</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="text-lg font-bold">0 ms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Region Settings</CardTitle>
              <CardDescription>Configure server regions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { region: "North America", ping: "25ms" },
                  { region: "Europe", ping: "45ms" },
                  { region: "Asia", ping: "120ms" },
                  { region: "South America", ping: "85ms" }
                ].map((item) => (
                  <Card key={item.region} className="group hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.region}</p>
                        <p className="text-xs text-muted-foreground">Ping: {item.ping}</p>
                      </div>
                      <Switch />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networking" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-primary" />
                Network Optimization
              </CardTitle>
              <CardDescription>
                Advanced networking with lag compensation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-background/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Client-Side Prediction</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Smooth gameplay even with network latency
                    </p>
                    <Switch defaultChecked />
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Server Reconciliation</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Correct client predictions
                    </p>
                    <Switch defaultChecked />
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Lag Compensation</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Rewind time for hit detection
                    </p>
                    <Switch defaultChecked />
                  </CardContent>
                </Card>
                <Card className="bg-background/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Entity Interpolation</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Smooth movement between updates
                    </p>
                    <Switch defaultChecked />
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Industry-Leading Netcode</p>
                      <p className="text-xs text-muted-foreground">
                        Our networking system uses the same techniques as AAA titles like Call of Duty and Valorant.
                        Features include client-side prediction, server reconciliation, lag compensation, and optimized bandwidth usage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matchmaking" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Matchmaking System
              </CardTitle>
              <CardDescription>
                Skill-based matchmaking and lobby management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label>Matchmaking Enabled</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatic player matching
                  </p>
                </div>
                <Switch checked={matchmakingEnabled} onCheckedChange={setMatchmakingEnabled} />
              </div>

              {matchmakingEnabled && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label>Matchmaking Mode</Label>
                    <Select defaultValue="skill">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skill">Skill-Based (MMR)</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="ranked">Ranked</SelectItem>
                        <SelectItem value="custom">Custom Lobbies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="bg-background/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">Queue Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Max Search Time</span>
                          <Badge variant="outline">120s</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">MMR Range</span>
                          <Badge variant="outline">±200</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Party Size</span>
                          <Badge variant="outline">1-4</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security & Anti-Cheat
              </CardTitle>
              <CardDescription>
                Protect your game from cheaters and exploits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Input Validation", description: "Server-side validation" },
                  { name: "Anti-Speedhack", description: "Detect time manipulation" },
                  { name: "Packet Encryption", description: "Secure data transmission" },
                  { name: "Rate Limiting", description: "Prevent packet flooding" }
                ].map((feature) => (
                  <Card key={feature.name} className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{feature.name}</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Enterprise-Grade Security</p>
                      <p className="text-xs text-muted-foreground">
                        Multi-layered protection including server authority, input validation, encrypted communications,
                        anti-cheat detection, and automated ban systems. Keep your game fair and secure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
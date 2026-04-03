import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Code, Monitor, Boxes, User, Atom, Brain, Users } from "lucide-react";
import { TemplateSelector } from "./TemplateSelector";
import { VisualCodingEditor } from "./VisualCodingEditor";
import { GraphicsControls } from "./GraphicsControls";
import { CharacterAnimationSystem } from "./CharacterAnimationSystem";
import { PhysicsEngine } from "./PhysicsEngine";
import { AIAssetGenerator } from "./AIAssetGenerator";
import { MultiplayerSystem } from "./MultiplayerSystem";

export const GameDevModule = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="h-full">
      <Tabs defaultValue="templates" className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-glow-primary">
              <Gamepad2 className="w-8 h-8 text-primary animate-pulse-glow" />
              Game Development Studio
            </h2>
            <p className="text-muted-foreground">
              Professional-grade game engine with AAA capabilities
            </p>
          </div>
          <TabsList className="grid grid-cols-7 bg-card/50 backdrop-blur-sm border border-primary/20">
            <TabsTrigger value="templates">
              <Boxes className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="coding">
              <Code className="w-4 h-4 mr-2" />
              Coding
            </TabsTrigger>
            <TabsTrigger value="graphics">
              <Monitor className="w-4 h-4 mr-2" />
              Graphics
            </TabsTrigger>
            <TabsTrigger value="animation">
              <User className="w-4 h-4 mr-2" />
              Animation
            </TabsTrigger>
            <TabsTrigger value="physics">
              <Atom className="w-4 h-4 mr-2" />
              Physics
            </TabsTrigger>
            <TabsTrigger value="ai-assets">
              <Brain className="w-4 h-4 mr-2" />
              AI Assets
            </TabsTrigger>
            <TabsTrigger value="multiplayer">
              <Users className="w-4 h-4 mr-2" />
              Multiplayer
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="templates" className="mt-0">
          <TemplateSelector onSelectTemplate={setSelectedTemplate} />
        </TabsContent>

        <TabsContent value="coding" className="mt-0">
          <VisualCodingEditor />
        </TabsContent>

        <TabsContent value="graphics" className="mt-0">
          <GraphicsControls />
        </TabsContent>

        <TabsContent value="animation" className="mt-0">
          <CharacterAnimationSystem />
        </TabsContent>

        <TabsContent value="physics" className="mt-0">
          <PhysicsEngine />
        </TabsContent>

        <TabsContent value="ai-assets" className="mt-0">
          <AIAssetGenerator />
        </TabsContent>

        <TabsContent value="multiplayer" className="mt-0">
          <MultiplayerSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

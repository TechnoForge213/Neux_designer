import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, Gamepad2, Boxes, Sparkles } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  type: "fpv" | "tpv" | "topdown" | "sidescroller";
  features: string[];
  thumbnail?: string;
}

const templates: Template[] = [
  {
    id: "fpv-shooter",
    name: "First Person Shooter",
    description: "Optimized FPV template with weapon system, realistic physics, and advanced player movement",
    type: "fpv",
    features: ["Weapon System", "Realistic Physics", "Advanced Movement", "Hit Detection", "Inventory System"]
  },
  {
    id: "fpv-adventure",
    name: "First Person Adventure",
    description: "Exploration-focused FPV with interaction system and puzzle mechanics",
    type: "fpv",
    features: ["Interaction System", "Puzzle Mechanics", "Inventory", "Quest System", "Dynamic Lighting"]
  },
  {
    id: "tpv-action",
    name: "Third Person Action",
    description: "GTA-style TPV with advanced character controller and combat system",
    type: "tpv",
    features: ["Character Controller", "Combat System", "Camera System", "Animation System", "AI Companions"]
  },
  {
    id: "tpv-rpg",
    name: "Third Person RPG",
    description: "RPG template with stats, skills, and progression systems",
    type: "tpv",
    features: ["Stats System", "Skill Trees", "Quest System", "Loot System", "Dialog System"]
  },
  {
    id: "racing",
    name: "Racing Game",
    description: "High-performance racing template with realistic vehicle physics",
    type: "tpv",
    features: ["Vehicle Physics", "Track System", "Boost System", "Multiplayer", "Time Trials"]
  },
  {
    id: "moba",
    name: "MOBA Template",
    description: "Top-down MOBA with abilities, minions, and strategic gameplay",
    type: "topdown",
    features: ["Ability System", "AI Minions", "Tower Defense", "Team System", "Fog of War"]
  }
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const filterByType = (type: string) => {
    if (type === "all") return templates;
    return templates.filter(t => t.type === type);
  };

  const renderTemplateCard = (template: Template) => (
    <Card 
      key={template.id}
      className="group hover:border-primary/50 transition-all duration-300 hover:glow-primary cursor-pointer bg-card/50 backdrop-blur-sm"
      onClick={() => onSelectTemplate(template)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {template.name}
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {template.type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                {feature}
              </Badge>
            ))}
          </div>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-primary" />
          Game Templates
        </h2>
        <p className="text-muted-foreground">
          Start with pre-built templates featuring professional-grade systems and optimized code
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="all">
            <Boxes className="w-4 h-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger value="fpv">
            <User className="w-4 h-4 mr-2" />
            First Person
          </TabsTrigger>
          <TabsTrigger value="tpv">
            <Users className="w-4 h-4 mr-2" />
            Third Person
          </TabsTrigger>
          <TabsTrigger value="topdown">
            Top-Down
          </TabsTrigger>
          <TabsTrigger value="sidescroller">
            Side Scroller
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(renderTemplateCard)}
          </div>
        </TabsContent>

        {["fpv", "tpv", "topdown", "sidescroller"].map(type => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByType(type).map(renderTemplateCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
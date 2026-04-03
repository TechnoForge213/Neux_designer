import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SceneObject } from "./types";

interface PropertiesPanelProps {
  selectedObject: SceneObject | null;
  onUpdateObject: (id: string, updates: Partial<SceneObject>) => void;
}

export const PropertiesPanel = ({ selectedObject, onUpdateObject }: PropertiesPanelProps) => {
  if (!selectedObject) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Select an object to edit properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleChange = (field: 'position' | 'rotation' | 'scale', axis: 'x' | 'y' | 'z', value: number) => {
    onUpdateObject(selectedObject.id, {
      [field]: { ...selectedObject[field], [axis]: value }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-auto">
        <div>
          <Label htmlFor="obj-name" className="text-xs">Name</Label>
          <Input
            id="obj-name"
            value={selectedObject.name}
            onChange={(e) => onUpdateObject(selectedObject.id, { name: e.target.value })}
            className="h-8 text-sm"
          />
        </div>

        <Separator />

        <div>
          <Label className="text-xs font-semibold">Position</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis}>
                <Label htmlFor={`pos-${axis}`} className="text-xs text-muted-foreground uppercase">
                  {axis}
                </Label>
                <Input
                  id={`pos-${axis}`}
                  type="number"
                  step="0.1"
                  value={selectedObject.position[axis].toFixed(2)}
                  onChange={(e) => handleChange('position', axis, parseFloat(e.target.value))}
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-xs font-semibold">Rotation (degrees)</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis}>
                <Label htmlFor={`rot-${axis}`} className="text-xs text-muted-foreground uppercase">
                  {axis}
                </Label>
                <Input
                  id={`rot-${axis}`}
                  type="number"
                  step="1"
                  value={((selectedObject.rotation[axis] * 180) / Math.PI).toFixed(1)}
                  onChange={(e) =>
                    handleChange('rotation', axis, (parseFloat(e.target.value) * Math.PI) / 180)
                  }
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-xs font-semibold">Scale</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <div key={axis}>
                <Label htmlFor={`scale-${axis}`} className="text-xs text-muted-foreground uppercase">
                  {axis}
                </Label>
                <Input
                  id={`scale-${axis}`}
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={selectedObject.scale[axis].toFixed(2)}
                  onChange={(e) => handleChange('scale', axis, parseFloat(e.target.value))}
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label htmlFor="obj-color" className="text-xs">Color</Label>
          <Input
            id="obj-color"
            type="color"
            value={selectedObject.color}
            onChange={(e) => onUpdateObject(selectedObject.id, { color: e.target.value })}
            className="h-8 w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

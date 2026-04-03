import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Box, Ruler, Move, RotateCw, Maximize2 } from "lucide-react";

interface ToolsPanelProps {
  roomDimensions: { width: number; length: number; height: number };
  onUpdateRoomDimensions: (dimensions: { width: number; length: number; height: number }) => void;
  activeTool: string;
  onToolChange: (tool: string) => void;
}

export const ToolsPanel = ({
  roomDimensions,
  onUpdateRoomDimensions,
  activeTool,
  onToolChange,
}: ToolsPanelProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-auto">
        <div>
          <Label className="text-xs font-semibold mb-2 block">Transform</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={activeTool === 'move' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToolChange('move')}
              className="h-8"
            >
              <Move className="w-4 h-4 mr-1" />
              Move
            </Button>
            <Button
              variant={activeTool === 'rotate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToolChange('rotate')}
              className="h-8"
            >
              <RotateCw className="w-4 h-4 mr-1" />
              Rotate
            </Button>
            <Button
              variant={activeTool === 'scale' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToolChange('scale')}
              className="h-8"
            >
              <Maximize2 className="w-4 h-4 mr-1" />
              Scale
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-xs font-semibold mb-2 block">
            <Ruler className="w-3 h-3 inline mr-1" />
            Room Dimensions (meters)
          </Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="room-width" className="text-xs text-muted-foreground">Width</Label>
              <Input
                id="room-width"
                type="number"
                min="1"
                step="0.5"
                value={roomDimensions.width}
                onChange={(e) =>
                  onUpdateRoomDimensions({ ...roomDimensions, width: parseFloat(e.target.value) })
                }
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="room-length" className="text-xs text-muted-foreground">Length</Label>
              <Input
                id="room-length"
                type="number"
                min="1"
                step="0.5"
                value={roomDimensions.length}
                onChange={(e) =>
                  onUpdateRoomDimensions({ ...roomDimensions, length: parseFloat(e.target.value) })
                }
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="room-height" className="text-xs text-muted-foreground">Height</Label>
              <Input
                id="room-height"
                type="number"
                min="1"
                step="0.5"
                value={roomDimensions.height}
                onChange={(e) =>
                  onUpdateRoomDimensions({ ...roomDimensions, height: parseFloat(e.target.value) })
                }
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-xs font-semibold mb-2 block">
            <Box className="w-3 h-3 inline mr-1" />
            Add Object
          </Label>
          <Button variant="outline" size="sm" className="w-full h-8">
            Add Cube
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

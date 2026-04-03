import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileBox } from "lucide-react";
import { toast } from "sonner";

export const ModelImportExport = () => {
  const [importing, setImporting] = useState(false);

  const handleImport = (format: string) => {
    setImporting(true);
    toast.loading(`Importing ${format} file...`);
    setTimeout(() => {
      setImporting(false);
      toast.success(`${format} model imported successfully!`);
    }, 1500);
  };

  const handleExport = (format: string) => {
    toast.loading(`Exporting as ${format}...`);
    setTimeout(() => {
      toast.success(`Model exported as ${format} successfully!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-background/50 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/10">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Import Models
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {["FBX", "OBJ", "GLTF", "USD", "BLEND", "3DS"].map((format) => (
            <Button
              key={format}
              variant="outline"
              className="h-20 flex-col gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              onClick={() => handleImport(format)}
              disabled={importing}
            >
              <FileBox className="h-6 w-6" />
              <span className="font-semibold">{format}</span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/10">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Download className="h-5 w-5 text-secondary" />
          Export Models
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {["FBX", "OBJ", "GLTF", "USD", "STL", "DAE"].map((format) => (
            <Button
              key={format}
              variant="outline"
              className="h-20 flex-col gap-2 border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5"
              onClick={() => handleExport(format)}
            >
              <FileBox className="h-6 w-6" />
              <span className="font-semibold">{format}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, FileText, FileJson } from "lucide-react";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { toast as showToast } from "sonner";

export default function DataManagement() {
  const { exportAsCSV, exportAsJSON, importFromJSON } = useEvaluationData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      showToast.error("Por favor, selecciona un archivo JSON válido.");
      return;
    }

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const result = importFromJSON(jsonString);
        if (result.success) {
          showToast.success(result.message);
        } else {
          showToast.error(result.message);
        }
      } catch (error) {
        showToast.error("Error al procesar el archivo.");
      } finally {
        setIsImporting(false);
        // Clear the file input so the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Datos</CardTitle>
        <CardDescription>Importa y exporta todos los datos de sesiones y evaluaciones.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Exportar Datos</h3>
          <p className="text-sm text-muted-foreground">
            Guarda una copia de seguridad de todos tus datos de sesiones y evaluaciones.
          </p>
          <div className="flex gap-3">
            <Button onClick={exportAsJSON} variant="outline">
              <FileJson className="w-4 h-4 mr-2" />
              Exportar como JSON (Copia de Seguridad)
            </Button>
            <Button onClick={exportAsCSV}>
              <FileText className="w-4 h-4 mr-2" />
              Exportar como CSV (Análisis)
            </Button>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-2 pt-4 border-t">
          <h3 className="text-lg font-semibold">Importar Datos</h3>
          <p className="text-sm text-muted-foreground">
            Restaura tus datos desde un archivo JSON de copia de seguridad.
          </p>
          <Button onClick={handleImportClick} disabled={isImporting}>
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? "Importando..." : "Importar desde JSON"}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/json"
            style={{ display: "none" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

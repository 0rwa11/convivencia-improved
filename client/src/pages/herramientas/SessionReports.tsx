import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

interface SessionReport {
  id: string;
  sessionNumber: number;
  date: string;
  facilitator: string;
  participants: number;
  dynamics: string[];
  observations: string;
  successIndicators: string[];
  challenges: string;
  recommendations: string;
  createdAt: string;
}

export default function SessionReports() {
  const [reports, setReports] = useState<SessionReport[]>([
    {
      id: "1",
      sessionNumber: 1,
      date: "2025-01-15",
      facilitator: "María González",
      participants: 18,
      dynamics: ["El Círculo del Ritmo y la Palabra", "El Termómetro del Estereotipo"],
      observations: "Excelente participación. Los participantes se sintieron cómodos desde el inicio.",
      successIndicators: ["100% participación", "Ambiente lúdico", "Interacción multicultural"],
      challenges: "Algunos participantes tenían dificultades con el idioma",
      recommendations: "Proporcionar apoyo de traducción en futuras sesiones",
      createdAt: "2025-01-15T10:00:00Z"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sessionNumber: "1",
    date: new Date().toISOString().split('T')[0],
    facilitator: "",
    participants: "",
    observations: "",
    challenges: "",
    recommendations: ""
  });

  const handleAddReport = () => {
    if (!formData.facilitator || !formData.participants) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    const newReport: SessionReport = {
      id: Date.now().toString(),
      sessionNumber: parseInt(formData.sessionNumber),
      date: formData.date,
      facilitator: formData.facilitator,
      participants: parseInt(formData.participants),
      dynamics: [],
      observations: formData.observations,
      successIndicators: [],
      challenges: formData.challenges,
      recommendations: formData.recommendations,
      createdAt: new Date().toISOString()
    };

    setReports([...reports, newReport]);
    setFormData({
      sessionNumber: "1",
      date: new Date().toISOString().split('T')[0],
      facilitator: "",
      participants: "",
      observations: "",
      challenges: "",
      recommendations: ""
    });
    setShowForm(false);
  };

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const generatePDF = (report: SessionReport) => {
    const content = `
REPORTE DE SESIÓN - PROGRAMA CONVIVENCIA INTERCULTURAL
═══════════════════════════════════════════════════════

INFORMACIÓN GENERAL
───────────────────
Sesión: ${report.sessionNumber}
Fecha: ${new Date(report.date).toLocaleDateString('es-ES')}
Facilitador: ${report.facilitator}
Participantes: ${report.participants}

DINÁMICAS REALIZADAS
────────────────────
${report.dynamics.map(d => `• ${d}`).join('\n')}

OBSERVACIONES
─────────────
${report.observations}

INDICADORES DE ÉXITO
────────────────────
${report.successIndicators.map(i => `✓ ${i}`).join('\n')}

DESAFÍOS ENCONTRADOS
────────────────────
${report.challenges}

RECOMENDACIONES
───────────────
${report.recommendations}

═══════════════════════════════════════════════════════
Generado: ${new Date(report.createdAt).toLocaleString('es-ES')}
    `;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `Reporte_Sesion_${report.sessionNumber}_${report.date}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Generador de Reportes de Sesión</h1>
        <p className="text-lg text-muted-foreground">
          Crea y gestiona reportes profesionales de cada sesión del programa
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Reporte
        </Button>
      </div>

      {showForm && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Crear Nuevo Reporte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Sesión</label>
                <Select value={formData.sessionNumber} onValueChange={(value) => setFormData({...formData, sessionNumber: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sesión 1: Encuentro</SelectItem>
                    <SelectItem value="2">Sesión 2: Empatía</SelectItem>
                    <SelectItem value="3">Sesión 3: Acción</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Fecha</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Facilitador *</label>
                <Input
                  placeholder="Nombre del facilitador"
                  value={formData.facilitator}
                  onChange={(e) => setFormData({...formData, facilitator: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Número de Participantes *</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.participants}
                  onChange={(e) => setFormData({...formData, participants: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Observaciones</label>
              <Textarea
                placeholder="Describe las observaciones principales de la sesión..."
                value={formData.observations}
                onChange={(e) => setFormData({...formData, observations: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Desafíos Encontrados</label>
              <Textarea
                placeholder="Describe los desafíos o dificultades encontradas..."
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Recomendaciones</label>
              <Textarea
                placeholder="Proporciona recomendaciones para futuras sesiones..."
                value={formData.recommendations}
                onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddReport} className="bg-green-600 hover:bg-green-700">
                Guardar Reporte
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {reports.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No hay reportes creados aún</p>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="default">Sesión {report.sessionNumber}</Badge>
                      {report.facilitator}
                    </CardTitle>
                    <CardDescription>
                      {new Date(report.date).toLocaleDateString('es-ES')} • {report.participants} participantes
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.observations && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Observaciones
                    </h4>
                    <p className="text-sm text-muted-foreground">{report.observations}</p>
                  </div>
                )}

                {report.challenges && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      Desafíos
                    </h4>
                    <p className="text-sm text-muted-foreground">{report.challenges}</p>
                  </div>
                )}

                {report.recommendations && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Recomendaciones</h4>
                    <p className="text-sm text-muted-foreground">{report.recommendations}</p>
                  </div>
                )}

                <Button
                  onClick={() => generatePDF(report)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

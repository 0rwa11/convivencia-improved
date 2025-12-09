import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Download, FileText, TrendingUp, Users, Calendar, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import DataManagement from "@/components/DataManagement";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function ExecutiveSummary() {
  const { sessions, evaluations } = useEvaluationData();

  const summary = useMemo(() => {
    const totalGroups = new Set(sessions.map((s) => s.group)).size;
    const totalSessions = sessions.length;
    const totalEvaluations = evaluations.length;

    const beforeEvals = evaluations.filter((e) => e.phase === "before");
    const duringEvals = evaluations.filter((e) => e.phase === "during");
    const afterEvals = evaluations.filter((e) => e.phase === "after");

    const avgBefore = beforeEvals.length > 0
      ? beforeEvals.reduce((sum, e) => sum + (e.mixedInteractions || 0), 0) / beforeEvals.length
      : 0;

    const avgAfter = afterEvals.length > 0
      ? afterEvals.reduce((sum, e) => sum + (e.mixedInteractionsAfter || 0), 0) / afterEvals.length
      : 0;

    const improvement = avgBefore > 0 ? ((avgAfter - avgBefore) / avgBefore) * 100 : 0;

    const participationRates = duringEvals
      .filter((e) => e.phase === "during" && e.participation)
      .map((e) => {
        if (e.participation === "100") return 100;
        if (e.participation === "80-99") return 90;
        if (e.participation === "60-79") return 70;
        return 50;
      });

    const avgParticipation = participationRates.length > 0
      ? participationRates.reduce((sum, p) => sum + p, 0) / participationRates.length
      : 0;

    const highRespect = duringEvals.filter((e) => e.respect === "high").length;
    const totalRespectEvals = duringEvals.filter((e) => e.respect).length;
    const respectRate = totalRespectEvals > 0 ? (highRespect / totalRespectEvals) * 100 : 0;

    // Additional metrics
    const highOpenness = duringEvals.filter((e) => e.openness === "high").length;
    const totalOpennessEvals = duringEvals.filter((e) => e.openness).length;
    const opennessRate = totalOpennessEvals > 0 ? (highOpenness / totalOpennessEvals) * 100 : 0;

    const frequentLaughter = duringEvals.filter((e) => e.laughter === "frequent").length;
    const totalLaughterEvals = duringEvals.filter((e) => e.laughter).length;
    const laughterRate = totalLaughterEvals > 0 ? (frequentLaughter / totalLaughterEvals) * 100 : 0;

    // Grouping analysis
    const mixedGrouping = [...beforeEvals, ...afterEvals].filter((e) => e.grouping === "mixed").length;
    const totalGroupingEvals = [...beforeEvals, ...afterEvals].filter((e) => e.grouping).length;
    const mixedGroupingRate = totalGroupingEvals > 0 ? (mixedGrouping / totalGroupingEvals) * 100 : 0;

    // Tensions analysis
    const noTensions = [...beforeEvals, ...duringEvals, ...afterEvals].filter((e) => e.tensions === "none").length;
    const totalTensionsEvals = [...beforeEvals, ...duringEvals, ...afterEvals].filter((e) => e.tensions).length;
    const noTensionsRate = totalTensionsEvals > 0 ? (noTensions / totalTensionsEvals) * 100 : 0;

    // Communication analysis
    const frequentComm = [...beforeEvals, ...afterEvals].filter((e) => e.communication === "frequent").length;
    const totalCommEvals = [...beforeEvals, ...afterEvals].filter((e) => e.communication).length;
    const frequentCommRate = totalCommEvals > 0 ? (frequentComm / totalCommEvals) * 100 : 0;

    // Facilitators
    const facilitators = new Set(sessions.map((s) => s.facilitator)).size;

    // Date range
    const dates = sessions.map((s) => new Date(s.date).getTime()).filter(d => !isNaN(d));
    const firstDate = dates.length > 0 ? new Date(Math.min(...dates)) : null;
    const lastDate = dates.length > 0 ? new Date(Math.max(...dates)) : null;

    return {
      totalGroups,
      totalSessions,
      totalEvaluations,
      facilitators,
      firstDate,
      lastDate,
      beforeCount: beforeEvals.length,
      duringCount: duringEvals.length,
      afterCount: afterEvals.length,
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
      improvement: Math.round(improvement),
      avgParticipation: Math.round(avgParticipation),
      respectRate: Math.round(respectRate),
      opennessRate: Math.round(opennessRate),
      laughterRate: Math.round(laughterRate),
      mixedGroupingRate: Math.round(mixedGroupingRate),
      noTensionsRate: Math.round(noTensionsRate),
      frequentCommRate: Math.round(frequentCommRate),
    };
  }, [sessions, evaluations]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("RESUMEN EJECUTIVO", 105, 20, { align: "center" });
    doc.text("PROGRAMA DE CONVIVENCIA INTERCULTURAL", 105, 28, { align: "center" });
    
    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha del reporte: ${new Date().toLocaleDateString("es-ES", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 105, 36, { align: "center" });
    
    if (summary.firstDate && summary.lastDate) {
      doc.text(`Período: ${summary.firstDate.toLocaleDateString("es-ES")} - ${summary.lastDate.toLocaleDateString("es-ES")}`, 105, 42, { align: "center" });
    }
    
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 48, 190, 48);
    
    let y = 58;
    
    // General Metrics Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("MÉTRICAS GENERALES", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`• Total de grupos: ${summary.totalGroups}`, 25, y);
    y += 6;
    doc.text(`• Total de sesiones: ${summary.totalSessions}`, 25, y);
    y += 6;
    doc.text(`• Total de evaluaciones: ${summary.totalEvaluations} (${summary.beforeCount} antes, ${summary.duringCount} durante, ${summary.afterCount} después)`, 25, y);
    y += 6;
    doc.text(`• Facilitadores involucrados: ${summary.facilitators}`, 25, y);
    y += 12;
    
    // Impact Results Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RESULTADOS DE IMPACTO", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`• Interacciones mixtas ANTES: ${summary.avgBefore} (promedio por 20 min)`, 25, y);
    y += 6;
    doc.text(`• Interacciones mixtas DESPUÉS: ${summary.avgAfter} (promedio por 20 min)`, 25, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`• Mejora: ${summary.improvement > 0 ? "+" : ""}${summary.improvement}%`, 25, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(`• Agrupación mixta: ${summary.mixedGroupingRate}% de las observaciones`, 25, y);
    y += 6;
    doc.text(`• Comunicación frecuente entre grupos: ${summary.frequentCommRate}%`, 25, y);
    y += 12;
    
    // Process Quality Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CALIDAD DEL PROCESO", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`• Participación promedio: ${summary.avgParticipation}%`, 25, y);
    y += 6;
    doc.text(`• Tasa de respeto alto: ${summary.respectRate}%`, 25, y);
    y += 6;
    doc.text(`• Tasa de apertura alta: ${summary.opennessRate}%`, 25, y);
    y += 6;
    doc.text(`• Momentos positivos frecuentes: ${summary.laughterRate}%`, 25, y);
    y += 6;
    doc.text(`• Ausencia de tensiones: ${summary.noTensionsRate}%`, 25, y);
    y += 12;
    
    // Conclusions Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CONCLUSIONES", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    if (summary.improvement > 0) {
      const conclusion1 = `El programa ha tenido un impacto positivo significativo, con una mejora del ${summary.improvement}% en las`;
      const conclusion2 = `interacciones mixtas entre participantes de diferentes nacionalidades.`;
      doc.text(conclusion1, 25, y);
      y += 6;
      doc.text(conclusion2, 25, y);
      y += 6;
    } else {
      doc.text("Se requieren más datos para evaluar el impacto del programa.", 25, y);
      y += 6;
    }
    
    if (summary.avgParticipation >= 80) {
      doc.text("La participación ha sido excelente, indicando un alto nivel de compromiso.", 25, y);
      y += 6;
    } else {
      doc.text("Se recomienda trabajar en estrategias para aumentar la participación.", 25, y);
      y += 6;
    }
    
    if (summary.respectRate >= 70) {
      doc.text("El ambiente de respeto mutuo ha sido muy positivo durante las sesiones.", 25, y);
      y += 6;
    } else {
      doc.text("Se sugiere reforzar las dinámicas que fomentan el respeto mutuo.", 25, y);
      y += 6;
    }
    
    y += 6;
    
    // Recommendations Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RECOMENDACIONES", 20, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    if (summary.improvement > 0 && summary.avgParticipation >= 80 && summary.respectRate >= 70) {
      doc.text("• Continuar con la implementación del programa", 25, y);
      y += 6;
      doc.text("• Documentar las mejores prácticas identificadas", 25, y);
      y += 6;
      doc.text("• Considerar compartir esta experiencia con otros centros", 25, y);
      y += 6;
    } else {
      if (summary.improvement <= 0) {
        doc.text("• Completar más evaluaciones ANTES y DESPUÉS para medir el impacto", 25, y);
        y += 6;
      }
      if (summary.avgParticipation < 80) {
        doc.text("• Ajustar las dinámicas para hacerlas más atractivas", 25, y);
        y += 6;
      }
      if (summary.respectRate < 70) {
        doc.text("• Reforzar las reglas de respeto y la escucha activa", 25, y);
        y += 6;
      }
    }
    
    // Footer
    y = 280;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 5;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Generado por la Aplicación de Convivencia Intercultural", 105, y, { align: "center" });
    
    // Save
    doc.save(`resumen-ejecutivo-${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("PDF exportado exitosamente");
  };

  const exportToText = () => {
    const dateRange = summary.firstDate && summary.lastDate
      ? `Período: ${summary.firstDate.toLocaleDateString("es-ES")} - ${summary.lastDate.toLocaleDateString("es-ES")}`
      : "";

    const text = `
RESUMEN EJECUTIVO - PROGRAMA DE CONVIVENCIA INTERCULTURAL
=========================================================

Fecha del reporte: ${new Date().toLocaleDateString("es-ES")}
${dateRange}

MÉTRICAS GENERALES
------------------
- Total de grupos: ${summary.totalGroups}
- Total de sesiones: ${summary.totalSessions}
- Total de evaluaciones: ${summary.totalEvaluations}
  · ANTES: ${summary.beforeCount}
  · DURANTE: ${summary.duringCount}
  · DESPUÉS: ${summary.afterCount}
- Facilitadores involucrados: ${summary.facilitators}

RESULTADOS DE IMPACTO
---------------------
- Interacciones mixtas ANTES: ${summary.avgBefore} (promedio por 20 min)
- Interacciones mixtas DESPUÉS: ${summary.avgAfter} (promedio por 20 min)
- Mejora: ${summary.improvement > 0 ? "+" : ""}${summary.improvement}%
- Agrupación mixta: ${summary.mixedGroupingRate}%
- Comunicación frecuente entre grupos: ${summary.frequentCommRate}%

CALIDAD DEL PROCESO
-------------------
- Participación promedio: ${summary.avgParticipation}%
- Tasa de respeto alto: ${summary.respectRate}%
- Tasa de apertura alta: ${summary.opennessRate}%
- Momentos positivos frecuentes: ${summary.laughterRate}%
- Ausencia de tensiones: ${summary.noTensionsRate}%

CONCLUSIONES
------------
${summary.improvement > 0 
  ? `El programa ha tenido un impacto positivo, con una mejora del ${summary.improvement}% en las interacciones mixtas entre participantes de diferentes nacionalidades.`
  : "Se requieren más datos para evaluar el impacto del programa."}

${summary.avgParticipation >= 80
  ? "La participación ha sido excelente, indicando un alto nivel de compromiso."
  : "Se recomienda trabajar en estrategias para aumentar la participación."}

${summary.respectRate >= 70
  ? "El ambiente de respeto mutuo ha sido muy positivo durante las sesiones."
  : "Se sugiere reforzar las dinámicas que fomentan el respeto mutuo."}

RECOMENDACIONES
---------------
${summary.improvement > 0 && summary.avgParticipation >= 80 && summary.respectRate >= 70
  ? `• Continuar con la implementación del programa
• Documentar las mejores prácticas identificadas
• Considerar compartir esta experiencia con otros centros`
  : `${summary.improvement <= 0 ? "• Completar más evaluaciones ANTES y DESPUÉS para medir el impacto\n" : ""}${summary.avgParticipation < 80 ? "• Ajustar las dinámicas para hacerlas más atractivas\n" : ""}${summary.respectRate < 70 ? "• Reforzar las reglas de respeto y la escucha activa\n" : ""}`}

---
Generado por la Aplicación de Convivencia Intercultural
    `.trim();

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resumen-ejecutivo-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Archivo de texto exportado exitosamente");
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Resumen Ejecutivo</h1>
          <p className="text-lg text-muted-foreground">
            Visión general del impacto y resultados del programa
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToText} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar TXT
          </Button>
          <Button onClick={exportToPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Period Info */}
      {summary.firstDate && summary.lastDate && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-blue-900">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">
                Período: {summary.firstDate.toLocaleDateString("es-ES")} - {summary.lastDate.toLocaleDateString("es-ES")}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalGroups}</div>
            <p className="text-xs text-muted-foreground">Grupos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalSessions}</div>
            <p className="text-xs text-muted-foreground">Sesiones realizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalEvaluations}</div>
            <p className="text-xs text-muted-foreground">Evaluaciones completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejora</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.improvement > 0 ? "text-green-600" : ""}`}>
              {summary.improvement > 0 ? "+" : ""}{summary.improvement}%
            </div>
            <p className="text-xs text-muted-foreground">En interacciones mixtas</p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Results */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados de Impacto</CardTitle>
          <CardDescription>Comparación antes y después del programa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Interacciones Mixtas ANTES</span>
                <Badge variant="outline">{summary.avgBefore}</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-slate-500 h-2 rounded-full"
                  style={{ width: `${Math.min((summary.avgBefore / 30) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Promedio por 20 minutos</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Interacciones Mixtas DESPUÉS</span>
                <Badge variant="default">{summary.avgAfter}</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min((summary.avgAfter / 30) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Promedio por 20 minutos</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              {summary.improvement > 0 ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              )}
              <span className="font-semibold">
                {summary.improvement > 0
                  ? `Mejora del ${summary.improvement}% en interacciones mixtas`
                  : "Datos insuficientes para evaluar mejora"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {summary.improvement > 0
                ? "El programa ha tenido un impacto positivo en la convivencia intercultural, aumentando significativamente las interacciones entre participantes de diferentes nacionalidades."
                : "Se necesitan más evaluaciones ANTES y DESPUÉS para medir el impacto del programa."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Process Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Calidad del Proceso</CardTitle>
          <CardDescription>Indicadores de participación y ambiente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Participación Promedio</span>
                <Badge variant={summary.avgParticipation >= 80 ? "default" : "secondary"}>
                  {summary.avgParticipation}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${summary.avgParticipation >= 80 ? "bg-green-600" : "bg-orange-500"}`}
                  style={{ width: `${summary.avgParticipation}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.avgParticipation >= 80 ? "Excelente participación" : "Se puede mejorar"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tasa de Respeto Alto</span>
                <Badge variant={summary.respectRate >= 70 ? "default" : "secondary"}>
                  {summary.respectRate}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${summary.respectRate >= 70 ? "bg-green-600" : "bg-orange-500"}`}
                  style={{ width: `${summary.respectRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.respectRate >= 70 ? "Ambiente muy positivo" : "Se puede mejorar"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Apertura Alta</span>
                <Badge variant={summary.opennessRate >= 70 ? "default" : "secondary"}>
                  {summary.opennessRate}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${summary.opennessRate >= 70 ? "bg-green-600" : "bg-orange-500"}`}
                  style={{ width: `${summary.opennessRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.opennessRate >= 70 ? "Excelente apertura" : "Se puede mejorar"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Momentos Positivos</span>
                <Badge variant={summary.laughterRate >= 70 ? "default" : "secondary"}>
                  {summary.laughterRate}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${summary.laughterRate >= 70 ? "bg-green-600" : "bg-orange-500"}`}
                  style={{ width: `${summary.laughterRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.laughterRate >= 70 ? "Ambiente muy positivo" : "Se puede mejorar"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Adicionales</CardTitle>
          <CardDescription>Otros aspectos evaluados del programa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Agrupación Mixta</span>
                <Badge variant="outline">{summary.mixedGroupingRate}%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${summary.mixedGroupingRate}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sin Tensiones</span>
                <Badge variant="outline">{summary.noTensionsRate}%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${summary.noTensionsRate}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comunicación Frecuente</span>
                <Badge variant="outline">{summary.frequentCommRate}%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${summary.frequentCommRate}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summary.improvement > 0 ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                El programa ha demostrado ser efectivo. Se recomienda continuar con la implementación y documentar las mejores prácticas.
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Se necesitan más datos para evaluar el impacto. Asegúrate de completar evaluaciones ANTES y DESPUÉS de cada ciclo del programa.
              </p>
            </div>
          )}

          {summary.avgParticipation < 80 && (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                La participación puede mejorar. Considera ajustar las dinámicas para hacerlas más atractivas o abordar barreras de participación.
              </p>
            </div>
          )}

          {summary.respectRate < 70 && (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Se recomienda reforzar las reglas de respeto y trabajar en dinámicas que fomentan la escucha activa y el diálogo constructivo.
              </p>
            </div>
          )}

          {summary.improvement > 0 && summary.avgParticipation >= 80 && summary.respectRate >= 70 && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                ¡Excelente trabajo! Todos los indicadores son positivos. Considera compartir esta experiencia con otros centros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <DataManagement />
    </div>
  );
}

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Download, FileText, TrendingUp, Users, Calendar, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import DataManagement from "@/components/DataManagement";

export default function ExecutiveSummary() {
  const { sessions, evaluations } = useEvaluationData();

  const summary = useMemo(() => {
    const totalGroups = new Set(sessions.map((s) => s.group)).size;
    const totalSessions = sessions.length;
    const totalEvaluations = evaluations.length;

    const beforeEvals = evaluations.filter((e) => e.phase === "before");
    const afterEvals = evaluations.filter((e) => e.phase === "after");

    const avgBefore = beforeEvals.length > 0
      ? beforeEvals.reduce((sum, e) => sum + (e.mixedInteractions || 0), 0) / beforeEvals.length
      : 0;

    const avgAfter = afterEvals.length > 0
      ? afterEvals.reduce((sum, e) => sum + (e.mixedInteractionsAfter || 0), 0) / afterEvals.length
      : 0;

    const improvement = avgBefore > 0 ? ((avgAfter - avgBefore) / avgBefore) * 100 : 0;

    const participationRates = evaluations
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

    const highRespect = evaluations.filter((e) => e.respect === "high").length;
    const totalRespectEvals = evaluations.filter((e) => e.respect).length;
    const respectRate = totalRespectEvals > 0 ? (highRespect / totalRespectEvals) * 100 : 0;

    return {
      totalGroups,
      totalSessions,
      totalEvaluations,
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
      improvement: Math.round(improvement),
      avgParticipation: Math.round(avgParticipation),
      respectRate: Math.round(respectRate),
    };
  }, [sessions, evaluations]);

  const exportToText = () => {
    const text = `
RESUMEN EJECUTIVO - PROGRAMA DE CONVIVENCIA INTERCULTURAL
=========================================================

Fecha del reporte: ${new Date().toLocaleDateString("es-ES")}

MÉTRICAS GENERALES
------------------
- Total de grupos: ${summary.totalGroups}
- Total de sesiones: ${summary.totalSessions}
- Total de evaluaciones: ${summary.totalEvaluations}

RESULTADOS DE IMPACTO
---------------------
- Interacciones mixtas ANTES: ${summary.avgBefore} (promedio por 20 min)
- Interacciones mixtas DESPUÉS: ${summary.avgAfter} (promedio por 20 min)
- Mejora: ${summary.improvement > 0 ? "+" : ""}${summary.improvement}%

CALIDAD DEL PROCESO
-------------------
- Participación promedio: ${summary.avgParticipation}%
- Tasa de respeto alto: ${summary.respectRate}%

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
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Resumen Ejecutivo</h1>
          <p className="text-lg text-muted-foreground">
            Visión general del impacto y resultados del programa
          </p>
        </div>
        <Button onClick={exportToText}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

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
                {summary.respectRate >= 70 ? "Ambiente muy positivo" : "Reforzar respeto mutuo"}
              </p>
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
                Se recomienda reforzar las reglas de respeto y trabajar en dinámicas que fomenten la escucha activa y el diálogo constructivo.
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

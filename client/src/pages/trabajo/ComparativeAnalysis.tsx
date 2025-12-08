import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ComparativeAnalysis() {
  const { sessions, evaluations } = useEvaluationData();

  const comparisonData = useMemo(() => {
    const data: Record<string, any> = {};

    sessions.forEach((session) => {
      const groupName = session.group;
      if (!data[groupName]) {
        data[groupName] = {
          group: groupName,
          before: [],
          after: [],
        };
      }

      const sessionEvals = evaluations.filter((e) => e.sessionId === session.id);
      
      sessionEvals.forEach((eval) => {
        if (eval.phase === "before" && eval.mixedInteractions) {
          data[groupName].before.push(eval.mixedInteractions);
        }
        if (eval.phase === "after" && eval.mixedInteractionsAfter) {
          data[groupName].after.push(eval.mixedInteractionsAfter);
        }
      });
    });

    return Object.values(data).map((item: any) => ({
      group: item.group,
      before: item.before.length > 0 
        ? Math.round(item.before.reduce((a: number, b: number) => a + b, 0) / item.before.length)
        : 0,
      after: item.after.length > 0
        ? Math.round(item.after.reduce((a: number, b: number) => a + b, 0) / item.after.length)
        : 0,
    }));
  }, [sessions, evaluations]);

  const chartData = comparisonData.map((item) => ({
    ...item,
    change: item.after - item.before,
    changePercent: item.before > 0 ? Math.round(((item.after - item.before) / item.before) * 100) : 0,
  }));

  const overallStats = useMemo(() => {
    if (chartData.length === 0) return { avgBefore: 0, avgAfter: 0, avgChange: 0, avgChangePercent: 0 };

    const avgBefore = chartData.reduce((sum, item) => sum + item.before, 0) / chartData.length;
    const avgAfter = chartData.reduce((sum, item) => sum + item.after, 0) / chartData.length;
    const avgChange = avgAfter - avgBefore;
    const avgChangePercent = avgBefore > 0 ? ((avgAfter - avgBefore) / avgBefore) * 100 : 0;

    return {
      avgBefore: Math.round(avgBefore),
      avgAfter: Math.round(avgAfter),
      avgChange: Math.round(avgChange),
      avgChangePercent: Math.round(avgChangePercent),
    };
  }, [chartData]);

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Análisis Comparativo</h1>
        <p className="text-lg text-muted-foreground">
          Comparación de métricas antes y después del programa
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Antes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.avgBefore}</div>
            <p className="text-xs text-muted-foreground">Interacciones mixtas (20 min)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Después</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.avgAfter}</div>
            <p className="text-xs text-muted-foreground">Interacciones mixtas (20 min)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambio Absoluto</CardTitle>
            {getTrendIcon(overallStats.avgChange)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overallStats.avgChange > 0 ? "text-green-600" : overallStats.avgChange < 0 ? "text-red-600" : ""}`}>
              {overallStats.avgChange > 0 ? "+" : ""}{overallStats.avgChange}
            </div>
            <p className="text-xs text-muted-foreground">Diferencia promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambio Porcentual</CardTitle>
            {getTrendIcon(overallStats.avgChangePercent)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overallStats.avgChangePercent > 0 ? "text-green-600" : overallStats.avgChangePercent < 0 ? "text-red-600" : ""}`}>
              {overallStats.avgChangePercent > 0 ? "+" : ""}{overallStats.avgChangePercent}%
            </div>
            <p className="text-xs text-muted-foreground">Mejora relativa</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {chartData.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No hay datos suficientes para mostrar análisis comparativo. 
              Completa evaluaciones ANTES y DESPUÉS para ver los resultados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Bar Chart - Before vs After */}
          <Card>
            <CardHeader>
              <CardTitle>Comparación Antes vs Después por Grupo</CardTitle>
              <CardDescription>Interacciones mixtas observadas (20 minutos)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="#94a3b8" name="Antes" />
                  <Bar dataKey="after" fill="#3b82f6" name="Después" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart - Change */}
          <Card>
            <CardHeader>
              <CardTitle>Cambio en Interacciones por Grupo</CardTitle>
              <CardDescription>Diferencia absoluta (después - antes)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="change" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Cambio"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tabla Detallada de Resultados</CardTitle>
              <CardDescription>Métricas completas por grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Grupo</th>
                      <th className="text-right p-2">Antes</th>
                      <th className="text-right p-2">Después</th>
                      <th className="text-right p-2">Cambio</th>
                      <th className="text-right p-2">% Cambio</th>
                      <th className="text-center p-2">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((item) => (
                      <tr key={item.group} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{item.group}</td>
                        <td className="text-right p-2">{item.before}</td>
                        <td className="text-right p-2">{item.after}</td>
                        <td className={`text-right p-2 font-semibold ${item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : ""}`}>
                          {item.change > 0 ? "+" : ""}{item.change}
                        </td>
                        <td className={`text-right p-2 font-semibold ${item.changePercent > 0 ? "text-green-600" : item.changePercent < 0 ? "text-red-600" : ""}`}>
                          {item.changePercent > 0 ? "+" : ""}{item.changePercent}%
                        </td>
                        <td className="text-center p-2">
                          {getTrendIcon(item.change)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

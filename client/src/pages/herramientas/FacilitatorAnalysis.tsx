import { useMemo } from "react";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Users, Zap } from "lucide-react";

// Helper function to map qualitative scores to numeric values for averaging
const scoreMap: Record<string, number> = {
  // Tensions
  frequent: 1,
  occasional: 2,
  none: 3,
  // Respect, Openness
  low: 1,
  medium: 2,
  high: 3,
  // Communication
  "very-limited": 1,
  limited: 2,
  frequent: 3,
};

export default function FacilitatorAnalysis() {
  const { sessions, evaluations } = useEvaluationData();

  const facilitatorData = useMemo(() => {
    const data: Record<string, {
      sessionsCount: number;
      totalMixedInteractions: number;
      totalTensionScore: number;
      totalOpennessScore: number;
      totalCommunicationScore: number;
      evaluationCount: number;
    }> = {};

    sessions.forEach(session => {
      const facilitator = session.facilitator || "Sin Facilitador";
      if (!data[facilitator]) {
        data[facilitator] = {
          sessionsCount: 0,
          totalMixedInteractions: 0,
          totalTensionScore: 0,
          totalOpennessScore: 0,
          totalCommunicationScore: 0,
          evaluationCount: 0,
        };
      }
      data[facilitator].sessionsCount++;

      const sessionEvals = evaluations.filter(e => e.sessionId === session.id);
      data[facilitator].evaluationCount += sessionEvals.length;

      sessionEvals.forEach(evaluation => {
        // Mixed Interactions (using before/after)
        data[facilitator].totalMixedInteractions += (evaluation.mixedInteractions || 0) + (evaluation.mixedInteractionsAfter || 0);

        // Tension Score (using before/during)
        if (evaluation.phase === 'before' || evaluation.phase === 'during') {
          data[facilitator].totalTensionScore += scoreMap[evaluation.tensions] || 0;
        }

        // Openness Score (using during)
        if (evaluation.phase === 'during') {
          data[facilitator].totalOpennessScore += scoreMap[evaluation.openness] || 0;
        }

        // Communication Score (using before)
        if (evaluation.phase === 'before') {
          data[facilitator].totalCommunicationScore += scoreMap[evaluation.communication] || 0;
        }
      });
    });

    // Calculate averages
    return Object.entries(data).map(([facilitator, metrics]) => {
      const avgTension = metrics.totalTensionScore / (metrics.evaluationCount || 1);
      const avgOpenness = metrics.totalOpennessScore / (metrics.evaluationCount || 1);
      const avgCommunication = metrics.totalCommunicationScore / (metrics.evaluationCount || 1);

      return {
        facilitator,
        sessionsCount: metrics.sessionsCount,
        evaluationCount: metrics.evaluationCount,
        avgMixedInteractions: (metrics.totalMixedInteractions / (metrics.evaluationCount || 1)).toFixed(1),
        avgTension: avgTension.toFixed(2),
        avgOpenness: avgOpenness.toFixed(2),
        avgCommunication: avgCommunication.toFixed(2),
        tensionReduction: ((3 - avgTension) / 3 * 100).toFixed(0) + '%', // Higher score is better (less tension)
      };
    }).sort((a, b) => b.sessionsCount - a.sessionsCount); // Sort by sessions count
  }, [sessions, evaluations]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Análisis Comparativo por Facilitador</h1>
        <p className="text-lg text-muted-foreground">
          Compara el rendimiento y los resultados clave entre los diferentes facilitadores del programa.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Métricas Clave por Facilitador
          </CardTitle>
        </CardHeader>
        <CardContent>
          {facilitatorData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay datos suficientes para realizar el análisis comparativo.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facilitador</TableHead>
                  <TableHead className="text-center">Sesiones</TableHead>
                  <TableHead className="text-center">Evaluaciones</TableHead>
                  <TableHead className="text-center">Interacciones Mixtas (Avg)</TableHead>
                  <TableHead className="text-center">Tensión (Avg Score)</TableHead>
                  <TableHead className="text-center">Apertura (Avg Score)</TableHead>
                  <TableHead className="text-center">Reducción de Tensión</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilitatorData.map((data) => (
                  <TableRow key={data.facilitator}>
                    <TableCell className="font-medium">{data.facilitator}</TableCell>
                    <TableCell className="text-center">{data.sessionsCount}</TableCell>
                    <TableCell className="text-center">{data.evaluationCount}</TableCell>
                    <TableCell className="text-center">{data.avgMixedInteractions}</TableCell>
                    <TableCell className="text-center">{data.avgTension}</TableCell>
                    <TableCell className="text-center">{data.avgOpenness}</TableCell>
                    <TableCell className="text-center font-semibold">{data.tensionReduction}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

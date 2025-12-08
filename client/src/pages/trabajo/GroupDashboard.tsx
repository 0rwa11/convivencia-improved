import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Users, TrendingUp, Calendar, BarChart3 } from "lucide-react";

export default function GroupDashboard() {
  const { sessions, evaluations } = useEvaluationData();

  const groupStats = useMemo(() => {
    const stats: Record<string, any> = {};

    sessions.forEach((session) => {
      const groupName = session.group;
      if (!stats[groupName]) {
        stats[groupName] = {
          name: groupName,
          sessionCount: 0,
          evaluationCount: 0,
          facilitators: new Set(),
          lastSession: session.date,
          mixedInteractionsBefore: [],
          mixedInteractionsAfter: [],
        };
      }

      stats[groupName].sessionCount += 1;
      stats[groupName].facilitators.add(session.facilitator);

      if (new Date(session.date) > new Date(stats[groupName].lastSession)) {
        stats[groupName].lastSession = session.date;
      }

      const sessionEvals = evaluations.filter((e) => e.sessionId === session.id);
      stats[groupName].evaluationCount += sessionEvals.length;

      sessionEvals.forEach((eval) => {
        if (eval.phase === "before" && eval.mixedInteractions) {
          stats[groupName].mixedInteractionsBefore.push(eval.mixedInteractions);
        }
        if (eval.phase === "after" && eval.mixedInteractionsAfter) {
          stats[groupName].mixedInteractionsAfter.push(eval.mixedInteractionsAfter);
        }
      });
    });

    return Object.values(stats);
  }, [sessions, evaluations]);

  const calculateProgress = (group: any) => {
    const before = group.mixedInteractionsBefore.length > 0
      ? group.mixedInteractionsBefore.reduce((a: number, b: number) => a + b, 0) / group.mixedInteractionsBefore.length
      : 0;
    const after = group.mixedInteractionsAfter.length > 0
      ? group.mixedInteractionsAfter.reduce((a: number, b: number) => a + b, 0) / group.mixedInteractionsAfter.length
      : 0;

    if (before === 0) return 0;
    return Math.round(((after - before) / before) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard de Grupos</h1>
        <p className="text-lg text-muted-foreground">
          Visión general del progreso y métricas de cada grupo
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Grupos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupStats.length}</div>
            <p className="text-xs text-muted-foreground">Grupos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Sesiones</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">Sesiones registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Evaluaciones</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluations.length}</div>
            <p className="text-xs text-muted-foreground">Evaluaciones completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio de Progreso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupStats.length > 0
                ? Math.round(
                    groupStats.reduce((sum, g) => sum + calculateProgress(g), 0) / groupStats.length
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Mejora en interacciones</p>
          </CardContent>
        </Card>
      </div>

      {/* Group Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Grupos Individuales</h2>
        {groupStats.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No hay grupos registrados aún. Crea una sesión en el Registro de Evaluaciones para comenzar.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupStats.map((group) => {
              const progress = calculateProgress(group);
              const progressColor = progress > 0 ? "text-green-600" : progress < 0 ? "text-red-600" : "text-gray-600";

              return (
                <Card key={group.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{group.name}</CardTitle>
                      <Badge variant={progress > 0 ? "default" : "secondary"}>
                        {progress > 0 ? "+" : ""}{progress}%
                      </Badge>
                    </div>
                    <CardDescription>Última sesión: {group.lastSession}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sesiones</p>
                        <p className="text-2xl font-bold">{group.sessionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Evaluaciones</p>
                        <p className="text-2xl font-bold">{group.evaluationCount}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Facilitadores</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(group.facilitators).map((facilitator: any) => (
                          <Badge key={facilitator} variant="outline" className="text-xs">
                            {facilitator}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {(group.mixedInteractionsBefore.length > 0 || group.mixedInteractionsAfter.length > 0) && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-semibold mb-2">Interacciones Mixtas</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Antes</p>
                            <p className="font-bold">
                              {group.mixedInteractionsBefore.length > 0
                                ? Math.round(
                                    group.mixedInteractionsBefore.reduce((a: number, b: number) => a + b, 0) /
                                      group.mixedInteractionsBefore.length
                                  )
                                : "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Después</p>
                            <p className={`font-bold ${progressColor}`}>
                              {group.mixedInteractionsAfter.length > 0
                                ? Math.round(
                                    group.mixedInteractionsAfter.reduce((a: number, b: number) => a + b, 0) /
                                      group.mixedInteractionsAfter.length
                                  )
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

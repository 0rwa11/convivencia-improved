import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Heart, Target, Globe, Zap, Download, FileText } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import jsPDF from "jspdf";
import { toast } from "sonner";

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function ImpactDashboard() {
  const { sessions, sessionEvaluations, programEvaluations } = useEvaluationData();

  // --- Core Metrics Calculation ---
  const metrics = useMemo(() => {
    // 1. Total Participants (More realistic estimation)
    const uniqueGroups = new Set(sessions.map(s => s.group));
    const nationalitiesCount = uniqueGroups.size;
    // Assuming a fixed average of 15 participants per unique group
    const totalParticipants = nationalitiesCount * 15; 

    const initialEvals = sessionEvaluations.filter(e => e.phase === "initial");
    const followupEvals = sessionEvaluations.filter(e => e.phase === "followup");
    const finalImpactEval = programEvaluations[programEvaluations.length - 1]; // Use the latest final impact evaluation

    // 2. Completion Rate (Based on sessions with at least one followup evaluation)
    const sessionsWithFollowup = sessions.filter(s => {
      return sessionEvaluations.some(e => e.sessionId === s.id && e.phase === "followup");
    }).length;
    const completionRate = sessions.length > 0 
      ? Math.round((sessionsWithFollowup / sessions.length) * 100)
      : 0;

    // 3. Average Satisfaction (Based on respect + openness + laughter in followup evals)
    const satisfactionScores = followupEvals.map(e => {
      let score = 0;
      if (e.respect === "high") score += 33;
      else if (e.respect === "medium") score += 20;
      
      if (e.openness === "high") score += 33;
      else if (e.openness === "medium") score += 20;
      
      if (e.laughter === "frequent") score += 34;
      else if (e.laughter === "occasional") score += 20;
      
      return score;
    });

    const avgSatisfaction = satisfactionScores.length > 0
      ? Math.round(satisfactionScores.reduce((sum, s) => sum + s, 0) / satisfactionScores.length)
      : 0;

    // 4. Stereotype Reduction (Based on final impact evaluation)
    const stereotypeReduction = finalImpactEval?.groupingAfter === "mixed" 
      ? 85 // High impact proxy
      : finalImpactEval?.groupingAfter === "partial" 
      ? 50 // Medium impact proxy
      : 20; // Low impact proxy

    // 5. Empathy Increase (Based on final impact evaluation)
    const empathyIncrease = finalImpactEval?.mixedInteractionsAfter && finalImpactEval.mixedInteractionsAfter > 5
      ? 75 // High impact proxy
      : finalImpactEval?.mixedInteractionsAfter && finalImpactEval.mixedInteractionsAfter > 2
      ? 40 // Medium impact proxy
      : 15; // Low impact proxy

    return {
      totalParticipants,
      completionRate,
      avgSatisfaction,
      nationalitiesCount,
      stereotypeReduction: Math.max(stereotypeReduction, 0),
      empathyIncrease: Math.max(empathyIncrease, 0),
    };
  }, [sessions, sessionEvaluations, programEvaluations]);

  // --- Data for Charts ---

  // 1. Participation data by session (using followup evaluations)
  const participationData = useMemo(() => {
    return sessions.slice(0, 10).map((session, index) => {
      const sessionEvals = sessionEvaluations.filter(e => e.sessionId === session.id);
      const followupEval = sessionEvals.find(e => e.phase === "followup");
      
      let participationScore = 0;
      if (followupEval?.participation === "100") participationScore = 100;
      else if (followupEval?.participation === "80-99") participationScore = 90;
      else if (followupEval?.participation === "50-79") participationScore = 65;
      else if (followupEval?.participation === "0-49") participationScore = 25;

      return {
        session: `Sesión ${index + 1}`,
        participation: participationScore,
      };
    });
  }, [sessions, sessionEvaluations]);

  // 2. Satisfaction distribution (using followup evaluations)
  const satisfactionData = useMemo(() => {
    const followupEvals = sessionEvaluations.filter(e => e.phase === "followup");
    
    let verySatisfied = 0;
    let satisfied = 0;
    let neutral = 0;

    followupEvals.forEach(e => {
      const score = 
        (e.respect === "high" ? 1 : e.respect === "medium" ? 0.5 : 0) +
        (e.openness === "high" ? 1 : e.openness === "medium" ? 0.5 : 0) +
        (e.laughter === "frequent" ? 1 : e.laughter === "occasional" ? 0.5 : 0);

      if (score >= 2.5) verySatisfied++;
      else if (score >= 1.5) satisfied++;
      else neutral++;
    });

    const total = verySatisfied + satisfied + neutral || 1;

    return [
      { name: "Muy Satisfecho", value: Math.round((verySatisfied / total) * 100), color: COLORS[0] },
      { name: "Satisfecho", value: Math.round((satisfied / total) * 100), color: COLORS[1] },
      { name: "Neutral", value: Math.round((neutral / total) * 100), color: COLORS[2] },
    ];
  }, [sessionEvaluations]);

  // 3. Impact metrics (using final program evaluation)
  const impactMetrics = useMemo(() => {
    const finalEval = programEvaluations[programEvaluations.length - 1];

    // Reducción de Estereotipos: Proxy is the percentage of 'mixed' grouping in final eval
    const stereotypeReduction = finalEval?.groupingAfter === "mixed" 
      ? 85 
      : finalEval?.groupingAfter === "partial" 
      ? 50 
      : 20; 

    // Aumento de Empatía: Proxy is the number of mixed interactions in final eval
    const empathyIncrease = finalEval?.mixedInteractionsAfter && finalEval.mixedInteractionsAfter > 5
      ? 75 
      : finalEval?.mixedInteractionsAfter && finalEval.mixedInteractionsAfter > 2
      ? 40 
      : 15; 

    // Fortalecimiento Comunitario: Proxy is the number of products completed
    const communityStrength = finalEval?.productsCompleted && finalEval.productsCompleted > 2
      ? 80
      : finalEval?.productsCompleted && finalEval.productsCompleted > 0
      ? 50
      : 10;

    // Desarrollo de Habilidades: Proxy is the participant representation
    const skillsDevelopment = finalEval?.participantRepresentation && finalEval.participantRepresentation > 5
      ? 90
      : finalEval?.participantRepresentation && finalEval.participantRepresentation > 0
      ? 60
      : 30;

    return [
      { name: "Reducción de Estereotipos", value: stereotypeReduction, color: COLORS[3] },
      { name: "Aumento de Empatía", value: empathyIncrease, color: COLORS[4] },
      { name: "Fortalecimiento Comunitario", value: communityStrength, color: COLORS[5] },
      { name: "Desarrollo de Habilidades", value: skillsDevelopment, color: COLORS[2] },
    ];
  }, [programEvaluations]);

  // 4. Demographics data (estimated from unique groups)
  const demographicsData = useMemo(() => {
    const groups = sessions.map(s => s.group);
    const uniqueGroups = Array.from(new Set(groups));

    // Create demographic distribution based on groups
    const demographics = uniqueGroups.map((group) => {
      // Use a fixed estimation for participants per group
      const participants = 15; 
      return {
        country: group,
        participants: participants,
        percentage: 0,
      };
    });

    const total = demographics.reduce((sum, d) => sum + d.participants, 0) || 1;

    return demographics.map(d => ({
      ...d,
      percentage: Math.round((d.participants / total) * 100),
    }));
  }, [sessions]);

  // --- PDF Export Logic ---
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Dashboard de Impacto del Programa", 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha de Reporte: ${new Date().toLocaleDateString()}`, 10, 30);

    let y = 40;

    // Resumen de Métricas Clave
    doc.setFontSize(16);
    doc.text("Métricas Clave", 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Participantes Estimados: ${metrics.totalParticipants}`, 10, y);
    doc.text(`Grupos/Nacionalidades: ${metrics.nationalitiesCount}`, 100, y);
    y += 7;
    doc.text(`Tasa de Finalización: ${metrics.completionRate}%`, 10, y);
    doc.text(`Satisfacción Promedio: ${metrics.avgSatisfaction}%`, 100, y);
    y += 7;
    doc.text(`Reducción de Estereotipos (Proxy): ${metrics.stereotypeReduction}%`, 10, y);
    doc.text(`Aumento de Empatía (Proxy): ${metrics.empathyIncrease}%`, 100, y);
    y += 10;

    // Indicadores de Impacto
    doc.setFontSize(16);
    doc.text("Indicadores de Impacto (Final)", 10, y);
    y += 10;
    impactMetrics.forEach(m => {
      doc.setFontSize(12);
      doc.text(`${m.name}: ${m.value}%`, 10, y);
      y += 7;
    });
    y += 5;

    // Demografía
    doc.setFontSize(16);
    doc.text("Demografía (Estimada por Grupos)", 10, y);
    y += 10;
    demographicsData.forEach(d => {
      doc.setFontSize(12);
      doc.text(`${d.country}: ${d.participants} participantes (${d.percentage}%)`, 10, y);
      y += 7;
    });
    y += 5;

    doc.save("Impacto_Dashboard.pdf");
    toast.success("Dashboard exportado a PDF exitosamente.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard de Impacto</h1>
          <p className="text-lg text-muted-foreground">
            Visualización del impacto general del programa basada en las evaluaciones de sesión y el impacto final.
          </p>
        </div>
        <Button onClick={exportToPDF} className="gap-2">
          <Download className="w-4 h-4" />
          Exportar a PDF
        </Button>
      </div>

      {/* Resumen de Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Estimados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">
              Basado en {metrics.nationalitiesCount} grupos únicos (est. 15/grupo)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Finalización</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Sesiones con al menos una evaluación de seguimiento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción Promedio</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Basado en respeto, apertura y ambiente lúdico
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos/Nacionalidades</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.nationalitiesCount}</div>
            <p className="text-xs text-muted-foreground">
              Grupos únicos registrados en las sesiones
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Impacto */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Impacto (Final)</CardTitle>
          <CardDescription>Métricas clave basadas en la última Evaluación de Impacto Final.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                <div className="text-3xl font-bold text-primary mt-1">{metric.value}%</div>
                <Badge variant="secondary" className="mt-2">
                  {metric.value > 50 ? "Alto Impacto" : "Impacto Moderado"}
                </Badge>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Distribución Demográfica</CardTitle>
            <CardDescription>Estimación de participantes por grupo/nacionalidad.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  dataKey="participants"
                  nameKey="country"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nivel de Satisfacción</CardTitle>
            <CardDescription>Distribución de las evaluaciones de seguimiento por nivel de satisfacción.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Porcentaje" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Participación por Sesión */}
      <Card>
        <CardHeader>
          <CardTitle>Participación por Sesión</CardTitle>
          <CardDescription>Porcentaje de participación estimado en las últimas 10 sesiones.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="participation" name="Participación Estimada" stroke={COLORS[3]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

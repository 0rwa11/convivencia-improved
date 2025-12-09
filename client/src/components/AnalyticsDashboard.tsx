import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, BarChart3, TrendingUp, Users, FileText, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEvaluationData } from '@/hooks/useEvaluationData';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AnalyticsDashboard() {
  const { sessions, sessionEvaluations } = useEvaluationData();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Get unique groups
  const groups = useMemo(() => {
    return Array.from(new Set(sessions.map(s => s.group)));
  }, [sessions]);

  // Filter evaluations based on selections
  const filteredEvaluations = useMemo(() => {
    return sessionEvaluations.filter(e => {
      const session = sessions.find(s => s.id === e.sessionId);
      const groupMatch = selectedGroup === "all" || session?.group === selectedGroup;
      const phaseMatch = selectedPhase === "all" || e.phase === selectedPhase;
      return groupMatch && phaseMatch;
    });
  }, [sessionEvaluations, sessions, selectedGroup, selectedPhase]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEvaluations = filteredEvaluations.length;
    const initialEvals = filteredEvaluations.filter(e => e.phase === "initial");
    const followupEvals = filteredEvaluations.filter(e => e.phase === "followup");

    // Mixed interactions analysis
    const avgMixedInitial = initialEvals.length > 0
      ? initialEvals.reduce((sum, e) => sum + (e.mixedInteractions || 0), 0) / initialEvals.length
      : 0;
    
    // For session-level analysis, we compare initial to followup
    const avgMixedFollowup = followupEvals.length > 0
      ? followupEvals.reduce((sum, e) => sum + (e.mixedInteractions || 0), 0) / followupEvals.length
      : 0;

    const improvement = avgMixedInitial > 0 
      ? ((avgMixedFollowup - avgMixedInitial) / avgMixedInitial) * 100 
      : 0;

    // Participation analysis (using followup evals)
    const participationScores = followupEvals
      .filter(e => e.participation)
      .map(e => {
        if (e.participation === "100") return 100;
        if (e.participation === "80-99") return 90;
        if (e.participation === "50-79") return 70;
        return 50; // 0-49
      });

    const avgParticipation = participationScores.length > 0
      ? participationScores.reduce((sum, p) => sum + p, 0) / participationScores.length
      : 0;

    // Respect analysis (using followup evals)
    const highRespect = followupEvals.filter(e => e.respect === "high").length;
    const totalRespect = followupEvals.filter(e => e.respect).length;
    const respectRate = totalRespect > 0 ? (highRespect / totalRespect) * 100 : 0;

    // Grouping analysis
    const groupingData = {
      separated: filteredEvaluations.filter(e => e.grouping === "separated").length,
      partial: filteredEvaluations.filter(e => e.grouping === "partial").length,
      mixed: filteredEvaluations.filter(e => e.grouping === "mixed").length,
    };

    // Tensions analysis
    const tensionsData = {
      frequent: filteredEvaluations.filter(e => e.tensions === "frequent").length,
      occasional: filteredEvaluations.filter(e => e.tensions === "occasional").length,
      none: filteredEvaluations.filter(e => e.tensions === "none").length,
    };

    // Communication analysis
    const communicationData = {
      "very-limited": filteredEvaluations.filter(e => e.communication === "very-limited").length,
      limited: filteredEvaluations.filter(e => e.communication === "limited").length,
      frequent: filteredEvaluations.filter(e => e.communication === "frequent").length,
    };

    return {
      totalEvaluations,
      initialCount: initialEvals.length,
      followupCount: followupEvals.length,
      avgMixedInitial: Math.round(avgMixedInitial),
      avgMixedFollowup: Math.round(avgMixedFollowup),
      improvement: Math.round(improvement),
      avgParticipation: Math.round(avgParticipation),
      respectRate: Math.round(respectRate),
      groupingData,
      tensionsData,
      communicationData,
    };
  }, [filteredEvaluations]);

  // Prepare chart data
  const phaseDistributionData = [
    { name: "INICIAL", value: stats.initialCount, color: COLORS[0] },
    { name: "SEGUIMIENTO", value: stats.followupCount, color: COLORS[1] },
  ];

  const groupingChartData = [
    { name: "Muy separados", value: stats.groupingData.separated },
    { name: "Parcialmente separados", value: stats.groupingData.partial },
    { name: "Mixtos", value: stats.groupingData.mixed },
  ];

  const tensionsChartData = [
    { name: "Frecuentes", value: stats.tensionsData.frequent },
    { name: "Ocasionales", value: stats.tensionsData.occasional },
    { name: "Ninguna", value: stats.tensionsData.none },
  ];

  const communicationChartData = [
    { name: "Muy limitada", value: stats.communicationData["very-limited"] },
    { name: "Limitada", value: stats.communicationData.limited },
    { name: "Frecuente", value: stats.communicationData.frequent },
  ];

  const impactComparisonData = [
    { phase: "INICIAL", interactions: stats.avgMixedInitial },
    { phase: "SEGUIMIENTO", interactions: stats.avgMixedFollowup },
  ];

  // Group comparison data
  const groupComparisonData = useMemo(() => {
    return groups.map(group => {
      const groupSessions = sessions.filter(s => s.group === group);
      const groupEvals = sessionEvaluations.filter(evaluation => 
        groupSessions.some(s => s.id === evaluation.sessionId)
      );

      const initialEvals = groupEvals.filter(evaluation => evaluation.phase === "initial");
      const followupEvals = groupEvals.filter(evaluation => evaluation.phase === "followup");

      const avgInitial = initialEvals.length > 0
        ? initialEvals.reduce((sum, evaluation) => sum + (evaluation.mixedInteractions || 0), 0) / initialEvals.length
        : 0;

      const avgFollowup = followupEvals.length > 0
        ? followupEvals.reduce((sum, evaluation) => sum + (evaluation.mixedInteractions || 0), 0) / followupEvals.length
        : 0;

      return {
        group,
        initial: Math.round(avgInitial),
        followup: Math.round(avgFollowup),
        evaluaciones: groupEvals.length,
      };
    });
  }, [groups, sessions, sessionEvaluations]);

  // Timeline data - evaluations over time
  const timelineData = useMemo(() => {
    const sortedEvals = [...filteredEvaluations].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const grouped = sortedEvals.reduce((acc, evaluation) => {
      const date = new Date(evaluation.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      if (!acc[date]) {
        acc[date] = { date, count: 0 };
      }
      acc[date].count++;
      return acc;
    }, {} as Record<string, { date: string; count: number }>);

    return Object.values(grouped);
  }, [filteredEvaluations]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Reporte de Análisis Estadístico', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 30);
    doc.text(`Grupo: ${selectedGroup === 'all' ? 'Todos' : selectedGroup}`, 20, 37);
    doc.text(`Fase: ${selectedPhase === 'all' ? 'Todas' : selectedPhase}`, 20, 44);
    
    doc.setFontSize(14);
    doc.text('Métricas Generales', 20, 60);
    
    doc.setFontSize(10);
    let y = 70;
    doc.text(`Total de evaluaciones de sesión: ${stats.totalEvaluations}`, 25, y);
    y += 7;
    doc.text(`Evaluaciones INICIAL: ${stats.initialCount}`, 25, y);
    y += 7;
    doc.text(`Evaluaciones SEGUIMIENTO: ${stats.followupCount}`, 25, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.text('Resultados de Impacto (Sesión)', 20, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.text(`Interacciones mixtas INICIAL: ${stats.avgMixedInitial}`, 25, y);
    y += 7;
    doc.text(`Interacciones mixtas SEGUIMIENTO: ${stats.avgMixedFollowup}`, 25, y);
    y += 7;
    doc.text(`Mejora: ${stats.improvement > 0 ? '+' : ''}${stats.improvement}%`, 25, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.text('Calidad del Proceso (Seguimiento)', 20, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.text(`Participación promedio: ${stats.avgParticipation}%`, 25, y);
    y += 7;
    doc.text(`Tasa de respeto alto: ${stats.respectRate}%`, 25, y);
    y += 15;
    
    doc.setFontSize(14);
    doc.text('Comparación por Grupo', 20, y);
    y += 10;
    
    doc.setFontSize(10);
    groupComparisonData.forEach(group => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${group.group}: INICIAL=${group.initial}, SEGUIMIENTO=${group.followup}, Evals=${group.evaluaciones}`, 25, y);
      y += 7;
    });
    
    doc.save(`analisis-estadistico-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF exportado exitosamente');
  };

  const exportToCSV = () => {
    const headers = ['Grupo', 'Interacciones INICIAL', 'Interacciones SEGUIMIENTO', 'Total Evaluaciones'];
    const rows = groupComparisonData.map(g => [g.group, g.initial, g.followup, g.evaluaciones]);
    
    const csv = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis-estadistico-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('CSV exportado exitosamente');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Análisis Avanzado de Sesiones</h1>
        <div className="flex space-x-2">
          <Button onClick={exportToPDF} variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filtros de Datos</CardTitle>
          <CardDescription>Selecciona el grupo y la fase para enfocar el análisis.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Filtrar por Grupo</label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los Grupos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Grupos</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Filtrar por Fase</label>
            <Select value={selectedPhase} onValueChange={setSelectedPhase}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las Fases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Fases</SelectItem>
                <SelectItem value="initial">INICIAL</SelectItem>
                <SelectItem value="followup">SEGUIMIENTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Evaluaciones Filtradas</label>
            <div className="text-2xl font-bold pt-1">{stats.totalEvaluations}</div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de Análisis */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
          <TabsTrigger value="indicators">Indicadores</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
        </TabsList>

        {/* 1. Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mejora en Interacciones Mixtas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.improvement > 0 ? '+' : ''}{stats.improvement}%</div>
                <p className="text-xs text-muted-foreground">
                  De {stats.avgMixedInitial} (Inicial) a {stats.avgMixedFollowup} (Seguimiento)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participación Promedio</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgParticipation}%</div>
                <p className="text-xs text-muted-foreground">
                  Basado en evaluaciones de seguimiento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Respeto Alto</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.respectRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Evaluaciones con respeto mutuo 'Alto'
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Fases</CardTitle>
                <CardDescription>Número de evaluaciones por fase.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={phaseDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {phaseDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interacciones Mixtas (Inicial vs. Seguimiento)</CardTitle>
                <CardDescription>Promedio de interacciones mixtas observadas.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={impactComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="interactions" name="Interacciones Mixtas" fill={COLORS[3]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Grupos */}
        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparación de Interacciones por Grupo</CardTitle>
              <CardDescription>Promedio de interacciones mixtas por grupo en las fases Inicial y Seguimiento.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={groupComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="initial" name="INICIAL" fill={COLORS[0]} />
                  <Bar dataKey="followup" name="SEGUIMIENTO" fill={COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Indicadores */}
        <TabsContent value="indicators" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Agrupación por Nacionalidad</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={groupingChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {groupingChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tensiones Observables</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tensionsChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {tensionsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comunicación entre Grupos</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={communicationChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {communicationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 4. Línea de Tiempo */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluaciones Registradas por Día</CardTitle>
              <CardDescription>Volumen de datos de sesión ingresados a lo largo del tiempo.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" name="Evaluaciones" stroke={COLORS[0]} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

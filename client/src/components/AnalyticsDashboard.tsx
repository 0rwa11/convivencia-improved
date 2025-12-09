/**
 * Dashboard de Análisis Avanzados
 * Muestra gráficos, métricas y análisis estadísticos con datos reales
 */

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
  const { sessions, evaluations } = useEvaluationData();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Get unique groups
  const groups = useMemo(() => {
    return Array.from(new Set(sessions.map(s => s.group)));
  }, [sessions]);

  // Filter evaluations based on selections
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(e => {
      const session = sessions.find(s => s.id === e.sessionId);
      const groupMatch = selectedGroup === "all" || session?.group === selectedGroup;
      const phaseMatch = selectedPhase === "all" || e.phase === selectedPhase;
      return groupMatch && phaseMatch;
    });
  }, [evaluations, sessions, selectedGroup, selectedPhase]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEvaluations = filteredEvaluations.length;
    const beforeEvals = filteredEvaluations.filter(e => e.phase === "before");
    const duringEvals = filteredEvaluations.filter(e => e.phase === "during");
    const afterEvals = filteredEvaluations.filter(e => e.phase === "after");

    // Mixed interactions analysis
    const avgMixedBefore = beforeEvals.length > 0
      ? beforeEvals.reduce((sum, e) => sum + (e.mixedInteractions || 0), 0) / beforeEvals.length
      : 0;
    
    const avgMixedAfter = afterEvals.length > 0
      ? afterEvals.reduce((sum, e) => sum + (e.mixedInteractionsAfter || 0), 0) / afterEvals.length
      : 0;

    const improvement = avgMixedBefore > 0 
      ? ((avgMixedAfter - avgMixedBefore) / avgMixedBefore) * 100 
      : 0;

    // Participation analysis
    const participationScores = duringEvals
      .filter(e => e.participation)
      .map(e => {
        if (e.participation === "100") return 100;
        if (e.participation === "80-99") return 90;
        if (e.participation === "60-79") return 70;
        return 50;
      });

    const avgParticipation = participationScores.length > 0
      ? participationScores.reduce((sum, p) => sum + p, 0) / participationScores.length
      : 0;

    // Respect analysis
    const highRespect = duringEvals.filter(e => e.respect === "high").length;
    const totalRespect = duringEvals.filter(e => e.respect).length;
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
      beforeCount: beforeEvals.length,
      duringCount: duringEvals.length,
      afterCount: afterEvals.length,
      avgMixedBefore: Math.round(avgMixedBefore),
      avgMixedAfter: Math.round(avgMixedAfter),
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
    { name: "ANTES", value: stats.beforeCount, color: COLORS[0] },
    { name: "DURANTE", value: stats.duringCount, color: COLORS[1] },
    { name: "DESPUÉS", value: stats.afterCount, color: COLORS[2] },
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
    { phase: "ANTES", interactions: stats.avgMixedBefore },
    { phase: "DESPUÉS", interactions: stats.avgMixedAfter },
  ];

  // Group comparison data
  const groupComparisonData = useMemo(() => {
    return groups.map(group => {
      const groupSessions = sessions.filter(s => s.group === group);
      const groupEvals = evaluations.filter(evaluation => 
        groupSessions.some(s => s.id === evaluation.sessionId)
      );

      const beforeEvals = groupEvals.filter(evaluation => evaluation.phase === "before");
      const afterEvals = groupEvals.filter(evaluation => evaluation.phase === "after");

      const avgBefore = beforeEvals.length > 0
        ? beforeEvals.reduce((sum, evaluation) => sum + (evaluation.mixedInteractions || 0), 0) / beforeEvals.length
        : 0;

      const avgAfter = afterEvals.length > 0
        ? afterEvals.reduce((sum, evaluation) => sum + (evaluation.mixedInteractionsAfter || 0), 0) / afterEvals.length
        : 0;

      return {
        group,
        antes: Math.round(avgBefore),
        despues: Math.round(avgAfter),
        evaluaciones: groupEvals.length,
      };
    });
  }, [groups, sessions, evaluations]);

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
    doc.text(`Total de evaluaciones: ${stats.totalEvaluations}`, 25, y);
    y += 7;
    doc.text(`Evaluaciones ANTES: ${stats.beforeCount}`, 25, y);
    y += 7;
    doc.text(`Evaluaciones DURANTE: ${stats.duringCount}`, 25, y);
    y += 7;
    doc.text(`Evaluaciones DESPUÉS: ${stats.afterCount}`, 25, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.text('Resultados de Impacto', 20, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.text(`Interacciones mixtas ANTES: ${stats.avgMixedBefore}`, 25, y);
    y += 7;
    doc.text(`Interacciones mixtas DESPUÉS: ${stats.avgMixedAfter}`, 25, y);
    y += 7;
    doc.text(`Mejora: ${stats.improvement > 0 ? '+' : ''}${stats.improvement}%`, 25, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.text('Calidad del Proceso', 20, y);
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
      doc.text(`${group.group}: ANTES=${group.antes}, DESPUÉS=${group.despues}, Evals=${group.evaluaciones}`, 25, y);
      y += 7;
    });
    
    doc.save(`analisis-estadistico-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF exportado exitosamente');
  };

  const exportToCSV = () => {
    const headers = ['Grupo', 'Interacciones ANTES', 'Interacciones DESPUÉS', 'Total Evaluaciones'];
    const rows = groupComparisonData.map(g => [g.group, g.antes, g.despues, g.evaluaciones]);
    
    const csv = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis-grupos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exportado exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Análisis Estadístico Avanzado</h1>
          <p className="text-lg text-muted-foreground">
            Visualización y análisis de datos de evaluaciones
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={exportToPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Grupo</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los grupos</SelectItem>
                  {groups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Fase</Label>
              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las fases</SelectItem>
                  <SelectItem value="before">ANTES</SelectItem>
                  <SelectItem value="during">DURANTE</SelectItem>
                  <SelectItem value="after">DESPUÉS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evaluaciones</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.beforeCount} antes, {stats.duringCount} durante, {stats.afterCount} después
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejora en Interacciones</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.improvement > 0 ? 'text-green-600' : ''}`}>
              {stats.improvement > 0 ? '+' : ''}{stats.improvement}%
            </div>
            <p className="text-xs text-muted-foreground">
              De {stats.avgMixedBefore} a {stats.avgMixedAfter}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participación</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgParticipation}%</div>
            <p className="text-xs text-muted-foreground">Promedio general</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respeto Alto</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.respectRate}%</div>
            <p className="text-xs text-muted-foreground">De las sesiones</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analyses */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="groups">Por Grupo</TabsTrigger>
          <TabsTrigger value="indicators">Indicadores</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Fase</CardTitle>
                <CardDescription>Cantidad de evaluaciones por fase</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={phaseDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {phaseDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto: ANTES vs DESPUÉS</CardTitle>
                <CardDescription>Interacciones mixtas promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={impactComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="interactions" fill={COLORS[0]} name="Interacciones" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparación por Grupo</CardTitle>
              <CardDescription>Interacciones mixtas antes y después por grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={groupComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="antes" fill={COLORS[0]} name="ANTES" />
                  <Bar dataKey="despues" fill={COLORS[1]} name="DESPUÉS" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabla de Resultados por Grupo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Grupo</th>
                      <th className="text-right p-2">ANTES</th>
                      <th className="text-right p-2">DESPUÉS</th>
                      <th className="text-right p-2">Mejora</th>
                      <th className="text-right p-2">Evaluaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupComparisonData.map(group => {
                      const mejora = group.antes > 0 
                        ? Math.round(((group.despues - group.antes) / group.antes) * 100)
                        : 0;
                      return (
                        <tr key={group.group} className="border-b">
                          <td className="p-2">{group.group}</td>
                          <td className="text-right p-2">{group.antes}</td>
                          <td className="text-right p-2">{group.despues}</td>
                          <td className={`text-right p-2 ${mejora > 0 ? 'text-green-600' : ''}`}>
                            {mejora > 0 ? '+' : ''}{mejora}%
                          </td>
                          <td className="text-right p-2">{group.evaluaciones}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agrupación por Nacionalidad</CardTitle>
                <CardDescription>Distribución de patrones de agrupación</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={groupingChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tensiones Observadas</CardTitle>
                <CardDescription>Frecuencia de tensiones en las sesiones</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tensionsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS[3]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comunicación Entre Grupos</CardTitle>
                <CardDescription>Nivel de comunicación observado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={communicationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS[4]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluaciones a lo Largo del Tiempo</CardTitle>
              <CardDescription>Cantidad de evaluaciones registradas por fecha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke={COLORS[5]} name="Evaluaciones" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for labels
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

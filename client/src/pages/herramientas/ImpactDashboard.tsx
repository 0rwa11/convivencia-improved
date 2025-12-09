import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Heart, Target, Globe, Zap } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ImpactDashboard() {
  // Sample data for visualizations
  const participationData = [
    { session: "Sesión 1", participants: 18, completed: 16 },
    { session: "Sesión 2", participants: 16, completed: 15 },
    { session: "Sesión 3", participants: 15, completed: 14 }
  ];

  const satisfactionData = [
    { name: "Muy Satisfecho", value: 78, color: "#10b981" },
    { name: "Satisfecho", value: 18, color: "#3b82f6" },
    { name: "Neutral", value: 4, color: "#f59e0b" }
  ];

  const impactMetrics = [
    { name: "Reducción de Estereotipos", value: 85, color: "#ef4444" },
    { name: "Aumento de Empatía", value: 92, color: "#8b5cf6" },
    { name: "Fortalecimiento Comunitario", value: 88, color: "#06b6d4" },
    { name: "Desarrollo de Habilidades", value: 79, color: "#f59e0b" }
  ];

  const timelineData = [
    { week: "Sem 1", stereotypes: 65, empathy: 60, community: 55 },
    { week: "Sem 2", stereotypes: 72, empathy: 75, community: 70 },
    { week: "Sem 3", stereotypes: 85, empathy: 92, community: 88 }
  ];

  const demographicsData = [
    { country: "Colombia", participants: 5, percentage: 33 },
    { country: "Venezuela", participants: 4, percentage: 27 },
    { country: "Siria", participants: 3, percentage: 20 },
    { country: "Otros", participants: 3, percentage: 20 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard de Impacto Comunitario</h1>
        <p className="text-lg text-muted-foreground">
          Visualización del impacto del programa en la comunidad
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-blue-600" />
              Participantes Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">18</div>
            <p className="text-sm text-muted-foreground mt-2">Adultos migrantes</p>
            <Badge className="mt-3 bg-blue-600">Activos</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Tasa de Finalización
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">78%</div>
            <p className="text-sm text-muted-foreground mt-2">14 de 18 participantes</p>
            <Badge className="mt-3 bg-green-600">Excelente</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-purple-600" />
              Satisfacción General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600">96%</div>
            <p className="text-sm text-muted-foreground mt-2">Muy satisfecho o satisfecho</p>
            <Badge className="mt-3 bg-purple-600">Óptimo</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5 text-orange-600" />
              Nacionalidades Representadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600">8</div>
            <p className="text-sm text-muted-foreground mt-2">Países diferentes</p>
            <Badge className="mt-3 bg-orange-600">Diverso</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-red-600" />
              Reducción de Estereotipos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-600">85%</div>
            <p className="text-sm text-muted-foreground mt-2">Mejora medida</p>
            <Badge className="mt-3 bg-red-600">Significativo</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200 dark:border-cyan-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-cyan-600" />
              Aumento de Empatía
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cyan-600">92%</div>
            <p className="text-sm text-muted-foreground mt-2">Mejora medida</p>
            <Badge className="mt-3 bg-cyan-600">Excelente</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Participation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Participación por Sesión</CardTitle>
            <CardDescription>Asistencia y finalización de cada sesión</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="participants" fill="#3b82f6" name="Inscritos" />
                <Bar dataKey="completed" fill="#10b981" name="Completaron" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Satisfaction Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfacción de Participantes</CardTitle>
            <CardDescription>Distribución de niveles de satisfacción</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolución del Impacto</CardTitle>
            <CardDescription>Cambio en indicadores clave a lo largo del programa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stereotypes" stroke="#ef4444" name="Reducción Estereotipos" />
                <Line type="monotone" dataKey="empathy" stroke="#8b5cf6" name="Aumento Empatía" />
                <Line type="monotone" dataKey="community" stroke="#06b6d4" name="Fortalecimiento Comunitario" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Impacto</CardTitle>
          <CardDescription>Medición del logro de objetivos principales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {impactMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{metric.name}</span>
                <span className="text-lg font-bold" style={{ color: metric.color }}>{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Demografía de Participantes</CardTitle>
          <CardDescription>Distribución por país de origen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {demographicsData.map((demo, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{demo.country}</span>
                    <Badge variant="outline">{demo.participants} personas</Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${demo.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{demo.percentage}% del total</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={demographicsData.map(d => ({ name: d.country, value: d.percentage }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle>Resumen del Impacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Alcance:</strong> El programa ha alcanzado a 18 adultos migrantes de 8 países diferentes, con una tasa de finalización del 78%.
          </p>
          <p>
            <strong>Satisfacción:</strong> El 96% de los participantes reportan estar muy satisfechos o satisfechos con el programa.
          </p>
          <p>
            <strong>Impacto Medible:</strong> Se ha documentado una reducción del 85% en estereotipos y un aumento del 92% en empatía entre participantes.
          </p>
          <p>
            <strong>Sostenibilidad:</strong> Se han establecido redes de apoyo comunitario que continuarán más allá del programa formal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

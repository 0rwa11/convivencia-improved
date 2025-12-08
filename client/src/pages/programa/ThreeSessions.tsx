import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Target, Download, Calendar } from "lucide-react";

export default function ThreeSessions() {
  const sessions = [
    {
      number: 1,
      week: "Semana 1",
      title: "Conocernos sin Juicios",
      dynamics: ["El Círculo del Ritmo y la Palabra", "El Termómetro del Estereotipo"],
      objective: "Romper el hielo, empezar a cuestionar estereotipos sobre nacionalidades presentes en el centro",
      duration: "90 minutos",
      participants: "15-20 personas",
      color: "bg-blue-500",
      materials: [
        "Pelota o similar para dinámicas de círculo",
        "Cartulinas de colores",
        "Marcadores permanentes",
        "Tarjetas de estereotipos"
      ],
      pdfLinks: [
        { name: "Afirmaciones Termómetro", file: "S1_Termometro_Afirmaciones.pdf" },
        { name: "Carteles Termómetro", file: "D4_Carteles_Termometro.pdf" },
        { name: "Tarjetas Estereotipos", file: "D4_Termometro_Estereotipo_Tarjetas.pdf" }
      ],
      schedule: [
        { time: "10 min", activity: "Bienvenida y Calentamiento", description: "Actividad lúdica para romper tensión" },
        { time: "35 min", activity: "El Círculo del Ritmo y la Palabra", description: "Dinámica de presentación e integración" },
        { time: "10 min", activity: "Descanso", description: "Pausa para interacción informal" },
        { time: "30 min", activity: "El Termómetro del Estereotipo", description: "Exploración de prejuicios y estereotipos" },
        { time: "5 min", activity: "Cierre y Reflexión", description: "Síntesis de aprendizajes" }
      ]
    },
    {
      number: 2,
      week: "Semana 2",
      title: "Entender Nuestras Diferencias",
      dynamics: ["El Semáforo Cultural", "La Maleta Común"],
      objective: "Explorar diferencias culturales en comportamientos cotidianos, identificar cualidades compartidas",
      duration: "90 minutos",
      participants: "15-20 personas",
      color: "bg-green-500",
      materials: [
        "Cartulinas verde, amarillo y rojo (semáforo)",
        "Tarjetas de afirmaciones culturales",
        "Papel grande para murales",
        "Marcadores de colores"
      ],
      pdfLinks: [
        { name: "Afirmaciones Semáforo-Maleta", file: "S2_Semaforo_Maleta_Afirmaciones.pdf" },
        { name: "Lista Semáforo Cultural", file: "D8_Semaforo_Cultural_Lista.pdf" },
        { name: "Tarjetas Maleta Común", file: "D3_Maleta_Comun_Tarjetas.pdf" },
        { name: "Lista Maleta Común", file: "D3_Maleta_Comun_Lista.pdf" }
      ],
      schedule: [
        { time: "10 min", activity: "Bienvenida y Calentamiento", description: "Recordatorio de la sesión anterior" },
        { time: "35 min", activity: "El Semáforo Cultural", description: "Exploración de diferencias culturales" },
        { time: "10 min", activity: "Descanso", description: "Pausa para interacción informal" },
        { time: "30 min", activity: "La Maleta Común", description: "Identificación de valores compartidos" },
        { time: "5 min", activity: "Cierre y Reflexión", description: "Síntesis de aprendizajes" }
      ]
    },
    {
      number: 3,
      week: "Semana 3",
      title: "Construir Juntos",
      dynamics: ["El Mercado Cultural", "El Árbol de la Contribución Colectiva"],
      objective: "Visualizar cómo cada persona aporta al centro, crear un producto colectivo que celebra la diversidad",
      duration: "90 minutos",
      participants: "15-20 personas",
      color: "bg-purple-500",
      materials: [
        "Papel grande (A2-A1) para el árbol",
        "Témperas o pinturas",
        "Marcadores de colores",
        "Tarjetas de contribuciones",
        "Materiales para decoración"
      ],
      pdfLinks: [
        { name: "Plantilla Árbol de Contribución", file: "D10_Arbol_Contribucion_Plantilla.pdf" },
        { name: "Certificado de Participación", file: "Certificado_Convivencia.pdf" },
        { name: "Pasaporte Convivencia", file: "Pasaporte_Convivencia.pdf" }
      ],
      schedule: [
        { time: "10 min", activity: "Bienvenida y Calentamiento", description: "Celebración del proceso conjunto" },
        { time: "35 min", activity: "El Mercado Cultural", description: "Intercambio de saberes y habilidades" },
        { time: "10 min", activity: "Descanso", description: "Pausa para interacción informal" },
        { time: "30 min", activity: "El Árbol de la Contribución", description: "Creación de producto colectivo" },
        { time: "5 min", activity: "Cierre y Certificación", description: "Entrega de certificados y cierre emocional" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Las Tres Sesiones</h1>
        <p className="text-lg text-muted-foreground">
          Estructura detallada de las tres sesiones del Programa de Convivencia Intercultural
        </p>
      </div>

      {/* Program Structure Overview */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle>Estructura del Programa</CardTitle>
          <CardDescription>3 semanas · 3 sesiones · 9 implementaciones totales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">3 Semanas</p>
              <p className="text-sm text-muted-foreground">Una sesión por semana</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">3 Grupos</p>
              <p className="text-sm text-muted-foreground">15-20 participantes cada uno</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">90 Minutos</p>
              <p className="text-sm text-muted-foreground">Duración de cada sesión</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Calendario de implementación:</strong> Cada sesión se repite 3 veces (una por grupo, una por semana).
              Por ejemplo, en la Semana 1 se implementa la Sesión 1 con los tres grupos (G1, G2, G3).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Sessions */}
      {sessions.map((session) => (
        <Card key={session.number} className="border-l-4" style={{ borderLeftColor: session.color.replace('bg-', '') }}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={session.color}>Sesión {session.number}</Badge>
                  <Badge variant="outline">{session.week}</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{session.title}</CardTitle>
                <CardDescription className="text-base">{session.objective}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Duración</p>
                  <p className="text-sm text-muted-foreground">{session.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Participantes</p>
                  <p className="text-sm text-muted-foreground">{session.participants}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Dinámicas</p>
                  <p className="text-sm text-muted-foreground">{session.dynamics.length} actividades</p>
                </div>
              </div>
            </div>

            {/* Dynamics */}
            <div>
              <h3 className="font-semibold mb-3">Dinámicas Incluidas</h3>
              <div className="space-y-2">
                {session.dynamics.map((dynamic, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-medium">{dynamic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="font-semibold mb-3">Cronograma de la Sesión</h3>
              <div className="space-y-2">
                {session.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-16 text-center">
                      <Badge variant="secondary">{item.time}</Badge>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="font-semibold mb-3">Materiales Necesarios</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {session.materials.map((material, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PDF Downloads */}
            <div>
              <h3 className="font-semibold mb-3">Materiales Descargables</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {session.pdfLinks.map((pdf, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    asChild
                    className="justify-start"
                  >
                    <a
                      href={`/convivencia-fixed/pdfs/${pdf.file}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {pdf.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Methodology Note */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle>Principios Metodológicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <p className="font-semibold">Participación Activa</p>
                <p className="text-sm text-muted-foreground">Todas las actividades requieren movimiento, interacción y expresión</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <p className="font-semibold">Accesibilidad</p>
                <p className="text-sm text-muted-foreground">Diseño sin dependencia de lectoescritura</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <p className="font-semibold">Respeto por la Dignidad</p>
                <p className="text-sm text-muted-foreground">Enfoque en fortalezas, no en vulnerabilidades</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold text-lg">✓</span>
              <div>
                <p className="font-semibold">Seguridad Emocional</p>
                <p className="text-sm text-muted-foreground">Dinámicas que no requieren exposición personal de traumas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

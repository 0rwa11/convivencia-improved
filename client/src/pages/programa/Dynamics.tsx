import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Users, Target, Download, CheckCircle2, AlertCircle, BookOpen, Zap } from "lucide-react";
import { useState } from "react";

export default function Dynamics() {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const dynamics = [
    {
      id: "d1",
      code: "D1.1",
      session: 1,
      title: "El Círculo del Ritmo y la Palabra",
      objective: "Romper el hielo, crear un ambiente lúdico y de confianza, permitir que cada participante se presente de forma no amenazante",
      duration: "15 minutos",
      participants: "15-20 personas",
      materials: ["1 pelota o similar"],
      phases: [
        {
          name: "Presentación",
          time: "5 min",
          description: "Todos los participantes se colocan en círculo de pie. El facilitador explica el juego: una persona comienza con una pregunta personal (NO sobre migración). Por ejemplo: '¿Cuál es tu comida favorita?' o '¿Cuál es tu canción favorita?'. Lanza la pelota a alguien, esa persona responde en voz alta, luego hace una nueva pregunta y lanza la pelota a otro."
        },
        {
          name: "Desarrollo",
          time: "8 min",
          description: "El juego continúa hasta que todos hayan participado al menos 2 veces. Las preguntas pueden ser sobre: comidas, música, deportes, hobbies, familia, sueños, etc. Se genera risa, movimiento y conexión."
        },
        {
          name: "Cierre",
          time: "2 min",
          description: "El facilitador resume: 'Hemos descubierto que aunque somos de diferentes países, compartimos muchas cosas: nos gusta la música, la comida, tenemos familias, tenemos sueños. Eso es importante.'"
        }
      ],
      successIndicators: [
        "100% de participantes lanza/recibe la pelota",
        "Ambiente lúdico y risas presentes",
        "Participantes de diferentes nacionalidades interactúan"
      ],
      pdfLinks: []
    },
    {
      id: "d2",
      code: "D1.2",
      session: 1,
      title: "El Termómetro del Estereotipo",
      objective: "Cuestionar activamente los estereotipos sobre las nacionalidades presentes en el centro, generar reflexión sobre prejuicios",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "3 cartulinas grandes: 'ACUERDO' (verde), 'NO ESTOY SEGURO/A' (amarillo), 'DESACUERDO' (rojo)",
        "40 afirmaciones preparadas",
        "Marcadores"
      ],
      phases: [
        {
          name: "Preparación",
          time: "5 min",
          description: "El facilitador coloca los 3 carteles en 3 puntos diferentes de la sala. Explica: 'Voy a leer afirmaciones sobre personas de diferentes países. Ustedes van a moverse hacia el cartel que representa su opinión: VERDE (ACUERDO), AMARILLO (NO ESTOY SEGURO), ROJO (DESACUERDO)'. Aclara que no hay respuestas correctas o incorrectas."
        },
        {
          name: "Desarrollo",
          time: "25 min",
          description: "El facilitador lee la primera afirmación en voz alta (en español, francés y árabe si es posible). Todos los participantes se mueven hacia el cartel que representa su opinión. El facilitador pregunta a 2-3 personas de cada grupo: '¿Por qué elegiste este cartel?'. Se genera breve diálogo (máximo 2 min por afirmación). Se repite con 10-12 afirmaciones."
        },
        {
          name: "Reflexión",
          time: "5 min",
          description: "El facilitador resume: 'Vimos que hay muchas opiniones diferentes sobre lo mismo. Eso significa que los estereotipos no son verdad. Cada persona es diferente, no importa de dónde venga.'"
        }
      ],
      successIndicators: [
        "80%+ de participantes se mueve activamente entre carteles",
        "Participantes de diferentes nacionalidades están en grupos mixtos",
        "Aumento de respuestas 'NO ESTOY SEGURO' (vs. respuestas extremas)",
        "Diálogo respetuoso sin conflictos"
      ],
      pdfLinks: [
        { name: "Afirmaciones Termómetro", file: "S1_Termometro_Afirmaciones.pdf" },
        { name: "Carteles Termómetro", file: "D4_Carteles_Termometro.pdf" },
        { name: "Tarjetas Estereotipos", file: "D4_Termometro_Estereotipo_Tarjetas.pdf" }
      ]
    },
    {
      id: "d3",
      code: "D2.1",
      session: 2,
      title: "Historias de Vida y Empatía",
      objective: "Promover la empatía a través del conocimiento de historias personales, reducir distancia emocional entre participantes",
      duration: "45 minutos",
      participants: "15-20 personas",
      materials: [
        "Tarjetas con preguntas sobre historias de vida",
        "Papel y bolígrafos",
        "Música suave (opcional)"
      ],
      phases: [
        {
          name: "Preparación",
          time: "5 min",
          description: "Se forma parejas de participantes de diferentes nacionalidades. El facilitador explica: 'Van a compartir una historia personal importante. Pueden hablar sobre: un momento feliz, un desafío que superaron, algo que aprendieron, una persona importante en sus vidas.'"
        },
        {
          name: "Desarrollo",
          time: "30 min",
          description: "Cada pareja se sienta frente a frente. Una persona cuenta su historia (10 min), la otra escucha activamente sin interrumpir. Luego intercambian roles. El facilitador circula para apoyar y crear un ambiente seguro."
        },
        {
          name: "Reflexión Grupal",
          time: "10 min",
          description: "Se reúne el grupo. Se invita a voluntarios a compartir lo que aprendieron de la historia de su pareja. Se destaca: 'Aunque somos de diferentes países, nuestras historias humanas son similares. Todos tenemos alegrías, desafíos y personas que amamos.'"
        }
      ],
      successIndicators: [
        "100% de participantes comparten una historia",
        "Conexión emocional visible entre parejas",
        "Participantes expresan empatía y comprensión",
        "Reducción de barreras de lenguaje o culturales"
      ],
      pdfLinks: []
    },
    {
      id: "d4",
      code: "D2.2",
      session: 2,
      title: "Mapa de Sueños Compartidos",
      objective: "Identificar objetivos y sueños comunes, fortalecer la visión colectiva de la comunidad",
      duration: "40 minutos",
      participants: "15-20 personas",
      materials: [
        "Cartulina grande (1m x 1.5m)",
        "Marcadores de colores",
        "Pegatinas o post-its",
        "Imágenes recortadas de revistas"
      ],
      phases: [
        {
          name: "Inspiración",
          time: "5 min",
          description: "El facilitador pregunta: '¿Cuál es tu sueño para los próximos 5 años?' Cada persona piensa en su respuesta. Se pueden dar ejemplos: educación, trabajo, familia, salud, comunidad."
        },
        {
          name: "Creación Colectiva",
          time: "25 min",
          description: "Todos los participantes escriben o dibujan su sueño en una pegatina y la colocan en el mapa grande. Se agrupan por temas: educación, trabajo, familia, comunidad. El facilitador ayuda a identificar patrones y sueños compartidos."
        },
        {
          name: "Visualización",
          time: "10 min",
          description: "Se observa el mapa completo. El facilitador destaca: 'Vemos que aunque somos de diferentes países, compartimos sueños similares: queremos educación, trabajo digno, familias felices, comunidades seguras. Eso nos une.'"
        }
      ],
      successIndicators: [
        "100% de participantes contribuye con su sueño",
        "Identificación clara de sueños compartidos",
        "Visión colectiva de comunidad fortalecida",
        "Motivación y esperanza visible"
      ],
      pdfLinks: []
    },
    {
      id: "d5",
      code: "D3.1",
      session: 3,
      title: "Compromiso de Acción Comunitaria",
      objective: "Transformar reflexiones en acciones concretas, crear compromisos para fortalecer la comunidad",
      duration: "50 minutos",
      participants: "15-20 personas",
      materials: [
        "Tarjetas de compromiso",
        "Bolígrafos",
        "Caja de compromisos",
        "Certificados de participación"
      ],
      phases: [
        {
          name: "Reflexión Final",
          time: "10 min",
          description: "El facilitador resume lo aprendido en las 3 sesiones: 'Descubrimos que compartimos más de lo que nos diferencia. Vimos nuestras historias, nuestros sueños. Ahora es momento de actuar.'"
        },
        {
          name: "Definición de Compromisos",
          time: "25 min",
          description: "Cada participante escribe un compromiso personal: '¿Qué voy a hacer para fortalecer esta comunidad?' Puede ser: apoyar a un compañero, organizar un evento, enseñar mi idioma, compartir mi cultura, etc. Se recopilan en una caja."
        },
        {
          name: "Celebración y Cierre",
          time: "15 min",
          description: "Se leen algunos compromisos en voz alta. Se entregan certificados de participación. Se celebra el logro colectivo. Se toma una foto grupal. Se intercambian contactos para mantener la red."
        }
      ],
      successIndicators: [
        "100% de participantes define un compromiso",
        "Compromisos son específicos y realizables",
        "Ambiente de celebración y esperanza",
        "Red de contactos establecida"
      ],
      pdfLinks: []
    },
    {
      id: "d6",
      code: "D3.2",
      session: 3,
      title: "Red de Apoyo Mutuo",
      objective: "Crear una red de apoyo sostenible, fortalecer vínculos duraderos entre participantes",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "Hilo o cuerda de colores",
        "Tarjetas con datos de contacto",
        "Teléfono o aplicación de mensajería grupal",
        "Calendario de encuentros futuros"
      ],
      phases: [
        {
          name: "Construcción de la Red",
          time: "15 min",
          description: "Los participantes se colocan en círculo. Se pasa una cuerda de un participante a otro, creando una red física. Cada persona que recibe la cuerda dice: 'Yo apoyo a esta comunidad en...' (educación, trabajo, idioma, etc.). Se crea una red visible de apoyo mutuo."
        },
        {
          name: "Intercambio de Contactos",
          time: "12 min",
          description: "Se intercambian números de teléfono, correos electrónicos, redes sociales. Se crea un grupo de WhatsApp o Telegram para mantener la comunicación. Se establece un calendario de encuentros mensuales."
        },
        {
          name: "Compromiso Grupal",
          time: "8 min",
          description: "Todos repiten juntos: 'Somos una comunidad. Nos apoyamos mutuamente. Juntos somos más fuertes.' Se toma una foto de la red de cuerda como símbolo del compromiso."
        }
      ],
      successIndicators: [
        "100% de participantes intercambia contacto",
        "Grupo de comunicación establecido",
        "Encuentros futuros programados",
        "Sentido de pertenencia a una comunidad"
      ],
      pdfLinks: []
    }
  ];

  const sessionGroups = {
    1: dynamics.filter(d => d.session === 1),
    2: dynamics.filter(d => d.session === 2),
    3: dynamics.filter(d => d.session === 3)
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dinámicas Detalladas</h1>
        <p className="text-lg text-muted-foreground">
          6 dinámicas participativas diseñadas para las 3 sesiones del programa
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Sesión 1: Encuentro
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              2 dinámicas para romper el hielo y cuestionar estereotipos
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Sesión 2: Empatía
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              2 dinámicas para conectar historias y sueños compartidos
            </CardContent>
          </Card>
          <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Sesión 3: Acción
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              2 dinámicas para crear compromisos y redes de apoyo
            </CardContent>
          </Card>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {dynamics.map((dynamic) => (
          <AccordionItem key={dynamic.id} value={dynamic.id} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 text-left flex-1">
                <Badge variant={dynamic.session === 1 ? "default" : dynamic.session === 2 ? "secondary" : "outline"}>
                  {dynamic.code}
                </Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{dynamic.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{dynamic.duration} • {dynamic.participants}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Objetivo</p>
                  <p className="text-sm">{dynamic.objective}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Fases de la Dinámica
                </h4>
                <div className="space-y-4">
                  {dynamic.phases.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{phase.name}</span>
                        <Badge variant="outline">{phase.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Indicadores de Éxito
                </h4>
                <ul className="space-y-2">
                  {dynamic.successIndicators.map((indicator, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {dynamic.pdfLinks.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Recursos Descargables
                  </h4>
                  <div className="space-y-2">
                    {dynamic.pdfLinks.map((link, idx) => (
                      <Button key={idx} variant="outline" size="sm" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        {link.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Notas para Facilitadores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Adaptabilidad:</strong> Todas las dinámicas pueden adaptarse según el tamaño del grupo, el idioma y el contexto cultural.
          </p>
          <p>
            <strong>Seguridad Emocional:</strong> Es fundamental crear un ambiente seguro donde los participantes se sientan cómodos compartiendo.
          </p>
          <p>
            <strong>Inclusión:</strong> Asegúrese de que todos puedan participar, independientemente de su nivel de idioma o habilidades.
          </p>
          <p>
            <strong>Seguimiento:</strong> Después de cada sesión, recopile retroalimentación para mejorar futuras dinámicas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

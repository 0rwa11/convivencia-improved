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
        { name: "Carteles Termómetro", file: "D4_Carteles_Termometro.pdf" },
        { name: "Tarjetas Estereotipos", file: "D4_Termometro_Estereotipo_Tarjetas.pdf" }
      ]
    },
    {
      id: "d3",
      code: "D2.1",
      session: 2,
      title: "El Semáforo Cultural",
      objective: "Identificar y respetar diferencias culturales en normas de convivencia cotidiana sin juzgamientos",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "3 carteles grandes: 'NORMAL EN MI CULTURA' (verde), 'DEPENDE' (amarillo), 'POCO COMÚN' (rojo)",
        "40 comportamientos/frases preparadas",
        "Marcadores"
      ],
      phases: [
        {
          name: "Preparación",
          time: "5 min",
          description: "El facilitador coloca los 3 carteles en 3 puntos de la sala. Explica: 'Voy a leer comportamientos o formas de actuar. Ustedes van a decir si es normal, depende, o poco común en su cultura: VERDE: Normal en mi cultura, AMARILLO: Depende de la situación, ROJO: Poco común en mi cultura'. Aclara: 'Todas las culturas son válidas. No hay culturas mejores o peores.'"
        },
        {
          name: "Desarrollo",
          time: "25 min",
          description: "El facilitador lee el primer comportamiento (ej. 'Hablar fuerte en grupo'). Todos se mueven hacia el cartel que corresponde. El facilitador pregunta a 2-3 personas: '¿Por qué elegiste este cartel? ¿Cómo es en tu cultura?'. Se genera breve diálogo. Se repite con 10-12 comportamientos."
        },
        {
          name: "Reflexión",
          time: "5 min",
          description: "Facilitador: 'Vimos que hay muchas formas diferentes de hacer las cosas. Todas son válidas. En el centro, necesitamos respetar estas diferencias.'"
        }
      ],
      successIndicators: [
        "80%+ participación activa",
        "Grupos mixtos en cada cartel",
        "Diálogo respetuoso",
        "Reconocimiento de validez de diferentes culturas"
      ],
      pdfLinks: []
    },
    {
      id: "d4",
      code: "D2.2",
      session: 2,
      title: "La Maleta Común",
      objective: "Deconstruir estereotipos negativos y reconocer cualidades humanas compartidas",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "1 maleta o mochila (real o representada con papel)",
        "40 estereotipos negativos (tarjetas)",
        "40 cualidades positivas (tarjetas)",
        "Papel grande (A2) para crear un 'mural de cualidades'",
        "Marcadores"
      ],
      phases: [
        {
          name: "Desempacar Estereotipos",
          time: "15 min",
          description: "El facilitador presenta la maleta: 'Esta maleta está llena de cosas que la gente dice sobre migrantes. Vamos a desempacar y tirar lo que no queremos.' Lee un estereotipo en voz alta (ej. 'Los migrantes solo quieren dinero'). Pregunta: '¿Es verdad? ¿Alguien aquí solo quiere dinero? ¿O quieren otras cosas también?'. Genera breve diálogo (1-2 min). Hace un gesto simbólico de 'tirar' el estereotipo. Repite con 8-10 estereotipos."
        },
        {
          name: "Reempacar Cualidades",
          time: "15 min",
          description: "El facilitador dice: 'Ahora vamos a llenar la maleta con cosas REALES que ustedes traen.' Lee una cualidad positiva (ej. 'Mi sonrisa', 'Mi fuerza', 'Mi esperanza'). Pregunta: '¿Quién trae esto al centro? ¿Todos?'. Genera breve diálogo. Hace gesto simbólico de 'meter' la cualidad en la maleta. Repite con 8-10 cualidades."
        },
        {
          name: "Cierre",
          time: "5 min",
          description: "El facilitador cierra la maleta: 'La maleta ahora está llena de lo que REALMENTE ustedes traen. Eso es lo importante.' Opcionalmente, se crea un mural con las cualidades identificadas."
        }
      ],
      successIndicators: [
        "Participación activa en gestos simbólicos",
        "Diálogo reflexivo sobre estereotipos vs. realidad",
        "Mínimo 30 cualidades positivas identificadas",
        "Ambiente de celebración y reconocimiento"
      ],
      pdfLinks: [
        { name: "Estereotipos Flashcards", file: "D3_Maleta_Estereotipos_Flashcards.pdf" },
        { name: "Maleta Común Lista", file: "D3_Maleta_Comun_Lista.pdf" }
      ]
    },
    {
      id: "d5",
      code: "D3.1",
      session: 3,
      title: "El Mercado Cultural",
      objective: "Reconocer y compartir habilidades, conocimientos y recursos disponibles en el grupo",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "3-4 mesas o espacios 'puestos'",
        "Carteles para identificar puestos (por nacionalidad o por tipo de habilidad)",
        "Marcadores"
      ],
      phases: [
        {
          name: "Preparación",
          time: "5 min",
          description: "El facilitador explica: 'Vamos a crear un mercado. Cada nacionalidad (o grupo) va a tener un 'puesto' donde enseña algo de su cultura o sus habilidades.' Forma grupos por nacionalidad (o mezcla si hay pocos). Asigna un espacio/mesa a cada grupo."
        },
        {
          name: "Preparación de Puestos",
          time: "10 min",
          description: "Cada grupo prepara su puesto con: Un gesto típico de su cultura, Una palabra importante en su idioma, Una costumbre o tradición, Una habilidad que tienen (cocinar, reparar, enseñar, etc.). El facilitador ayuda a cada grupo a preparar."
        },
        {
          name: "Visita de Puestos",
          time: "15 min",
          description: "Los participantes se dividen en grupos pequeños. Rotan por cada puesto (3-4 min por puesto). En cada puesto, el grupo que lo atiende enseña su gesto, palabra, costumbre y habilidad. Hay interacción, preguntas, risas."
        },
        {
          name: "Cierre",
          time: "5 min",
          description: "Facilitador: 'Vimos que cada grupo trae algo valioso. Cuando compartimos, el centro se enriquece.'"
        }
      ],
      successIndicators: [
        "100% de participantes visita al menos 2 puestos",
        "Interacciones lúdicas y respetuosas",
        "Cada grupo presenta su aporte con orgullo",
        "Ambiente de celebración"
      ],
      pdfLinks: []
    },
    {
      id: "d6",
      code: "D3.2",
      session: 3,
      title: "El Árbol de la Contribución Colectiva",
      objective: "Crear un producto colectivo que visualiza cómo cada persona aporta al bienestar del centro",
      duration: "35 minutos",
      participants: "15-20 personas",
      materials: [
        "Papel grande (A1-A2) con árbol pre-dibujado",
        "Marcadores de colores",
        "Témperas",
        "Símbolos/imágenes de recursos (trabajo, familia, amistad, alegría, etc.)"
      ],
      phases: [
        {
          name: "Presentación",
          time: "5 min",
          description: "El facilitador presenta el árbol: 'Este árbol representa nuestro centro. Las raíces son lo que necesitamos. Los frutos son lo que cada uno aporta.' Explica: 'Vamos a llenar este árbol juntos.'"
        },
        {
          name: "Identificar Raíces",
          time: "10 min",
          description: "Facilitador pregunta: '¿Qué necesita el centro para funcionar bien?' Participantes responden (respeto, confianza, comunicación, alegría, etc.). El facilitador (o participantes voluntarios) escriben/dibujan estas necesidades en las raíces. Se colorean."
        },
        {
          name: "Identificar Frutos",
          time: "10 min",
          description: "Facilitador pregunta: '¿Qué aporta cada uno de ustedes al centro?' Participantes responden (sonrisa, fuerza, conocimiento, ayuda, etc.). El facilitador (o participantes) escriben/dibujan en los frutos. Se colorean. Cada participante puede poner su nombre o símbolo en un fruto."
        },
        {
          name: "Cierre",
          time: "10 min",
          description: "El árbol está completo. Facilitador: 'Miren lo que hemos creado juntos. Este árbol es hermoso porque tiene muchos colores, muchas formas, muchas voces. Así es el centro cuando trabajamos juntos.' Se toma foto del árbol. Se expone en el centro como recordatorio."
        }
      ],
      successIndicators: [
        "Árbol completo con raíces y frutos",
        "Participación de 80%+ en la creación",
        "Diversidad visual (colores, formas, idiomas)",
        "Cada participante se siente representado"
      ],
      pdfLinks: [
        { name: "Árbol Contribución Plantilla", file: "D10_Arbol_Contribucion_Plantilla.pdf" }
      ]
    }
  ];

  const sessions = [
    {
      number: 1,
      title: "Conocernos sin Juicios",
      objective: "Romper el hielo, empezar a cuestionar estereotipos sobre nacionalidades presentes en el centro",
      duration: "90 minutos"
    },
    {
      number: 2,
      title: "Entender Nuestras Diferencias",
      objective: "Explorar diferencias culturales en comportamientos cotidianos, identificar cualidades compartidas",
      duration: "90 minutos"
    },
    {
      number: 3,
      title: "Construir Juntos",
      objective: "Visualizar cómo cada persona aporta al centro, crear un producto colectivo que celebra la diversidad",
      duration: "90 minutos"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Las 6 Dinámicas del Programa</h1>
        <p className="text-lg text-muted-foreground">
          Descripción detallada de cada dinámica, sus objetivos, materiales y fases de desarrollo
        </p>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <Card key={session.number} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Sesión {session.number}: {session.title}</CardTitle>
                  <CardDescription className="mt-2">{session.objective}</CardDescription>
                </div>
                <Badge variant="default" className="whitespace-nowrap">
                  <Clock className="w-4 h-4 mr-1" />
                  {session.duration}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="space-y-4">
                {dynamics
                  .filter(d => d.session === session.number)
                  .map((dynamic) => (
                    <AccordionItem key={dynamic.id} value={dynamic.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <Badge variant="outline">{dynamic.code}</Badge>
                          <div>
                            <h3 className="font-semibold">{dynamic.title}</h3>
                            <p className="text-sm text-muted-foreground">{dynamic.objective}</p>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="space-y-6 pt-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Duración</p>
                              <p className="font-semibold">{dynamic.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Participantes</p>
                              <p className="font-semibold">{dynamic.participants}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Objetivo</p>
                              <p className="font-semibold text-sm">{dynamic.objective}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Materiales Necesarios
                          </h4>
                          <ul className="space-y-2">
                            {dynamic.materials.map((material, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-muted-foreground">•</span>
                                <span>{material}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Fases de Desarrollo</h4>
                          <div className="space-y-4">
                            {dynamic.phases.map((phase, idx) => (
                              <div key={idx} className="border-l-4 border-blue-600 pl-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold">{phase.name}</h5>
                                  <Badge variant="secondary">{phase.time}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{phase.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Indicadores de Éxito
                          </h4>
                          <ul className="space-y-2">
                            {dynamic.successIndicators.map((indicator, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
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
                            <div className="flex flex-wrap gap-2">
                              {dynamic.pdfLinks.map((link, idx) => (
                                <Button key={idx} variant="outline" size="sm" className="gap-2">
                                  <Download className="w-4 h-4" />
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
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Notas Importantes para Facilitadores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Flexibilidad:</strong> Si un grupo termina antes, se puede extender el diálogo o añadir preguntas adicionales.
          </p>
          <p>
            <strong>Seguridad Emocional:</strong> Si alguien se incomoda, se puede ofrecer un rol diferente (ej. ayudar al facilitador).
          </p>
          <p>
            <strong>Inclusión:</strong> Asegurar que todas las nacionalidades presentes en el centro sean representadas.
          </p>
          <p>
            <strong>Documentación:</strong> Tomar fotos de productos colectivos para evaluación.
          </p>
          <p>
            <strong>Adaptación:</strong> Las dinámicas pueden ajustarse según las necesidades específicas de cada grupo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

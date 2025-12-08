import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Users, Target, Download, CheckCircle2, AlertCircle } from "lucide-react";

export default function Dynamics() {
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
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dinámicas Detalladas</h1>
        <p className="text-lg text-muted-foreground">
          Instrucciones paso a paso para las dinámicas principales del programa
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {dynamics.map((dynamic) => (
          <AccordionItem key={dynamic.id} value={dynamic.id} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <Badge>{dynamic.code}</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{dynamic.title}</h3>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckSquare, AlertTriangle, Download, Lightbulb, Users, Clock } from "lucide-react";

export default function FacilitatorGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Guía del Facilitador</h1>
        <p className="text-lg text-muted-foreground">
          Instrucciones prácticas para facilitar el Programa de Convivencia Intercultural
        </p>
      </div>

      {/* Program Overview */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle>Objetivo General del Programa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Mejorar la convivencia entre usuarios del centro de día de diferentes nacionalidades, 
            creando un espacio seguro de diálogo, entendimiento mutuo y reconocimiento de la diversidad.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">3 Sesiones</p>
              <p className="text-sm text-muted-foreground">Una por semana</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">90 Minutos</p>
              <p className="text-sm text-muted-foreground">Por sesión</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">15-20 Personas</p>
              <p className="text-sm text-muted-foreground">Por grupo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Session Preparation */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <CardTitle>Preparación Previa (Antes de Semana 1)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Materiales a Imprimir y Preparar</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-sm mb-2">Obligatorio:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>1 copia de "Listas de Afirmaciones S1" (para leer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>1 copia de "Listas de Afirmaciones S2" (para leer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>6 Carteles grandes (3 para S1, 3 para S2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>30 Pasaportes (uno por participante)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>30 Certificados (uno por participante)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>Fichas de Evaluación (Inicial, Continua, Final)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-sm mb-2">Recomendado:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>Marcadores de colores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>Cartulinas grandes (A2) para productos colectivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>Cámara/teléfono para registrar productos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">□</span>
                    <span>Sellos o pegatinas para el pasaporte</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Preparación del Espacio</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <p><strong>Requisitos del Espacio:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Sala amplia (mínimo 50 m²)</li>
                <li>Suelo limpio y seguro para movimiento</li>
                <li>Paredes disponibles para colgar carteles</li>
                <li>Mesas/sillas (para actividades sentadas)</li>
                <li>Buena iluminación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <CardTitle>Mejores Prácticas del Facilitador</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="participation" className="border rounded-lg px-4">
              <AccordionTrigger>Fomentar la Participación</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>• Invita a participar, nunca fuerces</p>
                <p>• Reconoce y valora todas las contribuciones</p>
                <p>• Asegura que todas las voces sean escuchadas</p>
                <p>• Usa lenguaje inclusivo y accesible</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety" className="border rounded-lg px-4">
              <AccordionTrigger>Crear un Espacio Seguro</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>• Establece reglas claras de respeto desde el inicio</p>
                <p>• No toleres comentarios ofensivos o discriminatorios</p>
                <p>• Mantén la confidencialidad de lo compartido</p>
                <p>• Permite que las personas pasen si no se sienten cómodas</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conflicts" className="border rounded-lg px-4">
              <AccordionTrigger>Manejo de Conflictos</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>• Mantén la calma y actúa con firmeza</p>
                <p>• Separa a las personas si es necesario</p>
                <p>• Redirige la conversación hacia el objetivo de la dinámica</p>
                <p>• Si el conflicto persiste, pausa la actividad y habla en privado</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="adaptation" className="border rounded-lg px-4">
              <AccordionTrigger>Adaptación y Flexibilidad</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>• Ajusta el ritmo según la energía del grupo</p>
                <p>• Si una dinámica no funciona, pasa a la siguiente</p>
                <p>• Usa ejemplos relevantes para el contexto del grupo</p>
                <p>• Permite desviaciones productivas del guion</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle>Señales de Alerta</CardTitle>
          </div>
          <CardDescription>Situaciones que requieren atención inmediata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">⚠</span>
              <div>
                <p className="font-semibold">Participante visiblemente angustiado</p>
                <p className="text-muted-foreground">Ofrece un descanso, habla en privado, permite salir si es necesario</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">⚠</span>
              <div>
                <p className="font-semibold">Tensión creciente entre grupos</p>
                <p className="text-muted-foreground">Pausa la actividad, refuerza las reglas de respeto, redirige la conversación</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">⚠</span>
              <div>
                <p className="font-semibold">Participación muy desigual</p>
                <p className="text-muted-foreground">Invita directamente a los silenciosos, limita el tiempo de los dominantes</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">⚠</span>
              <div>
                <p className="font-semibold">Comentarios discriminatorios</p>
                <p className="text-muted-foreground">Detén inmediatamente, explica por qué es inaceptable, refuerza el respeto</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Full Guide */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Guía Completa del Facilitador</p>
              <p className="text-sm text-muted-foreground">
                Descarga la guía completa con instrucciones detalladas para cada sesión
              </p>
            </div>
            <Button asChild>
              <a
                href="/convivencia-fixed/pdfs/Guia_Facilitador.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

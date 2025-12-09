import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, AlertCircle, Clock, Users, FileText } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

interface Checklist {
  id: string;
  session: number;
  title: string;
  preSession: ChecklistItem[];
  postSession: ChecklistItem[];
}

export default function FacilitatorChecklist() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      session: 1,
      title: "Sesión 1: Encuentro",
      preSession: [
        { id: "p1", text: "Revisar la guía del facilitador", category: "preparation", completed: false },
        { id: "p2", text: "Preparar materiales (pelota, cartulinas, marcadores)", category: "materials", completed: false },
        { id: "p3", text: "Revisar la lista de participantes", category: "preparation", completed: false },
        { id: "p4", text: "Preparar el espacio (sillas en círculo)", category: "space", completed: false },
        { id: "p5", text: "Probar equipos de audio/video si es necesario", category: "technical", completed: false },
        { id: "p6", text: "Revisar afirmaciones para el termómetro", category: "materials", completed: false },
        { id: "p7", text: "Preparar nombre de participantes en tarjetas", category: "materials", completed: false },
        { id: "p8", text: "Llegar 15 minutos antes", category: "preparation", completed: false }
      ],
      postSession: [
        { id: "s1", text: "Completar formulario de evaluación de sesión", category: "evaluation", completed: false },
        { id: "s2", text: "Recopilar retroalimentación de participantes", category: "feedback", completed: false },
        { id: "s3", text: "Documentar observaciones clave", category: "documentation", completed: false },
        { id: "s4", text: "Guardar materiales para próxima sesión", category: "materials", completed: false },
        { id: "s5", text: "Enviar resumen a coordinador", category: "communication", completed: false },
        { id: "s6", text: "Registrar asistencia", category: "documentation", completed: false },
        { id: "s7", text: "Identificar participantes que necesitan apoyo adicional", category: "follow-up", completed: false }
      ]
    },
    {
      id: "2",
      session: 2,
      title: "Sesión 2: Empatía",
      preSession: [
        { id: "p1", text: "Revisar la guía del facilitador", category: "preparation", completed: false },
        { id: "p2", text: "Preparar preguntas para historias de vida", category: "materials", completed: false },
        { id: "p3", text: "Revisar notas de sesión anterior", category: "preparation", completed: false },
        { id: "p4", text: "Preparar materiales para mapa de sueños", category: "materials", completed: false },
        { id: "p5", text: "Organizar parejas de participantes", category: "preparation", completed: false },
        { id: "p6", text: "Preparar música suave (opcional)", category: "technical", completed: false },
        { id: "p7", text: "Revisar lista de participantes", category: "preparation", completed: false },
        { id: "p8", text: "Preparar espacio para trabajo en parejas", category: "space", completed: false }
      ],
      postSession: [
        { id: "s1", text: "Completar formulario de evaluación de sesión", category: "evaluation", completed: false },
        { id: "s2", text: "Documentar historias compartidas (resumen)", category: "documentation", completed: false },
        { id: "s3", text: "Fotografiar mapa de sueños", category: "documentation", completed: false },
        { id: "s4", text: "Recopilar retroalimentación emocional", category: "feedback", completed: false },
        { id: "s5", text: "Registrar conexiones establecidas", category: "documentation", completed: false },
        { id: "s6", text: "Guardar mapa de sueños", category: "materials", completed: false },
        { id: "s7", text: "Enviar resumen a coordinador", category: "communication", completed: false }
      ]
    },
    {
      id: "3",
      session: 3,
      title: "Sesión 3: Acción",
      preSession: [
        { id: "p1", text: "Revisar la guía del facilitador", category: "preparation", completed: false },
        { id: "p2", text: "Preparar tarjetas de compromiso", category: "materials", completed: false },
        { id: "p3", text: "Revisar resumen de sesiones anteriores", category: "preparation", completed: false },
        { id: "p4", text: "Preparar cuerda/hilo para red de apoyo", category: "materials", completed: false },
        { id: "p5", text: "Preparar certificados de participación", category: "materials", completed: false },
        { id: "p6", text: "Organizar cámara para foto grupal", category: "technical", completed: false },
        { id: "p7", text: "Preparar lista de contactos", category: "materials", completed: false },
        { id: "p8", text: "Revisar lista de participantes", category: "preparation", completed: false }
      ],
      postSession: [
        { id: "s1", text: "Completar formulario de evaluación final", category: "evaluation", completed: false },
        { id: "s2", text: "Recopilar compromisos de acción", category: "documentation", completed: false },
        { id: "s3", text: "Fotografiar red de apoyo", category: "documentation", completed: false },
        { id: "s4", text: "Crear grupo de comunicación (WhatsApp/Telegram)", category: "follow-up", completed: false },
        { id: "s5", text: "Enviar certificados a participantes", category: "communication", completed: false },
        { id: "s6", text: "Guardar datos de contacto", category: "documentation", completed: false },
        { id: "s7", text: "Generar reporte final del programa", category: "documentation", completed: false },
        { id: "s8", text: "Planificar seguimiento a 3 meses", category: "follow-up", completed: false }
      ]
    }
  ]);

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(checklists.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          preSession: checklist.preSession.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
          postSession: checklist.postSession.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return checklist;
    }));
  };

  const getCompletionPercentage = (items: ChecklistItem[]) => {
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      preparation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      materials: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      space: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      technical: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      evaluation: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      feedback: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      documentation: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      communication: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      "follow-up": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      preparation: "Preparación",
      materials: "Materiales",
      space: "Espacio",
      technical: "Técnico",
      evaluation: "Evaluación",
      feedback: "Retroalimentación",
      documentation: "Documentación",
      communication: "Comunicación",
      "follow-up": "Seguimiento"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Listas de Verificación del Facilitador</h1>
        <p className="text-lg text-muted-foreground">
          Checklists para antes y después de cada sesión
        </p>
      </div>

      <div className="grid gap-8">
        {checklists.map((checklist) => {
          const preCompletion = getCompletionPercentage(checklist.preSession);
          const postCompletion = getCompletionPercentage(checklist.postSession);

          return (
            <Card key={checklist.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{checklist.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Guía paso a paso para facilitar esta sesión
                    </CardDescription>
                  </div>
                  <Badge variant="default">Sesión {checklist.session}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-8 space-y-8">
                {/* Pre-Session */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold">Antes de la Sesión</h3>
                  </div>

                  <div className="mb-4 bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-bold text-blue-600">{preCompletion}%</span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${preCompletion}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {checklist.preSession.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(checklist.id, item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className={`${item.completed ? "line-through text-muted-foreground" : ""}`}>
                            {item.text}
                          </p>
                          <Badge className={`mt-2 ${getCategoryColor(item.category)}`}>
                            {getCategoryLabel(item.category)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post-Session */}
                <div className="border-t pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold">Después de la Sesión</h3>
                  </div>

                  <div className="mb-4 bg-green-50 dark:bg-green-950 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-bold text-green-600">{postCompletion}%</span>
                    </div>
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${postCompletion}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {checklist.postSession.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(checklist.id, item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className={`${item.completed ? "line-through text-muted-foreground" : ""}`}>
                            {item.text}
                          </p>
                          <Badge className={`mt-2 ${getCategoryColor(item.category)}`}>
                            {getCategoryLabel(item.category)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Consejos para Facilitadores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Preparación es clave:</strong> Completar la checklist de "Antes de la Sesión" asegura que todo esté listo y reduce el estrés.
          </p>
          <p>
            <strong>Documentación inmediata:</strong> Completa la checklist de "Después de la Sesión" mientras los detalles están frescos en tu memoria.
          </p>
          <p>
            <strong>Flexibilidad:</strong> Estas listas son guías. Adapta según las necesidades específicas de tu grupo.
          </p>
          <p>
            <strong>Seguimiento:</strong> El seguimiento post-sesión es crucial para el impacto a largo plazo del programa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { toast } from "sonner";
import { Save, FileText, Zap } from "lucide-react";

export default function Evaluation() {
  const { sessions, createEvaluation } = useEvaluationData();
  const [selectedSession, setSelectedSession] = useState("");
  const [quickMode, setQuickMode] = useState(false); // NEW: Quick Mode state
  const [phase, setPhase] = useState<"before" | "during" | "after">("before");
  
  // Before phase fields
  const [grouping, setGrouping] = useState("");
  const [isolation, setIsolation] = useState("");
  const [tensions, setTensions] = useState("");
  const [communication, setCommunication] = useState("");
  const [mixedInteractions, setMixedInteractions] = useState("");
  const [stereotypesObserved, setStereotypesObserved] = useState("");
  
  // During phase fields
  const [participation, setParticipation] = useState("");
  const [respect, setRespect] = useState("");
  const [openness, setOpenness] = useState("");
  const [laughter, setLaughter] = useState("");
  const [mixedObserved, setMixedObserved] = useState("");
  const [incidents, setIncidents] = useState("");
  
  // After phase fields
  const [groupingAfter, setGroupingAfter] = useState("");
  const [mixedInteractionsAfter, setMixedInteractionsAfter] = useState("");
  const [productsCompleted, setProductsCompleted] = useState("");
  const [participantRepresentation, setParticipantRepresentation] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleQuickSubmit = () => {
    if (!selectedSession) {
      toast.error("Por favor selecciona una sesión");
      return;
    }

    // Logic for Quick Submit: Only fill in the most critical fields based on phase
    let quickData: any = {
      sessionId: selectedSession,
      phase,
    };

    if (phase === "before") {
      quickData = {
        ...quickData,
        grouping: grouping || "separated", // Default to separated for quick baseline
        tensions: tensions || "none", // Default to none
        communication: communication || "limited", // Default to limited
        mixedInteractions: parseInt(mixedInteractions) || 0,
      };
    } else if (phase === "during") {
      quickData = {
        ...quickData,
        participation: participation || "80-99", // Default to good participation
        respect: respect || "high", // Default to high respect
        openness: openness || "medium", // Default to medium openness
        laughter: laughter || "occasional", // Default to occasional laughter
      };
    } else if (phase === "after") {
      quickData = {
        ...quickData,
        groupingAfter: groupingAfter || "mixed", // Default to mixed for quick impact
        mixedInteractionsAfter: parseInt(mixedInteractionsAfter) || 0,
      };
    }

    createEvaluation(quickData);
    toast.success("Evaluación Rápida guardada exitosamente");
    
    // Reset form
    setSelectedSession("");
    setPhase("before");
    resetFields();
  };

  const handleSubmit = () => {
    if (!selectedSession) {
      toast.error("Por favor selecciona una sesión");
      return;
    }

    const evaluationData = {
      sessionId: selectedSession,
      phase,
      grouping,
      discomfort: isolation,
      tensions,
      communication,
      mixedInteractions: parseInt(mixedInteractions) || 0,
      participation,
      respect,
      openness,
      laughter,
      mixedObserved,
      groupingAfter,
      mixedInteractionsAfter: parseInt(mixedInteractionsAfter) || 0
    };

    createEvaluation(evaluationData);
    toast.success("Evaluación guardada exitosamente");
    
    // Reset form
    setSelectedSession("");
    setPhase("before");
    resetFields();
  };

  const resetFields = () => {
    setGrouping("");
    setIsolation("");
    setTensions("");
    setCommunication("");
    setMixedInteractions("");
    setStereotypesObserved("");
    setParticipation("");
    setRespect("");
    setOpenness("");
    setLaughter("");
    setMixedObserved("");
    setIncidents("");
    setGroupingAfter("");
    setMixedInteractionsAfter("");
    setProductsCompleted("");
    setParticipantRepresentation("");
    setRecommendations("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Formulario de Evaluación</h1>
          <p className="text-lg text-muted-foreground">
            Registra observaciones antes, durante y después de cada sesión
          </p>
        </div>
        <Button onClick={() => setQuickMode(!quickMode)} variant="outline" className="gap-2">
          <Zap className="w-4 h-4" />
          {quickMode ? "Modo Completo" : "Modo Rápido"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Sesión</CardTitle>
          <CardDescription>Selecciona la sesión y la fase de evaluación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session">Sesión</Label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger id="session">
                  <SelectValue placeholder="Selecciona una sesión" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.group} - {session.date} - {session.facilitator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phase">Fase de Evaluación</Label>
              <Select value={phase} onValueChange={(value: any) => setPhase(value)}>
                <SelectTrigger id="phase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before">ANTES (Línea Base)</SelectItem>
                  <SelectItem value="during">DURANTE (Seguimiento)</SelectItem>
                  <SelectItem value="after">DESPUÉS (Impacto)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={phase} onValueChange={(value: any) => setPhase(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="before">ANTES</TabsTrigger>
          <TabsTrigger value="during">DURANTE</TabsTrigger>
          <TabsTrigger value="after">DESPUÉS</TabsTrigger>
        </TabsList>

        {/* BEFORE Phase */}
        <TabsContent value="before" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Observación Inicial (ANTES)</CardTitle>
              <CardDescription>Línea base - Semana 0</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Agrupación por nacionalidad</Label>
                <RadioGroup value={grouping} onValueChange={setGrouping}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="separated" id="separated" />
                    <Label htmlFor="separated" className="font-normal">
                      Muy separados - Se agrupan principalmente por país/región
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial" className="font-normal">
                      Parcialmente separados - Algunos grupos mixtos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="mixed" />
                    <Label htmlFor="mixed" className="font-normal">
                      Mixtos - Mayoría de interacciones entre diferentes nacionalidades
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Nivel de aislamiento</Label>
                <RadioGroup value={isolation} onValueChange={setIsolation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="font-normal">
                      Alto - Hay usuarios que no interactúan con nadie
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="font-normal">
                      Medio - Algunos aislados, otros interactúan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="font-normal">
                      Bajo - La mayoría participa en interacciones
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Tensiones observables</Label>
                <RadioGroup value={tensions} onValueChange={setTensions}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="frequent" />
                    <Label htmlFor="frequent" className="font-normal">
                      Sí, frecuentes - Conflictos o tensiones visibles
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="occasional" />
                    <Label htmlFor="occasional" className="font-normal">
                      Sí, ocasionales - Momentos de tensión
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="font-normal">
                      No - Ambiente general tranquilo
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Comunicación entre grupos</Label>
                <RadioGroup value={communication} onValueChange={setCommunication}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-limited" id="very-limited" />
                    <Label htmlFor="very-limited" className="font-normal">
                      Muy limitada - Casi no hay comunicación
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited" className="font-normal">
                      Limitada - Comunicación superficial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="freq" />
                    <Label htmlFor="freq" className="font-normal">
                      Frecuente - Diálogo activo entre grupos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mixedInteractions">Número de interacciones mixtas observadas (20 min)</Label>
                <Input
                  id="mixedInteractions"
                  type="number"
                  value={mixedInteractions}
                  onChange={(e) => setMixedInteractions(e.target.value)}
                  placeholder="Ej: 15"
                />
                <p className="text-sm text-muted-foreground">
                  Cuenta conversaciones, risas, ayuda mutua, actividades compartidas
                </p>
              </div>

              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
                <Label htmlFor="stereotypesObserved">Estereotipos y Prejuicios Observables</Label>
                <Textarea
                  id="stereotypesObserved"
                  value={stereotypesObserved}
                  onChange={(e) => setStereotypesObserved(e.target.value)}
                  placeholder="Describe comentarios negativos, evitación deliberada, exclusión observada..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DURING Phase */}
        <TabsContent value="during" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Observación Continua (DURANTE)</CardTitle>
              <CardDescription>Seguimiento por sesión</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Interacciones mixtas</Label>bel>
                <RadioGroup value={participation} onValueChange={setParticipation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100" id="p100" />
                    <Label htmlFor="p100" className="font-normal">100% - Todos participaron</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="80-99" id="p80" />
                    <Label htmlFor="p80" className="font-normal">80-99% - Mayoría participó</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60-79" id="p60" />
                    <Label htmlFor="p60" className="font-normal">60-79% - Participación moderada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="<60" id="p-60" />
                    <Label htmlFor="p-60" className="font-normal">&lt;60% - Participación baja</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Respeto Mutuo</Label>
                <RadioGroup value={respect} onValueChange={setRespect}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="r-high" />
                    <Label htmlFor="r-high" className="font-normal">
                      Alto - Diálogo respetuoso, sin interrupciones
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="r-medium" />
                    <Label htmlFor="r-medium" className="font-normal">
                      Medio - Generalmente respetuoso, algunos momentos tensos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="r-low" />
                    <Label htmlFor="r-low" className="font-normal">
                      Bajo - Tensiones, interrupciones frecuentes
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Apertura a otros</Label>
                <RadioGroup value={openness} onValueChange={setOpenness}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="o-high" />
                    <Label htmlFor="o-high" className="font-normal">
                      Alto - Abiertos a escuchar otras perspectivas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="o-medium" />
                    <Label htmlFor="o-medium" className="font-normal">
                      Medio - Algunos abiertos, otros cerrados
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="o-low" />
                    <Label htmlFor="o-low" className="font-normal">
                      Bajo - Cerrados, defensivos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

               <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Risa/Ambiente lúdico</Label>>
                <RadioGroup value={laughter} onValueChange={setLaughter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="l-high" />
                    <Label htmlFor="l-high" className="font-normal">
                      Alto - Muchas risas, ambiente ligero
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="l-medium" />
                    <Label htmlFor="l-medium" className="font-normal">
                      Medio - Algunos momentos de risa
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="l-low" />
                    <Label htmlFor="l-low" className="font-normal">
                      Bajo - Poco humor, ambiente tenso
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mixedObserved">Interacciones mixtas durante la sesión</Label>
                <Textarea
                  id="mixedObserved"
                  value={mixedObserved}
                  onChange={(e) => setMixedObserved(e.target.value)}
                  placeholder="Describe las interacciones observadas entre diferentes nacionalidades..."
                  rows={3}
                />
              </div>

              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
                <Label htmlFor="incidents">Incidentes o Situaciones Especiales</Label>
                <Textarea
                  id="incidents"
                  value={incidents}
                  onChange={(e) => setIncidents(e.target.value)}
                  placeholder="Describe conflictos, abandonos o situaciones especiales y cómo se manejaron..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AFTER Phase */}
        <TabsContent value="after" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluación Final (DESPUÉS)</CardTitle>
              <CardDescription>Impacto y resultados - Semana 4</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Agrupación por nacionalidad (después)</Label>
                <RadioGroup value={groupingAfter} onValueChange={setGroupingAfter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="separated" id="a-separated" />
                    <Label htmlFor="a-separated" className="font-normal">
                      Separados - Predomina la separación por nacionalidad
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="a-mixed" />
                    <Label htmlFor="a-mixed" className="font-normal">
                      Mixtos - Interacciones entre diferentes nacionalidades
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mixedInteractionsAfter">Número de interacciones mixtas (después - 20 min)</Label>
                <Input
                  id="mixedInteractionsAfter"
                  type="number"
                  value={mixedInteractionsAfter}
                  onChange={(e) => setMixedInteractionsAfter(e.target.value)}
                  placeholder="Ej: 25"
                />
                <p className="text-sm text-muted-foreground">
                  Compara con la línea base inicial
                </p>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Productos colectivos completados</Label>
                <RadioGroup value={productsCompleted} onValueChange={setProductsCompleted}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pc-yes" />
                    <Label htmlFor="pc-yes" className="font-normal">
                      Sí - Maleta Común y Árbol completados
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="pc-partial" />
                    <Label htmlFor="pc-partial" className="font-normal">
                      Parcialmente - Solo uno completado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pc-no" />
                    <Label htmlFor="pc-no" className="font-normal">
                      No - No se completaron
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
                <Label>Cada participante se siente representado</Label>
                <RadioGroup value={participantRepresentation} onValueChange={setParticipantRepresentation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pr-yes" />
                    <Label htmlFor="pr-yes" className="font-normal">Sí - Todos representados</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="pr-partial" />
                    <Label htmlFor="pr-partial" className="font-normal">Parcialmente - Algunos representados</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pr-no" />
                    <Label htmlFor="pr-no" className="font-normal">No - Poca representación</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
                <Label htmlFor="recommendations">Recomendaciones para futuras implementaciones</Label>
                <Textarea
                  id="recommendations"
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Describe mejoras, ajustes necesarios, lecciones aprendidas..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={resetFields}>
          <FileText className="w-4 h-4 mr-2" />
          Limpiar Formulario
      <div className="flex justify-end">
        <Button onClick={quickMode ? handleQuickSubmit : handleSubmit} className="gap-2">
          <Save className="w-4 h-4" />
          Guardar Evaluación
        </Button>
      </div>
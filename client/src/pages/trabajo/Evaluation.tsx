	import { useState } from "react";
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
	import { Button } from "@/components/ui/button";
	import { Input } from "@/components/ui/input";
	import { Label } from "@/components/ui/label";
	import { Textarea } from "@/components/ui/textarea";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
	import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
	import { useEvaluationData, ProgramEvaluationData } from "@/hooks/useEvaluationData";
	import { toast } from "sonner";
	import { Save, FileText, Zap } from "lucide-react";
	
	export default function Evaluation() {
	  const { sessions, createSessionEvaluation, createProgramEvaluation } = useEvaluationData();
	  const [selectedSession, setSelectedSession] = useState("");
	  const [quickMode, setQuickMode] = useState(false); // NEW: Quick Mode state
	  const [phase, setPhase] = useState<"initial" | "followup" | "program_impact">("initial");
	  
	  // Session evaluation fields
	  const [grouping, setGrouping] = useState("");
	  const [isolation, setIsolation] = useState("");
	  const [tensions, setTensions] = useState("");
	  const [communication, setCommunication] = useState("");
	  const [mixedInteractions, setMixedInteractions] = useState("");
	  const [stereotypesObserved, setStereotypesObserved] = useState("");
	  const [participation, setParticipation] = useState("");
	  const [respect, setRespect] = useState("");
	  const [openness, setOpenness] = useState("");
	  const [laughter, setLaughter] = useState("");
	  const [mixedObserved, setMixedObserved] = useState("");
	  const [incidents, setIncidents] = useState("");
	  
	  // Program evaluation fields
	  const [groupingAfter, setGroupingAfter] = useState("");
	  const [mixedInteractionsAfter, setMixedInteractionsAfter] = useState("");
	  const [productsCompleted, setProductsCompleted] = useState("");
	  const [participantRepresentation, setParticipantRepresentation] = useState("");
	  const [recommendations, setRecommendations] = useState("");
	
	  const handleQuickSubmit = () => {
	    if (phase !== 'program_impact' && !selectedSession) {
	      toast.error("Por favor selecciona una sesión");
	      return;
	    }
	
	    if (phase === "initial") {
	      const quickData = {
	        sessionId: selectedSession,
	        phase,
	        grouping: grouping || "separated",
	        tensions: tensions || "none",
	        communication: communication || "limited",
	        mixedInteractions: parseInt(mixedInteractions) || 0,
	      };
	      createSessionEvaluation(quickData);
	      toast.success("Evaluación Rápida (Inicial) guardada exitosamente");
	    } else if (phase === "followup") {
	      const quickData = {
	        sessionId: selectedSession,
	        phase,
	        participation: participation || "80-99",
	        respect: respect || "high",
	        openness: openness || "medium",
	        laughter: laughter || "occasional",
	      };
	      createSessionEvaluation(quickData);
	      toast.success("Evaluación Rápida (Seguimiento) guardada exitosamente");
	    } else if (phase === "program_impact") {
	      const programImpactData: Omit<ProgramEvaluationData, "id" | "createdAt" | "programId"> = {
	        groupingAfter: groupingAfter || "mixed",
	        mixedInteractionsAfter: parseInt(mixedInteractionsAfter) || 0,
	        productsCompleted: parseInt(productsCompleted) || 0,
	        participantRepresentation: parseInt(participantRepresentation) || 0,
	        phase: "final_impact",
	      };
	      createProgramEvaluation(programImpactData);
	      toast.success("Evaluación de IMPACTO FINAL Rápida guardada exitosamente");
	    }
	    
	    setSelectedSession("");
	    setPhase("initial");
	    resetFields();
	  };
	
	  const handleSubmit = () => {
	    if (phase !== 'program_impact' && !selectedSession) {
	      toast.error("Por favor selecciona una sesión");
	      return;
	    }
	
	    if (phase === "program_impact") {
	      const programImpactData: Omit<ProgramEvaluationData, "id" | "createdAt" | "programId"> = {
	        groupingAfter: groupingAfter || "mixed",
	        mixedInteractionsAfter: parseInt(mixedInteractionsAfter) || 0,
	        productsCompleted: parseInt(productsCompleted) || 0,
	        participantRepresentation: parseInt(participantRepresentation) || 0,
	        phase: "final_impact",
	      };
	      createProgramEvaluation(programImpactData);
	      toast.success("Evaluación de IMPACTO FINAL guardada exitosamente");
	    } else {
	      const evaluationData = {
	        sessionId: selectedSession,
	        phase: phase as "initial" | "followup",
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
	      };
	      createSessionEvaluation(evaluationData);
	      toast.success("Evaluación de Sesión guardada exitosamente");
	    }
	    
	    setSelectedSession("");
	    setPhase("initial");
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
	            Registra observaciones de sesión o el impacto final del programa
	          </p>
	        </div>
	        <Button onClick={() => setQuickMode(!quickMode)} variant="outline" className="gap-2">
	          <Zap className="w-4 h-4" />
	          {quickMode ? "Modo Completo" : "Modo Rápido"}
	        </Button>
	      </div>
	
	      <Card>
	        <CardHeader>
	          <CardTitle>Información General</CardTitle>
	          <CardDescription>Selecciona el tipo de evaluación y la sesión (si aplica)</CardDescription>
	        </CardHeader>
	        <CardContent className="space-y-4">
	          <div className="grid md:grid-cols-2 gap-4">
	            <div className="space-y-2">
	              <Label htmlFor="phase">Tipo de Evaluación</Label>
	              <Select value={phase} onValueChange={(value: any) => setPhase(value)}>
	                <SelectTrigger id="phase">
	                  <SelectValue />
	                </SelectTrigger>
	                <SelectContent>
	                  <SelectItem value="initial">Sesión: INICIAL</SelectItem>
	                  <SelectItem value="followup">Sesión: SEGUIMIENTO</SelectItem>
	                  <SelectItem value="program_impact">Programa: IMPACTO FINAL</SelectItem>
	                </SelectContent>
	              </Select>
	            </div>
	            <div className={`space-y-2 ${phase === 'program_impact' ? 'hidden' : ''}`}>
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
	          </div>
	        </CardContent>
	      </Card>
	
	      <Tabs value={phase} onValueChange={(value: any) => setPhase(value)}>
	        <TabsList className="grid w-full grid-cols-3">
	          <TabsTrigger value="initial">INICIAL</TabsTrigger>
	          <TabsTrigger value="followup">SEGUIMIENTO</TabsTrigger>
	          <TabsTrigger value="program_impact">IMPACTO FINAL</TabsTrigger>
	        </TabsList>
	
	        {/* INITIAL Phase (Session-level) */}
	        <TabsContent value="initial" className="space-y-4">
	          <Card>
	            <CardHeader>
	              <CardTitle>Evaluación de Sesión: INICIAL</CardTitle>
	              <CardDescription>Observación de la línea base antes de la actividad principal.</CardDescription>
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
	                      Frecuentes - Discusiones, malestar evidente
	                    </Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="occasional" id="occasional" />
	                    <Label htmlFor="occasional" className="font-normal">
	                      Ocasionales - Momentos de tensión pero se resuelven
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
	
	        {/* FOLLOWUP Phase (Session-level) */}
	        <TabsContent value="followup" className="space-y-4">
	          <Card>
	            <CardHeader>
	              <CardTitle>Evaluación de Sesión: SEGUIMIENTO</CardTitle>
	              <CardDescription>Seguimiento de indicadores clave durante o después de la actividad.</CardDescription>
	            </CardHeader>
	            <CardContent className="space-y-6">
	              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
	                <Label>Participación</Label>
	                <RadioGroup value={participation} onValueChange={setParticipation}>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="0-49" id="p-0-49" />
	                    <Label htmlFor="p-0-49" className="font-normal">0-49%</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="50-79" id="p-50-79" />
	                    <Label htmlFor="p-50-79" className="font-normal">50-79%</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="80-99" id="p-80-99" />
	                    <Label htmlFor="p-80-99" className="font-normal">80-99%</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="100" id="p-100" />
	                    <Label htmlFor="p-100" className="font-normal">100%</Label>
	                  </div>
	                </RadioGroup>
	              </div>
	
	              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
	                <Label>Respeto mutuo</Label>
	                <RadioGroup value={respect} onValueChange={setRespect}>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="low" id="r-low" />
	                    <Label htmlFor="r-low" className="font-normal">Bajo</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="medium" id="r-medium" />
	                    <Label htmlFor="r-medium" className="font-normal">Medio</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="high" id="r-high" />
	                    <Label htmlFor="r-high" className="font-normal">Alto</Label>
	                  </div>
	                </RadioGroup>
	              </div>
	
	              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
	                <Label>Apertura a otros</Label>
	                <RadioGroup value={openness} onValueChange={setOpenness}>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="low" id="o-low" />
	                    <Label htmlFor="o-low" className="font-normal">Baja</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="medium" id="o-medium" />
	                    <Label htmlFor="o-medium" className="font-normal">Media</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="high" id="o-high" />
	                    <Label htmlFor="o-high" className="font-normal">Alta</Label>
	                  </div>
	                </RadioGroup>
	              </div>
	
	              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
	                <Label>Risa / Ambiente lúdico</Label>
	                <RadioGroup value={laughter} onValueChange={setLaughter}>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="none" id="l-none" />
	                    <Label htmlFor="l-none" className="font-normal">No se observa</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="occasional" id="l-occasional" />
	                    <Label htmlFor="l-occasional" className="font-normal">Ocasional</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="frequent" id="l-frequent" />
	                    <Label htmlFor="l-frequent" className="font-normal">Frecuente</Label>
	                  </div>
	                </RadioGroup>
	              </div>
	
	              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
	                <Label htmlFor="mixedObserved">Interacciones mixtas observadas (Cualitativo)</Label>
	                <Textarea
	                  id="mixedObserved"
	                  value={mixedObserved}
	                  onChange={(e) => setMixedObserved(e.target.value)}
	                  placeholder="Describe las interacciones mixtas que observaste..."
	                  rows={4}
	                />
	              </div>
	
	              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
	                <Label htmlFor="incidents">Incidentes o Conflictos (Cualitativo)</Label>
	                <Textarea
	                  id="incidents"
	                  value={incidents}
	                  onChange={(e) => setIncidents(e.target.value)}
	                  placeholder="Describe cualquier incidente o conflicto ocurrido..."
	                  rows={4}
	                />
	              </div>
	            </CardContent>
	          </Card>
	        </TabsContent>
	
	        {/* PROGRAM IMPACT Phase (Program-level) */}
	        <TabsContent value="program_impact" className="space-y-4">
	          <Card>
	            <CardHeader>
	              <CardTitle>Evaluación de Programa: IMPACTO FINAL</CardTitle>
	              <CardDescription>Evaluación del impacto final del programa, no ligada a una sesión específica.</CardDescription>
	            </CardHeader>
	            <CardContent className="space-y-6">
	              <div className={`space-y-4 ${quickMode ? 'hidden' : ''}`}>
	                <Label>Agrupación por nacionalidad (Post-programa)</Label>
	                <RadioGroup value={groupingAfter} onValueChange={setGroupingAfter}>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="separated" id="pa-separated" />
	                    <Label htmlFor="pa-separated" className="font-normal">Muy separados</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="partial" id="pa-partial" />
	                    <Label htmlFor="pa-partial" className="font-normal">Parcialmente separados</Label>
	                  </div>
	                  <div className="flex items-center space-x-2">
	                    <RadioGroupItem value="mixed" id="pa-mixed" />
	                    <Label htmlFor="pa-mixed" className="font-normal">Mixtos</Label>
	                  </div>
	                </RadioGroup>
	              </div>
	
	              <div className="space-y-2">
	                <Label htmlFor="mixedInteractionsAfter">Interacciones mixtas observadas (Cantidad Post-programa)</Label>
	                <Input
	                  id="mixedInteractionsAfter"
	                  type="number"
	                  value={mixedInteractionsAfter}
	                  onChange={(e) => setMixedInteractionsAfter(e.target.value)}
	                  placeholder="Ej: 8"
	                />
	              </div>
	
	              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
	                <Label htmlFor="productsCompleted">Productos completados (Ej: Artefactos, documentos)</Label>
	                <Input
	                  id="productsCompleted"
	                  type="number"
	                  value={productsCompleted}
	                  onChange={(e) => setProductsCompleted(e.target.value)}
	                  placeholder="Ej: 3"
	                />
	              </div>
	
	              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
	                <Label htmlFor="participantRepresentation">Representación de participantes (Cantidad)</Label>
	                <Input
	                  id="participantRepresentation"
	                  type="number"
	                  value={participantRepresentation}
	                  onChange={(e) => setParticipantRepresentation(e.target.value)}
	                  placeholder="Ej: 10"
	                />
	              </div>
	
	              <div className={`space-y-2 ${quickMode ? 'hidden' : ''}`}>
	                <Label htmlFor="recommendations">Recomendaciones y observaciones finales</Label>
	                <Textarea
	                  id="recommendations"
	                  value={recommendations}
	                  onChange={(e) => setRecommendations(e.target.value)}
	                  placeholder="Observaciones y recomendaciones para el programa..."
	                  rows={4}
	                />
	              </div>
	            </CardContent>
	          </Card>
	        </TabsContent>
	      </Tabs>
	
	      <div className="flex justify-end">
	        <Button onClick={quickMode ? handleQuickSubmit : handleSubmit} className="w-full md:w-auto gap-2">
	          <Save className="w-4 h-4" />
	          {phase === 'program_impact' ? "Guardar Evaluación de IMPACTO FINAL" : (quickMode ? "Guardar Evaluación Rápida" : "Guardar Evaluación Completa")}
	        </Button>
	      </div>
	    </div>
	  );
	}

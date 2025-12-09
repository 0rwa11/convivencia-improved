import { useState } from "react";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
	import { Plus, Download, Trash2, ChevronDown, ChevronUp, Edit, X, Copy, AlertTriangle } from "lucide-react";
	import { toast } from "sonner";
	import type { EvaluationData, DataQualityIssue } from "@/hooks/useEvaluationData";
	
	export default function EvaluationRegistry() {
	  const { sessions, createSession, deleteSession, getSessionEvaluations, exportAsCSV, updateEvaluation, deleteEvaluation, checkDataQuality } =
	    useEvaluationData();
	
	  const dataQualityIssues = useMemo(() => checkDataQuality(), [sessions, deleteEvaluation]); // Recalculate on session/evaluation change
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const [deleteEvalId, setDeleteEvalId] = useState<string | null>(null);
  const [editingEval, setEditingEval] = useState<EvaluationData | null>(null);
    const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    facilitator: "",
    group: "",
    notes: "", // NEW: Add notes field
  });

  const handleCreateSession = () => {
    if (!formData.facilitator.trim() || !formData.group.trim() || !formData.date) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    createSession({
      date: formData.date,
      facilitator: formData.facilitator,
      group: formData.group,
      notes: formData.notes, // NEW: Pass notes to createSession
    });

    toast.success("Sesión creada exitosamente");
    setFormData({
      date: new Date().toISOString().split("T")[0],
      facilitator: "",
      group: "",
    });
	    setOpenDialog(false);
	  };
	
	  const handleCloneSession = (session: SessionData) => {
	    // Create a new session with the same group, facilitator, and notes, but a new date (tomorrow)
	    const tomorrow = new Date();
	    tomorrow.setDate(tomorrow.getDate() + 1);
	    
	    createSession({
	      date: tomorrow.toISOString().split("T")[0],
	      facilitator: session.facilitator,
	      group: session.group,
	      notes: session.notes,
	    });
	    
	    toast.success(`Sesión clonada exitosamente para ${tomorrow.toLocaleDateString()}`);
	  };
	
	  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    toast.success("Sesión eliminada exitosamente");
    setDeleteSessionId(null);
  };

  const handleDeleteEvaluation = (evalId: string) => {
    deleteEvaluation(evalId);
    toast.success("Evaluación eliminada exitosamente");
    setDeleteEvalId(null);
  };

  const handleEditEvaluation = (evaluation: EvaluationData) => {
    setEditingEval(evaluation);
  };

  const handleSaveEdit = () => {
    if (!editingEval) return;
    
    updateEvaluation(editingEval.id, {
      phase: editingEval.phase,
      grouping: editingEval.grouping,
      discomfort: editingEval.discomfort,
      tensions: editingEval.tensions,
      communication: editingEval.communication,
      mixedInteractions: editingEval.mixedInteractions,
      participation: editingEval.participation,
      respect: editingEval.respect,
      openness: editingEval.openness,
      laughter: editingEval.laughter,
      mixedObserved: editingEval.mixedObserved,
      groupingAfter: editingEval.groupingAfter,
      mixedInteractionsAfter: editingEval.mixedInteractionsAfter,
    });
    
    toast.success("Evaluación actualizada exitosamente");
    setEditingEval(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "before": return "ANTES";
      case "during": return "DURANTE";
      case "after": return "DESPUÉS";
      default: return phase;
    }
  };

	  return (
	    <div className="space-y-8">
	      <div>
	        <h1 className="text-4xl font-bold mb-2">Registro de Evaluaciones</h1>
	        <p className="text-lg text-muted-foreground">
	          Gestiona las sesiones y registra las evaluaciones del programa
	        </p>
	      </div>
	
	      {/* NEW: Data Quality Alerts */}
	      {dataQualityIssues.length > 0 && (
	        <Card className="bg-red-50 border-red-200">
	          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
	            <CardTitle className="text-red-900 text-lg flex items-center gap-2">
	              <AlertTriangle className="w-5 h-5" />
	              Alertas de Calidad de Datos ({dataQualityIssues.length})
	            </CardTitle>
	          </CardHeader>
	          <CardContent className="text-red-800 space-y-2">
	            {dataQualityIssues.slice(0, 5).map((issue: DataQualityIssue, index: number) => (
	              <p key={index} className="text-sm">
	                <span className="font-semibold">[{issue.sessionGroup} - {issue.sessionDate}]:</span> {issue.message}
	              </p>
	            ))}
	            {dataQualityIssues.length > 5 && (
	              <p className="text-sm font-medium">
	                ... y {dataQualityIssues.length - 5} alertas más. Revisa el registro para más detalles.
	              </p>
	            )}
	          </CardContent>
	        </Card>
	      )}

      {/* Instructions Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Instrucciones</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 space-y-2">
          <p>
            <strong>1. ANTES:</strong> Completa esta sección al inicio del programa para establecer la línea base
          </p>
          <p>
            <strong>2. DURANTE:</strong> Registra observaciones inmediatamente después de cada sesión
          </p>
          <p>
            <strong>3. DESPUÉS:</strong> Completa al final del programa para medir cambios
          </p>
          <p>
            <strong>4.</strong> Descarga los datos en CSV o Excel para análisis comparativo
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Agregar Sesión
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Sesión</DialogTitle>
              <DialogDescription>
                Ingresa los detalles de la nueva sesión. Asegúrate de seleccionar la fecha correcta.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Fecha de la Sesión *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="facilitator">Nombre del Facilitador *</Label>
                <Input
                  id="facilitator"
                  placeholder="Ej: Juan García"
                  value={formData.facilitator}
                  onChange={(e) =>
                    setFormData({ ...formData, facilitator: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="group">Grupo *</Label>
                <Input
                  id="group"
                  placeholder="Ej: Grupo 1"
                  value={formData.group}
                  onChange={(e) =>
                    setFormData({ ...formData, group: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              {/* NEW: Notes Field */}
              <div>
                <Label htmlFor="notes">Notas de la Sesión</Label>
                <Textarea
                  id="notes"
                  placeholder="Ej: Dinámica principal, objetivos de la sesión, etc."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>
              <Button onClick={handleCreateSession} className="w-full">
                Crear Sesión
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          className="gap-2"
          onClick={exportAsCSV}
          disabled={sessions.length === 0}
        >
          <Download className="w-4 h-4" />
          Descargar CSV
        </Button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No hay sesiones registradas. Crea la primera sesión para comenzar.
              </p>
            </CardContent>
          </Card>
        ) : (
          sessions.map((session) => {
            const evaluations = getSessionEvaluations(session.id);
            const isExpanded = expandedSession === session.id;

            return (
              <Card key={session.id} className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() =>
                    setExpandedSession(isExpanded ? null : session.id)
                  }
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-semibold">{session.group}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(session.date)} • Facilitador: {session.facilitator}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 truncate max-w-xs">
                          Notas: {session.notes || "Sin notas"}
                        </p>
                      </div>
                    </div>
	                  </div>
	                  <div className="flex items-center gap-2">
	                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
	                      {evaluations.length} evaluaciones
	                    </span>
	                    {/* NEW: Clone Button */}
	                    <Button
	                      variant="ghost"
	                      size="icon"
	                      onClick={(e) => {
	                        e.stopPropagation(); // Prevent expanding/collapsing the card
	                        handleCloneSession(session);
	                      }}
	                      title="Clonar Sesión"
	                    >
	                      <Copy className="w-4 h-4" />
	                    </Button>
	                    <AlertDialog open={deleteSessionId === session.id} onOpenChange={(open) => {
	                      if (!open) setDeleteSessionId(null);
	                    }}>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Eliminar Sesión</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar esta sesión? Se eliminarán todas las evaluaciones asociadas. Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-3 justify-end">
                          <AlertDialogCancel onClick={() => setDeleteSessionId(null)}>
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteSession(session.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteSessionId(session.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-6 py-4 bg-muted/50">
                    {evaluations.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No hay evaluaciones registradas para esta sesión.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Fase</TableHead>
                              <TableHead>Agrupación</TableHead>
                              <TableHead>Malestar</TableHead>
                              <TableHead>Tensiones</TableHead>
                              <TableHead>Comunicación</TableHead>
                              <TableHead>Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {evaluations.map((evaluation) => (
                              <TableRow key={evaluation.id}>
                                <TableCell className="capitalize">{getPhaseLabel(evaluation.phase)}</TableCell>
                                <TableCell>{evaluation.grouping || "-"}</TableCell>
                                <TableCell>{evaluation.discomfort || "-"}</TableCell>
                                <TableCell>{evaluation.tensions || "-"}</TableCell>
                                <TableCell>{evaluation.communication || "-"}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditEvaluation(evaluation)}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => setDeleteEvalId(evaluation.id)}
                                    >
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Edit Evaluation Dialog */}
      <Dialog open={!!editingEval} onOpenChange={(open) => !open && setEditingEval(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Evaluación</DialogTitle>
            <DialogDescription>
              Modifica los datos de la evaluación
            </DialogDescription>
          </DialogHeader>
          {editingEval && (
            <div className="space-y-4">
              <div>
                <Label>Fase</Label>
                <Select 
                  value={editingEval.phase} 
                  onValueChange={(value: any) => setEditingEval({...editingEval, phase: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">ANTES</SelectItem>
                    <SelectItem value="during">DURANTE</SelectItem>
                    <SelectItem value="after">DESPUÉS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Before/After fields */}
              {(editingEval.phase === "before" || editingEval.phase === "after") && (
                <>
                  <div>
                    <Label>Agrupación por nacionalidad</Label>
                    <RadioGroup 
                      value={editingEval.grouping} 
                      onValueChange={(value) => setEditingEval({...editingEval, grouping: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="separated" id="edit-separated" />
                        <Label htmlFor="edit-separated" className="font-normal">Muy separados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial" id="edit-partial" />
                        <Label htmlFor="edit-partial" className="font-normal">Parcialmente separados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="edit-mixed" />
                        <Label htmlFor="edit-mixed" className="font-normal">Mixtos</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Nivel de aislamiento</Label>
                    <RadioGroup 
                      value={editingEval.discomfort} 
                      onValueChange={(value) => setEditingEval({...editingEval, discomfort: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="edit-high" />
                        <Label htmlFor="edit-high" className="font-normal">Alto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="edit-medium" />
                        <Label htmlFor="edit-medium" className="font-normal">Medio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="edit-low" />
                        <Label htmlFor="edit-low" className="font-normal">Bajo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Tensiones observables</Label>
                    <RadioGroup 
                      value={editingEval.tensions} 
                      onValueChange={(value) => setEditingEval({...editingEval, tensions: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frequent" id="edit-frequent" />
                        <Label htmlFor="edit-frequent" className="font-normal">Sí, frecuentes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasional" id="edit-occasional" />
                        <Label htmlFor="edit-occasional" className="font-normal">Sí, ocasionales</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="edit-none" />
                        <Label htmlFor="edit-none" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Comunicación entre grupos</Label>
                    <RadioGroup 
                      value={editingEval.communication} 
                      onValueChange={(value) => setEditingEval({...editingEval, communication: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-limited" id="edit-very-limited" />
                        <Label htmlFor="edit-very-limited" className="font-normal">Muy limitada</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="limited" id="edit-limited" />
                        <Label htmlFor="edit-limited" className="font-normal">Limitada</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frequent" id="edit-freq" />
                        <Label htmlFor="edit-freq" className="font-normal">Frecuente</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Interacciones mixtas (número)</Label>
                    <Input 
                      type="number" 
                      value={editingEval.mixedInteractions || 0}
                      onChange={(e) => setEditingEval({...editingEval, mixedInteractions: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </>
              )}

              {/* During fields */}
              {editingEval.phase === "during" && (
                <>
                  <div>
                    <Label>Participación</Label>
                    <Select 
                      value={editingEval.participation} 
                      onValueChange={(value) => setEditingEval({...editingEval, participation: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100%</SelectItem>
                        <SelectItem value="80-99">80-99%</SelectItem>
                        <SelectItem value="60-79">60-79%</SelectItem>
                        <SelectItem value="below-60">Menos del 60%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Nivel de respeto</Label>
                    <RadioGroup 
                      value={editingEval.respect} 
                      onValueChange={(value) => setEditingEval({...editingEval, respect: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="edit-respect-high" />
                        <Label htmlFor="edit-respect-high" className="font-normal">Alto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="edit-respect-medium" />
                        <Label htmlFor="edit-respect-medium" className="font-normal">Medio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="edit-respect-low" />
                        <Label htmlFor="edit-respect-low" className="font-normal">Bajo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Apertura a compartir</Label>
                    <RadioGroup 
                      value={editingEval.openness} 
                      onValueChange={(value) => setEditingEval({...editingEval, openness: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="edit-openness-high" />
                        <Label htmlFor="edit-openness-high" className="font-normal">Alta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="edit-openness-medium" />
                        <Label htmlFor="edit-openness-medium" className="font-normal">Media</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="edit-openness-low" />
                        <Label htmlFor="edit-openness-low" className="font-normal">Baja</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Risas y momentos positivos</Label>
                    <RadioGroup 
                      value={editingEval.laughter} 
                      onValueChange={(value) => setEditingEval({...editingEval, laughter: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frequent" id="edit-laughter-frequent" />
                        <Label htmlFor="edit-laughter-frequent" className="font-normal">Frecuentes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasional" id="edit-laughter-occasional" />
                        <Label htmlFor="edit-laughter-occasional" className="font-normal">Ocasionales</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rare" id="edit-laughter-rare" />
                        <Label htmlFor="edit-laughter-rare" className="font-normal">Raros</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="outline" onClick={() => setEditingEval(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Evaluation Alert Dialog */}
      <AlertDialog open={!!deleteEvalId} onOpenChange={(open) => !open && setDeleteEvalId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Evaluación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar esta evaluación? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel onClick={() => setDeleteEvalId(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteEvalId && handleDeleteEvaluation(deleteEvalId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

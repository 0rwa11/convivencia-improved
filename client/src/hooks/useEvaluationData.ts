import { useState, useEffect, useCallback } from "react";

export interface Session {
  id: string;
  date: string;
  facilitator: string;
  group: string;
  notes?: string; // New field for session planning/management
  createdAt: string;
}

	export interface EvaluationData {
	  id: string;
	  sessionId: string;
	  phase: "before" | "during" | "after";
	  grouping: string;
	  discomfort: string;
	  tensions: string;
	  communication: string;
	  mixedInteractions: number;
	  participation: string;
	  respect: string;
	  openness: string;
	  laughter: string;
	  mixedObserved: string;
	  groupingAfter: string;
	  mixedInteractionsAfter: number;
	  productsCompleted: number;
	  participantRepresentation: number;
	  createdAt: string;
	}
	
	export interface DataQualityIssue {
	  sessionId: string;
	  sessionDate: string;
	  sessionGroup: string;
	  issue: 'missing_baseline' | 'missing_impact' | 'out_of_order' | 'stale_session';
	  message: string;
	}

	
	const SESSIONS_KEY = "convivencia_sessions";
const EVALUATIONS_KEY = "convivencia_evaluations";

export function useEvaluationData() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem(SESSIONS_KEY);
    const savedEvaluations = localStorage.getItem(EVALUATIONS_KEY);

    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    if (savedEvaluations) {
      setEvaluations(JSON.parse(savedEvaluations));
    }
    setLoading(false);
  }, []);

  // Save sessions to localStorage
  const saveSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
  }, []);

  // Save evaluations to localStorage
  const saveEvaluations = useCallback((newEvaluations: EvaluationData[]) => {
    setEvaluations(newEvaluations);
    localStorage.setItem(EVALUATIONS_KEY, JSON.stringify(newEvaluations));
  }, []);

  // Create a new session
  const createSession = useCallback(
    (data: Omit<Session, "id" | "createdAt">) => {
      const newSession: Session = {
        ...data,
        id: `session_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      saveSessions([...sessions, newSession]);
      return newSession;
    },
    [sessions, saveSessions]
  );

  // Delete a session and its evaluations
  const deleteSession = useCallback(
    (sessionId: string) => {
      saveSessions(sessions.filter((s) => s.id !== sessionId));
      saveEvaluations(evaluations.filter((e) => e.sessionId !== sessionId));
    },
    [sessions, evaluations, saveSessions, saveEvaluations]
  );

  // Update a session
  const updateSession = useCallback(
    (sessionId: string, data: Partial<Omit<Session, "id" | "createdAt">>) => {
      saveSessions(
        sessions.map((s) =>
          s.id === sessionId ? { ...s, ...data } : s
        )
      );
    },
    [sessions, saveSessions]
  );

  // Create an evaluation
  const createEvaluation = useCallback(
    (data: Omit<EvaluationData, "id" | "createdAt">) => {
      const newEvaluation: EvaluationData = {
        ...data,
        id: `eval_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      saveEvaluations([...evaluations, newEvaluation]);
      return newEvaluation;
    },
    [evaluations, saveEvaluations]
  );

  // Update an evaluation
  const updateEvaluation = useCallback(
    (evaluationId: string, data: Partial<Omit<EvaluationData, "id" | "createdAt">>) => {
      saveEvaluations(
        evaluations.map((e) =>
          e.id === evaluationId ? { ...e, ...data } : e
        )
      );
    },
    [evaluations, saveEvaluations]
  );

  // Delete an evaluation
  const deleteEvaluation = useCallback(
    (evaluationId: string) => {
      saveEvaluations(evaluations.filter((e) => e.id !== evaluationId));
    },
    [evaluations, saveEvaluations]
  );

  // Get evaluations for a session
  const getSessionEvaluations = useCallback(
    (sessionId: string) => {
      return evaluations.filter((e) => e.sessionId === sessionId);
    },
    [evaluations]
  );

	  // Export data as CSV
	  const exportAsCSV = useCallback(() => {
	    const headers = [
	      "Session ID",
	      "Session Date",
	      "Facilitator",
	      "Group",
	      "Session Notes", // NEW
	      "Evaluation ID", // NEW
	      "Evaluation Created At", // NEW
	      "Phase",
	      "Grouping (Before)",
	      "Discomfort",
	      "Tensions",
	      "Communication",
	      "Mixed Interactions (Before)",
	      "Participation (During)",
	      "Respect (During)",
	      "Openness (During)",
	      "Laughter (During)",
	      "Mixed Observed (During)",
	      "Grouping (After)",
	      "Mixed Interactions (After)",
	      "Products Completed (After)",
	      "Participant Representation (After)",
	    ];
	
	    const rows = evaluations.map((e) => {
	      const session = sessions.find((s) => s.id === e.sessionId);
	      return [
	        e.sessionId,
	        session?.date || "",
	        session?.facilitator || "",
	        session?.group || "",
	        session?.notes || "", // NEW
	        e.id, // NEW
	        e.createdAt, // NEW
	        e.phase,
	        e.grouping,
	        e.discomfort,
	        e.tensions,
	        e.communication,
	        e.mixedInteractions,
	        e.participation,
	        e.respect,
	        e.openness,
	        e.laughter,
	        e.mixedObserved,
	        e.groupingAfter,
	        e.mixedInteractionsAfter,
	        e.productsCompleted,
	        e.participantRepresentation,
	      ];
	    });

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convivencia_evaluations_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [evaluations, sessions]);

  // Export data as JSON
  const exportAsJSON = useCallback(() => {
    const data = {
      sessions: sessions,
      evaluations: evaluations,
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `convivencia_data_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sessions, evaluations]);

  // Import data from JSON
	  const checkDataQuality = useCallback((): DataQualityIssue[] => {
	    const issues: DataQualityIssue[] = [];
	    const now = new Date();
	
	    sessions.forEach(session => {
	      const sessionEvals = evaluations.filter(e => e.sessionId === session.id).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
	      const sessionDate = new Date(session.date);
	      const sessionDateStr = session.date;
	
	      // 1. Missing Baseline (Before)
	      const hasBefore = sessionEvals.some(e => e.phase === 'before');
	      if (!hasBefore) {
	        issues.push({
	          sessionId: session.id,
	          sessionDate: sessionDateStr,
	          sessionGroup: session.group,
	          issue: 'missing_baseline',
	          message: `Falta la evaluación de LÍNEA BASE (ANTES) para la sesión.`,
	        });
	      }
	
	      // 2. Missing Impact (After) - Check if session date is in the past
	      const hasAfter = sessionEvals.some(e => e.phase === 'after');
	      // Assuming a program duration of 4 weeks (28 days) after the session date for a final evaluation to be expected
	      const expectedImpactDate = new Date(sessionDate);
	      expectedImpactDate.setDate(expectedImpactDate.getDate() + 28);
	
	      if (!hasAfter && now > expectedImpactDate) {
	        issues.push({
	          sessionId: session.id,
	          sessionDate: sessionDateStr,
	          sessionGroup: session.group,
	          issue: 'missing_impact',
	          message: `Falta la evaluación de IMPACTO (DESPUÉS). Se esperaba después del ${expectedImpactDate.toLocaleDateString()}.`,
	        });
	      }
	
	      // 3. Stale Session (No evaluation in the last 7 days for an ongoing session)
	      const lastEval = sessionEvals[sessionEvals.length - 1];
	      const daysSinceLastEval = lastEval ? (now.getTime() - new Date(lastEval.createdAt).getTime()) / (1000 * 60 * 60 * 24) : Infinity;
	      
	      // Only check for stale if the session is not yet complete (i.e., no 'after' evaluation)
	      if (!hasAfter && daysSinceLastEval > 7) {
	        issues.push({
	          sessionId: session.id,
	          sessionDate: sessionDateStr,
	          sessionGroup: session.group,
	          issue: 'stale_session',
	          message: `La sesión está INACTIVA. No se ha registrado una evaluación en los últimos 7 días.`,
	        });
	      }
	
	      // 4. Out of Order (Before evaluation created after During/After) - Simple check
	      const beforeEval = sessionEvals.find(e => e.phase === 'before');
	      const nonBeforeEvals = sessionEvals.filter(e => e.phase !== 'before');
	
	      if (beforeEval && nonBeforeEvals.length > 0) {
	        const firstNonBeforeTime = new Date(nonBeforeEvals[0].createdAt).getTime();
	        const beforeTime = new Date(beforeEval.createdAt).getTime();
	        
	        if (beforeTime > firstNonBeforeTime) {
	          issues.push({
	            sessionId: session.id,
	            sessionDate: sessionDateStr,
	            sessionGroup: session.group,
	            issue: 'out_of_order',
	            message: `Evaluación de LÍNEA BASE registrada DESPUÉS de una evaluación de seguimiento.`,
	          });
	        }
	      }
	    });
	
	    return issues;
	  }, [sessions, evaluations]);
	
	  const importFromJSON = useCallback(
	    (jsonString: string) => {
      try {
	        const data = JSON.parse(jsonString);
	        if (data.sessions && Array.isArray(data.sessions) && data.evaluations && Array.isArray(data.evaluations)) {
	          // Stronger validation to ensure all required fields are present
	          const isSessionsValid = data.sessions.every((s: any) => s.id && s.date && s.facilitator && s.group && typeof s.notes === 'string');
	          const isEvaluationsValid = data.evaluations.every((e: any) => e.id && e.sessionId && e.phase);
	
	          if (isSessionsValid && isEvaluationsValid) {
	            saveSessions(data.sessions);
	            saveEvaluations(data.evaluations);
	            return { success: true, message: "Datos importados correctamente." };
	          } else {
	            return { success: false, message: "Estructura de datos JSON inválida. Faltan campos esenciales en sesiones o evaluaciones." };
	          }
	        } else {
          return { success: false, message: "El archivo JSON debe contener 'sessions' y 'evaluations'." };
        }
      } catch (error) {
        console.error("Error importing data:", error);
        return { success: false, message: "Error al parsear el archivo JSON." };
      }
    },
    [saveSessions, saveEvaluations]
  );

	  return {
	    sessions,
	    evaluations,
	    loading,
	    createSession,
	    deleteSession,
	    updateSession,
	    createEvaluation,
	    updateEvaluation,
	    deleteEvaluation,
	    getSessionEvaluations,
	    exportAsCSV,
	    exportAsJSON,
	    importFromJSON,
	    checkDataQuality, // NEW: Export data quality check function
	  };
	}

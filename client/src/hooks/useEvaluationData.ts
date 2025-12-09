import { useState, useEffect, useCallback } from "react";

export interface Session {
  id: string;
  date: string;
  facilitator: string;
  group: string;
  notes?: string; // New field for session planning/management
  createdAt: string;
}

	export interface SessionEvaluationData {
	  id: string;
	  sessionId: string;
	  phase: "initial" | "followup"; // Session-level evaluation
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
	  createdAt: string;
	}
	
	export interface ProgramEvaluationData {
	  id: string;
	  programId: string; // Placeholder for future multi-program support
	  phase: "final_impact"; // Program-level evaluation
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
	const SESSION_EVALUATIONS_KEY = "convivencia_session_evaluations";
	const PROGRAM_EVALUATIONS_KEY = "convivencia_program_evaluations";
	
	export function useEvaluationData() {
	  const [sessions, setSessions] = useState<Session[]>([]);
	  const [sessionEvaluations, setSessionEvaluations] = useState<SessionEvaluationData[]>([]);
	  const [programEvaluations, setProgramEvaluations] = useState<ProgramEvaluationData[]>([]);
	  const [loading, setLoading] = useState(true);
	
	  // Load data from localStorage on mount
	  useEffect(() => {
	    const savedSessions = localStorage.getItem(SESSIONS_KEY);
	    const savedSessionEvals = localStorage.getItem(SESSION_EVALUATIONS_KEY);
	    const savedProgramEvals = localStorage.getItem(PROGRAM_EVALUATIONS_KEY);
	
	    if (savedSessions) {
	      setSessions(JSON.parse(savedSessions));
	    }
	    if (savedSessionEvals) {
	      setSessionEvaluations(JSON.parse(savedSessionEvals));
	    }
	    if (savedProgramEvals) {
	      setProgramEvaluations(JSON.parse(savedProgramEvals));
	    }
	    setLoading(false);
	  }, []);
	
	  // Save sessions to localStorage
	  const saveSessions = useCallback((newSessions: Session[]) => {
	    setSessions(newSessions);
	    localStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
	  }, []);
	
	  // Save session evaluations to localStorage
	  const saveSessionEvaluations = useCallback((newEvaluations: SessionEvaluationData[]) => {
	    setSessionEvaluations(newEvaluations);
	    localStorage.setItem(SESSION_EVALUATIONS_KEY, JSON.stringify(newEvaluations));
	  }, []);
	
	  // Save program evaluations to localStorage
	  const saveProgramEvaluations = useCallback((newEvaluations: ProgramEvaluationData[]) => {
	    setProgramEvaluations(newEvaluations);
	    localStorage.setItem(PROGRAM_EVALUATIONS_KEY, JSON.stringify(newEvaluations));
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
	      saveSessionEvaluations(sessionEvaluations.filter((e) => e.sessionId !== sessionId));
	    },
	    [sessions, sessionEvaluations, saveSessions, saveSessionEvaluations]
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
	
	  // Create a session evaluation
	  const createSessionEvaluation = useCallback(
	    (data: Omit<SessionEvaluationData, "id" | "createdAt">) => {
	      const newEvaluation: SessionEvaluationData = {
	        ...data,
	        id: `eval_${Date.now()}`,
	        createdAt: new Date().toISOString(),
	      };
	      saveSessionEvaluations([...sessionEvaluations, newEvaluation]);
	      return newEvaluation;
	    },
	    [sessionEvaluations, saveSessionEvaluations]
	  );
	
	  // Create a program evaluation
	  const createProgramEvaluation = useCallback(
	    (data: Omit<ProgramEvaluationData, "id" | "createdAt">) => {
	      const newEvaluation: ProgramEvaluationData = {
	        ...data,
	        id: `program_eval_${Date.now()}`,
	        programId: 'default', // Hardcoded for now
	        createdAt: new Date().toISOString(),
	      };
	      saveProgramEvaluations([...programEvaluations, newEvaluation]);
	      return newEvaluation;
	    },
	    [programEvaluations, saveProgramEvaluations]
	  );
	
	  // Update a session evaluation
	  const updateSessionEvaluation = useCallback(
	    (evaluationId: string, data: Partial<Omit<SessionEvaluationData, "id" | "createdAt">>) => {
	      saveSessionEvaluations(
	        sessionEvaluations.map((e) =>
	          e.id === evaluationId ? { ...e, ...data } : e
	        )
	      );
	    },
	    [sessionEvaluations, saveSessionEvaluations]
	  );
	
	  // Update a program evaluation
	  const updateProgramEvaluation = useCallback(
	    (evaluationId: string, data: Partial<Omit<ProgramEvaluationData, "id" | "createdAt">>) => {
	      saveProgramEvaluations(
	        programEvaluations.map((e) =>
	          e.id === evaluationId ? { ...e, ...data } : e
	        )
	      );
	    },
	    [programEvaluations, saveProgramEvaluations]
	  );
	
	  // Delete a session evaluation
	  const deleteSessionEvaluation = useCallback(
	    (evaluationId: string) => {
	      saveSessionEvaluations(sessionEvaluations.filter((e) => e.id !== evaluationId));
	    },
	    [sessionEvaluations, saveSessionEvaluations]
	  );
	
	  // Delete a program evaluation
	  const deleteProgramEvaluation = useCallback(
	    (evaluationId: string) => {
	      saveProgramEvaluations(programEvaluations.filter((e) => e.id !== evaluationId));
	    },
	    [programEvaluations, saveProgramEvaluations]
	  );
	
	  // Get session evaluations for a session
	  const getSessionEvaluations = useCallback(
	    (sessionId: string) => {
	      return sessionEvaluations.filter((e) => e.sessionId === sessionId);
	    },
	    [sessionEvaluations]
	  );
	
	  // Get the latest program evaluation
	  const getLatestProgramEvaluation = useCallback(() => {
	    if (programEvaluations.length === 0) return null;
	    return programEvaluations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
	  }, [programEvaluations]);
	
	  // Export data as CSV
	  const exportAsCSV = useCallback(() => {
	    // 1. Session Evaluations
	    const sessionHeaders = [
	      "Type",
	      "Session ID",
	      "Session Date",
	      "Facilitator",
	      "Group",
	      "Session Notes",
	      "Evaluation ID",
	      "Evaluation Created At",
	      "Phase",
	      "Grouping",
	      "Discomfort",
	      "Tensions",
	      "Communication",
	      "Mixed Interactions",
	      "Participation",
	      "Respect",
	      "Openness",
	      "Laughter",
	      "Mixed Observed",
	    ];
	
	    const sessionRows = sessionEvaluations.map((e) => {
	      const session = sessions.find((s) => s.id === e.sessionId);
	      return [
	        "SESSION",
	        e.sessionId,
	        session?.date || "",
	        session?.facilitator || "",
	        session?.group || "",
	        session?.notes || "",
	        e.id,
	        e.createdAt,
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
	      ];
	    });
	
	    // 2. Program Evaluations
	    const programHeaders = [
	      "Type",
	      "Evaluation ID",
	      "Evaluation Created At",
	      "Phase",
	      "Grouping (After)",
	      "Mixed Interactions (After)",
	      "Products Completed (After)",
	      "Participant Representation (After)",
	    ];
	
	    const programRows = programEvaluations.map((e) => {
	      return [
	        "PROGRAM",
	        e.id,
	        e.createdAt,
	        e.phase,
	        e.groupingAfter,
	        e.mixedInteractionsAfter,
	        e.productsCompleted,
	        e.participantRepresentation,
	      ];
	    });
	
	    const sessionCsv = [
	      sessionHeaders.join(","),
	      ...sessionRows.map((r) => r.map((v) => `"${v}"`).join(",")),
	    ].join("\n");
	
	    const programCsv = [
	      programHeaders.join(","),
	      ...programRows.map((r) => r.map((v) => `"${v}"`).join(",")),
	    ].join("\n");
	
	    const csv = sessionCsv + "\n\n" + programCsv;
	
	    const blob = new Blob([csv], { type: "text/csv" });
	    const url = URL.createObjectURL(blob);
	    const a = document.createElement("a");
	    a.href = url;
	    a.download = `convivencia_evaluations_${new Date().toISOString().split("T")[0]}.csv`;
	    a.click();
	    URL.revokeObjectURL(url);
	  }, [sessionEvaluations, programEvaluations, sessions]);
	
	  // Export data as JSON
	  const exportAsJSON = useCallback(() => {
	    const data = {
	      sessions: sessions,
	      sessionEvaluations: sessionEvaluations,
	      programEvaluations: programEvaluations,
	    };
	
	    const json = JSON.stringify(data, null, 2);
	    const blob = new Blob([json], { type: "application/json" });
	    const url = URL.createObjectURL(blob);
	    const a = document.createElement("a");
	    a.href = url;
	    a.download = `convivencia_data_backup_${new Date().toISOString().split("T")[0]}.json`;
	    a.click();
	    URL.revokeObjectURL(url);
	  }, [sessions, sessionEvaluations, programEvaluations]);
	
	  // Import data from JSON
	  const checkDataQuality = useCallback((): DataQualityIssue[] => {
	    const issues: DataQualityIssue[] = [];
	    const now = new Date();
	
	    sessions.forEach(session => {
	      const sessionEvals = sessionEvaluations.filter(e => e.sessionId === session.id).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
	      const sessionDate = new Date(session.date);
	      const sessionDateStr = session.date;
	
	      // 1. Missing Initial (Initial)
	      const hasInitial = sessionEvals.some(e => e.phase === 'initial');
	      if (!hasInitial) {
	        issues.push({
	          sessionId: session.id,
	          sessionDate: sessionDateStr,
	          sessionGroup: session.group,
	          issue: 'missing_baseline',
	          message: `Falta la evaluación INICIAL para la sesión.`,
	        });
	      }
	
	      // 2. Stale Session (No evaluation in the last 7 days for an ongoing session)
	      const lastEval = sessionEvals[sessionEvals.length - 1];
	      const daysSinceLastEval = lastEval ? (now.getTime() - new Date(lastEval.createdAt).getTime()) / (1000 * 60 * 60 * 24) : Infinity;
	      
	      // Check for stale if the session date is in the past
	      if (new Date(session.date) < now && daysSinceLastEval > 7) {
	        issues.push({
	          sessionId: session.id,
	          sessionDate: sessionDateStr,
	          sessionGroup: session.group,
	          issue: 'stale_session',
	          message: `La sesión está INACTIVA. No se ha registrado una evaluación en los últimos 7 días.`,
	        });
	      }
	
	      // 3. Out of Order (Followup evaluation created before Initial) - Simple check
	      const initialEval = sessionEvals.find(e => e.phase === 'initial');
	      const followupEvals = sessionEvals.filter(e => e.phase === 'followup');
	
	      if (initialEval && followupEvals.length > 0) {
	        const firstFollowupTime = new Date(followupEvals[0].createdAt).getTime();
	        const initialTime = new Date(initialEval.createdAt).getTime();
	        
	        if (initialTime > firstFollowupTime) {
	          issues.push({
	            sessionId: session.id,
	            sessionDate: sessionDateStr,
	            sessionGroup: session.group,
	            issue: 'out_of_order',
	            message: `Evaluación INICIAL registrada DESPUÉS de una evaluación de seguimiento.`,
	          });
	        }
	      }
	    });
	
	    // Check for missing Program Final Impact Evaluation
	    const hasFinalImpact = programEvaluations.some(e => e.phase === 'final_impact');
	    // Assuming program is expected to be complete 3 months after the first session
	    const firstSession = sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
	    
	    if (firstSession) {
	      const expectedFinalImpactDate = new Date(firstSession.date);
	      expectedFinalImpactDate.setMonth(expectedFinalImpactDate.getMonth() + 3);
	
	      if (!hasFinalImpact && now > expectedFinalImpactDate) {
	        issues.push({
	          sessionId: 'PROGRAM',
	          sessionDate: firstSession.date,
	          sessionGroup: 'PROGRAMA COMPLETO',
	          issue: 'missing_impact',
	          message: `Falta la evaluación de IMPACTO FINAL del programa. Se esperaba después del ${expectedFinalImpactDate.toLocaleDateString()}.`,
	        });
	      }
	    }
	
	    return issues;
	  }, [sessions, sessionEvaluations, programEvaluations]);
	
	  const importFromJSON = useCallback(
	    (jsonString: string) => {
	      try {
	        const data = JSON.parse(jsonString);
	        
	        const hasSessions = data.sessions && Array.isArray(data.sessions);
	        const hasSessionEvals = data.sessionEvaluations && Array.isArray(data.sessionEvaluations);
	        const hasProgramEvals = data.programEvaluations && Array.isArray(data.programEvaluations);
	
	        if (hasSessions && hasSessionEvals && hasProgramEvals) {
	          // Stronger validation to ensure all required fields are present
	          const isSessionsValid = data.sessions.every((s: any) => s.id && s.date && s.facilitator && s.group && typeof s.notes === 'string');
	          const isSessionEvalsValid = data.sessionEvaluations.every((e: any) => e.id && e.sessionId && (e.phase === 'initial' || e.phase === 'followup'));
	          const isProgramEvalsValid = data.programEvaluations.every((e: any) => e.id && e.phase === 'final_impact');
	
	          if (isSessionsValid && isSessionEvalsValid && isProgramEvalsValid) {
	            saveSessions(data.sessions);
	            saveSessionEvaluations(data.sessionEvaluations);
	            saveProgramEvaluations(data.programEvaluations);
	            return { success: true, message: "Datos importados correctamente." };
	          } else {
	            return { success: false, message: "Estructura de datos JSON inválida. Faltan campos esenciales o la estructura de fases es incorrecta." };
	          }
	        } else {
	          return { success: false, message: "El archivo JSON debe contener 'sessions', 'sessionEvaluations', y 'programEvaluations'." };
	        }
	      } catch (error) {
	        console.error("Error importing data:", error);
	        return { success: false, message: "Error al parsear el archivo JSON." };
	      }
	    },
	    [saveSessions, saveSessionEvaluations, saveProgramEvaluations]
	  );
	
	  return {
	    sessions,
	    sessionEvaluations,
	    programEvaluations,
	    loading,
	    createSession,
	    deleteSession,
	    updateSession,
	    createSessionEvaluation,
	    updateSessionEvaluation,
	    deleteSessionEvaluation,
	    createProgramEvaluation,
	    updateProgramEvaluation,
	    deleteProgramEvaluation,
	    getSessionEvaluations,
	    getLatestProgramEvaluation,
	    exportAsCSV,
	    exportAsJSON,
	    importFromJSON,
	    checkDataQuality, // NEW: Export data quality check function
	  };
	}

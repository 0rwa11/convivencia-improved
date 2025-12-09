import { useState, useEffect, useCallback } from "react";

export interface Session {
  id: string;
  date: string;
  facilitator: string;
  group: string;
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
  createdAt: string;
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
      "Date",
      "Facilitator",
      "Group",
      "Phase",
      "Grouping",
      "Discomfort",
      "Tensions",
      "Communication",
      "Mixed Interactions",
    ];

    const rows = evaluations.map((e) => {
      const session = sessions.find((s) => s.id === e.sessionId);
      return [
        e.sessionId,
        session?.date || "",
        session?.facilitator || "",
        session?.group || "",
        e.phase,
        e.grouping,
        e.discomfort,
        e.tensions,
        e.communication,
        e.mixedInteractions,
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
  const importFromJSON = useCallback(
    (jsonString: string) => {
      try {
        const data = JSON.parse(jsonString);
        if (data.sessions && Array.isArray(data.sessions) && data.evaluations && Array.isArray(data.evaluations)) {
          // Simple validation to ensure data structure is correct
          if (data.sessions.every((s: any) => s.id && s.date) && data.evaluations.every((e: any) => e.id && e.sessionId)) {
            saveSessions(data.sessions);
            saveEvaluations(data.evaluations);
            return { success: true, message: "Datos importados correctamente." };
          } else {
            return { success: false, message: "Estructura de datos JSON inválida." };
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
    deleteEvaluation,
    getSessionEvaluations,
    exportAsCSV,
    exportAsJSON,
    importFromJSON,
  };
}

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvaluationData } from "@/hooks/useEvaluationData";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
	import "react-day-picker/dist/style.css";
	
	export default function Calendar() {
	  const { sessions, getSessionEvaluations } = useEvaluationData(); // NEW: getSessionEvaluations
	  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	
	  const sessionsByDate = useMemo(() => {
    const map: Record<string, typeof sessions> = {};
    sessions.forEach((session) => {
      const dateKey = session.date;
      if (!map[dateKey]) {
        map[dateKey] = [];
      }
      map[dateKey].push(session);
    });
    return map;
  }, [sessions]);

  const sessionDates = useMemo(() => {
    return sessions.map((session) => new Date(session.date));
  }, [sessions]);

  const selectedDateKey = selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  const sessionsOnSelectedDate = sessionsByDate[selectedDateKey] || [];

  const modifiers = {
    hasSession: sessionDates,
  };

  const modifiersStyles = {
    hasSession: {
      backgroundColor: "#3b82f6",
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Calendario de Sesiones</h1>
        <p className="text-lg text-muted-foreground">
          Visualiza y programa las sesiones del programa
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Calendario
            </CardTitle>
            <CardDescription>
              Los días con sesiones están resaltados en azul
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="border rounded-lg p-4"
            />
          </CardContent>
        </Card>

        {/* Sessions on Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>
              Sesiones del {selectedDate?.toLocaleDateString("es-ES", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </CardTitle>
            <CardDescription>
              {sessionsOnSelectedDate.length} sesión(es) programada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sessionsOnSelectedDate.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay sesiones programadas para esta fecha
              </p>
            ) : (
              <div className="space-y-3">
                {sessionsOnSelectedDate.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
	                    <div className="flex items-center justify-between mb-2">
	                      <h3 className="font-semibold">{session.group}</h3>
	                      <div className="flex gap-2 items-center">
	                        <Badge>{session.date}</Badge>
	                        {/* NEW: Evaluation Status Badge */}
	                        {getSessionEvaluations(session.id).length > 0 && (
	                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
	                            {getSessionEvaluations(session.id).length} Evaluacion(es)
	                          </Badge>
	                        )}
	                      </div>
	                    </div>
	                    <p className="text-sm text-muted-foreground">
	                      <strong>Facilitador:</strong> {session.facilitator}
	                    </p>
	                    {/* NEW: Session Notes */}
	                    {session.notes && (
	                      <p className="text-sm mt-2 p-2 bg-muted rounded-md border">
	                        <strong>Notas:</strong> {session.notes}
	                      </p>
	                    )}
	                    <p className="text-xs text-muted-foreground mt-1">
	                      Creada: {new Date(session.createdAt).toLocaleString("es-ES")}
	                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Sessions List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Sesiones</CardTitle>
          <CardDescription>
            {sessions.length} sesión(es) registrada(s) en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay sesiones registradas aún. Crea una sesión en el Registro de Evaluaciones.
            </p>
          ) : (
            <div className="space-y-2">
              {sessions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
	                      <Badge variant="outline">{session.date}</Badge>
	                      <div>
	                        <p className="font-medium">{session.group}</p>
	                        <p className="text-sm text-muted-foreground">{session.facilitator}</p>
	                        {/* NEW: Evaluation Status Badge in All Sessions List */}
	                        {getSessionEvaluations(session.id).length > 0 && (
	                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">
	                            {getSessionEvaluations(session.id).length} Evaluacion(es)
	                          </Badge>
	                        )}
	                      </div>
	                    </div>
	                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

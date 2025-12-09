import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Card className="w-full max-w-lg mx-4 shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full animate-pulse blur-lg" />
              <div className="relative p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            ¡Bienvenido!
          </h1>

          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Programa Convivencia Intercultural
          </h2>

          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-lg">
            Gracias por visitar nuestro programa de convivencia intercultural. 
          </p>

          <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Haz clic en el botón de abajo para explorar todas nuestras herramientas, materiales, evaluaciones y recursos diseñados para fortalecer la comunidad.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-base font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir a la Página Principal
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Explora nuestro programa completo de convivencia intercultural
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

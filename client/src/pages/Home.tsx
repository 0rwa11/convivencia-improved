import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, BarChart3, Zap, ArrowRight, CheckCircle, Lightbulb, Target, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
            <Award className="w-4 h-4" />
            Programa de Convivencia Intercultural
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-bold text-foreground leading-tight">
            La Fuerza de la
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Trayectoria
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un programa integral para promover la convivencia intercultural, reducir estereotipos y fortalecer la comunidad entre migrantes adultos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/programa/sobre">
              <a className="cursor-pointer">
                <Button size="lg" className="bg-primary hover:bg-blue-700 text-white">
                  Conocer el Programa <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </Link>
            <Link href="/trabajo/registro">
              <a className="cursor-pointer">
                <Button size="lg" variant="outline">
                  Comenzar Evaluación
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Características Principales</h2>
            <p className="text-lg text-muted-foreground">Todo lo que necesitas para implementar el programa</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle>Contenido Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Acceso a todas las dinámicas, materiales y guías del facilitador
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <CardTitle>Evaluación Integrada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Registra y analiza el impacto del programa en tiempo real
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <CardTitle>Gestión de Grupos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Administra múltiples grupos y sesiones fácilmente
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <CardTitle>Herramientas Avanzadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Búsqueda, calendario y resumen ejecutivo de resultados
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Acceso Rápido</h2>
            <p className="text-lg text-muted-foreground">Navega a las secciones principales</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Programa Section */}
            <Link href="/programa/inicio">
              <a className="group cursor-pointer">
                <Card className="h-full hover:shadow-lg transition-all hover:border-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </div>
                    <CardTitle>Programa</CardTitle>
                    <CardDescription>Información y materiales del programa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Sobre el Programa
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Las 3 Sesiones
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Dinámicas y Materiales
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </a>
            </Link>

            {/* Trabajo Section */}
            <Link href="/trabajo/registro">
              <a className="group cursor-pointer">
                <Card className="h-full hover:shadow-lg transition-all hover:border-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-green-600 transition-colors" />
                    </div>
                    <CardTitle>Trabajo</CardTitle>
                    <CardDescription>Evaluaciones y análisis de datos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Crear Evaluación
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Registro de Evaluaciones
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Análisis Comparativo
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </a>
            </Link>

            {/* Herramientas Section */}
            <Link href="/herramientas/calendario">
              <a className="group cursor-pointer">
                <Card className="h-full hover:shadow-lg transition-all hover:border-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                    </div>
                    <CardTitle>Herramientas</CardTitle>
                    <CardDescription>Utilidades y análisis avanzados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Calendario
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Búsqueda Avanzada
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Resumen Ejecutivo
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Beneficios del Programa</h2>
            <p className="text-lg text-muted-foreground">Impacto comprobado en la comunidad</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Reducción de Estereotipos</h3>
              </div>
              <p className="text-muted-foreground">
                Disminuye prejuicios y promueve la comprensión mutua entre participantes de diferentes orígenes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Fortalecimiento Comunitario</h3>
              </div>
              <p className="text-muted-foreground">
                Crea vínculos sólidos entre miembros de la comunidad y facilita la integración social.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Desarrollo Integral</h3>
              </div>
              <p className="text-muted-foreground">
                Potencia habilidades de comunicación, empatía y liderazgo en los participantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">¿Listo para Comenzar?</h2>
          <p className="text-xl text-blue-100">
            Accede a todas las herramientas y recursos necesarios para implementar el programa de convivencia intercultural.
          </p>
          <Link href="/trabajo/evaluacion">
            <a className="cursor-pointer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Iniciar Evaluación <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">C</div>
                <span>Convivencia</span>
              </div>
              <p className="text-slate-400 text-sm">
                Programa integral para promover la convivencia intercultural y fortalecer comunidades.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Programa</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/programa/sobre"><a className="hover:text-white transition">Sobre el Programa</a></Link></li>
                <li><Link href="/programa/sesiones"><a className="hover:text-white transition">Las 3 Sesiones</a></Link></li>
                <li><Link href="/programa/dinamicas"><a className="hover:text-white transition">Dinámicas</a></Link></li>
                <li><Link href="/programa/materiales"><a className="hover:text-white transition">Materiales</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Trabajo</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/trabajo/evaluacion"><a className="hover:text-white transition">Evaluación</a></Link></li>
                <li><Link href="/trabajo/registro"><a className="hover:text-white transition">Registro</a></Link></li>
                <li><Link href="/trabajo/analisis"><a className="hover:text-white transition">Análisis</a></Link></li>
                <li><Link href="/trabajo/grupos"><a className="hover:text-white transition">Grupos</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Herramientas</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/herramientas/calendario"><a className="hover:text-white transition">Calendario</a></Link></li>
                <li><Link href="/herramientas/busqueda"><a className="hover:text-white transition">Búsqueda</a></Link></li>
                <li><Link href="/herramientas/resumen"><a className="hover:text-white transition">Resumen</a></Link></li>
                <li><Link href="/herramientas/analisis"><a className="hover:text-white transition">Análisis</a></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Programa Convivencia Intercultural. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

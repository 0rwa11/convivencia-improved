import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTheme } from "./contexts/ThemeContext";
import { Menu, X, Moon, Sun, ChevronDown, ArrowRight, Users, BookOpen, BarChart3, Zap, Target, Lightbulb, Award, Heart, Sparkles, CheckCircle2, MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <span className="hidden sm:inline">Convivencia</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("programa")} className="text-foreground hover:text-primary transition-colors font-medium">Programa</button>
              <button onClick={() => scrollToSection("caracteristicas")} className="text-foreground hover:text-primary transition-colors font-medium">Características</button>
              <button onClick={() => scrollToSection("impacto")} className="text-foreground hover:text-primary transition-colors font-medium">Impacto</button>
              <button onClick={() => scrollToSection("testimonios")} className="text-foreground hover:text-primary transition-colors font-medium">Testimonios</button>
              <button onClick={() => scrollToSection("contacto")} className="text-foreground hover:text-primary transition-colors font-medium">Contacto</button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 border-t border-border">
              <button onClick={() => scrollToSection("programa")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors">Programa</button>
              <button onClick={() => scrollToSection("caracteristicas")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors">Características</button>
              <button onClick={() => scrollToSection("impacto")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors">Impacto</button>
              <button onClick={() => scrollToSection("testimonios")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors">Testimonios</button>
              <button onClick={() => scrollToSection("contacto")} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors">Contacto</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Programa de Convivencia Intercultural
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            La Fuerza de la
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Trayectoria</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un programa transformador que promueve la convivencia intercultural, reduce estereotipos y fortalece comunidades entre migrantes adultos a través de dinámicas participativas y evaluación integral.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" onClick={() => scrollToSection("programa")} className="bg-primary hover:bg-blue-700 text-white">
              Descubre el Programa <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("caracteristicas")}>
              Ver Características
            </Button>
          </div>

          <div className="pt-12 flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Sesiones Transformadoras</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Impacto Duradero</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Participativo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa Section */}
      <section id="programa" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">El Programa</h2>
            <p className="text-lg text-muted-foreground">Estructura y contenido del programa de convivencia</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Sesión 1: Encuentro", desc: "Conocimiento mutuo y construcción de confianza entre participantes de diferentes culturas." },
              { icon: Heart, title: "Sesión 2: Empatía", desc: "Desarrollo de comprensión profunda y conexión emocional con experiencias diversas." },
              { icon: Target, title: "Sesión 3: Acción", desc: "Compromiso colectivo para fortalecer la comunidad y crear cambio positivo." }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Metodología Participativa</h3>
            <p className="text-muted-foreground mb-6">
              Nuestro programa utiliza dinámicas interactivas, ejercicios de reflexión y actividades colaborativas diseñadas para crear un ambiente seguro y acogedor donde cada participante puede expresarse libremente y aprender de las experiencias de otros.
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {["Dinámicas de grupo inclusivas", "Espacios de reflexión profunda", "Actividades colaborativas", "Evaluación continua del impacto"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section id="caracteristicas" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Características Principales</h2>
            <p className="text-lg text-muted-foreground">Todo lo que necesitas para implementar el programa</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Contenido Completo", desc: "Dinámicas, materiales y guías" },
              { icon: BarChart3, title: "Evaluación Integrada", desc: "Análisis de impacto en tiempo real" },
              { icon: Users, title: "Gestión de Grupos", desc: "Administra múltiples sesiones" },
              { icon: Zap, title: "Herramientas Avanzadas", desc: "Búsqueda y análisis profundo" },
              { icon: Calendar, title: "Calendario Interactivo", desc: "Planificación de sesiones" },
              { icon: Briefcase, title: "Resumen Ejecutivo", desc: "Reportes profesionales" },
              { icon: Award, title: "Certificación", desc: "Reconocimiento de participantes" },
              { icon: Lightbulb, title: "Recursos Educativos", desc: "Material de apoyo completo" }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:border-primary/50 group">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto Section */}
      <section id="impacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Impacto Comprobado</h2>
            <p className="text-lg text-muted-foreground">Resultados medibles en la comunidad</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Reducción de Estereotipos", desc: "Disminuye prejuicios y promueve comprensión mutua entre participantes de diferentes orígenes culturales." },
              { icon: Users, title: "Fortalecimiento Comunitario", desc: "Crea vínculos sólidos y facilita la integración social en la comunidad." },
              { icon: Heart, title: "Desarrollo Integral", desc: "Potencia habilidades de comunicación, empatía y liderazgo en los participantes." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-lg w-fit">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { number: "95%", label: "Satisfacción de Participantes" },
              { number: "3", label: "Sesiones Transformadoras" },
              { number: "∞", label: "Conexiones Creadas" },
              { number: "100%", label: "Participación Activa" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section id="testimonios" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Testimonios</h2>
            <p className="text-lg text-muted-foreground">Historias de transformación y conexión</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "María González", role: "Facilitadora", text: "Este programa cambió la forma en que veo la diversidad. Las herramientas son prácticas y el impacto es inmediato." },
              { name: "Ahmed Hassan", role: "Participante", text: "Nunca pensé que podría conectar tan profundamente con personas de culturas diferentes. Una experiencia transformadora." },
              { name: "Sofia Kowalski", role: "Coordinadora", text: "La evaluación integral nos permite medir el impacto real. Los datos hablan por sí solos sobre la efectividad del programa." }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">¿Listo para Transformar tu Comunidad?</h2>
          <p className="text-xl text-blue-100">
            Accede a todas las herramientas y recursos necesarios para implementar el programa de convivencia intercultural.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Comienza Ahora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Contacto</h2>
            <p className="text-lg text-muted-foreground">¿Preguntas? Nos encantaría saber de ti</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Ubicación", desc: "Disponible en múltiples ciudades" },
              { icon: Calendar, title: "Horarios", desc: "Sesiones flexibles según tu disponibilidad" },
              { icon: Heart, title: "Comunidad", desc: "Únete a nuestra red de facilitadores" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">C</div>
                <span>Convivencia</span>
              </div>
              <p className="text-slate-400 text-sm">Transformando comunidades a través de la convivencia intercultural.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Programa</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#programa" className="hover:text-white transition">Sobre el Programa</a></li>
                <li><a href="#caracteristicas" className="hover:text-white transition">Características</a></li>
                <li><a href="#impacto" className="hover:text-white transition">Impacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Materiales</a></li>
                <li><a href="#" className="hover:text-white transition">Guías</a></li>
                <li><a href="#" className="hover:text-white transition">Dinámicas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Comunidad</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#testimonios" className="hover:text-white transition">Testimonios</a></li>
                <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition">Únete</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Programa Convivencia Intercultural. Transformando comunidades, un sesión a la vez.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

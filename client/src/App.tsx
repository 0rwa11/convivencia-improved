import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTheme } from "./contexts/ThemeContext";
import { Route, Switch, useLocation } from "wouter";
import { Menu, X, Moon, Sun, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Pages
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

// Programa Pages
import ProgramOverview from "./pages/programa/ProgramOverview";
import AboutProgram from "./pages/programa/AboutProgram";
import ThreeSessions from "./pages/programa/ThreeSessions";
import Dynamics from "./pages/programa/Dynamics";
import Materials from "./pages/programa/Materials";
import FacilitatorGuide from "./pages/programa/FacilitatorGuide";

// Trabajo Pages
import Evaluation from "./pages/trabajo/Evaluation";
import EvaluationRegistry from "./pages/trabajo/EvaluationRegistry";
import ComparativeAnalysis from "./pages/trabajo/ComparativeAnalysis";
import GroupDashboard from "./pages/trabajo/GroupDashboard";

// Herramientas Pages
import Calendar from "./pages/herramientas/Calendar";
import AdvancedSearch from "./pages/herramientas/AdvancedSearch";
import ExecutiveSummary from "./pages/herramientas/ExecutiveSummary";
import AnalyticsPage from "./pages/herramientas/AnalyticsPage";
import SessionReports from "./pages/herramientas/SessionReports";
import ResourceLibrary from "./pages/herramientas/ResourceLibrary";
import FacilitatorChecklist from "./pages/herramientas/FacilitatorChecklist";
import ImpactDashboard from "./pages/herramientas/ImpactDashboard";

// Custom NavLink component
const NavLink = ({ href, className, onClick, children }: any) => {
  const [, setLocation] = useLocation();
  
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setLocation(href);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
};

function Header() {
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

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border" : "bg-background/80 backdrop-blur-sm border-b border-border/50"}`}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="hidden sm:inline">Convivencia</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {/* Programa Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">Programa</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <NavLink href="/programa/inicio" className="cursor-pointer">Inicio</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/programa/sobre" className="cursor-pointer">Sobre el Programa</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/programa/sesiones" className="cursor-pointer">Las 3 Sesiones</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/programa/dinamicas" className="cursor-pointer">Dinámicas</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/programa/materiales" className="cursor-pointer">Materiales</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/programa/guia" className="cursor-pointer">Guía del Facilitador</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Trabajo Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">Trabajo</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <NavLink href="/trabajo/evaluacion" className="cursor-pointer">Evaluación</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/trabajo/registro" className="cursor-pointer">Registro de Evaluaciones</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/trabajo/analisis" className="cursor-pointer">Análisis Comparativo</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/trabajo/grupos" className="cursor-pointer">Dashboard de Grupos</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Herramientas Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">Herramientas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/calendario" className="cursor-pointer">Calendario</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/busqueda" className="cursor-pointer">Búsqueda Avanzada</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/resumen" className="cursor-pointer">Resumen Ejecutivo</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/analisis" className="cursor-pointer">Análisis Avanzados</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/reportes" className="cursor-pointer">Reportes de Sesión</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/biblioteca" className="cursor-pointer">Biblioteca de Recursos</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/checklist" className="cursor-pointer">Checklist del Facilitador</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/herramientas/impacto" className="cursor-pointer">Dashboard de Impacto</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Export PDF Button */}
          <Button
            variant="outline"
            size="icon"
            title="Exportar a PDF"
            onClick={() => window.print()}
            className="hidden sm:flex"
          >
            <FileText className="w-4 h-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            title="Cambiar tema"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-2">
            <div className="font-semibold text-sm text-muted-foreground mb-3">Programa</div>
            <NavLink href="/programa/inicio" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Inicio</NavLink>
            <NavLink href="/programa/sobre" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Sobre el Programa</NavLink>
            <NavLink href="/programa/sesiones" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Las 3 Sesiones</NavLink>
            <NavLink href="/programa/dinamicas" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Dinámicas</NavLink>
            <NavLink href="/programa/materiales" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Materiales</NavLink>
            <NavLink href="/programa/guia" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Guía del Facilitador</NavLink>

            <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">Trabajo</div>
            <NavLink href="/trabajo/evaluacion" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Evaluación</NavLink>
            <NavLink href="/trabajo/registro" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Registro de Evaluaciones</NavLink>
            <NavLink href="/trabajo/analisis" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Análisis Comparativo</NavLink>
            <NavLink href="/trabajo/grupos" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Dashboard de Grupos</NavLink>

            <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">Herramientas</div>
            <NavLink href="/herramientas/calendario" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Calendario</NavLink>
            <NavLink href="/herramientas/busqueda" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Búsqueda Avanzada</NavLink>
            <NavLink href="/herramientas/resumen" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Resumen Ejecutivo</NavLink>
            <NavLink href="/herramientas/analisis" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Análisis Avanzados</NavLink>
            <NavLink href="/herramientas/reportes" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Reportes de Sesión</NavLink>
            <NavLink href="/herramientas/biblioteca" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Biblioteca de Recursos</NavLink>
            <NavLink href="/herramientas/checklist" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Checklist del Facilitador</NavLink>
            <NavLink href="/herramientas/impacto" className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>Dashboard de Impacto</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/analisis"} component={Analysis} />
      
      {/* Programa Routes */}
      <Route path={"/programa/inicio"} component={ProgramOverview} />
      <Route path={"/programa/sobre"} component={AboutProgram} />
      <Route path={"/programa/sesiones"} component={ThreeSessions} />
      <Route path={"/programa/dinamicas"} component={Dynamics} />
      <Route path={"/programa/materiales"} component={Materials} />
      <Route path={"/programa/guia"} component={FacilitatorGuide} />
      
      {/* Trabajo Routes */}
      <Route path={"/trabajo/evaluacion"} component={Evaluation} />
      <Route path={"/trabajo/registro"} component={EvaluationRegistry} />
      <Route path={"/trabajo/analisis"} component={ComparativeAnalysis} />
      <Route path={"/trabajo/grupos"} component={GroupDashboard} />
      
      {/* Herramientas Routes */}
      <Route path={"/herramientas/calendario"} component={Calendar} />
      <Route path={"/herramientas/busqueda"} component={AdvancedSearch} />
      <Route path={"/herramientas/resumen"} component={ExecutiveSummary} />
      <Route path={"herramientas/analisis"} component={AnalyticsPage} />
      <Route path={"herramientas/reportes"} component={SessionReports} />
      <Route path={"herramientas/biblioteca"} component={ResourceLibrary} />
      <Route path={"herramientas/checklist"} component={FacilitatorChecklist} />
      <Route path={"herramientas/impacto"} component={ImpactDashboard} />
      
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container py-8">
        <Router />
      </main>
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

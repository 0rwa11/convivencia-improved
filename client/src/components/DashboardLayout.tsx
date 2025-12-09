import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="hidden sm:inline">Convivencia</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Programa Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Programa
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/programa/inicio">
                    <a className="cursor-pointer">Inicio</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/sobre">
                    <a className="cursor-pointer">Sobre el Programa</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/sesiones">
                    <a className="cursor-pointer">Las 3 Sesiones</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/dinamicas">
                    <a className="cursor-pointer">Dinámicas</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/materiales">
                    <a className="cursor-pointer">Materiales</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/guia">
                    <a className="cursor-pointer">Guía del Facilitador</a>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Trabajo Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Trabajo
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/evaluacion">
                    <a className="cursor-pointer">Evaluación</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/registro">
                    <a className="cursor-pointer">Registro de Evaluaciones</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/analisis">
                    <a className="cursor-pointer">Análisis Comparativo</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/grupos">
                    <a className="cursor-pointer">Dashboard de Grupos</a>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Herramientas Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Herramientas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/calendario">
                    <a className="cursor-pointer">Calendario</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/busqueda">
                    <a className="cursor-pointer">Búsqueda Avanzada</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/resumen">
                    <a className="cursor-pointer">Resumen Ejecutivo</a>
                  </Link>
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
              <div className="font-semibold text-sm text-muted-foreground mb-3">
                Programa
              </div>
              <Link href="/programa/inicio">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </a>
              </Link>
              <Link href="/programa/sobre">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre el Programa
                </a>
              </Link>
              <Link href="/programa/sesiones">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Las 3 Sesiones
                </a>
              </Link>
              <Link href="/programa/dinamicas">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dinámicas
                </a>
              </Link>
              <Link href="/programa/materiales">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Materiales
                </a>
              </Link>
              <Link href="/programa/guia">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Guía del Facilitador
                </a>
              </Link>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Trabajo
              </div>
              <Link href="/trabajo/evaluacion">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Evaluación
                </a>
              </Link>
              <Link href="/trabajo/registro">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registro de Evaluaciones
                </a>
              </Link>
              <Link href="/trabajo/analisis">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Análisis Comparativo
                </a>
              </Link>
              <Link href="/trabajo/grupos">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard de Grupos
                </a>
              </Link>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Herramientas
              </div>
              <Link href="/herramientas/calendario">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Calendario
                </a>
              </Link>
              <Link href="/herramientas/busqueda">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Búsqueda Avanzada
                </a>
              </Link>
              <Link href="/herramientas/resumen">
                <a
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resumen Ejecutivo
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container py-8">{children}</main>
    </div>
  );
}

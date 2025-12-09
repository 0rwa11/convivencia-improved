import React, { useState } from "react";
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
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="hidden sm:inline">Convivencia</span>
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
                  <Link href="/programa/inicio" className="cursor-pointer">Inicio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/sobre" className="cursor-pointer">Sobre el Programa</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/sesiones" className="cursor-pointer">Las 3 Sesiones</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/dinamicas" className="cursor-pointer">Dinámicas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/materiales" className="cursor-pointer">Materiales</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programa/guia" className="cursor-pointer">Guía del Facilitador</Link>
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
                  <Link href="/trabajo/evaluacion" className="cursor-pointer">Evaluación</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/registro" className="cursor-pointer">Registro de Evaluaciones</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/analisis" className="cursor-pointer">Análisis Comparativo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trabajo/grupos" className="cursor-pointer">Dashboard de Grupos</Link>
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
                  <Link href="/herramientas/calendario" className="cursor-pointer">Calendario</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/busqueda" className="cursor-pointer">Búsqueda Avanzada</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/resumen" className="cursor-pointer">Resumen Ejecutivo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/herramientas/analisis" className="cursor-pointer">Análisis Avanzados</Link>
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
              <Link
                href="/programa/inicio"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/programa/sobre"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre el Programa
              </Link>
              <Link
                href="/programa/sesiones"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Las 3 Sesiones
              </Link>
              <Link
                href="/programa/dinamicas"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dinámicas
              </Link>
              <Link
                href="/programa/materiales"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Materiales
              </Link>
              <Link
                href="/programa/guia"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guía del Facilitador
              </Link>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Trabajo
              </div>
              <Link
                href="/trabajo/evaluacion"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Evaluación
              </Link>
              <Link
                href="/trabajo/registro"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registro de Evaluaciones
              </Link>
              <Link
                href="/trabajo/analisis"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Análisis Comparativo
              </Link>
              <Link
                href="/trabajo/grupos"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard de Grupos
              </Link>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Herramientas
              </div>
              <Link
                href="/herramientas/calendario"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendario
              </Link>
              <Link
                href="/herramientas/busqueda"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Búsqueda Avanzada
              </Link>
              <Link
                href="/herramientas/resumen"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resumen Ejecutivo
              </Link>
              <Link
                href="/herramientas/analisis"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Análisis Avanzados
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

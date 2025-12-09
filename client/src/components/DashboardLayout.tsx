import React, { useState } from "react";
import { useLocation } from "wouter";
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

// Custom NavLink component to avoid nested <a> tags
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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="hidden sm:inline">Convivencia</span>
          </NavLink>

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
                <Button variant="ghost" size="sm">
                  Trabajo
                </Button>
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
                <Button variant="ghost" size="sm">
                  Herramientas
                </Button>
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
              <NavLink
                href="/programa/inicio"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </NavLink>
              <NavLink
                href="/programa/sobre"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre el Programa
              </NavLink>
              <NavLink
                href="/programa/sesiones"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Las 3 Sesiones
              </NavLink>
              <NavLink
                href="/programa/dinamicas"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dinámicas
              </NavLink>
              <NavLink
                href="/programa/materiales"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Materiales
              </NavLink>
              <NavLink
                href="/programa/guia"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Guía del Facilitador
              </NavLink>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Trabajo
              </div>
              <NavLink
                href="/trabajo/evaluacion"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Evaluación
              </NavLink>
              <NavLink
                href="/trabajo/registro"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registro de Evaluaciones
              </NavLink>
              <NavLink
                href="/trabajo/analisis"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Análisis Comparativo
              </NavLink>
              <NavLink
                href="/trabajo/grupos"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard de Grupos
              </NavLink>

              <div className="font-semibold text-sm text-muted-foreground mb-3 mt-4">
                Herramientas
              </div>
              <NavLink
                href="/herramientas/calendario"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendario
              </NavLink>
              <NavLink
                href="/herramientas/busqueda"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Búsqueda Avanzada
              </NavLink>
              <NavLink
                href="/herramientas/resumen"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resumen Ejecutivo
              </NavLink>
              <NavLink
                href="/herramientas/analisis"
                className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Análisis Avanzados
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container py-8">{children}</main>
    </div>
  );
}

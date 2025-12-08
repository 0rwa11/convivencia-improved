import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Download, FileText, X } from "lucide-react";

interface Material {
  name: string;
  category: string;
  session: string;
  type: string;
  file: string;
}

const materials: Material[] = [
  { name: "Programa Completo", category: "Programa", session: "General", type: "PDF", file: "Programa_Convivencia_Revisado_Final.pdf" },
  { name: "Dinámicas Detalladas", category: "Dinámicas", session: "General", type: "PDF", file: "Dinamicas_Detalladas_Revisadas.pdf" },
  { name: "Guía del Facilitador", category: "Guías", session: "General", type: "PDF", file: "Guia_Facilitador.pdf" },
  { name: "Fichas de Evaluación", category: "Evaluación", session: "General", type: "PDF", file: "Fichas_Evaluacion_Revisadas.pdf" },
  { name: "Afirmaciones Termómetro S1", category: "Materiales", session: "Sesión 1", type: "PDF", file: "S1_Termometro_Afirmaciones.pdf" },
  { name: "Carteles Termómetro", category: "Materiales", session: "Sesión 1", type: "PDF", file: "D4_Carteles_Termometro.pdf" },
  { name: "Tarjetas Estereotipos", category: "Materiales", session: "Sesión 1", type: "PDF", file: "D4_Termometro_Estereotipo_Tarjetas.pdf" },
  { name: "Afirmaciones Semáforo S2", category: "Materiales", session: "Sesión 2", type: "PDF", file: "S2_Semaforo_Afirmaciones.pdf" },
  { name: "Carteles Semáforo", category: "Materiales", session: "Sesión 2", type: "PDF", file: "D5_Carteles_Semaforo.pdf" },
  { name: "Plantilla Maleta Común", category: "Materiales", session: "Sesión 2", type: "PDF", file: "D6_Plantilla_Maleta_Comun.pdf" },
  { name: "Plantilla Árbol de Contribución", category: "Materiales", session: "Sesión 3", type: "PDF", file: "D8_Plantilla_Arbol_Contribucion.pdf" },
  { name: "Pasaporte del Participante", category: "Certificados", session: "General", type: "PDF", file: "Pasaporte_Participante.pdf" },
  { name: "Certificado de Participación", category: "Certificados", session: "General", type: "PDF", file: "Certificado_Participacion.pdf" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(materials.map((m) => m.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const sessions = useMemo(() => {
    const sess = new Set(materials.map((m) => m.session));
    return ["all", ...Array.from(sess)];
  }, []);

  const types = useMemo(() => {
    const typs = new Set(materials.map((m) => m.type));
    return ["all", ...Array.from(typs)];
  }, []);

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
      const matchesSession = selectedSession === "all" || material.session === selectedSession;
      const matchesType = selectedType === "all" || material.type === selectedType;

      return matchesSearch && matchesCategory && matchesSession && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedSession, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSession("all");
    setSelectedType("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedSession !== "all" || selectedType !== "all";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Búsqueda de Materiales</h1>
        <p className="text-lg text-muted-foreground">
          Encuentra rápidamente los recursos que necesitas
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5" />
            Filtros de Búsqueda
          </CardTitle>
          <CardDescription>
            Usa los filtros para encontrar materiales específicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar por nombre</Label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej: Termómetro, Guía, Certificado..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.filter((c) => c !== "all").map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session">Sesión</Label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger id="session">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las sesiones</SelectItem>
                  {sessions.filter((s) => s !== "all").map((sess) => (
                    <SelectItem key={sess} value={sess}>{sess}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {types.filter((t) => t !== "all").map((typ) => (
                    <SelectItem key={typ} value={typ}>{typ}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>
            {filteredMaterials.length} material(es) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMaterials.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No se encontraron materiales con los filtros seleccionados
            </p>
          ) : (
            <div className="space-y-3">
              {filteredMaterials.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{material.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{material.category}</Badge>
                        <Badge variant="secondary">{material.session}</Badge>
                        <Badge>{material.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <a
                      href={`/convivencia-fixed/pdfs/${material.file}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

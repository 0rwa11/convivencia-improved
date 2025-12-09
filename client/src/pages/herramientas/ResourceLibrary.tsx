import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, BookOpen, FileVideo, Users, Zap, Search } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: "guide" | "material" | "dynamic" | "evaluation" | "video";
  session?: number;
  format: string;
  size: string;
  downloads: number;
}

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const resources: Resource[] = [
    {
      id: "1",
      title: "Guía del Facilitador - Sesión 1",
      description: "Instrucciones completas para facilitar la sesión de encuentro",
      category: "guide",
      session: 1,
      format: "PDF",
      size: "2.5 MB",
      downloads: 145
    },
    {
      id: "2",
      title: "Guía del Facilitador - Sesión 2",
      description: "Instrucciones completas para facilitar la sesión de empatía",
      category: "guide",
      session: 2,
      format: "PDF",
      size: "2.8 MB",
      downloads: 128
    },
    {
      id: "3",
      title: "Guía del Facilitador - Sesión 3",
      description: "Instrucciones completas para facilitar la sesión de acción",
      category: "guide",
      session: 3,
      format: "PDF",
      size: "2.6 MB",
      downloads: 112
    },
    {
      id: "4",
      title: "Tarjetas de Estereotipos",
      description: "Conjunto completo de tarjetas para la dinámica del termómetro",
      category: "material",
      session: 1,
      format: "PDF",
      size: "1.2 MB",
      downloads: 89
    },
    {
      id: "5",
      title: "Carteles Termómetro",
      description: "Carteles para la dinámica de acuerdo/desacuerdo",
      category: "material",
      session: 1,
      format: "PDF",
      size: "0.8 MB",
      downloads: 76
    },
    {
      id: "6",
      title: "Preguntas Rompe Hielo",
      description: "100 preguntas para la dinámica del círculo del ritmo",
      category: "material",
      session: 1,
      format: "PDF",
      size: "0.5 MB",
      downloads: 134
    },
    {
      id: "7",
      title: "Plantilla de Evaluación",
      description: "Formulario de evaluación para participantes",
      category: "evaluation",
      format: "PDF",
      size: "0.3 MB",
      downloads: 98
    },
    {
      id: "8",
      title: "Rúbrica de Evaluación",
      description: "Criterios para evaluar el impacto del programa",
      category: "evaluation",
      format: "PDF",
      size: "0.4 MB",
      downloads: 67
    },
    {
      id: "9",
      title: "Dinámica: El Círculo del Ritmo",
      description: "Instrucciones paso a paso de la dinámica",
      category: "dynamic",
      session: 1,
      format: "PDF",
      size: "0.6 MB",
      downloads: 156
    },
    {
      id: "10",
      title: "Dinámica: Termómetro del Estereotipo",
      description: "Guía completa para facilitar esta dinámica",
      category: "dynamic",
      session: 1,
      format: "PDF",
      size: "0.7 MB",
      downloads: 142
    },
    {
      id: "11",
      title: "Dinámica: Historias de Vida",
      description: "Preguntas y guía para la dinámica de historias personales",
      category: "dynamic",
      session: 2,
      format: "PDF",
      size: "0.5 MB",
      downloads: 118
    },
    {
      id: "12",
      title: "Dinámica: Mapa de Sueños",
      description: "Instrucciones para crear el mapa colectivo de sueños",
      category: "dynamic",
      session: 2,
      format: "PDF",
      size: "0.6 MB",
      downloads: 105
    },
    {
      id: "13",
      title: "Dinámica: Compromiso Comunitario",
      description: "Guía para la dinámica de compromisos de acción",
      category: "dynamic",
      session: 3,
      format: "PDF",
      size: "0.5 MB",
      downloads: 89
    },
    {
      id: "14",
      title: "Dinámica: Red de Apoyo Mutuo",
      description: "Instrucciones para crear la red de apoyo comunitario",
      category: "dynamic",
      session: 3,
      format: "PDF",
      size: "0.6 MB",
      downloads: 76
    },
    {
      id: "15",
      title: "Certificado de Participación",
      description: "Plantilla de certificado para participantes",
      category: "material",
      format: "PDF",
      size: "0.2 MB",
      downloads: 203
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "guide": return <BookOpen className="w-5 h-5" />;
      case "material": return <FileText className="w-5 h-5" />;
      case "dynamic": return <Users className="w-5 h-5" />;
      case "evaluation": return <Zap className="w-5 h-5" />;
      case "video": return <FileVideo className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      guide: "Guía",
      material: "Material",
      dynamic: "Dinámica",
      evaluation: "Evaluación",
      video: "Video"
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      guide: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      material: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      dynamic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      evaluation: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      video: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Biblioteca de Recursos</h1>
        <p className="text-lg text-muted-foreground">
          Acceso centralizado a todos los materiales, guías y recursos del programa
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            Todos
          </Button>
          <Button
            variant={selectedCategory === "guide" ? "default" : "outline"}
            onClick={() => setSelectedCategory("guide")}
          >
            Guías
          </Button>
          <Button
            variant={selectedCategory === "material" ? "default" : "outline"}
            onClick={() => setSelectedCategory("material")}
          >
            Materiales
          </Button>
          <Button
            variant={selectedCategory === "dynamic" ? "default" : "outline"}
            onClick={() => setSelectedCategory("dynamic")}
          >
            Dinámicas
          </Button>
          <Button
            variant={selectedCategory === "evaluation" ? "default" : "outline"}
            onClick={() => setSelectedCategory("evaluation")}
          >
            Evaluación
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredResources.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No se encontraron recursos</p>
          </Card>
        ) : (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${getCategoryColor(resource.category)}`}>
                      {getCategoryIcon(resource.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge className={getCategoryColor(resource.category)}>
                          {getCategoryLabel(resource.category)}
                        </Badge>
                        {resource.session && (
                          <Badge variant="outline">Sesión {resource.session}</Badge>
                        )}
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>{resource.format}</span>
                    <span>{resource.size}</span>
                    <span>{resource.downloads} descargas</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>Estadísticas de la Biblioteca</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{resources.length}</div>
            <div className="text-sm text-muted-foreground">Recursos Totales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{resources.filter(r => r.category === "guide").length}</div>
            <div className="text-sm text-muted-foreground">Guías</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{resources.filter(r => r.category === "dynamic").length}</div>
            <div className="text-sm text-muted-foreground">Dinámicas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{resources.reduce((sum, r) => sum + r.downloads, 0)}</div>
            <div className="text-sm text-muted-foreground">Descargas Totales</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

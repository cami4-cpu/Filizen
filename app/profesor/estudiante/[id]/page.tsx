"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmotionChart } from "@/components/emotion-chart"
import { estudiantes, checkInsEjemplo, reportes, cuestionarios } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  FileText,
  AlertTriangle,
  Mail,
  Clock,
  CheckCircle
} from "lucide-react"

const estadoConfig = {
  "bien": { label: "Bien", color: "text-blue-500", bg: "bg-blue-500/10" },
  "regular": { label: "Regular", color: "text-amber-500", bg: "bg-amber-500/10" },
  "necesita-atencion": { label: "Necesita atencion", color: "text-red-500", bg: "bg-red-500/10" }
}

const tendenciaConfig = {
  "mejorando": { icon: TrendingUp, color: "text-blue-500" },
  "estable": { icon: Minus, color: "text-amber-500" },
  "bajando": { icon: TrendingDown, color: "text-red-500" }
}

export default function EstudianteDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params)
  const estudiante = estudiantes.find(e => e.id === resolvedParams.id)

  if (!estudiante) {
    notFound()
  }

  const estado = estadoConfig[estudiante.estado]
  const tendencia = tendenciaConfig[estudiante.tendencia]
  const TendenciaIcon = tendencia.icon
  
  const reportesEstudiante = reportes.filter(r => r.estudianteId === estudiante.id)
  
  const initials = estudiante.nombre
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/profesor">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al dashboard
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className={cn("text-xl", estado.color)}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{estudiante.nombre}</h1>
                <p className="text-muted-foreground">{estudiante.curso}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="outline" className={cn(estado.color, "border-current")}>
                    {estado.label}
                  </Badge>
                  <div className={cn("flex items-center gap-1 text-sm", tendencia.color)}>
                    <TendenciaIcon className="h-4 w-4" />
                    <span className="capitalize">{estudiante.tendencia}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contactar
                </Button>
                <Link href="/profesor/reportes">
                  <Button size="sm" className="gap-2 w-full">
                    <FileText className="h-4 w-4" />
                    Crear reporte
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-48">
          <Card className={estado.bg}>
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Ultimo check-in</p>
              <p className="font-semibold">{estudiante.ultimoCheckIn}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">Racha actual</p>
              <p className="font-semibold">{estudiante.racha} dias</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="flex gap-2 md:hidden">
        <Button variant="outline" className="flex-1 gap-2">
          <Mail className="h-4 w-4" />
          Contactar
        </Button>
        <Link href="/profesor/reportes" className="flex-1">
          <Button className="w-full gap-2">
            <FileText className="h-4 w-4" />
            Crear reporte
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="bienestar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bienestar">Bienestar</TabsTrigger>
          <TabsTrigger value="cuestionarios">Cuestionarios</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="bienestar" className="space-y-6">
          <EmotionChart 
            data={checkInsEjemplo} 
            title="Historial de bienestar"
            description="Tendencia de las ultimas 2 semanas"
          />

          {/* Alert if needed */}
          {estudiante.estado === "necesita-atencion" && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-500">Atencion requerida</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Este estudiante muestra una tendencia a la baja en su bienestar emocional. 
                      Se recomienda establecer contacto y evaluar si necesita apoyo adicional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cuestionarios" className="space-y-4">
          {cuestionarios.map((cuestionario) => (
            <Card key={cuestionario.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{cuestionario.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {cuestionario.completado 
                        ? `Completado el ${new Date(cuestionario.fechaCompletado!).toLocaleDateString("es")}`
                        : "Pendiente"
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {cuestionario.completado && cuestionario.puntuacion && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          cuestionario.puntuacion >= 70 ? "text-blue-500 border-blue-500/30" :
                          cuestionario.puntuacion >= 50 ? "text-amber-500 border-amber-500/30" :
                          "text-red-500 border-red-500/30"
                        )}
                      >
                        {cuestionario.puntuacion}%
                      </Badge>
                    )}
                    {cuestionario.completado ? (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reportes" className="space-y-4">
          {reportesEstudiante.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  No hay reportes para este estudiante
                </p>
                <Link href="/profesor/reportes">
                  <Button className="mt-4 gap-2">
                    <FileText className="h-4 w-4" />
                    Crear primer reporte
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            reportesEstudiante.map((reporte) => (
              <Card key={reporte.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="outline"
                      className={cn(
                        reporte.tipo === "alerta" && "text-red-500 border-red-500/30",
                        reporte.tipo === "observacion" && "text-yellow-500 border-yellow-500/30",
                        reporte.tipo === "seguimiento" && "text-blue-500 border-blue-500/30"
                      )}
                    >
                      {reporte.tipo}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {reporte.estado}
                    </Badge>
                  </div>
                  <p className="text-sm">{reporte.contenido}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(reporte.fecha).toLocaleDateString("es")}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

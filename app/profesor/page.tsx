"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentGrid } from "@/components/student-grid"
import { WellnessCard } from "@/components/wellness-card"
import { estudiantes, reportes, type EstadoBienestar } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  ArrowRight,
  Bell,
  CheckCircle
} from "lucide-react"

export default function ProfesorDashboard() {
  const { usuario } = useAuth()
  const [filtro, setFiltro] = useState<EstadoBienestar | "todos">("todos")

  const stats = {
    total: estudiantes.length,
    bien: estudiantes.filter(e => e.estado === "bien").length,
    regular: estudiantes.filter(e => e.estado === "regular").length,
    atencion: estudiantes.filter(e => e.estado === "necesita-atencion").length
  }

  const alertasActivas = reportes.filter(r => r.estado !== "resuelto")
  const estudiantesAtencion = estudiantes.filter(e => e.estado === "necesita-atencion")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Bienvenido, {usuario?.nombre.split(" ").slice(0, 2).join(" ")}
          </h1>
          <p className="text-muted-foreground">
            Resumen del bienestar de tus estudiantes
          </p>
        </div>
        <Link href="/profesor/reportes">
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Crear reporte
          </Button>
        </Link>
      </div>

      {/* Alerts Banner */}
      {estudiantesAtencion.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-red-500">
                    {estudiantesAtencion.length} estudiante{estudiantesAtencion.length > 1 ? "s" : ""} necesita{estudiantesAtencion.length > 1 ? "n" : ""} atencion
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {estudiantesAtencion.map(e => e.nombre).join(", ")}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setFiltro("necesita-atencion")}>
                Ver estudiantes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <WellnessCard 
          title="Total estudiantes"
          value={stats.total}
          subtitle="En tus clases"
          icon={Users}
        />
        <WellnessCard 
          title="Bienestar alto"
          value={stats.bien}
          subtitle={`${Math.round((stats.bien / stats.total) * 100)}% del total`}
          estado="bien"
          icon={CheckCircle}
        />
        <WellnessCard 
          title="A observar"
          value={stats.regular}
          subtitle="Estado regular"
          estado="regular"
          icon={TrendingUp}
        />
        <WellnessCard 
          title="Requieren atencion"
          value={stats.atencion}
          subtitle="Prioridad alta"
          estado="necesita-atencion"
          icon={AlertTriangle}
        />
      </div>

      {/* Recent Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Estudiantes</CardTitle>
                  <CardDescription>
                    Vista general de todos tus estudiantes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {(["todos", "bien", "regular", "necesita-atencion"] as const).map((estado) => (
                    <Button
                      key={estado}
                      variant={filtro === estado ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltro(estado)}
                      className={cn(
                        "text-xs",
                        filtro !== estado && estado === "bien" && "text-blue-500 hover:text-blue-600",
                        filtro !== estado && estado === "regular" && "text-amber-500 hover:text-amber-600",
                        filtro !== estado && estado === "necesita-atencion" && "text-red-500 hover:text-red-600"
                      )}
                    >
                      {estado === "todos" ? "Todos" : 
                       estado === "bien" ? "Bien" :
                       estado === "regular" ? "Regular" : "Atencion"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StudentGrid estudiantes={estudiantes} filtro={filtro} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Alertas recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alertasActivas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay alertas pendientes
                </p>
              ) : (
                <div className="space-y-3">
                  {alertasActivas.slice(0, 3).map((alerta) => (
                    <div 
                      key={alerta.id}
                      className="p-3 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{alerta.estudianteNombre}</p>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            alerta.tipo === "alerta" && "text-red-500 border-red-500/30",
                            alerta.tipo === "observacion" && "text-yellow-500 border-yellow-500/30",
                            alerta.tipo === "seguimiento" && "text-blue-500 border-blue-500/30"
                          )}
                        >
                          {alerta.tipo}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {alerta.contenido}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(alerta.fecha).toLocaleDateString("es")}
                      </p>
                    </div>
                  ))}
                  <Link href="/profesor/reportes">
                    <Button variant="ghost" size="sm" className="w-full gap-2">
                      Ver todos los reportes
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Consejos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>- Revisa diariamente los indicadores de tus estudiantes</p>
              <p>- Documenta cualquier observacion relevante</p>
              <p>- Comunicate con los estudiantes que muestren senales de alerta</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

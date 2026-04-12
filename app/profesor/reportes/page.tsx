"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { estudiantes, reportes as reportesIniciales, type Reporte } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  FileText, 
  Plus, 
  Calendar,
  AlertTriangle,
  Eye,
  ClipboardList,
  CheckCircle
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const tipoConfig = {
  observacion: { label: "Observacion", color: "text-amber-500", icon: Eye },
  alerta: { label: "Alerta", color: "text-red-500", icon: AlertTriangle },
  seguimiento: { label: "Seguimiento", color: "text-blue-500", icon: ClipboardList }
}

const estadoConfig = {
  pendiente: { label: "Pendiente", color: "text-amber-500" },
  "en-proceso": { label: "En proceso", color: "text-sky-500" },
  resuelto: { label: "Resuelto", color: "text-blue-500" }
}

export default function ReportesPage() {
  const [reportes, setReportes] = useState<Reporte[]>(reportesIniciales)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [nuevoReporte, setNuevoReporte] = useState({
    estudianteId: "",
    tipo: "observacion" as "observacion" | "alerta" | "seguimiento",
    contenido: ""
  })

  useEffect(() => {
    // Cargar reportes guardados
    const stored = localStorage.getItem("filizen-reportes")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setReportes([...parsed, ...reportesIniciales])
      } catch {
        // Usar datos de ejemplo si hay error
      }
    }
  }, [])

  const handleGuardar = () => {
    if (!nuevoReporte.estudianteId || !nuevoReporte.contenido) return

    const estudiante = estudiantes.find(e => e.id === nuevoReporte.estudianteId)
    if (!estudiante) return

    const reporte: Reporte = {
      id: Date.now().toString(),
      estudianteId: nuevoReporte.estudianteId,
      estudianteNombre: estudiante.nombre,
      fecha: new Date().toISOString().split("T")[0],
      tipo: nuevoReporte.tipo,
      contenido: nuevoReporte.contenido,
      estado: "pendiente"
    }

    const nuevosReportes = [reporte, ...reportes]
    setReportes(nuevosReportes)
    
    // Guardar solo los nuevos reportes
    const paraGuardar = nuevosReportes.filter(r => !reportesIniciales.find(ri => ri.id === r.id))
    localStorage.setItem("filizen-reportes", JSON.stringify(paraGuardar))

    setNuevoReporte({ estudianteId: "", tipo: "observacion", contenido: "" })
    setDialogOpen(false)
  }

  const cambiarEstado = (reporteId: string, nuevoEstado: Reporte["estado"]) => {
    const nuevosReportes = reportes.map(r => 
      r.id === reporteId ? { ...r, estado: nuevoEstado } : r
    )
    setReportes(nuevosReportes)
    
    const paraGuardar = nuevosReportes.filter(r => !reportesIniciales.find(ri => ri.id === r.id))
    localStorage.setItem("filizen-reportes", JSON.stringify(paraGuardar))
  }

  const reportesFiltrados = filtroEstado === "todos" 
    ? reportes 
    : reportes.filter(r => r.estado === filtroEstado)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Reportes y Observaciones
          </h1>
          <p className="text-muted-foreground">
            Documenta observaciones sobre tus estudiantes
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear nuevo reporte</DialogTitle>
              <DialogDescription>
                Documenta una observacion, alerta o seguimiento sobre un estudiante
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Student Selector */}
              <div className="space-y-2">
                <Label>Estudiante</Label>
                <Select 
                  value={nuevoReporte.estudianteId}
                  onValueChange={(v) => setNuevoReporte({ ...nuevoReporte, estudianteId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {estudiantes.map((est) => (
                      <SelectItem key={est.id} value={est.id}>
                        {est.nombre} - {est.curso}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Selector */}
              <div className="space-y-2">
                <Label>Tipo de reporte</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(tipoConfig) as [keyof typeof tipoConfig, typeof tipoConfig[keyof typeof tipoConfig]][]).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                      <button
                        key={key}
                        onClick={() => setNuevoReporte({ ...nuevoReporte, tipo: key })}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                          nuevoReporte.tipo === key
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", config.color)} />
                        <span className="text-xs">{config.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="contenido">Descripcion</Label>
                <Textarea
                  id="contenido"
                  placeholder="Describe tu observacion..."
                  rows={4}
                  value={nuevoReporte.contenido}
                  onChange={(e) => setNuevoReporte({ ...nuevoReporte, contenido: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleGuardar}
                disabled={!nuevoReporte.estudianteId || !nuevoReporte.contenido}
              >
                Guardar reporte
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Filtrar por estado:</span>
            {["todos", "pendiente", "en-proceso", "resuelto"].map((estado) => (
              <Button
                key={estado}
                variant={filtroEstado === estado ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroEstado(estado)}
                className="text-xs"
              >
                {estado === "todos" ? "Todos" : estadoConfig[estado as keyof typeof estadoConfig].label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {reportesFiltrados.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-2">No hay reportes</h3>
            <p className="text-muted-foreground mb-4">
              {filtroEstado === "todos" 
                ? "Crea tu primer reporte para documentar observaciones"
                : `No hay reportes con estado "${estadoConfig[filtroEstado as keyof typeof estadoConfig]?.label || filtroEstado}"`
              }
            </p>
            {filtroEstado === "todos" && (
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Crear reporte
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reportesFiltrados.map((reporte) => {
            const tipo = tipoConfig[reporte.tipo]
            const estado = estadoConfig[reporte.estado]
            const TipoIcon = tipo.icon
            
            return (
              <Card key={reporte.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn("p-1.5 rounded", tipo.color.replace("text-", "bg-") + "/10")}>
                          <TipoIcon className={cn("h-4 w-4", tipo.color)} />
                        </div>
                        <span className="font-semibold">{reporte.estudianteNombre}</span>
                        <Badge variant="outline" className={cn("text-xs", tipo.color)}>
                          {tipo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {reporte.contenido}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reporte.fecha).toLocaleDateString("es", { 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric" 
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Select 
                        value={reporte.estado}
                        onValueChange={(v) => cambiarEstado(reporte.id, v as Reporte["estado"])}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="en-proceso">En proceso</SelectItem>
                          <SelectItem value="resuelto">Resuelto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="py-6">
          <h3 className="font-semibold mb-3">Tipos de reportes</h3>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="font-medium text-yellow-500 mb-1">Observacion</p>
              <p className="text-muted-foreground">
                Para documentar comportamientos o situaciones que merecen atencion
              </p>
            </div>
            <div>
              <p className="font-medium text-red-500 mb-1">Alerta</p>
              <p className="text-muted-foreground">
                Cuando detectas senales que requieren intervencion urgente
              </p>
            </div>
            <div>
              <p className="font-medium text-blue-500 mb-1">Seguimiento</p>
              <p className="text-muted-foreground">
                Para dar continuidad a casos ya identificados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

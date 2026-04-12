"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { recursos } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  Heart, 
  FileText, 
  PlayCircle, 
  Wind, 
  Phone,
  ExternalLink,
  Clock
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const tipoConfig = {
  articulo: { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  ejercicio: { icon: Wind, color: "text-sky-500", bg: "bg-sky-500/10" },
  video: { icon: PlayCircle, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ayuda: { icon: Phone, color: "text-red-500", bg: "bg-red-500/10" }
}

const lineasAyuda = [
  { nombre: "Linea de la Vida", telefono: "800-911-2000", descripcion: "Atencion 24 horas, los 365 dias del ano" },
  { nombre: "SAPTEL", telefono: "55-5259-8121", descripcion: "Apoyo emocional por telefono" },
  { nombre: "Consejo Ciudadano", telefono: "55-5533-5533", descripcion: "Orientacion psicologica gratuita" }
]

export default function RecursosPage() {
  const [ejercicioActivo, setEjercicioActivo] = useState<string | null>(null)
  const [tiempoEjercicio, setTiempoEjercicio] = useState(0)
  const [ejercicioEnCurso, setEjercicioEnCurso] = useState(false)

  const iniciarEjercicio = (tipo: string) => {
    setEjercicioActivo(tipo)
    setTiempoEjercicio(0)
    setEjercicioEnCurso(true)
    
    // Simular el ejercicio de respiracion
    const interval = setInterval(() => {
      setTiempoEjercicio(prev => {
        if (prev >= 60) {
          clearInterval(interval)
          setEjercicioEnCurso(false)
          return 60
        }
        return prev + 1
      })
    }, 1000)
  }

  const recursosPorTipo = {
    todos: recursos,
    articulo: recursos.filter(r => r.tipo === "articulo"),
    ejercicio: recursos.filter(r => r.tipo === "ejercicio"),
    video: recursos.filter(r => r.tipo === "video")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          Recursos de Apoyo
        </h1>
        <p className="text-muted-foreground">
          Herramientas y contenido para cuidar tu bienestar emocional
        </p>
      </div>

      {/* Emergency Help Card */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-red-500">
            <Phone className="h-5 w-5" />
            Necesitas ayuda urgente?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Si estas pasando por una crisis o necesitas hablar con alguien ahora mismo, 
            estas lineas estan disponibles para ti:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {lineasAyuda.map((linea) => (
              <div key={linea.telefono} className="p-3 rounded-lg bg-background border border-border">
                <p className="font-semibold">{linea.nombre}</p>
                <p className="text-lg font-bold text-primary">{linea.telefono}</p>
                <p className="text-xs text-muted-foreground">{linea.descripcion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources Tabs */}
      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="articulo">Articulos</TabsTrigger>
          <TabsTrigger value="ejercicio">Ejercicios</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
        </TabsList>

        {Object.entries(recursosPorTipo).map(([key, items]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((recurso) => {
                const config = tipoConfig[recurso.tipo]
                const Icon = config.icon
                
                return (
                  <Card 
                    key={recurso.id}
                    className="hover:border-primary/30 transition-all cursor-pointer group"
                    onClick={() => recurso.tipo === "ejercicio" && iniciarEjercicio(recurso.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={cn("p-2 rounded-lg", config.bg)}>
                          <Icon className={cn("h-5 w-5", config.color)} />
                        </div>
                        {recurso.duracion && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {recurso.duracion}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {recurso.titulo}
                      </CardTitle>
                      <CardDescription>{recurso.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-center gap-2"
                      >
                        {recurso.tipo === "ejercicio" ? "Comenzar" : 
                         recurso.tipo === "video" ? "Ver video" : "Leer"}
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Breathing Exercise Dialog */}
      <Dialog open={!!ejercicioActivo} onOpenChange={() => setEjercicioActivo(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ejercicio de Respiracion</DialogTitle>
            <DialogDescription>
              Sigue el ritmo para relajarte
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-8 flex flex-col items-center">
            <div 
              className={cn(
                "w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-[4000ms]",
                ejercicioEnCurso && tiempoEjercicio % 8 < 4 ? "scale-150 bg-primary/30" : "scale-100"
              )}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {ejercicioEnCurso && tiempoEjercicio % 8 < 4 ? "Inhala" : "Exhala"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ejercicioEnCurso ? `${60 - tiempoEjercicio}s` : "Listo"}
                </p>
              </div>
            </div>
            
            <p className="mt-6 text-center text-muted-foreground">
              {ejercicioEnCurso 
                ? "Respira profundamente siguiendo el circulo"
                : "Ejercicio completado! Bien hecho."}
            </p>

            <Button 
              className="mt-6" 
              variant={ejercicioEnCurso ? "outline" : "default"}
              onClick={() => ejercicioEnCurso ? setEjercicioActivo(null) : iniciarEjercicio(ejercicioActivo!)}
            >
              {ejercicioEnCurso ? "Terminar" : "Repetir ejercicio"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="py-6">
          <h3 className="font-semibold mb-3">Recuerda</h3>
          <p className="text-sm text-muted-foreground">
            Estos recursos son herramientas de apoyo y autocuidado. Si sientes que necesitas 
            ayuda profesional, no dudes en hablar con un adulto de confianza, un orientador 
            escolar o un profesional de salud mental. Pedir ayuda es un acto de valentia.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

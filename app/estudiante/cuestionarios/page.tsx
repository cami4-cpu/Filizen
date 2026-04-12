"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cuestionarios, preguntasCuestionario, type Cuestionario } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Trophy
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CuestionariosPage() {
  const [cuestionarioActivo, setCuestionarioActivo] = useState<Cuestionario | null>(null)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [puntuacionFinal, setPuntuacionFinal] = useState(0)

  const iniciarCuestionario = (cuestionario: Cuestionario) => {
    setCuestionarioActivo(cuestionario)
    setPreguntaActual(0)
    setRespuestas({})
    setMostrarResultado(false)
  }

  const handleRespuesta = (valor: number) => {
    setRespuestas({ ...respuestas, [preguntaActual]: valor })
  }

  const siguientePregunta = () => {
    if (preguntaActual < preguntasCuestionario.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      // Calcular puntuacion
      const total = Object.values(respuestas).reduce((a, b) => a + b, 0)
      const maxPuntos = preguntasCuestionario.length * 3
      const porcentaje = Math.round(((maxPuntos - total) / maxPuntos) * 100)
      setPuntuacionFinal(porcentaje)
      setMostrarResultado(true)
    }
  }

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
    }
  }

  const cerrarCuestionario = () => {
    setCuestionarioActivo(null)
    setMostrarResultado(false)
  }

  const getResultadoMensaje = (puntuacion: number) => {
    if (puntuacion >= 80) return { mensaje: "Excelente! Tu bienestar emocional parece estar muy bien.", color: "text-blue-500" }
    if (puntuacion >= 60) return { mensaje: "Bien! Hay algunas areas que podrias trabajar.", color: "text-sky-500" }
    if (puntuacion >= 40) return { mensaje: "Regular. Te recomendamos explorar los recursos de apoyo.", color: "text-amber-500" }
    return { mensaje: "Parece que estas pasando por un momento dificil. No dudes en buscar ayuda.", color: "text-red-500" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Cuestionarios de Bienestar
        </h1>
        <p className="text-muted-foreground">
          Evalua tu estado emocional y recibe recomendaciones personalizadas
        </p>
      </div>

      {/* Questionnaire List */}
      <div className="grid gap-4">
        {cuestionarios.map((cuestionario) => (
          <Card 
            key={cuestionario.id}
            className={cn(
              "transition-all hover:border-primary/30",
              cuestionario.completado && "bg-muted/30"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {cuestionario.titulo}
                    {cuestionario.completado && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {cuestionario.descripcion}
                  </CardDescription>
                </div>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {cuestionario.preguntas} preguntas
                  </span>
                  {cuestionario.fechaCompletado && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Completado: {new Date(cuestionario.fechaCompletado).toLocaleDateString("es")}
                    </span>
                  )}
                </div>
                <Button 
                  variant={cuestionario.completado ? "outline" : "default"}
                  onClick={() => iniciarCuestionario(cuestionario)}
                  className="gap-2"
                >
                  {cuestionario.completado ? "Repetir" : "Comenzar"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Questionnaire Dialog */}
      <Dialog open={!!cuestionarioActivo} onOpenChange={() => cerrarCuestionario()}>
        <DialogContent className="sm:max-w-lg">
          {mostrarResultado ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Cuestionario completado
                </DialogTitle>
              </DialogHeader>
              <div className="py-6 text-center">
                <div className="mb-6">
                  <div className={cn(
                    "text-5xl font-bold mb-2",
                    getResultadoMensaje(puntuacionFinal).color
                  )}>
                    {puntuacionFinal}%
                  </div>
                  <p className="text-muted-foreground">
                    Puntuacion de bienestar
                  </p>
                </div>
                <p className={cn(
                  "text-lg mb-6",
                  getResultadoMensaje(puntuacionFinal).color
                )}>
                  {getResultadoMensaje(puntuacionFinal).mensaje}
                </p>
                <Button onClick={cerrarCuestionario} className="w-full">
                  Cerrar
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{cuestionarioActivo?.titulo}</DialogTitle>
                <DialogDescription>
                  Pregunta {preguntaActual + 1} de {preguntasCuestionario.length}
                </DialogDescription>
              </DialogHeader>
              
              <Progress 
                value={((preguntaActual + 1) / preguntasCuestionario.length) * 100} 
                className="mb-4"
              />

              <div className="py-4">
                <p className="font-medium mb-4">
                  {preguntasCuestionario[preguntaActual].pregunta}
                </p>
                
                <RadioGroup 
                  value={respuestas[preguntaActual]?.toString()} 
                  onValueChange={(v) => handleRespuesta(parseInt(v))}
                >
                  {preguntasCuestionario[preguntaActual].opciones.map((opcion) => (
                    <div 
                      key={opcion.valor} 
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={opcion.valor.toString()} id={`opcion-${opcion.valor}`} />
                      <Label htmlFor={`opcion-${opcion.valor}`} className="flex-1 cursor-pointer">
                        {opcion.texto}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={preguntaAnterior}
                  disabled={preguntaActual === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button 
                  onClick={siguientePregunta}
                  disabled={respuestas[preguntaActual] === undefined}
                  className="gap-2"
                >
                  {preguntaActual === preguntasCuestionario.length - 1 ? "Finalizar" : "Siguiente"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="py-6">
          <h3 className="font-semibold mb-3">Sobre los cuestionarios</h3>
          <p className="text-sm text-muted-foreground">
            Estos cuestionarios estan basados en herramientas validadas cientificamente 
            para evaluar el bienestar emocional. Los resultados son orientativos y no 
            reemplazan una evaluacion profesional. Si necesitas ayuda, no dudes en 
            hablar con un adulto de confianza o un profesional de salud mental.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

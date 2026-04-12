"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { emociones, entradasDiarioEjemplo, type EntradaDiario } from "@/lib/mock-data"
import { BookOpen, Plus, Calendar, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DiarioPage() {
  const [entradas, setEntradas] = useState<EntradaDiario[]>(entradasDiarioEjemplo)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [nuevaEntrada, setNuevaEntrada] = useState({
    emocion: "",
    titulo: "",
    contenido: ""
  })

  useEffect(() => {
    // Cargar entradas guardadas
    const stored = localStorage.getItem("filizen-diario")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setEntradas([...parsed, ...entradasDiarioEjemplo])
      } catch {
        // Usar datos de ejemplo si hay error
      }
    }
  }, [])

  const handleGuardar = () => {
    if (!nuevaEntrada.emocion || !nuevaEntrada.titulo || !nuevaEntrada.contenido) return

    const entrada: EntradaDiario = {
      id: Date.now().toString(),
      fecha: new Date().toISOString().split("T")[0],
      emocion: nuevaEntrada.emocion,
      titulo: nuevaEntrada.titulo,
      contenido: nuevaEntrada.contenido
    }

    const nuevasEntradas = [entrada, ...entradas]
    setEntradas(nuevasEntradas)
    
    // Guardar solo las nuevas entradas (no las de ejemplo)
    const paraGuardar = nuevasEntradas.filter(e => !entradasDiarioEjemplo.find(ej => ej.id === e.id))
    localStorage.setItem("filizen-diario", JSON.stringify(paraGuardar))

    setNuevaEntrada({ emocion: "", titulo: "", contenido: "" })
    setDialogOpen(false)
  }

  const getEmocionInfo = (id: string) => {
    return emociones.find(e => e.id === id) || { label: id, color: "text-gray-500" }
  }

  const formatDate = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Diario Emocional
          </h1>
          <p className="text-muted-foreground">
            Un espacio seguro para expresar tus pensamientos
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nueva entrada de diario</DialogTitle>
              <DialogDescription>
                Escribe como te sientes hoy. Este espacio es solo para ti.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Emotion Selector */}
              <div className="space-y-2">
                <Label>Como te sientes?</Label>
                <div className="flex flex-wrap gap-2">
                  {emociones.map((emocion) => (
                    <button
                      key={emocion.id}
                      onClick={() => setNuevaEntrada({ ...nuevaEntrada, emocion: emocion.id })}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-sm transition-all",
                        nuevaEntrada.emocion === emocion.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {emocion.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="titulo">Titulo</Label>
                <Input
                  id="titulo"
                  placeholder="Dale un titulo a tu entrada..."
                  value={nuevaEntrada.titulo}
                  onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, titulo: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="contenido">Que hay en tu mente?</Label>
                <Textarea
                  id="contenido"
                  placeholder="Escribe libremente..."
                  rows={5}
                  value={nuevaEntrada.contenido}
                  onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, contenido: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleGuardar}
                disabled={!nuevaEntrada.emocion || !nuevaEntrada.titulo || !nuevaEntrada.contenido}
              >
                Guardar entrada
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Entries List */}
      {entradas.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-2">Tu diario esta vacio</h3>
            <p className="text-muted-foreground mb-4">
              Comienza a escribir tu primera entrada para llevar un registro de tus emociones
            </p>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Crear primera entrada
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {entradas.map((entrada) => {
            const emocionInfo = getEmocionInfo(entrada.emocion)
            return (
              <Card key={entrada.id} className="hover:border-primary/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{entrada.titulo}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(entrada.fecha)}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={cn("capitalize", emocionInfo.color)}>
                      {emocionInfo.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {entrada.contenido}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Writing Tips */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="py-6">
          <h3 className="font-semibold mb-3">Tips para escribir en tu diario</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- No te preocupes por la gramatica o la ortografia</li>
            <li>- Escribe lo que realmente sientes, sin juzgarte</li>
            <li>- Intenta escribir aunque sean solo unas pocas lineas</li>
            <li>- Este espacio es privado y seguro para ti</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

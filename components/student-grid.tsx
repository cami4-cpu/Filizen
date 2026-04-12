"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { Estudiante, EstadoBienestar, Tendencia } from "@/lib/mock-data"

interface StudentGridProps {
  estudiantes: Estudiante[]
  filtro?: EstadoBienestar | "todos"
}

const estadoConfig: Record<EstadoBienestar, { label: string; color: string; bg: string }> = {
  "bien": { 
    label: "Bien", 
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/30"
  },
  "regular": { 
    label: "Regular", 
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/30"
  },
  "necesita-atencion": { 
    label: "Atencion", 
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/30"
  }
}

const tendenciaIcons: Record<Tendencia, typeof TrendingUp> = {
  "mejorando": TrendingUp,
  "estable": Minus,
  "bajando": TrendingDown
}

const tendenciaColors: Record<Tendencia, string> = {
  "mejorando": "text-blue-500",
  "estable": "text-muted-foreground",
  "bajando": "text-red-500"
}

export function StudentGrid({ estudiantes, filtro = "todos" }: StudentGridProps) {
  const estudiantesFiltrados = filtro === "todos" 
    ? estudiantes 
    : estudiantes.filter(e => e.estado === filtro)

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {estudiantesFiltrados.map((estudiante) => {
        const config = estadoConfig[estudiante.estado]
        const TendenciaIcon = tendenciaIcons[estudiante.tendencia]
        const initials = estudiante.nombre
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)

        return (
          <Link key={estudiante.id} href={`/profesor/estudiante/${estudiante.id}`}>
            <Card className={cn(
              "transition-all hover:shadow-md hover:border-primary/30 cursor-pointer",
              config.bg
            )}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={cn("text-xs", config.color)}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{estudiante.nombre}</p>
                    <p className="text-xs text-muted-foreground">{estudiante.curso}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className={cn("text-xs", config.color)}>
                    {config.label}
                  </Badge>
                  <div className={cn("flex items-center gap-1", tendenciaColors[estudiante.tendencia])}>
                    <TendenciaIcon className="h-3 w-3" />
                    <span className="text-xs capitalize">{estudiante.tendencia}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ultimo check-in: {estudiante.ultimoCheckIn}</span>
                  {estudiante.racha > 0 && (
                    <span className="text-primary">Racha: {estudiante.racha}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

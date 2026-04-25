"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import type { EstadoBienestar, Tendencia } from "@/lib/mock-data"

interface WellnessCardProps {
  title: string
  value: string | number
  subtitle?: string
  estado?: EstadoBienestar
  tendencia?: Tendencia
  icon?: LucideIcon
  className?: string
}

const estadoColors: Record<EstadoBienestar, string> = {
  "bien": "text-blue-500",
  "regular": "text-amber-500",
  "necesita-atencion": "text-red-500"
}

const estadoBgColors: Record<EstadoBienestar, string> = {
  "bien": "bg-blue-500/10",
  "regular": "bg-amber-500/10",
  "necesita-atencion": "bg-red-500/10"
}

const tendenciaIcons: Record<Tendencia, LucideIcon> = {
  "mejorando": TrendingUp,
  "estable": Minus,
  "bajando": TrendingDown
}

const tendenciaColors: Record<Tendencia, string> = {
  "mejorando": "text-blue-500",
  "estable": "text-amber-500",
  "bajando": "text-red-500"
}

export function WellnessCard({
  title,
  value,
  subtitle,
  estado,
  tendencia,
  icon: Icon,
  className
}: WellnessCardProps) {
  const TendenciaIcon = tendencia ? tendenciaIcons[tendencia] : null

  return (
    <Card className={cn(
      "relative overflow-hidden",
      estado && estadoBgColors[estado],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={cn(
            "h-4 w-4",
            estado ? estadoColors[estado] : "text-muted-foreground"
          )} />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className={cn(
              "text-2xl font-bold",
              estado && estadoColors[estado]
            )}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {TendenciaIcon && tendencia && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              tendenciaColors[tendencia]
            )}>
              <TendenciaIcon className="h-3 w-3" />
              <span className="capitalize">{tendencia}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

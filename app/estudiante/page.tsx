"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoodSelector } from "@/components/mood-selector"
import { EmotionChart } from "@/components/emotion-chart"
import { WellnessCard } from "@/components/wellness-card"
import { checkInsEjemplo } from "@/lib/mock-data"
import { 
  BookOpen, 
  FileText, 
  Heart, 
  Flame, 
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react"

export default function EstudianteDashboard() {
  const { usuario } = useAuth()
  const [moodHoy, setMoodHoy] = useState(0)
  const [checkInHecho, setCheckInHecho] = useState(false)
  const [racha, setRacha] = useState(12)

  useEffect(() => {
    // Cargar check-in de hoy de localStorage
    const hoy = new Date().toDateString()
    const stored = localStorage.getItem(`filizen-checkin-${hoy}`)
    if (stored) {
      setMoodHoy(parseInt(stored))
      setCheckInHecho(true)
    }
  }, [])

  const handleCheckIn = (value: number) => {
    setMoodHoy(value)
    const hoy = new Date().toDateString()
    localStorage.setItem(`filizen-checkin-${hoy}`, value.toString())
    setCheckInHecho(true)
    setRacha(prev => prev + 1)
  }

  const quickActions = [
    { href: "/estudiante/diario", icon: BookOpen, label: "Escribir en diario", color: "text-blue-500" },
    { href: "/estudiante/cuestionarios", icon: FileText, label: "Cuestionarios", color: "text-amber-500" },
    { href: "/estudiante/recursos", icon: Heart, label: "Recursos de apoyo", color: "text-pink-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Hola, {usuario?.nombre.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Como te sientes hoy?
        </p>
      </div>

      {/* Check-in Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Check-in diario
          </CardTitle>
          <CardDescription>
            {checkInHecho 
              ? "Ya registraste como te sientes hoy. Puedes actualizarlo si quieres."
              : "Registra tu estado de animo en un momento"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoodSelector value={moodHoy} onChange={handleCheckIn} size="lg" />
          {checkInHecho && (
            <p className="text-sm text-center text-primary mt-4">
              Excelente! Registrado correctamente
            </p>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <WellnessCard 
          title="Racha actual"
          value={`${racha} dias`}
          subtitle="Sigue asi!"
          icon={Flame}
        />
        <WellnessCard 
          title="Promedio semanal"
          value="4.2"
          subtitle="Muy bien"
          estado="bien"
          tendencia="mejorando"
          icon={TrendingUp}
        />
        <WellnessCard 
          title="Entradas de diario"
          value="23"
          subtitle="Este mes"
          icon={BookOpen}
        />
        <WellnessCard 
          title="Cuestionarios"
          value="2 de 3"
          subtitle="Completados"
          icon={FileText}
        />
      </div>

      {/* Chart */}
      <EmotionChart data={checkInsEjemplo} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones rapidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-auto py-4"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span>{action.label}</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Message */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground">
            Recuerda: cuidar tu salud mental es tan importante como cuidar tu salud fisica. 
            Estas haciendo un gran trabajo al tomarte un momento para ti.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

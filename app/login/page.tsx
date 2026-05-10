"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookUser, ArrowLeft, AlertCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import type { RolUsuario } from "@/lib/mock-data"

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState<RolUsuario>("estudiante")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    // Simular delay de login
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Si hay email y password, intentar login con credenciales
    if (email && password) {
      const result = loginWithPassword(email, password)
      if (result.success && result.rol) {
        router.push(result.rol === "estudiante" ? "/estudiante" : "/profesor")
        return
      } else {
        setError(result.error || "Error al iniciar sesion")
        setIsLoading(false)
        return
      }
    }
    
    // Si no hay credenciales, usar login demo
    login(email || `demo@${rol}.com`, rol)
    router.push(rol === "estudiante" ? "/estudiante" : "/profesor")
  }

  const handleDemoLogin = async (demoRol: RolUsuario) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    login(`demo@${demoRol}.com`, demoRol)
    router.push(demoRol === "estudiante" ? "/estudiante" : "/profesor")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-3">Plataforma de bienestar estudiantil</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Bienvenido</CardTitle>
              <CardDescription>
                Selecciona tu rol para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setRol("estudiante")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    rol === "estudiante"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <GraduationCap className={cn(
                    "h-8 w-8",
                    rol === "estudiante" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    rol === "estudiante" ? "text-primary" : "text-muted-foreground"
                  )}>
                    Estudiante
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRol("profesor")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    rol === "profesor"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <BookUser className={cn(
                    "h-8 w-8",
                    rol === "profesor" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    rol === "profesor" ? "text-primary" : "text-muted-foreground"
                  )}>
                    Profesor
                  </span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${rol}@ejemplo.com`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contrasena</Label>
                    <Link 
                      href="/recuperar-contrasena" 
                      className="text-xs text-primary hover:underline"
                    >
                      Olvidaste tu contrasena?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesion..." : "Iniciar sesion"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">O accede rapidamente</span>
                </div>
              </div>

              {/* Demo Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleDemoLogin("estudiante")}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Demo Estudiante
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDemoLogin("profesor")}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <BookUser className="h-4 w-4" />
                  Demo Profesor
                </Button>
              </div>

              {/* Register Link */}
              <p className="text-sm text-center mt-6">
                No tienes cuenta?{" "}
                <Link href="/registro" className="text-primary hover:underline font-medium">
                  Registrate aqui
                </Link>
              </p>

              {/* Info */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Este es un prototipo. Los datos son de ejemplo y se guardan localmente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

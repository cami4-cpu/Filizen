"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookUser, ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import type { RolUsuario } from "@/lib/mock-data"

export default function RegistroPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [rol, setRol] = useState<RolUsuario>("estudiante")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError("El nombre es requerido")
      return false
    }
    if (!formData.email.trim()) {
      setError("El correo es requerido")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Ingresa un correo valido")
      return false
    }
    if (formData.password.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contrasenas no coinciden")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError("")
    
    // Simular delay de registro
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Guardar usuario en localStorage (prototipo)
    const usuarios = JSON.parse(localStorage.getItem("filizen-usuarios") || "[]")
    const exists = usuarios.find((u: { email: string }) => u.email === formData.email)
    
    if (exists) {
      setError("Este correo ya esta registrado")
      setIsLoading(false)
      return
    }
    
    const nuevoUsuario = {
      id: `${rol}-${Date.now()}`,
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password, // En produccion, esto deberia hashearse
      rol
    }
    
    usuarios.push(nuevoUsuario)
    localStorage.setItem("filizen-usuarios", JSON.stringify(usuarios))
    
    setSuccess(true)
    
    // Auto-login despues de 2 segundos
    setTimeout(() => {
      login(formData.email, rol)
      router.push(rol === "estudiante" ? "/estudiante" : "/profesor")
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Cuenta creada exitosamente</h2>
              <p className="text-muted-foreground">
                Bienvenido a FiliZen, {formData.nombre}. Redirigiendo...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
            <p className="text-muted-foreground mt-3">Crear cuenta</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Registro</CardTitle>
              <CardDescription>
                Completa tus datos para crear tu cuenta
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

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={`${rol}@ejemplo.com`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contrasena</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Minimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repite tu contrasena"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>

              {/* Login Link */}
              <p className="text-sm text-center mt-6">
                Ya tienes cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Inicia sesion
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

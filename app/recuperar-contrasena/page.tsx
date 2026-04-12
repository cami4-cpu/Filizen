"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, AlertCircle } from "lucide-react"
import { Logo } from "@/components/logo"

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError("El correo es requerido")
      return
    }
    
    if (!email.includes("@")) {
      setError("Ingresa un correo valido")
      return
    }
    
    setIsLoading(true)
    setError("")
    
    // Simular envio de correo
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Verificar si el correo existe (prototipo)
    const usuarios = JSON.parse(localStorage.getItem("filizen-usuarios") || "[]")
    const exists = usuarios.find((u: { email: string }) => u.email === email)
    
    // En un prototipo, siempre mostramos exito por seguridad
    // (no revelamos si el correo existe o no)
    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border/40">
          <div className="container flex h-16 items-center px-4">
            <Link href="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Volver al login</span>
            </Link>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Revisa tu correo</h2>
                <p className="text-muted-foreground mb-6">
                  Si existe una cuenta con <span className="font-medium text-foreground">{email}</span>, 
                  recibiras un enlace para restablecer tu contrasena.
                </p>
                <div className="space-y-3 w-full">
                  <Button asChild className="w-full">
                    <Link href="/login">Volver al login</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => {
                      setSuccess(false)
                      setEmail("")
                    }}
                  >
                    Intentar con otro correo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  Nota: Este es un prototipo. En produccion, recibiras un correo real.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container flex h-16 items-center px-4">
          <Link href="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Volver al login</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" />
            <p className="text-muted-foreground mt-3 text-center">
              Recuperar contrasena
            </p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Olvidaste tu contrasena?</CardTitle>
              <CardDescription>
                Ingresa tu correo electronico y te enviaremos instrucciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Recovery Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar instrucciones"}
                </Button>
              </form>

              {/* Additional Links */}
              <div className="mt-6 space-y-2 text-sm text-center">
                <p>
                  Recordaste tu contrasena?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Inicia sesion
                  </Link>
                </p>
                <p>
                  No tienes cuenta?{" "}
                  <Link href="/registro" className="text-primary hover:underline font-medium">
                    Registrate
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

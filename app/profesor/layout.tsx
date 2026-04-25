"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { usuario, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !usuario) {
      router.push("/login")
    }
    if (!isLoading && usuario && usuario.rol !== "profesor") {
      router.push("/estudiante")
    }
  }, [usuario, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!usuario || usuario.rol !== "profesor") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 px-4">
        {children}
      </main>
    </div>
  )
}

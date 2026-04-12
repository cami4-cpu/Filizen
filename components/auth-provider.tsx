"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Usuario, type RolUsuario, usuariosDemo } from "@/lib/mock-data"

interface AuthContextType {
  usuario: Usuario | null
  isLoading: boolean
  login: (email: string, rol: RolUsuario) => void
  loginWithPassword: (email: string, password: string) => { success: boolean; error?: string; rol?: RolUsuario }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar usuario de localStorage al iniciar
    const stored = localStorage.getItem("filizen-user")
    if (stored) {
      try {
        setUsuario(JSON.parse(stored))
      } catch {
        localStorage.removeItem("filizen-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, rol: RolUsuario) => {
    // Buscar usuario demo o crear uno nuevo
    const demoUser = usuariosDemo.find(u => u.rol === rol)
    const user: Usuario = demoUser || {
      id: `${rol}-${Date.now()}`,
      nombre: rol === "estudiante" ? "Estudiante Demo" : "Profesor Demo",
      email,
      rol
    }
    
    setUsuario(user)
    localStorage.setItem("filizen-user", JSON.stringify(user))
  }

  const loginWithPassword = (email: string, password: string): { success: boolean; error?: string; rol?: RolUsuario } => {
    // Buscar en usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("filizen-usuarios") || "[]")
    const user = usuarios.find((u: { email: string; password: string }) => u.email === email)
    
    if (!user) {
      return { success: false, error: "Correo o contrasena incorrectos" }
    }
    
    if (user.password !== password) {
      return { success: false, error: "Correo o contrasena incorrectos" }
    }
    
    const loggedUser: Usuario = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
    
    setUsuario(loggedUser)
    localStorage.setItem("filizen-user", JSON.stringify(loggedUser))
    
    return { success: true, rol: user.rol }
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("filizen-user")
  }

  return (
    <AuthContext.Provider value={{ usuario, isLoading, login, loginWithPassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

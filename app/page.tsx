import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { 
  Shield, 
  Users, 
  BarChart3, 
  BookOpen, 
  MessageCircle,
  ArrowRight,
  Heart
} from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Check-ins Diarios",
    description: "Monitorea tu bienestar emocional con registros rapidos y significativos"
  },
  {
    icon: BookOpen,
    title: "Diario Emocional",
    description: "Expresa tus pensamientos y emociones en un espacio seguro y privado"
  },
  {
    icon: BarChart3,
    title: "Seguimiento Visual",
    description: "Visualiza tu progreso y tendencias de bienestar a lo largo del tiempo"
  },
  {
    icon: Shield,
    title: "Deteccion Temprana",
    description: "Sistema de alertas para identificar estudiantes que necesitan apoyo"
  },
  {
    icon: Users,
    title: "Conexion Profesor-Estudiante",
    description: "Facilita la comunicacion y el seguimiento entre educadores y alumnos"
  },
  {
    icon: MessageCircle,
    title: "Recursos de Apoyo",
    description: "Acceso a tecnicas de relajacion, articulos y lineas de ayuda"
  }
]

const testimonials = [
  {
    quote: "FiliZen me ha ayudado a entender mejor como se sienten mis estudiantes. Ahora puedo actuar antes de que los problemas crezcan.",
    author: "Prof. Ana Rodriguez",
    role: "Profesora de Secundaria"
  },
  {
    quote: "El diario emocional se ha convertido en mi espacio seguro. Me ayuda a procesar lo que siento sin juzgarme.",
    author: "Carlos M.",
    role: "Estudiante"
  },
  {
    quote: "Como orientadora, esta herramienta me permite dar seguimiento a mas estudiantes de manera efectiva.",
    author: "Lic. Maria Gonzalez",
    role: "Orientadora Escolar"
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar sesion</Button>
            </Link>
            <Link href="/login">
              <Button>Comenzar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Shield className="h-4 w-4" />
              <span>Plataforma de bienestar estudiantil</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-balance">
              Cuidamos la{" "}
              <span className="text-primary">salud mental</span>
              {" "}de tus estudiantes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              FiliZen ayuda a detectar problemas de bienestar emocional en estudiantes 
              y proporciona herramientas para su seguimiento y apoyo. Juntos construimos 
              comunidades educativas mas saludables.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Comenzar ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Ver demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Todo lo que necesitas para el bienestar estudiantil
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Herramientas disenadas para crear un ambiente de apoyo y deteccion temprana
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Como funciona</h2>
            <p className="mt-4 text-muted-foreground">Simple, efectivo y centrado en el bienestar</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Registro diario</h3>
              <p className="text-sm text-muted-foreground">
                Los estudiantes registran su estado de animo en segundos
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Analisis automatico</h3>
              <p className="text-sm text-muted-foreground">
                El sistema detecta patrones y genera alertas cuando es necesario
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Accion temprana</h3>
              <p className="text-sm text-muted-foreground">
                Los profesores pueden intervenir antes de que los problemas escalen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Comienza a cuidar el bienestar de tus estudiantes
                  </h2>
                  <p className="text-muted-foreground">
                    Unete a las instituciones que ya usan FiliZen
                  </p>
                </div>
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Crear cuenta gratis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              2026 FiliZen. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terminos</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contacto</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

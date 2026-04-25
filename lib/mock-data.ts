export type EstadoBienestar = "bien" | "regular" | "necesita-atencion"
export type Tendencia = "mejorando" | "estable" | "bajando"
export type RolUsuario = "estudiante" | "profesor"

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: RolUsuario
  avatar?: string
}

export interface Estudiante {
  id: string
  nombre: string
  email: string
  avatar?: string
  estado: EstadoBienestar
  tendencia: Tendencia
  ultimoCheckIn: string
  racha: number
  curso: string
}

export interface CheckIn {
  id: string
  fecha: string
  estado: number // 1-5
  nota?: string
}

export interface EntradaDiario {
  id: string
  fecha: string
  emocion: string
  titulo: string
  contenido: string
}

export interface Cuestionario {
  id: string
  titulo: string
  descripcion: string
  preguntas: number
  completado: boolean
  fechaCompletado?: string
  puntuacion?: number
}

export interface Reporte {
  id: string
  estudianteId: string
  estudianteNombre: string
  fecha: string
  tipo: "observacion" | "alerta" | "seguimiento"
  contenido: string
  estado: "pendiente" | "en-proceso" | "resuelto"
}

export interface Recurso {
  id: string
  titulo: string
  descripcion: string
  tipo: "articulo" | "ejercicio" | "video" | "ayuda"
  duracion?: string
  imagen?: string
  url?: string
}

// Datos de ejemplo
export const estudiantes: Estudiante[] = [
  {
    id: "1",
    nombre: "Maria Garcia",
    email: "maria@ejemplo.com",
    estado: "bien",
    tendencia: "mejorando",
    ultimoCheckIn: "Hoy",
    racha: 12,
    curso: "3ro A"
  },
  {
    id: "2",
    nombre: "Carlos Lopez",
    email: "carlos@ejemplo.com",
    estado: "regular",
    tendencia: "estable",
    ultimoCheckIn: "Ayer",
    racha: 5,
    curso: "3ro A"
  },
  {
    id: "3",
    nombre: "Ana Martinez",
    email: "ana@ejemplo.com",
    estado: "necesita-atencion",
    tendencia: "bajando",
    ultimoCheckIn: "Hace 3 dias",
    racha: 0,
    curso: "3ro A"
  },
  {
    id: "4",
    nombre: "Luis Rodriguez",
    email: "luis@ejemplo.com",
    estado: "bien",
    tendencia: "estable",
    ultimoCheckIn: "Hoy",
    racha: 8,
    curso: "3ro B"
  },
  {
    id: "5",
    nombre: "Sofia Hernandez",
    email: "sofia@ejemplo.com",
    estado: "regular",
    tendencia: "mejorando",
    ultimoCheckIn: "Hoy",
    racha: 3,
    curso: "3ro B"
  },
  {
    id: "6",
    nombre: "Diego Sanchez",
    email: "diego@ejemplo.com",
    estado: "necesita-atencion",
    tendencia: "bajando",
    ultimoCheckIn: "Hace 5 dias",
    racha: 0,
    curso: "3ro A"
  },
  {
    id: "7",
    nombre: "Valentina Torres",
    email: "valentina@ejemplo.com",
    estado: "bien",
    tendencia: "mejorando",
    ultimoCheckIn: "Hoy",
    racha: 15,
    curso: "3ro B"
  },
  {
    id: "8",
    nombre: "Andres Jimenez",
    email: "andres@ejemplo.com",
    estado: "regular",
    tendencia: "estable",
    ultimoCheckIn: "Ayer",
    racha: 2,
    curso: "3ro A"
  }
]

export const checkInsEjemplo: CheckIn[] = [
  { id: "1", fecha: "2026-03-25", estado: 4 },
  { id: "2", fecha: "2026-03-26", estado: 4 },
  { id: "3", fecha: "2026-03-27", estado: 3 },
  { id: "4", fecha: "2026-03-28", estado: 5 },
  { id: "5", fecha: "2026-03-29", estado: 4 },
  { id: "6", fecha: "2026-03-30", estado: 5 },
  { id: "7", fecha: "2026-03-31", estado: 4 },
  { id: "8", fecha: "2026-04-01", estado: 5 }
]

export const entradasDiarioEjemplo: EntradaDiario[] = [
  {
    id: "1",
    fecha: "2026-04-01",
    emocion: "feliz",
    titulo: "Buen dia en clases",
    contenido: "Hoy tuve un examen y me fue muy bien. Me siento orgulloso de mi esfuerzo."
  },
  {
    id: "2",
    fecha: "2026-03-30",
    emocion: "ansioso",
    titulo: "Nervios por el examen",
    contenido: "Manana tengo un examen importante. Intente hacer ejercicios de respiracion."
  },
  {
    id: "3",
    fecha: "2026-03-28",
    emocion: "tranquilo",
    titulo: "Fin de semana tranquilo",
    contenido: "Pase tiempo con mi familia. Me ayudo a desconectar del estres."
  }
]

export const cuestionarios: Cuestionario[] = [
  {
    id: "1",
    titulo: "Check-in Semanal",
    descripcion: "Evaluacion rapida de tu bienestar esta semana",
    preguntas: 5,
    completado: true,
    fechaCompletado: "2026-03-28",
    puntuacion: 75
  },
  {
    id: "2",
    titulo: "Cuestionario de Bienestar",
    descripcion: "Evaluacion completa de tu estado emocional",
    preguntas: 10,
    completado: false
  },
  {
    id: "3",
    titulo: "Manejo del Estres",
    descripcion: "Como manejas situaciones de estres",
    preguntas: 8,
    completado: true,
    fechaCompletado: "2026-03-20",
    puntuacion: 60
  }
]

export const reportes: Reporte[] = [
  {
    id: "1",
    estudianteId: "3",
    estudianteNombre: "Ana Martinez",
    fecha: "2026-03-30",
    tipo: "alerta",
    contenido: "Ana ha mostrado signos de aislamiento en las ultimas clases. No participa y se ve cansada.",
    estado: "en-proceso"
  },
  {
    id: "2",
    estudianteId: "6",
    estudianteNombre: "Diego Sanchez",
    fecha: "2026-03-28",
    tipo: "observacion",
    contenido: "Diego no ha entregado las ultimas tareas y parece distraido en clase.",
    estado: "pendiente"
  },
  {
    id: "3",
    estudianteId: "2",
    estudianteNombre: "Carlos Lopez",
    fecha: "2026-03-25",
    tipo: "seguimiento",
    contenido: "Seguimiento de la situacion de Carlos. Ha mejorado su participacion.",
    estado: "resuelto"
  }
]

export const recursos: Recurso[] = [
  {
    id: "1",
    titulo: "Tecnicas de Respiracion",
    descripcion: "Aprende ejercicios de respiracion para calmar la ansiedad",
    tipo: "ejercicio",
    duracion: "5 min"
  },
  {
    id: "2",
    titulo: "Manejo del Estres Academico",
    descripcion: "Estrategias para manejar la presion de los estudios",
    tipo: "articulo",
    duracion: "8 min"
  },
  {
    id: "3",
    titulo: "Meditacion Guiada",
    descripcion: "Sesion de meditacion para principiantes",
    tipo: "video",
    duracion: "10 min"
  },
  {
    id: "4",
    titulo: "Lineas de Ayuda",
    descripcion: "Numeros de emergencia y apoyo profesional",
    tipo: "ayuda"
  },
  {
    id: "5",
    titulo: "Mejora tu Sueno",
    descripcion: "Consejos para dormir mejor y descansar",
    tipo: "articulo",
    duracion: "6 min"
  },
  {
    id: "6",
    titulo: "Ejercicio y Bienestar",
    descripcion: "Como el ejercicio mejora tu salud mental",
    tipo: "video",
    duracion: "12 min"
  }
]

export const emociones = [
  { id: "feliz", label: "Feliz", color: "text-green-500" },
  { id: "tranquilo", label: "Tranquilo", color: "text-blue-500" },
  { id: "neutral", label: "Neutral", color: "text-gray-500" },
  { id: "ansioso", label: "Ansioso", color: "text-yellow-500" },
  { id: "triste", label: "Triste", color: "text-red-500" }
]

export const preguntasCuestionario = [
  {
    id: 1,
    pregunta: "En las ultimas dos semanas, con que frecuencia te has sentido con poco interes o placer en hacer las cosas?",
    opciones: [
      { valor: 0, texto: "Nunca" },
      { valor: 1, texto: "Algunos dias" },
      { valor: 2, texto: "Mas de la mitad de los dias" },
      { valor: 3, texto: "Casi todos los dias" }
    ]
  },
  {
    id: 2,
    pregunta: "Con que frecuencia te has sentido decaido/a, deprimido/a o sin esperanza?",
    opciones: [
      { valor: 0, texto: "Nunca" },
      { valor: 1, texto: "Algunos dias" },
      { valor: 2, texto: "Mas de la mitad de los dias" },
      { valor: 3, texto: "Casi todos los dias" }
    ]
  },
  {
    id: 3,
    pregunta: "Has tenido dificultad para dormir, mantenerte dormido/a o has dormido demasiado?",
    opciones: [
      { valor: 0, texto: "Nunca" },
      { valor: 1, texto: "Algunos dias" },
      { valor: 2, texto: "Mas de la mitad de los dias" },
      { valor: 3, texto: "Casi todos los dias" }
    ]
  },
  {
    id: 4,
    pregunta: "Te has sentido cansado/a o con poca energia?",
    opciones: [
      { valor: 0, texto: "Nunca" },
      { valor: 1, texto: "Algunos dias" },
      { valor: 2, texto: "Mas de la mitad de los dias" },
      { valor: 3, texto: "Casi todos los dias" }
    ]
  },
  {
    id: 5,
    pregunta: "Has tenido dificultad para concentrarte en cosas como leer o ver television?",
    opciones: [
      { valor: 0, texto: "Nunca" },
      { valor: 1, texto: "Algunos dias" },
      { valor: 2, texto: "Mas de la mitad de los dias" },
      { valor: 3, texto: "Casi todos los dias" }
    ]
  }
]

// Usuarios de demo
export const usuariosDemo: Usuario[] = [
  {
    id: "est-1",
    nombre: "Maria Garcia",
    email: "estudiante@demo.com",
    rol: "estudiante"
  },
  {
    id: "prof-1",
    nombre: "Prof. Roberto Mendez",
    email: "profesor@demo.com",
    rol: "profesor"
  }
]

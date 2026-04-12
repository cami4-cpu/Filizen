import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: 'FiliZen - Plataforma de Bienestar Estudiantil',
    template: '%s | FiliZen'
  },
  description: 'FiliZen es una plataforma de salud mental para estudiantes. Ayudamos a detectar y apoyar a estudiantes con problemas de bienestar emocional mediante cuestionarios, seguimiento y recursos de apoyo.',
  keywords: [
    'salud mental',
    'estudiantes',
    'bienestar emocional',
    'depresion',
    'ansiedad',
    'apoyo psicologico',
    'profesores',
    'educacion',
    'filizen',
    'plataforma educativa',
    'bienestar estudiantil'
  ],
  authors: [{ name: 'FiliZen' }],
  creator: 'FiliZen',
  publisher: 'FiliZen',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'FiliZen',
    title: 'FiliZen - Plataforma de Bienestar Estudiantil',
    description: 'Ayudamos a detectar y apoyar a estudiantes con problemas de bienestar emocional. Herramientas para estudiantes y profesores.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FiliZen - Bienestar Estudiantil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FiliZen - Plataforma de Bienestar Estudiantil',
    description: 'Ayudamos a detectar y apoyar a estudiantes con problemas de bienestar emocional.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eff6ff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a5f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: "h-6 w-6", text: "text-sm", heart: "h-3 w-3" },
    md: { icon: "h-8 w-8", text: "text-lg", heart: "h-4 w-4" },
    lg: { icon: "h-12 w-12", text: "text-2xl", heart: "h-6 w-6" },
  }

  const s = sizes[size]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon - Creative design with heart and caring hands */}
      <div className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25",
        s.icon
      )}>
        {/* Heart with hands effect */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={cn("text-primary-foreground", s.heart)}
        >
          {/* Heart shape */}
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="currentColor"
          />
        </svg>
        {/* Decorative dots */}
        <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white/80" />
        <div className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 rounded-full bg-white/60" />
      </div>
      
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", s.text)}>
          Fili<span className="text-primary">Zen</span>
        </span>
      )}
    </div>
  )
}

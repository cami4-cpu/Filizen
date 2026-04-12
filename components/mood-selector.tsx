"use client"

import { cn } from "@/lib/utils"

interface MoodSelectorProps {
  value: number
  onChange: (value: number) => void
  size?: "sm" | "md" | "lg"
}

const moods = [
  { value: 1, label: "Muy mal", emoji: "😢", color: "bg-red-500/20 hover:bg-red-500/30 border-red-500/50" },
  { value: 2, label: "Mal", emoji: "😟", color: "bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/50" },
  { value: 3, label: "Regular", emoji: "😐", color: "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/50" },
  { value: 4, label: "Bien", emoji: "🙂", color: "bg-sky-500/20 hover:bg-sky-500/30 border-sky-500/50" },
  { value: 5, label: "Muy bien", emoji: "😊", color: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50" },
]

const selectedColors: Record<number, string> = {
  1: "bg-red-500/40 border-red-500 ring-2 ring-red-500/30",
  2: "bg-orange-500/40 border-orange-500 ring-2 ring-orange-500/30",
  3: "bg-amber-500/40 border-amber-500 ring-2 ring-amber-500/30",
  4: "bg-sky-500/40 border-sky-500 ring-2 ring-sky-500/30",
  5: "bg-blue-500/40 border-blue-500 ring-2 ring-blue-500/30",
}

const sizeClasses = {
  sm: "h-10 w-10 text-lg",
  md: "h-14 w-14 text-2xl",
  lg: "h-16 w-16 text-3xl"
}

export function MoodSelector({ value, onChange, size = "md" }: MoodSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 md:gap-3">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            className={cn(
              "flex items-center justify-center rounded-full border-2 transition-all duration-200",
              sizeClasses[size],
              value === mood.value
                ? selectedColors[mood.value]
                : mood.color
            )}
            title={mood.label}
          >
            <span className="select-none">{mood.emoji}</span>
          </button>
        ))}
      </div>
      {value > 0 && (
        <p className="text-sm text-muted-foreground">
          {moods.find(m => m.value === value)?.label}
        </p>
      )}
    </div>
  )
}

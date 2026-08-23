"use client"

import { Star } from "lucide-react"
import { useFavorites } from "@/lib/favorites"

export function FavoriteButton({ id, label }: { id: string; label: string }) {
  const { has, toggle } = useFavorites()
  const active = has(id)
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from My Toolbelt` : `Save ${label} to My Toolbelt`}
      title={active ? "In My Toolbelt" : "Save to My Toolbelt"}
      className="rounded-sm border border-line bg-surface-2 p-1.5 text-muted transition-colors hover:border-signal/50 hover:text-signal"
    >
      <Star size={14} className={active ? "fill-signal text-signal" : ""} aria-hidden />
    </button>
  )
}

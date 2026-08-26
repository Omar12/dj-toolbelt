"use client"

import { Star } from "lucide-react"
import { useFavorites } from "@/lib/favorites"

export function FavoriteButton({ id, label }: { id: string; label: string }) {
  const { has, toggle } = useFavorites()
  const active = has(id)
  // The star stays small; `after` widens the hit area to ~46px so a near-miss
  // saves instead of following the card-wide link underneath it.
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from My Toolbelt` : `Save ${label} to My Toolbelt`}
      title={active ? "In My Toolbelt" : "Save to My Toolbelt"}
      className="relative rounded-sm border border-line bg-surface-2 p-2 text-muted transition-colors after:absolute after:-inset-2 after:content-[''] hover:border-signal/50 hover:text-signal"
    >
      <Star size={14} className={active ? "fill-signal text-signal" : ""} aria-hidden />
    </button>
  )
}

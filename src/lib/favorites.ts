"use client"

import { useCallback, useSyncExternalStore } from "react"

const KEY = "dj-toolbelt:favorites"
const EVENT = "dj-toolbelt:favorites-changed"
const EMPTY: string[] = []

/** Snapshot cache: useSyncExternalStore needs a stable reference between reads. */
let cachedRaw: string | null = null
let cachedValue: string[] = EMPTY

function getSnapshot(): string[] {
  const raw = window.localStorage.getItem(KEY)
  if (raw === cachedRaw) return cachedValue
  cachedRaw = raw
  try {
    cachedValue = raw ? (JSON.parse(raw) as string[]) : EMPTY
  } catch {
    cachedValue = EMPTY
  }
  return cachedValue
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/**
 * Favorites live in localStorage so the app works with no account.
 * The server snapshot is empty, so the first paint matches on both sides.
 */
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)

  const toggle = useCallback((id: string) => {
    const current = getSnapshot()
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    window.localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(EVENT))
  }, [])

  return { ids, toggle, has: (id: string) => ids.includes(id) }
}

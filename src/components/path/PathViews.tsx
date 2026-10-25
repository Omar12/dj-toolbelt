"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Deck } from "./Deck"
import type { Stage } from "@/data/stages"

const KEY = "dj-toolbelt:path-view"
const views = [
  { id: "list", name: "All stages" },
  { id: "deck", name: "One at a time" },
] as const
type View = (typeof views)[number]["id"]

/** Running order and Deck behind one toggle. The choice is remembered per browser. */
export function PathViews({ list, stages }: { list: ReactNode; stages: Stage[] }) {
  const [view, setView] = useState<View>("list")

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore after hydration so server and client first paint match
      if (window.localStorage.getItem(KEY) === "deck") setView("deck")
    } catch {}
  }, [])

  function choose(v: View) {
    setView(v)
    try {
      window.localStorage.setItem(KEY, v)
    } catch {}
  }

  return (
    <section aria-labelledby="path-heading" className="pb-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 id="path-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          The running order
        </h2>
        <div role="group" aria-label="Path view" className="flex border border-line">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => choose(v.id)}
              className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-foreground aria-pressed:bg-signal-dim/40 aria-pressed:text-signal [&+&]:border-l [&+&]:border-line"
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? <div className="border-t border-line">{list}</div> : <Deck stages={stages} />}
    </section>
  )
}

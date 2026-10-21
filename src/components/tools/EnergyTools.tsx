"use client"

import { useState } from "react"
import { energyFromScores, energyLabels } from "@/lib/energy"
import { labelClass } from "./NumField"

const CHARACTERISTICS = [
  { id: "drums", name: "Drum intensity", options: ["Soft / sparse", "Steady / clear", "Hard / punchy"] },
  { id: "bass", name: "Bassline drive", options: ["Subtle", "Groovy", "Relentless"] },
  { id: "rhythm", name: "Rhythmic movement", options: ["Relaxed", "Danceable", "Urgent"] },
  { id: "density", name: "Musical density", options: ["Spacious", "Layered", "Dense"] },
  { id: "tension", name: "Tension / impact", options: ["Calm", "Some lift", "Big impact"] },
]

const DEFAULTS = CHARACTERISTICS.map(() => 2)

export function EnergyEvaluator() {
  const [scores, setScores] = useState(DEFAULTS)
  const energy = energyFromScores(scores)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Choose what you hear in a track&apos;s main groove, not just its intro or breakdown.</p>
      {CHARACTERISTICS.map((c, i) => (
        <fieldset key={c.id}>
          <legend className="text-sm font-medium">{c.name}</legend>
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5">
            {c.options.map((label, j) => (
              <label key={label} className="flex cursor-pointer items-center gap-2 text-sm text-muted has-[:checked]:text-foreground">
                <input
                  type="radio"
                  name={`energy-${c.id}`}
                  checked={scores[i] === j + 1}
                  onChange={() => setScores(scores.map((s, k) => (k === i ? j + 1 : s)))}
                  className="accent-signal"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line pt-3">
        <div>
          <p className={labelClass}>Estimated track energy</p>
          <p aria-live="polite" className="mt-1 text-3xl font-semibold tracking-tight">
            <span className="font-mono tabular-nums text-signal">{energy}/5</span> · {energyLabels[energy - 1]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScores(DEFAULTS)}
          className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-signal/60 hover:text-signal"
        >
          Reset
        </button>
      </div>
      <p className="text-sm text-muted">
        This is a listening aid, not a scientific measurement. Adjust the rating based on how the track actually feels.
      </p>
    </div>
  )
}

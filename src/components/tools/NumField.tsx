"use client"

import { useId, useState } from "react"
import { numProblem, numValue } from "@/lib/numfield"

export const field =
  "w-full border border-line bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-signal"
export const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted"

export interface NumFieldState {
  raw: string
  set: (raw: string) => void
  value: number | null
  min: number
  max: number
}

export function useNumField(initial: number, min: number, max: number): NumFieldState {
  const [raw, set] = useState(String(initial))
  return { raw, set, value: numValue(raw, min, max), min, max }
}

/** True when every field holds a usable number — the gate on any readout. */
export function allValid(...fields: NumFieldState[]) {
  return fields.every((f) => f.value !== null)
}

export function NumField({
  label,
  state,
  step,
  className = "",
}: {
  label: string
  state: NumFieldState
  step?: number
  className?: string
}) {
  const id = useId()
  const bad = state.value === null
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={state.min}
        max={state.max}
        step={step}
        value={state.raw}
        onChange={(e) => state.set(e.target.value)}
        aria-invalid={bad || undefined}
        aria-describedby={bad ? id : undefined}
        className={`${field} mt-1 ${bad ? "border-foreground/50" : ""}`}
      />
      {bad && (
        <span id={id} className="mt-1 block text-xs leading-relaxed text-foreground">
          {numProblem(state.raw, state.min, state.max)}
        </span>
      )}
    </label>
  )
}

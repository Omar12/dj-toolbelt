"use client"

import { useCallback, useState } from "react"
import { bpmFromTaps, pitchPercent, transitionAdvice } from "@/lib/bpm"
import { allValid, labelClass, NumField, useNumField } from "./NumField"

export function ToolShell({
  id,
  name,
  description,
  children,
}: {
  id: string
  name: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32 border border-line bg-surface p-5">
      <h2 className="text-lg font-semibold tracking-tight">{name}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function BpmTapper() {
  const [taps, setTaps] = useState<number[]>([])

  // The button handles space and enter natively; no key listener needed.
  const tap = useCallback(() => {
    const now = performance.now()
    setTaps((prev) => {
      // A gap over 2s means a new count, not a very slow tempo.
      const fresh = prev.length && now - prev[prev.length - 1] > 2000 ? [] : prev
      return [...fresh, now].slice(-16)
    })
  }, [])

  const { bpm, interval, taps: count } = bpmFromTaps(taps)

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <button
        type="button"
        onClick={tap}
        className="border border-signal/60 bg-signal-dim/30 py-10 text-center font-mono text-sm uppercase tracking-[0.2em] text-signal transition-colors hover:bg-signal hover:text-black"
      >
        Tap · or press space
      </button>
      <dl className="grid grid-cols-3 gap-4 sm:w-56 sm:grid-cols-1">
        <div>
          <dt className={labelClass}>BPM</dt>
          <dd className="font-mono text-3xl tabular-nums">{bpm ? bpm.toFixed(1) : "—"}</dd>
        </div>
        <div>
          <dt className={labelClass}>Interval</dt>
          <dd className="font-mono text-sm tabular-nums text-muted">
            {interval ? `${interval.toFixed(0)} ms` : "—"}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Taps</dt>
          <dd className="font-mono text-sm tabular-nums text-muted">{count}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => setTaps([])}
        className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-signal sm:col-span-2 sm:w-32"
      >
        Reset
      </button>
    </div>
  )
}

export function BpmTransition() {
  const a = useNumField(124, 40, 220)
  const b = useNumField(128, 40, 220)
  const ready = allValid(a, b)
  const advice = ready ? transitionAdvice(a.value!, b.value!) : null
  const pct = ready ? pitchPercent(a.value!, b.value!) : 0
  const tone =
    advice?.severity === "easy"
      ? "text-signal"
      : advice?.severity === "workable"
        ? "text-foreground"
        : "text-muted"

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <NumField label="Track A BPM" state={a} step={0.1} />
        <NumField label="Track B BPM" state={b} step={0.1} />
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3 sm:grid-cols-3">
        <div>
          <dt className={labelClass}>Difference</dt>
          <dd className="font-mono text-2xl tabular-nums">
            {ready ? (b.value! - a.value!).toFixed(1) : "—"}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Pitch on A</dt>
          <dd className="font-mono text-2xl tabular-nums">
            {ready ? `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%` : "—"}
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className={labelClass}>Verdict</dt>
          <dd className={`font-mono text-sm ${ready ? tone : "text-muted"}`}>
            {advice ? advice.label : "—"}
          </dd>
        </div>
      </dl>
      <p aria-live="polite" className="text-sm text-muted">
        {advice ? advice.detail : "No verdict until both BPM fields hold a number between 40 and 220."}
      </p>
    </div>
  )
}

export function HalfDouble() {
  const bpm = useNumField(140, 40, 220)
  const v = bpm.value
  return (
    <div className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:items-start">
      <NumField label="BPM" state={bpm} step={0.1} />
      <dl className="grid grid-cols-3 gap-4">
        <div>
          <dt className={labelClass}>Half time</dt>
          <dd className="font-mono text-2xl tabular-nums">{v === null ? "—" : (v / 2).toFixed(1)}</dd>
        </div>
        <div>
          <dt className={labelClass}>As played</dt>
          <dd className={`font-mono text-2xl tabular-nums ${v === null ? "text-muted" : "text-signal"}`}>
            {v === null ? "—" : v.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Double time</dt>
          <dd className="font-mono text-2xl tabular-nums">{v === null ? "—" : (v * 2).toFixed(1)}</dd>
        </div>
      </dl>
    </div>
  )
}

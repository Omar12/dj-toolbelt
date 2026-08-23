"use client"

import { useCallback, useState } from "react"
import { bpmFromTaps, pitchPercent, transitionAdvice } from "@/lib/bpm"

const field =
  "w-full border border-line bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-signal/60"
const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted"

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
  const [a, setA] = useState(124)
  const [b, setB] = useState(128)
  const pct = pitchPercent(a, b)
  const advice = transitionAdvice(a, b)
  const tone =
    advice.severity === "easy"
      ? "text-signal"
      : advice.severity === "workable"
        ? "text-foreground"
        : "text-muted"

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Track A BPM</span>
          <input
            type="number"
            min={40}
            max={220}
            step={0.1}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className={`${field} mt-1`}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Track B BPM</span>
          <input
            type="number"
            min={40}
            max={220}
            step={0.1}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className={`${field} mt-1`}
          />
        </label>
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3 sm:grid-cols-3">
        <div>
          <dt className={labelClass}>Difference</dt>
          <dd className="font-mono text-2xl tabular-nums">{(b - a).toFixed(1)}</dd>
        </div>
        <div>
          <dt className={labelClass}>Pitch on A</dt>
          <dd className="font-mono text-2xl tabular-nums">
            {pct >= 0 ? "+" : ""}
            {pct.toFixed(2)}%
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className={labelClass}>Verdict</dt>
          <dd className={`font-mono text-sm ${tone}`}>{advice.label}</dd>
        </div>
      </dl>
      <p aria-live="polite" className="text-sm text-muted">
        {advice.detail}
      </p>
    </div>
  )
}

export function HalfDouble() {
  const [bpm, setBpm] = useState(140)
  return (
    <div className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:items-center">
      <label className="block">
        <span className={labelClass}>BPM</span>
        <input
          type="number"
          min={40}
          max={220}
          step={0.1}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className={`${field} mt-1`}
        />
      </label>
      <dl className="grid grid-cols-3 gap-4">
        <div>
          <dt className={labelClass}>Half time</dt>
          <dd className="font-mono text-2xl tabular-nums">{(bpm / 2).toFixed(1)}</dd>
        </div>
        <div>
          <dt className={labelClass}>As played</dt>
          <dd className="font-mono text-2xl tabular-nums text-signal">{bpm.toFixed(1)}</dd>
        </div>
        <div>
          <dt className={labelClass}>Double time</dt>
          <dd className="font-mono text-2xl tabular-nums">{(bpm * 2).toFixed(1)}</dd>
        </div>
      </dl>
    </div>
  )
}

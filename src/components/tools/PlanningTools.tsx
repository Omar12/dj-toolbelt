"use client"

import { useState } from "react"
import { encodedSizeMb, recordingSizeMb } from "@/lib/bpm"
import { allValid, field, labelClass, NumField, useNumField } from "./NumField"

export function SetMath() {
  const minutes = useNumField(60, 5, 600)
  const trackMinutes = useNumField(4, 1, 20)
  const overlap = useNumField(45, 0, 180)
  const ready = allValid(minutes, trackMinutes, overlap)

  const effective = ready ? Math.max(trackMinutes.value! * 60 - overlap.value!, 30) : 0
  const tracks = ready ? Math.ceil((minutes.value! * 60) / effective) : 0

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <NumField label="Set length (min)" state={minutes} />
        <NumField label="Avg track (min)" state={trackMinutes} step={0.5} />
        <NumField label="Avg blend (sec)" state={overlap} />
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3">
        <div>
          <dt className={labelClass}>Tracks needed</dt>
          <dd className={`font-mono text-3xl tabular-nums ${ready ? "text-signal" : "text-muted"}`}>
            {ready ? tracks : "—"}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Bring (2× crate)</dt>
          <dd className="font-mono text-3xl tabular-nums">{ready ? tracks * 2 : "—"}</dd>
        </div>
      </dl>
      <p aria-live="polite" className="text-sm text-muted">
        {ready
          ? `Each track effectively occupies ${(effective / 60).toFixed(1)} minutes once blends overlap.`
          : "No count until all three fields hold a number in range."}
      </p>
    </div>
  )
}

const PRESETS = [
  { id: "wav-44", label: "WAV 44.1 kHz / 16-bit", sampleRate: 44100, bitDepth: 16 },
  { id: "wav-48", label: "WAV 48 kHz / 24-bit", sampleRate: 48000, bitDepth: 24 },
  { id: "wav-96", label: "WAV 96 kHz / 24-bit", sampleRate: 96000, bitDepth: 24 },
]

export function StorageCalculator() {
  const minutes = useNumField(120, 1, 1440)
  const [preset, setPreset] = useState(PRESETS[1])
  const [stereo, setStereo] = useState(true)

  const v = minutes.value
  const wav = v === null ? 0 : recordingSizeMb(v, preset.sampleRate, preset.bitDepth, stereo ? 2 : 1)
  const mp3 = v === null ? 0 : encodedSizeMb(v, 320)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <NumField label="Length (min)" state={minutes} />
        <label className="block sm:col-span-2">
          <span className={labelClass}>Format</span>
          <select
            value={preset.id}
            onChange={(e) => setPreset(PRESETS.find((p) => p.id === e.target.value) ?? PRESETS[1])}
            className={`${field} mt-1`}
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-muted">
        <input type="checkbox" checked={stereo} onChange={(e) => setStereo(e.target.checked)}
          className="accent-signal" />
        Stereo
      </label>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3">
        <div>
          <dt className={labelClass}>WAV</dt>
          <dd className={`font-mono text-3xl tabular-nums ${v === null ? "text-muted" : "text-signal"}`}>
            {v === null ? "—" : wav >= 1000 ? `${(wav / 1000).toFixed(2)} GB` : `${wav.toFixed(0)} MB`}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>MP3 320</dt>
          <dd className="font-mono text-3xl tabular-nums">
            {v === null ? "—" : `${mp3.toFixed(0)} MB`}
          </dd>
        </div>
      </dl>
    </div>
  )
}

const PHASES = [
  { share: 0.2, name: "Open", note: "Set the tempo floor. Nothing you cannot follow." },
  { share: 0.25, name: "Build", note: "Lift energy one notch at a time. Hold the groove." },
  { share: 0.3, name: "Peak", note: "Your strongest material. Do not start here." },
  { share: 0.15, name: "Reset", note: "One deliberate dip so the next lift lands." },
  { share: 0.1, name: "Close", note: "Land it. Leave one record they will look up." },
]

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number)
  const total = (h * 60 + m + Math.round(minutes) + 1440) % 1440
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

export function GigTimeline() {
  const [start, setStart] = useState("23:00")
  const length = useNumField(90, 15, 480)
  // An emptied or half-typed time input yields "" or "23:" — both make addMinutes NaN.
  const validStart = /^\d{1,2}:\d{2}$/.test(start)
  const ready = validStart && length.value !== null

  // The phase list always renders; without both inputs the times read as dashes.
  const rows = PHASES.reduce<
    { name: string; note: string; mins: number | null; from: string | null; to: string | null }[]
  >((acc, p) => {
    if (!ready) return [...acc, { name: p.name, note: p.note, mins: null, from: null, to: null }]
    const offset = acc.reduce((sum, r) => sum + (r.mins ?? 0), 0)
    const mins = length.value! * p.share
    return [
      ...acc,
      { name: p.name, note: p.note, mins, from: addMinutes(start, offset), to: addMinutes(start, offset + mins) },
    ]
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Set time</span>
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)}
            aria-invalid={!validStart || undefined}
            aria-describedby={validStart ? undefined : "gig-start-problem"}
            className={`${field} mt-1 ${validStart ? "" : "border-foreground/50"}`} />
          {!validStart && (
            <span id="gig-start-problem" className="mt-1 block text-xs leading-relaxed text-foreground">
              No start time. Set the hour and minute you go on.
            </span>
          )}
        </label>
        <NumField label="Length (min)" state={length} step={5} />
      </div>
      <ol className="border-t border-line">
        {rows.map((r) => (
          <li key={r.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line py-3">
            <span
              className={`w-28 shrink-0 font-mono text-sm tabular-nums ${r.from ? "text-signal" : "text-muted"}`}
            >
              {r.from ? `${r.from}–${r.to}` : "—"}
            </span>
            <span className={`w-20 shrink-0 text-sm font-medium ${r.from ? "" : "text-muted"}`}>
              {r.name}
            </span>
            <span className="font-mono text-xs tabular-nums text-muted">
              {r.mins === null ? "—" : Math.round(r.mins)} min
            </span>
            <span className="w-full text-sm text-muted sm:w-auto sm:flex-1">{r.note}</span>
          </li>
        ))}
      </ol>
      <div aria-live="polite">
        {ready ? null : (
          <p className="text-sm text-muted">
            No times until the set time and a length between 15 and 480 are both set.
          </p>
        )}
      </div>
    </div>
  )
}

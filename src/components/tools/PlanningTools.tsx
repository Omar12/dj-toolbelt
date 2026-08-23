"use client"

import { useState } from "react"
import { encodedSizeMb, recordingSizeMb } from "@/lib/bpm"

const field =
  "w-full border border-line bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-signal/60"
const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted"

export function SetMath() {
  const [minutes, setMinutes] = useState(60)
  const [trackMinutes, setTrackMinutes] = useState(4)
  const [overlap, setOverlap] = useState(45)

  const effective = Math.max(trackMinutes * 60 - overlap, 30)
  const tracks = Math.ceil((minutes * 60) / effective)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Set length (min)</span>
          <input type="number" min={5} max={600} value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))} className={`${field} mt-1`} />
        </label>
        <label className="block">
          <span className={labelClass}>Avg track (min)</span>
          <input type="number" min={1} max={20} step={0.5} value={trackMinutes}
            onChange={(e) => setTrackMinutes(Number(e.target.value))} className={`${field} mt-1`} />
        </label>
        <label className="block">
          <span className={labelClass}>Avg blend (sec)</span>
          <input type="number" min={0} max={180} value={overlap}
            onChange={(e) => setOverlap(Number(e.target.value))} className={`${field} mt-1`} />
        </label>
      </div>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3">
        <div>
          <dt className={labelClass}>Tracks needed</dt>
          <dd className="font-mono text-3xl tabular-nums text-signal">{tracks}</dd>
        </div>
        <div>
          <dt className={labelClass}>Bring (2× crate)</dt>
          <dd className="font-mono text-3xl tabular-nums">{tracks * 2}</dd>
        </div>
      </dl>
      <p className="text-sm text-muted">
        Each track effectively occupies {(effective / 60).toFixed(1)} minutes once blends overlap.
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
  const [minutes, setMinutes] = useState(120)
  const [preset, setPreset] = useState(PRESETS[1])
  const [stereo, setStereo] = useState(true)

  const wav = recordingSizeMb(minutes, preset.sampleRate, preset.bitDepth, stereo ? 2 : 1)
  const mp3 = encodedSizeMb(minutes, 320)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Length (min)</span>
          <input type="number" min={1} max={1440} value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))} className={`${field} mt-1`} />
        </label>
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
          className="accent-[var(--signal)]" />
        Stereo
      </label>
      <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3">
        <div>
          <dt className={labelClass}>WAV</dt>
          <dd className="font-mono text-3xl tabular-nums text-signal">
            {wav >= 1000 ? `${(wav / 1000).toFixed(2)} GB` : `${wav.toFixed(0)} MB`}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>MP3 320</dt>
          <dd className="font-mono text-3xl tabular-nums">{mp3.toFixed(0)} MB</dd>
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
  const [length, setLength] = useState(90)

  const rows = PHASES.reduce<{ name: string; note: string; mins: number; from: string; to: string }[]>(
    (acc, p) => {
      const offset = acc.reduce((sum, r) => sum + r.mins, 0)
      const mins = length * p.share
      return [
        ...acc,
        { name: p.name, note: p.note, mins, from: addMinutes(start, offset), to: addMinutes(start, offset + mins) },
      ]
    },
    [],
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Set time</span>
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)}
            className={`${field} mt-1`} />
        </label>
        <label className="block">
          <span className={labelClass}>Length (min)</span>
          <input type="number" min={15} max={480} step={5} value={length}
            onChange={(e) => setLength(Number(e.target.value))} className={`${field} mt-1`} />
        </label>
      </div>
      <ol className="border-t border-line">
        {rows.map((r) => (
          <li key={r.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line py-3">
            <span className="w-28 shrink-0 font-mono text-sm tabular-nums text-signal">
              {r.from}–{r.to}
            </span>
            <span className="w-20 shrink-0 text-sm font-medium">{r.name}</span>
            <span className="font-mono text-xs text-muted">{Math.round(r.mins)} min</span>
            <span className="w-full text-sm text-muted sm:w-auto sm:flex-1">{r.note}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

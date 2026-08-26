"use client"

import { useMemo, useState } from "react"
import {
  allKeys,
  compatibleKeys,
  isCompatible,
  keyAfterPitch,
  keyByCode,
  parseKey,
  type CamelotCode,
} from "@/lib/camelot"
import { field, labelClass } from "./NumField"

const SIZE = 320
const CENTER = SIZE / 2

function position(number: number, radius: number) {
  // 12 at the top, clockwise, like a clock face.
  const angle = ((number - 12) / 12) * Math.PI * 2
  return { x: CENTER + radius * Math.sin(angle), y: CENTER - radius * Math.cos(angle) }
}

// The wheel is already a circle of twelve, so the number reads as a hue: one
// 30 degree step per position, anchored so 8 lands on Cue Orange and the wheel
// stays this product's colour rather than a rainbow.
const hueOf = (number: number) => (35 + (number - 8) * 30 + 360) % 360

// Hue carries the number, lightness carries the ring, chroma carries the state:
// at rest the wheel is a dusty near-monochrome, and only the selected key and
// its compatible moves come up to full colour.
function nodeInk(number: number, letter: "A" | "B", state: "selected" | "safe" | "rest") {
  const h = hueOf(number)
  const major = letter === "B"
  if (state === "selected") {
    return { fill: `oklch(0.7 0.19 ${h})`, stroke: `oklch(0.82 0.14 ${h})`, text: "#000" }
  }
  if (state === "safe") {
    return {
      fill: `oklch(${major ? 0.38 : 0.33} 0.1 ${h})`,
      stroke: `oklch(0.64 0.16 ${h})`,
      text: "var(--foreground)",
    }
  }
  return {
    fill: `oklch(${major ? 0.25 : 0.21} 0.03 ${h})`,
    stroke: `oklch(0.34 0.045 ${h})`,
    text: "var(--foreground)",
  }
}

export function CamelotWheel() {
  const [selected, setSelected] = useState<CamelotCode>("8A")
  const matches = useMemo(() => compatibleKeys(selected), [selected])
  const safe = new Set(matches.slice(0, 4).map((m) => m.code))

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full max-w-[20rem]"
          role="group"
          aria-label="Camelot wheel"
        >
          <circle cx={CENTER} cy={CENTER} r={150} fill="none" stroke="var(--border)" />
          <circle cx={CENTER} cy={CENTER} r={104} fill="none" stroke="var(--border)" />
          {allKeys.map((k) => {
            const { x, y } = position(k.number, k.letter === "B" ? 130 : 84)
            const isSelected = k.code === selected
            const isSafe = safe.has(k.code)
            const ink = nodeInk(k.number, k.letter, isSelected ? "selected" : isSafe ? "safe" : "rest")
            return (
              <g key={k.code}>
                <circle
                  cx={x}
                  cy={y}
                  r={20}
                  fill={ink.fill}
                  stroke={ink.stroke}
                  strokeWidth={isSelected ? 2 : 1}
                  className="cursor-pointer transition-[fill,stroke] hover:[stroke-width:3] focus:outline-none focus-visible:stroke-3 focus-visible:stroke-signal"
                  onClick={() => setSelected(k.code)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${k.code}, ${k.name}`}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelected(k.code)
                    }
                  }}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className="pointer-events-none font-mono text-[11px]"
                  fill={ink.text}
                >
                  {k.code}
                </text>
              </g>
            )
          })}
        </svg>
        <p className="mt-2 text-xs text-muted">
          Outer ring: major (B). Inner ring: minor (A). Colour tracks the number, so
          neighbours on the wheel are neighbours in hue. Click or tab to a key.
        </p>
      </div>

      <div>
        <p className={labelClass}>Selected</p>
        <p className="mt-1 font-mono text-3xl tabular-nums">
          {selected}{" "}
          <span className="text-base text-muted">{keyByCode.get(selected)?.name}</span>
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {matches.map((m) => (
            <li key={`${m.code}-${m.relation}`} className="flex items-baseline gap-3 py-2">
              <button
                type="button"
                onClick={() => setSelected(m.code)}
                className="w-12 shrink-0 border border-line px-1 py-0.5 text-center font-mono text-xs hover:border-signal/60 hover:text-signal"
              >
                {m.code}
              </button>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{m.relation}</span>
                <span className="block text-xs text-muted">{m.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function KeyConverter() {
  const [input, setInput] = useState("A minor")
  const key = parseKey(input)
  const [semitones, setSemitones] = useState(0)
  const shifted = key ? keyAfterPitch(key.code, semitones) : undefined

  return (
    <div className="space-y-4">
      <label className="block">
        <span className={labelClass}>Key or Camelot code</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A minor, Bb maj, 8A…"
          className={`${field} mt-1`}
        />
      </label>
      {key ? (
        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-3 sm:grid-cols-4">
          <div>
            <dt className={labelClass}>Camelot</dt>
            <dd className="font-mono text-2xl tabular-nums text-signal">{key.code}</dd>
          </div>
          <div>
            <dt className={labelClass}>Musical</dt>
            <dd className="font-mono text-2xl tabular-nums">{key.name}</dd>
          </div>
          <div>
            <dt className={labelClass}>Open Key</dt>
            <dd className="font-mono text-2xl tabular-nums">{key.openKey}</dd>
          </div>
          <div>
            <dt className={labelClass}>Pitched {semitones >= 0 ? "+" : ""}{semitones}</dt>
            <dd className="font-mono text-2xl tabular-nums">{shifted ?? "—"}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm text-muted">Not a key I recognise. Try “F# min” or “4B”.</p>
      )}
      <label className="block">
        <span className={labelClass}>Pitch shift (semitones)</span>
        <input
          type="range"
          min={-6}
          max={6}
          step={1}
          value={semitones}
          onChange={(e) => setSemitones(Number(e.target.value))}
          className="mt-2 w-full accent-signal"
        />
      </label>
    </div>
  )
}

export function KeyCompatibility() {
  const [a, setA] = useState("8A")
  const [b, setB] = useState("9A")
  const keyA = parseKey(a)
  const keyB = parseKey(b)
  const match = keyA && keyB ? isCompatible(keyA.code, keyB.code) : undefined

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Track A key</span>
          <input value={a} onChange={(e) => setA(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="block">
          <span className={labelClass}>Track B key</span>
          <input value={b} onChange={(e) => setB(e.target.value)} className={`${field} mt-1`} />
        </label>
      </div>
      <div aria-live="polite" className="border-t border-line pt-3">
        {!keyA || !keyB ? (
          <p className="text-sm text-muted">Enter two keys — musical names or Camelot codes.</p>
        ) : match ? (
          <>
            <p className="font-mono text-2xl tabular-nums text-signal">
              {keyA.code} → {keyB.code} · {match.relation}
            </p>
            <p className="mt-1 text-sm text-muted">{match.note}</p>
          </>
        ) : (
          <>
            <p className="font-mono text-2xl tabular-nums">
              {keyA.code} → {keyB.code} · Clash risk
            </p>
            <p className="mt-1 text-sm text-muted">
              Not a standard move. Mix on percussion only, use an acapella bridge, or cut instead of
              blending. Compatible with {keyA.code}:{" "}
              {compatibleKeys(keyA.code).slice(0, 4).map((c) => c.code).join(", ")}.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { BARS, mixAt, phaseAt } from "@/lib/blend"
import { art } from "./perfect-blend-art"
import "./iso.css"

/* Interactive isometric DJ mixer playing a 32-bar blend. The static SVG comes from
   scripts/figures/perfect-blend.mjs; this component only moves faders, knob pointers and lights. */

const at = (x: number, y: number, z: number) =>
  [art.origin[0] + x * art.ax[0] + y * art.ay[0] + z * art.az[0], art.origin[1] + x * art.ax[1] + y * art.ay[1] + z * art.az[1]] as const

const fine = (n: number) => Math.round(n * 100) / 100
const moveTo = (x: number, y: number) => `translate(${fine(x * art.ax[0] + y * art.ay[0])} ${fine(x * art.ax[1] + y * art.ay[1])})`
const faderY = (level: number) => art.fader.zero - level * (art.fader.zero - art.fader.full)

function pointer(x: number, y: number, angle: number) {
  const r = art.capR - 0.8
  const [ax, ay] = at(x, y, art.knobTop + 0.1)
  const [bx, by] = at(x + Math.sin(angle) * r, y - Math.cos(angle) * r, art.knobTop + 0.1)
  return `M${fine(ax)} ${fine(ay)}L${fine(bx)} ${fine(by)}`
}

// The tour plays the blend at about four times 124 BPM, once with the swap and once without.
const LOOP = 19
const PLAY = 16
const HOLD = 1.5
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const tourAt = (clock: number) => ({
  t: clamp((clock % LOOP - HOLD) / PLAY, 0, 1) * BARS,
  swap: Math.floor(clock / LOOP) % 2 === 0 ? 1 : 0,
})

export function PerfectBlend() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = root.current
    const stage = host?.querySelector<HTMLElement>(".iso-stage")
    const svg = stage?.querySelector("svg")
    const readout = host?.querySelector<HTMLElement>("[data-readout]")
    const hint = host?.querySelector<HTMLElement>('[data-corner="hint"]')
    if (!stage || !svg || !readout || !hint) return
    const part = (name: string) => svg.querySelector(`[data-part="${name}"]`)!
    const faders = [part("fader-a"), part("fader-b")]
    const lows = [part("low-a"), part("low-b")]
    const bars = [...svg.querySelectorAll<SVGGElement>("[data-bar] .iso-dots")]
    const segs = [...svg.querySelectorAll<SVGGElement>("[data-seg] .iso-dots")]
    const still = matchMedia("(prefers-reduced-motion: reduce)")
    const touch = matchMedia("(hover: none)")

    let t = 0, target = 0, swap = 1, mode = 1
    let frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, said = ""
    let idleTimer: ReturnType<typeof setTimeout> | undefined

    function draw() {
      const m = mixAt(t, swap)
      faders[0].setAttribute("transform", moveTo(art.ch[0], faderY(m.faderA)))
      faders[1].setAttribute("transform", moveTo(art.ch[1], faderY(m.faderB)))
      lows[0].setAttribute("d", pointer(art.ch[0], art.lowY, art.kill * (1 - m.lowA)))
      lows[1].setAttribute("d", pointer(art.ch[1], art.lowY, art.kill * (1 - m.lowB)))
      const bar = Math.min(BARS - 1, Math.floor(t))
      bars.forEach((el, i) => {
        const tone = i === bar ? "hi" : i < bar ? "mid" : "faint"
        if (el.dataset.tone !== tone) el.dataset.tone = tone
      })
      segs.forEach((el, i) => {
        const tone = m.db >= art.meterDb[i] - 0.05 ? "hi" : "faint"
        if (el.dataset.tone !== tone) el.dataset.tone = tone
      })
      const db = Math.abs(m.db) < 0.05 ? 0 : m.db
      const text = `bar ${bar + 1} · ${phaseAt(t, swap)} · bass ${db > 0 ? "+" : ""}${db.toFixed(1)} dB`
      if (readout!.textContent !== text) readout!.textContent = text
      const tip = touch.matches ? `Drag: scrub · tap: ${mode ? "no swap" : "swap"}` : `Hover: scrub · click: ${mode ? "no swap" : "swap"}`
      if (hint!.textContent !== tip) hint!.textContent = tip
      const words = `${mode ? "with" : "without"} the bass swap, bar ${bar + 1} of 32`
      if (words !== said) {
        said = words
        stage!.setAttribute("aria-valuenow", String(bar + 1))
        stage!.setAttribute("aria-valuetext", words)
      }
    }

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
      last = now
      const calm = still.matches
      if (touring) {
        clock += dt
        const tour = tourAt(clock)
        target = tour.t
        mode = tour.swap
      }
      t = calm || touring ? target : t + (target - t) * (1 - Math.exp(-dt / 0.2))
      swap = calm ? mode : swap + (mode - swap) * (1 - Math.exp(-dt / 0.15))
      if (Math.abs(target - t) < 0.002) t = target
      if (Math.abs(mode - swap) < 0.002) swap = mode
      draw()
      const settled = !touring && t === target && swap === mode
      frame = visible && !settled ? requestAnimationFrame(tick) : 0
    }

    const run = () => {
      if (!frame && visible) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    }
    const hold = () => {
      touring = false
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        touring = !still.matches
        clock = mode ? 0 : LOOP
        run()
      }, 3600)
      run()
    }
    const steer = (next: number) => {
      target = clamp(next, 0, BARS)
      hold()
    }
    // A drag scrubs without toggling; a press that barely moves toggles the swap.
    let pressX = 0, dragged = false
    const toggle = () => {
      if (dragged) return
      mode = mode ? 0 : 1
      hold()
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && !stage.hasPointerCapture(event.pointerId)) return
      if (Math.abs(event.clientX - pressX) > 6) dragged = true
      const box = svg.getBoundingClientRect()
      steer(clamp(((event.clientX - box.left) / box.width - 0.15) / 0.7, 0, 1) * BARS)
    }
    const onDown = (event: PointerEvent) => {
      pressX = event.clientX
      dragged = false
      if (event.pointerType !== "mouse") stage.setPointerCapture(event.pointerId)
    }
    const onKey = (event: KeyboardEvent) => {
      const step = event.shiftKey ? 4 : 1
      let to: number | null = null
      if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.floor(target) + step
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.ceil(target) - step
      if (event.key === "Home") to = 0
      if (event.key === "End") to = BARS
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        toggle()
        return
      }
      if (to === null) return
      event.preventDefault()
      steer(to)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1].isIntersecting
        if (visible) run()
      },
      { rootMargin: "120px 0px" },
    )
    observer.observe(stage)
    stage.addEventListener("pointerdown", onDown)
    stage.addEventListener("pointermove", onMove)
    stage.addEventListener("click", toggle)
    stage.addEventListener("keydown", onKey)
    draw()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(idleTimer)
      stage.removeEventListener("pointerdown", onDown)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("click", toggle)
      stage.removeEventListener("keydown", onKey)
    }
  }, [])

  return <div ref={root} className="iso blend-figure" data-theme="dark" dangerouslySetInnerHTML={{ __html: art.html }} />
}

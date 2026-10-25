"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ChainDiagram } from "@/components/ui"
import type { Stage } from "@/data/stages"

const KEY = "dj-toolbelt:stage"

/** One job at a time, stepped like a phrase counter. Remembers the last stage so an interrupted session resumes in place. */
export function Deck({ stages }: { stages: Stage[] }) {
  const [current, setCurrent] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(KEY))
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore after hydration so server and client first paint match
      if (saved > 0 && saved < stages.length) setCurrent(saved)
    } catch {}
  }, [stages.length])

  function go(i: number, focus = false) {
    setCurrent(i)
    try {
      window.localStorage.setItem(KEY, String(i))
    } catch {}
    if (focus) tabs.current[i]?.focus()
  }

  function onKey(e: KeyboardEvent) {
    const last = stages.length - 1
    const next = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    go(Math.min(last, Math.max(0, next)), true)
  }

  const s = stages[current]
  const prev = stages[current - 1]
  const next = stages[current + 1]

  return (
    <div>
      <div role="tablist" aria-label="Jobs, in order" onKeyDown={onKey} className="grid grid-cols-5 gap-px border border-line bg-line">
        {stages.map((t, i) => (
          <button
            key={t.verb}
            ref={(el) => {
              tabs.current[i] = el
            }}
            role="tab"
            id={`stage-tab-${i}`}
            aria-selected={i === current}
            aria-controls="stage-panel"
            tabIndex={i === current ? 0 : -1}
            onClick={() => go(i)}
            className="group flex flex-col bg-surface text-left transition-colors hover:bg-surface-2 aria-selected:bg-surface-2"
          >
            <span
              aria-hidden
              className={`h-1 w-full transition-colors ${
                i === current ? "bg-signal" : i < current ? "bg-signal-dim" : "bg-surface-2 group-hover:bg-line"
              }`}
            />
            <span className="px-2 py-3 sm:px-4">
              <span className="block font-mono text-[11px] tabular-nums text-muted">{t.n}</span>
              <span
                className={`mt-1 block font-mono text-[11px] uppercase tracking-wider sm:text-xs sm:tracking-[0.2em] ${
                  i === current ? "text-foreground" : "text-muted group-hover:text-foreground"
                }`}
              >
                {t.verb}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="stage-panel"
        aria-labelledby={`stage-tab-${current}`}
        className="grid gap-8 border-x border-b border-line bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_16rem]"
      >
        <div>
          <h2 className="max-w-[24ch] text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">{s.question}</h2>
          <p className="mt-2 text-sm text-muted">{s.detail}</p>

          <Link
            href={s.primary.href}
            className="group mt-6 flex flex-col gap-4 border border-signal/60 bg-signal-dim/30 p-4 transition-colors hover:bg-signal-dim/50"
          >
            <span className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-lg font-semibold tracking-tight text-foreground">{s.primary.name}</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                Start · {s.primary.steps} steps
                <ArrowRight size={13} aria-hidden />
              </span>
            </span>
            <ChainDiagram nodes={s.primary.chain} dense />
          </Link>
        </div>

        <div className="space-y-6 lg:border-l lg:border-line lg:pl-6">
          {s.tools.length ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Reach for</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {s.tools.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="hover:text-signal">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {s.more.length ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Other routes</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {s.more.slice(0, 4).map((w) => (
                  <li key={w.href}>
                    <Link href={w.href} className="text-muted hover:text-foreground">
                      {w.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={s.sectionHref} className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider text-muted hover:text-signal">
                Everything in {s.verb}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-4 lg:col-span-2">
          {prev ? (
            <button
              type="button"
              onClick={() => go(current - 1)}
              className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-signal/60 hover:text-signal"
            >
              <ArrowLeft size={13} aria-hidden /> {prev.verb}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => go(current + 1)}
              className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-signal/60 hover:text-signal"
            >
              Then {next.verb} <ArrowRight size={13} aria-hidden />
            </button>
          ) : (
            <Link
              href="/workflows"
              className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-signal"
            >
              All workflows
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

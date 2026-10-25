import Link from "next/link"
import { ChainDiagram } from "@/components/ui"
import { stages } from "@/data/stages"

/** The five jobs as a running order — one row per job, read top to bottom like a tracklist. */
export function RunningOrder() {
  return (
    <ol>
      {stages.map((s, i) => (
        <li
          key={s.verb}
          className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-line sm:grid-cols-[4.5rem_minmax(0,1fr)] lg:grid-cols-[4.5rem_minmax(0,1fr)_15rem] lg:gap-x-8"
        >
          <div className="relative row-span-2 lg:row-span-1">
            <span
              aria-hidden
              className={`absolute left-4 w-px bg-line sm:left-5 ${i === 0 ? "top-8 bottom-0" : i === stages.length - 1 ? "top-0 h-8" : "inset-y-0"}`}
            />
            <span className="relative mt-6 inline-block bg-background py-1 font-mono text-lg tabular-nums text-muted sm:text-2xl">
              {s.n}
            </span>
          </div>

          <div className="py-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <Link href={s.sectionHref} className="hover:text-signal">
                {s.verb}
              </Link>
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{s.question}</h3>

            <Link
              href={s.primary.href}
              className="group mt-4 flex flex-col gap-3 border border-line bg-surface p-4 transition-colors hover:border-signal/60 hover:bg-surface-2"
            >
              <span className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-signal">
                  {s.primary.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider tabular-nums text-muted">
                  {s.primary.steps} steps{s.primary.duration ? ` · ${s.primary.duration}` : ""}
                </span>
              </span>
              <ChainDiagram nodes={s.primary.chain} dense />
            </Link>
          </div>

          <div className="col-start-2 pb-6 lg:col-start-3 lg:pt-6">
            {s.tools.length ? (
              <>
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
              </>
            ) : null}
            {s.more.length ? (
              <p className={`text-sm text-muted ${s.tools.length ? "mt-4" : ""}`}>
                <Link href={s.sectionHref} className="hover:text-foreground">
                  {s.more.length} more {s.more.length === 1 ? "workflow" : "workflows"} in {s.verb} ›
                </Link>
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

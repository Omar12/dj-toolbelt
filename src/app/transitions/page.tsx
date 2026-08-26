import { techniques } from "@/data/techniques"
import { Pill } from "@/components/ui"

export const metadata = {
  title: "Transition Toolkit",
  description: "Eight DJ transition techniques with walkthroughs, difficulty and genre fit.",
}

export default function TransitionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Mix</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Transition Toolkit
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Eight ways to get from one record to the next. Learn two properly before adding a third.
        </p>
      </header>

      <div className="grid gap-4 py-10 sm:grid-cols-2">
        {techniques.map((t) => (
          <article key={t.id} id={t.id} className="scroll-mt-32 border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold tracking-tight">{t.name}</h2>
            <p className="mt-1 text-sm text-muted">{t.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Pill tone="signal">{t.difficulty}</Pill>
              {t.genres.map((g) => (
                <Pill key={g}>{g}</Pill>
              ))}
            </div>
            <p className="mt-3 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                When to use{" "}
              </span>
              <span className="text-muted">{t.whenToUse}</span>
            </p>
            <ol className="mt-3 space-y-1.5 border-t border-line pt-3">
              {t.walkthrough.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-muted">
                  <span className="font-mono text-xs text-signal">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  )
}

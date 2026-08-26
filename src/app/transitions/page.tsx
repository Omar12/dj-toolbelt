import { techniques } from "@/data/techniques"
import { TransitionExplorer } from "@/components/TransitionExplorer"

export const metadata = {
  title: "Transition Toolkit",
  description:
    "Fourteen DJ transition techniques with walkthroughs, worked examples and the risk of each. Filter by tempo gap, energy and genre distance.",
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
          Fourteen ways to get from one record to the next. Filter by the situation you are actually
          in — then learn two properly before adding a third.
        </p>
      </header>

      <div className="py-10">
        <TransitionExplorer techniques={techniques} />
      </div>
    </div>
  )
}

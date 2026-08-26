import { builtInTools } from "@/data/tools"
import { BpmTapper, BpmTransition, HalfDouble, ToolShell } from "@/components/tools/BpmTools"
import { CamelotWheel, KeyCompatibility, KeyConverter } from "@/components/tools/KeyTools"
import { GigTimeline, SetMath, StorageCalculator } from "@/components/tools/PlanningTools"

export const metadata = {
  title: "Tools",
  description:
    "Built-in DJ utilities: BPM tapper, transition calculator, Camelot wheel, key converter, set and storage maths. All client-side.",
}

const render: Record<string, React.ReactNode> = {
  "bpm-tapper": <BpmTapper />,
  "bpm-transition": <BpmTransition />,
  "half-double": <HalfDouble />,
  "camelot-wheel": <CamelotWheel />,
  "key-converter": <KeyConverter />,
  "key-compatibility": <KeyCompatibility />,
  "set-planner-math": <SetMath />,
  "storage-calculator": <StorageCalculator />,
  "gig-timeline": <GigTimeline />,
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Built in</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Tools</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Nine utilities that run entirely in this browser. Nothing is uploaded, nothing is stored.
        </p>
        <nav aria-label="Tools" className="mt-5 flex flex-wrap gap-1.5">
          {builtInTools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-signal/60 hover:text-signal"
            >
              {t.name}
            </a>
          ))}
        </nav>
      </header>

      <div className="grid gap-4 py-10">
        {builtInTools.map((t) => (
          <ToolShell key={t.id} id={t.id} name={t.name} description={t.description}>
            {render[t.id]}
          </ToolShell>
        ))}
      </div>
    </div>
  )
}

import { workflows } from "@/data/workflows"
import { sections } from "@/data/sections"
import { WorkflowCard } from "@/components/WorkflowCard"
import { SectionHeading } from "@/components/ui"

export const metadata = {
  title: "Workflows",
  description: "Step-by-step DJ processes: digging, set prep, recording, streaming, publishing.",
}

export default function WorkflowsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Process</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Workflows</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          A workflow is the order you use the tools in. That order is the part nobody writes down.
        </p>
      </header>

      {sections.map((s) => {
        const flows = workflows.filter((w) => w.section === s.id)
        if (!flows.length) return null
        return (
          <section key={s.id} className="py-10">
            <SectionHeading eyebrow={s.tagline} title={s.name} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {flows.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

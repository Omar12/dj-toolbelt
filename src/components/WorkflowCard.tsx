import Link from "next/link"
import type { Workflow } from "@/data/types"
import { ChainDiagram, Pill } from "./ui"

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <article className="group relative flex flex-col gap-3 border border-line bg-surface p-5 transition-colors hover:border-muted/60">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Workflow</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">
          <Link href={`/workflows/${workflow.id}`} className="after:absolute after:inset-0">
            {workflow.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{workflow.question}</p>
      </div>
      <ChainDiagram nodes={workflow.chain} dense />
      <div className="flex flex-wrap gap-1.5">
        <Pill>{workflow.skill}</Pill>
        <Pill>{workflow.steps.length} steps</Pill>
      </div>
    </article>
  )
}

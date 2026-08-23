import Link from "next/link"
import { crateSystem } from "@/data/crates"
import { ChainDiagram } from "@/components/ui"

export const metadata = {
  title: "The Crate System",
  description: "Organise a DJ library by function, energy, mood, situation and transition role.",
}

export default function CratesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Prepare</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Crate System
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Genre folders tell you what a track is. Under pressure you need to know what it does.
          Tag along five axes and the right record is always two clicks away.
        </p>
      </header>

      <section className="border-b border-line py-8">
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Intake pipeline
        </h2>
        <ChainDiagram
          nodes={["Discovery", "Inbox", "Review", "Purchase", "Analyze", "Tag", "Cue", "Crate"]}
        />
        <p className="mt-3 text-sm text-muted">
          Full walkthrough in the{" "}
          <Link href="/workflows/library-intake" className="text-signal underline underline-offset-4">
            library intake workflow
          </Link>
          .
        </p>
      </section>

      <div className="grid gap-4 py-10 sm:grid-cols-2">
        {crateSystem.map((axis) => (
          <section key={axis.id} className="border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold tracking-tight">{axis.name}</h2>
            <p className="mt-1 text-sm text-muted">{axis.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {axis.values.map((v) => (
                <li
                  key={v}
                  className="border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {v}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

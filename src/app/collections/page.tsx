import Link from "next/link"
import { collections } from "@/data/collections"

export const metadata = {
  title: "Collections",
  description: "Curated shortlists of DJ tools for specific jobs.",
}

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Curated</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Collections</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Shortlists for one job each. Start here when you do not want to filter.
        </p>
      </header>
      <div className="grid gap-3 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.id}`}
            className="group border border-line bg-surface p-5 transition-colors hover:border-signal/60"
          >
            <h2 className="text-base font-semibold tracking-tight group-hover:text-signal">
              {c.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{c.description}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              {c.resourceIds.length} tools
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

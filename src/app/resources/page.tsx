import { resources } from "@/data/resources"
import { categoryById } from "@/data/categories"
import { ResourceExplorer } from "@/components/ResourceExplorer"

export const metadata = {
  title: "All resources",
  description: "Every tool, store, station and reference in DJ Toolbelt, filterable.",
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const known = category && categoryById.has(category) ? [category] : []

  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Directory</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">All resources</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          {resources.length} verified tools, stores, stations and references. Filter by category,
          price, genre, platform or workflow.
        </p>
      </header>
      <div className="py-10">
        <ResourceExplorer resources={resources} initialCategories={known} />
      </div>
    </div>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { collectionById, collections } from "@/data/collections"
import { getResources } from "@/data/resources"
import { ResourceGrid } from "@/components/ResourceCard"

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = collectionById.get(slug)
  return c ? { title: c.name, description: c.description } : {}
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = collectionById.get(slug)
  if (!c) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4">
      <nav aria-label="Breadcrumb" className="pt-8">
        <Link href="/collections" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-signal">
          ← All collections
        </Link>
      </nav>
      <header className="border-b border-line py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Collection</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{c.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{c.description}</p>
      </header>
      <div className="py-10">
        <h2 className="sr-only">Resources in this collection</h2>
        <ResourceGrid resources={getResources(c.resourceIds)} />
      </div>
    </div>
  )
}

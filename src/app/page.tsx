import Link from "next/link"
import { homeActions } from "@/data/actions"
import { resources } from "@/data/resources"
import { workflows } from "@/data/workflows"
import { collections } from "@/data/collections"
import { ResourceGrid } from "@/components/ResourceCard"
import { WorkflowCard } from "@/components/WorkflowCard"
import { SectionHeading, TextLink } from "@/components/ui"

const diggingRoutes = [
  "search-by-sound",
  "dig-by-dj",
  "dig-by-label",
  "dig-by-scene",
  "dig-by-era",
  "dig-by-sample",
]

export default function Home() {
  const featured = resources.filter((r) => r.featured).slice(0, 9)
  const digging = diggingRoutes
    .map((id) => workflows.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="border-b border-line py-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
          {resources.length} resources · {workflows.length} workflows · 9 built-in tools
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          What are you trying to do?
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          DJ Toolbelt is not a directory of DJ websites. It is a map of how DJs discover, prepare,
          perform and share music — the tools, and the order you use them in.
        </p>
      </section>

      <section className="py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {homeActions.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group flex items-start gap-3 border border-line bg-surface p-5 transition-colors hover:border-signal/60 hover:bg-surface-2"
            >
              <span aria-hidden className="text-xl">
                {a.emoji}
              </span>
              <span>
                <span className="block text-base font-semibold tracking-tight group-hover:text-signal">
                  {a.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{a.detail}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeading eyebrow="I need new music" title="Five ways to dig">
          <TextLink href="/workflows">All workflows</TextLink>
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {digging.map((w) => (
            <WorkflowCard key={w.id} workflow={w} />
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeading eyebrow="Start here" title="Featured resources">
          <TextLink href="/resources">All resources</TextLink>
        </SectionHeading>
        <ResourceGrid resources={featured} />
      </section>

      <section className="py-10">
        <SectionHeading eyebrow="Curated" title="Collections">
          <TextLink href="/collections">All collections</TextLink>
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.id}`}
              className="group border border-line bg-surface p-5 transition-colors hover:border-signal/60"
            >
              <h3 className="text-base font-semibold tracking-tight group-hover:text-signal">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                {c.resourceIds.length} tools
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

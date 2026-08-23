import Link from "next/link"
import { notFound } from "next/navigation"
import { getResource, resources } from "@/data/resources"
import { categoryById } from "@/data/categories"
import { workflows } from "@/data/workflows"
import { collections } from "@/data/collections"
import { ExternalLink, ResourceGrid } from "@/components/ResourceCard"
import { FavoriteButton } from "@/components/FavoriteButton"
import { ChainDiagram, Pill, SectionHeading } from "@/components/ui"

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = getResource(slug)
  return r ? { title: r.name, description: r.description } : {}
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="mt-1.5 flex flex-wrap gap-1.5 text-sm">{children}</dd>
    </div>
  )
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = getResource(slug)
  if (!r) notFound()

  const usedIn = workflows.filter((w) => w.resourceIds.includes(r.id) || r.workflows.includes(w.id))
  const inCollections = collections.filter((c) => c.resourceIds.includes(r.id))
  const related = resources
    .filter(
      (o) =>
        o.id !== r.id &&
        (o.categories.some((c) => r.categories.includes(c)) ||
          o.workflows.some((w) => r.workflows.includes(w))),
    )
    .slice(0, 6)

  return (
    <div className="mx-auto max-w-5xl px-4">
      <nav aria-label="Breadcrumb" className="pt-8">
        <Link href="/resources" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-signal">
          ← All resources
        </Link>
      </nav>

      <header className="border-b border-line py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
          {r.categories.map((c) => categoryById.get(c)?.name ?? c).join(" · ")}
        </p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{r.name}</h1>
          <div className="flex items-center gap-2">
            <FavoriteButton id={r.id} label={r.name} />
            <ExternalLink href={r.url}>Visit</ExternalLink>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{r.description}</p>
      </header>

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-10">
          {r.bestFor ? (
            <section>
              <SectionHeading eyebrow="Best for" title={r.bestFor} />
            </section>
          ) : null}

          {r.chain ? (
            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Workflow
              </h2>
              <ChainDiagram nodes={r.chain} />
            </section>
          ) : null}

          {r.goodFor?.length ? (
            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Good for
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {r.goodFor.map((g) => (
                  <li key={g} className="border border-line bg-surface px-3 py-2 text-sm">
                    {g}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {usedIn.length ? (
            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Used in these workflows
              </h2>
              <ul className="space-y-2">
                {usedIn.map((w) => (
                  <li key={w.id}>
                    <Link
                      href={`/workflows/${w.id}`}
                      className="group flex items-baseline justify-between gap-4 border border-line bg-surface px-4 py-3 hover:border-signal/60"
                    >
                      <span className="text-sm font-medium group-hover:text-signal">{w.name}</span>
                      <span className="text-xs text-muted">{w.question}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside>
          <dl>
            <Fact label="Pricing">
              <Pill tone={r.pricing === "free" ? "signal" : "default"}>{r.pricing}</Pill>
            </Fact>
            {r.platforms?.length ? (
              <Fact label="Platforms">
                {r.platforms.map((p) => (
                  <Pill key={p}>{p}</Pill>
                ))}
              </Fact>
            ) : null}
            {r.formats?.length ? (
              <Fact label="Formats">
                {r.formats.map((f) => (
                  <Pill key={f}>{f}</Pill>
                ))}
              </Fact>
            ) : null}
            {r.genres?.length ? (
              <Fact label="Genres">
                {r.genres.map((g) => (
                  <Pill key={g}>{g}</Pill>
                ))}
              </Fact>
            ) : null}
            <Fact label="Tags">
              {r.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </Fact>
            {r.regionNotes ? (
              <Fact label="Region notes">
                <span className="text-muted">{r.regionNotes}</span>
              </Fact>
            ) : null}
            {inCollections.length ? (
              <Fact label="Collections">
                <ul className="space-y-1">
                  {inCollections.map((c) => (
                    <li key={c.id}>
                      <Link href={`/collections/${c.id}`} className="text-muted hover:text-signal">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fact>
            ) : null}
            {r.lastVerified ? (
              <Fact label="Last verified">
                <span className="font-mono text-xs text-muted">{r.lastVerified}</span>
              </Fact>
            ) : null}
          </dl>
        </aside>
      </div>

      {related.length ? (
        <section className="pb-16">
          <SectionHeading eyebrow="Keep going" title="Related resources" />
          <ResourceGrid resources={related} />
        </section>
      ) : null}
    </div>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { workflowById, workflows } from "@/data/workflows"
import { getResources } from "@/data/resources"
import { ResourceGrid } from "@/components/ResourceCard"
import { ChainDiagram, Pill, SectionHeading } from "@/components/ui"

export function generateStaticParams() {
  return workflows.map((w) => ({ slug: w.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const w = workflowById.get(slug)
  return w ? { title: w.name, description: w.question } : {}
}

export default async function WorkflowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const w = workflowById.get(slug)
  if (!w) notFound()

  const tools = getResources(w.resourceIds)
  const next = workflows.filter(
    (o) => o.id !== w.id && o.tags.some((t) => w.tags.includes(t) || o.section === w.section),
  ).slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-4">
      <nav aria-label="Breadcrumb" className="pt-8">
        <Link href="/workflows" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-signal">
          ← All workflows
        </Link>
      </nav>

      <header className="border-b border-line py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Workflow</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{w.name}</h1>
        <p className="mt-3 text-lg text-muted">{w.question}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{w.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Pill tone="signal">{w.skill}</Pill>
          {w.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </header>

      <section className="py-8">
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          The path
        </h2>
        <ChainDiagram nodes={w.chain} />
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="Step by step" title="How to run it" />
        <ol className="space-y-3">
          {w.steps.map((step, i) => {
            const stepTools = getResources(step.resourceIds ?? [])
            return (
              <li key={step.title} className="flex gap-4 border border-line bg-surface p-4">
                <span className="font-mono text-sm text-signal" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
                  {stepTools.length ? (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {stepTools.map((t) => (
                        <li key={t.id}>
                          <Link
                            href={`/resources/${t.id}`}
                            className="inline-block border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-signal/60 hover:text-signal"
                          >
                            {t.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {step.videos?.length ? (
                    <p className="mt-2 text-sm">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        Watch{" "}
                      </span>
                      {step.videos.map((video, jndex) => (
                        <span key={video.id}>
                          {jndex > 0 && <span className="text-muted"> · </span>}
                          <a
                            href={`https://www.youtube.com/watch?v=${video.id}${ video.t ? `&t=${video.t}s` : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-signal underline underline-offset-2"
                          >
                            {video.channel}
                          </a>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      {tools.length ? (
        <section className="pb-10">
          <SectionHeading eyebrow="Toolkit" title="Everything this workflow uses" />
          <ResourceGrid resources={tools} />
        </section>
      ) : null}

      {next.length ? (
        <section className="pb-16">
          <SectionHeading eyebrow="Keep going" title="Where this leads" />
          <ul className="space-y-2">
            {next.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/workflows/${o.id}`}
                  className="group flex items-baseline justify-between gap-4 border border-line bg-surface px-4 py-3 hover:border-signal/60"
                >
                  <span className="text-sm font-medium group-hover:text-signal">{o.name}</span>
                  <span className="text-xs text-muted">{o.question}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

import Link from "next/link"
import { homeActions } from "@/data/actions"
import { resources } from "@/data/resources"
import { workflows } from "@/data/workflows"
import { collections } from "@/data/collections"
import { builtInTools } from "@/data/tools"
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

/** The four instruments reached for mid-session. Fixed contract: each must carry a question. */
const bandToolIds = ["camelot-wheel", "bpm-transition", "bpm-tapper", "set-planner-math"]

const bandTools = bandToolIds.map((id) => {
  const tool = builtInTools.find((t) => t.id === id)
  if (!tool?.question) {
    throw new Error(`Homepage tool band: no tool with a question for id "${id}" in builtInTools.`)
  }
  return { ...tool, question: tool.question }
})

export default function Home() {
  const featured = resources.filter((r) => r.featured).slice(0, 6)
  const digging = diggingRoutes
    .map((id) => workflows.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="border-b border-line py-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
          {resources.length} resources · {workflows.length} workflows ·{" "}
          <Link href="/tools" className="underline-offset-4 hover:underline">
            {builtInTools.length} built-in tools
          </Link>
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
        <SectionHeading eyebrow="Work it out now" title="What do I need to work out right now?">
          <TextLink href="/tools">All {builtInTools.length} tools</TextLink>
        </SectionHeading>
        <div className="grid gap-3 lg:grid-cols-2">
          {bandTools.map((t) => (
            <Link
              key={t.id}
              href={`/tools#${t.id}`}
              className="group flex flex-col justify-between gap-4 border border-line bg-surface p-5 transition-colors hover:border-signal/60 hover:bg-surface-2 sm:p-6"
            >
              <h3 className="max-w-[22ch] text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-signal sm:text-2xl">
                {t.question}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-signal">
                {t.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {homeActions.map((a) => (
            <Link
              key={a.verb}
              href={a.href}
              className="group flex flex-col border border-line bg-surface p-5 transition-colors hover:border-signal/60 hover:bg-surface-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-signal">
                {a.verb}
              </span>
              <span className="mt-3 block text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-signal">
                {a.title}
              </span>
              <span className="mt-auto block pt-2 text-sm leading-relaxed text-muted">{a.detail}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10">
        <SectionHeading eyebrow="I need new music" title="Six ways to dig">
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
        <ul className="border border-line bg-surface">
          {collections.slice(0, 6).map((c) => (
            <li key={c.id} className="border-b border-line last:border-b-0">
              <Link
                href={`/collections/${c.id}`}
                className="group flex items-baseline justify-between gap-4 px-4 py-3 transition-colors hover:bg-surface-2"
              >
                <span className="text-sm font-semibold tracking-tight transition-colors group-hover:text-signal">
                  {c.name}
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider tabular-nums text-muted">
                  {c.resourceIds.length} tools
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

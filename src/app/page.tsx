import Link from "next/link"
import { resources } from "@/data/resources"
import { workflows } from "@/data/workflows"
import { collections } from "@/data/collections"
import { builtInTools } from "@/data/tools"
import { stages } from "@/data/stages"
import { ResourceGrid } from "@/components/ResourceCard"
import { PathViews } from "@/components/path/PathViews"
import { RunningOrder } from "@/components/path/RunningOrder"
import { SectionHeading, TextLink } from "@/components/ui"

/** Off the path: picked up between any two stages. */
const learnLinks = [
  { href: "/learn/perfect-blend", name: "The Perfect Blend" },
  { href: "/learn/track-energy", name: "Understanding Track Energy" },
  { href: "/transitions", name: "Transition Toolkit" },
  { href: "/learn", name: "Everything in Learn" },
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

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-12 sm:py-16">
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

      <PathViews list={<RunningOrder />} stages={stages} />

      <section className="grid gap-px border border-line bg-line lg:grid-cols-[1fr_2fr]">
        <div className="bg-surface p-5">
          <h2 className="text-base font-semibold tracking-tight">Learn alongside</h2>
          <p className="mt-1 text-sm text-muted">Not a stage. Pick it up between any two.</p>
          <ul className="mt-4 space-y-2">
            {learnLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm hover:text-signal">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-base font-semibold tracking-tight">Work it out now</h2>
            <TextLink href="/tools">All {builtInTools.length} tools</TextLink>
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {bandTools.map((t) => (
              <li key={t.id}>
                <Link href={`/tools#${t.id}`} className="group block">
                  <span className="block text-sm font-semibold tracking-tight transition-colors group-hover:text-signal">
                    {t.question}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10">
        <SectionHeading eyebrow="Start here" title="Featured resources">
          <TextLink href="/resources">All resources</TextLink>
        </SectionHeading>
        <ResourceGrid resources={featured} />
      </section>

      <section className="pb-10">
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

import Link from "next/link"
import { notFound } from "next/navigation"
import { sectionById, sections } from "@/data/sections"
import { categoriesForSection } from "@/data/categories"
import { workflowsForSection } from "@/data/workflows"
import { resources } from "@/data/resources"
import { ResourceExplorer } from "@/components/ResourceExplorer"
import { WorkflowCard } from "@/components/WorkflowCard"
import { CategoryCard } from "@/components/CategoryCard"
import { SectionHeading } from "@/components/ui"

/** Extra in-app destinations surfaced per section. */
const extras: Record<string, { href: string; title: string; detail: string }[]> = {
  discover: [
    { href: "/inspiration", title: "Inspiration", detail: "Prompts and challenges for when digging stalls." },
  ],
  prepare: [
    { href: "/crates", title: "The Crate System", detail: "Organise by function, energy, mood and situation." },
    { href: "/tools#set-planner-math", title: "Set duration calculator", detail: "How many tracks fill your slot." },
  ],
  mix: [
    { href: "/tools#camelot-wheel", title: "Camelot Wheel", detail: "Pick a key, see every compatible move." },
    { href: "/transitions", title: "Transition Toolkit", detail: "Eight techniques, with walkthroughs." },
    { href: "/tools#bpm-tapper", title: "BPM Toolkit", detail: "Tapper, transition maths, half/double." },
  ],
  record: [
    { href: "/tools#storage-calculator", title: "Storage calculator", detail: "File size before you hit record." },
  ],
  publish: [
    { href: "/collections/best-tools-for-publishing-mixes", title: "Publishing collection", detail: "Master, package, upload." },
  ],
  learn: [
    { href: "/transitions", title: "Transition Toolkit", detail: "Technique cards you can drill." },
    { href: "/workflows", title: "All workflows", detail: "Every process on the site, start to finish." },
  ],
}

export function generateStaticParams() {
  return sections.filter((s) => s.id !== "tools").map((s) => ({ section: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const s = sectionById.get(section as never)
  if (!s) return {}
  return { title: `${s.name} — ${s.tagline}`, description: s.question }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const s = sectionById.get(section as never)
  if (!s || s.id === "tools") notFound()

  const cats = categoriesForSection(s.id)
  const catIds = cats.map((c) => c.id)
  const sectionResources = resources.filter((r) => r.categories.some((c) => catIds.includes(c)))
  const flows = workflowsForSection(s.id)
  const links = extras[s.id] ?? []

  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">{s.tagline}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{s.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{s.question}</p>
      </header>

      {flows.length ? (
        <section className="py-10">
          <SectionHeading eyebrow="Process" title="Workflows" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flows.map((w) => (
              <WorkflowCard key={w.id} workflow={w} />
            ))}
          </div>
        </section>
      ) : null}

      {links.length ? (
        <section className="pb-10">
          <SectionHeading eyebrow="Built in" title="Use it here" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border border-line bg-surface p-5 transition-colors hover:border-signal/60"
              >
                <span className="block text-base font-semibold tracking-tight group-hover:text-signal">
                  {l.title}
                </span>
                <span className="mt-1 block text-sm text-muted">{l.detail}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pb-10">
        <SectionHeading eyebrow="Browse" title="Categories" />
        <div>
          {cats.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              count={resources.filter((r) => r.categories.includes(c.id)).length}
            />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <SectionHeading eyebrow="Tools" title={`${sectionResources.length} resources`} />
        <ResourceExplorer resources={sectionResources} />
      </section>
    </div>
  )
}

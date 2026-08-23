import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { DJResource } from "@/data/types"
import { FavoriteButton } from "./FavoriteButton"
import { Pill } from "./ui"

const pricingLabel: Record<DJResource["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
}

export function ResourceCard({ resource }: { resource: DJResource }) {
  return (
    <article className="group relative flex flex-col border border-line bg-surface p-4 transition-colors hover:border-muted/60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          <Link href={`/resources/${resource.id}`} className="after:absolute after:inset-0">
            {resource.name}
          </Link>
        </h3>
        <div className="relative z-10 flex items-center gap-1.5">
          <FavoriteButton id={resource.id} label={resource.name} />
        </div>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{resource.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Pill tone={resource.pricing === "free" ? "signal" : "default"}>
          {pricingLabel[resource.pricing]}
        </Pill>
        {resource.tags.slice(0, 2).map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
        {resource.featured ? <Pill tone="signal">Featured</Pill> : null}
      </div>
    </article>
  )
}

export function ResourceGrid({ resources }: { resources: DJResource[] }) {
  if (!resources.length) {
    return (
      <p className="border border-dashed border-line p-8 text-center text-sm text-muted">
        Nothing matches those filters. Loosen one and try again.
      </p>
    )
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  )
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border border-signal/60 bg-signal-dim/30 px-3 py-2 font-mono text-xs uppercase tracking-wider text-signal transition-colors hover:bg-signal hover:text-black"
    >
      {children}
      <ArrowUpRight size={14} aria-hidden />
    </a>
  )
}

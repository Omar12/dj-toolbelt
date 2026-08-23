import { resources } from "@/data/resources"
import { workflows } from "@/data/workflows"
import { collections } from "@/data/collections"
import { techniques } from "@/data/techniques"
import { builtInTools } from "@/data/tools"

export type SearchKind = "resource" | "workflow" | "collection" | "technique" | "tool"

export interface SearchDoc {
  kind: SearchKind
  id: string
  title: string
  subtitle: string
  href: string
  /** Lower-cased haystack, weighted by repetition of the title. */
  haystack: string
}

function doc(
  kind: SearchKind,
  id: string,
  title: string,
  subtitle: string,
  href: string,
  extra: string[],
): SearchDoc {
  return {
    kind,
    id,
    title,
    subtitle,
    href,
    haystack: [title, title, subtitle, ...extra].join(" ").toLowerCase(),
  }
}

export const searchIndex: SearchDoc[] = [
  ...resources.map((r) =>
    doc("resource", r.id, r.name, r.description, `/resources/${r.id}`, [
      ...r.tags,
      ...r.categories,
      ...r.workflows,
      ...(r.genres ?? []),
      r.pricing,
      r.bestFor ?? "",
    ]),
  ),
  ...workflows.map((w) =>
    doc("workflow", w.id, w.name, w.question, `/workflows/${w.id}`, [
      ...w.tags,
      ...w.chain,
      w.description,
      ...w.steps.map((s) => s.title),
    ]),
  ),
  ...collections.map((c) =>
    doc("collection", c.id, c.name, c.description, `/collections/${c.id}`, []),
  ),
  ...techniques.map((t) =>
    doc("technique", t.id, t.name, t.whenToUse, `/transitions#${t.id}`, [
      t.description,
      ...t.genres,
    ]),
  ),
  ...builtInTools.map((t) =>
    doc("tool", t.id, t.name, t.description, `/tools#${t.id}`, t.tags),
  ),
]

export function search(query: string, limit = 12): SearchDoc[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const terms = q.split(/\s+/)

  return searchIndex
    .map((d) => {
      let score = 0
      for (const term of terms) {
        const hits = d.haystack.split(term).length - 1
        if (hits === 0) return { d, score: -1 }
        score += hits
        if (d.title.toLowerCase().startsWith(term)) score += 10
      }
      return { d, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.d)
}

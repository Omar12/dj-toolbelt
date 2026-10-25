import { homeActions } from "@/data/actions"
import { sectionById } from "@/data/sections"
import { workflowsForSection } from "@/data/workflows"
import { builtInTools } from "@/data/tools"

/** The five homepage jobs resolved into everything the path views need per stage. Plain data, safe to pass to client components. */
export const stages = homeActions.map((a, i) => {
  const section = sectionById.get(a.section)!
  const primaryId = a.href.split("/").pop()
  const sectionWorkflows = workflowsForSection(a.section)
  const primary = sectionWorkflows.find((w) => w.id === primaryId)
  if (!primary) throw new Error(`Homepage stage "${a.verb}": ${a.href} is not a ${a.section} workflow.`)
  return {
    n: String(i + 1).padStart(2, "0"),
    verb: a.verb,
    title: a.title,
    detail: a.detail,
    question: section.question,
    sectionHref: `/${a.section}`,
    primary: {
      href: a.href,
      name: primary.name,
      chain: primary.chain,
      steps: primary.steps.length,
      duration: primary.duration,
    },
    more: sectionWorkflows
      .filter((w) => w.id !== primaryId)
      .map((w) => ({ href: `/workflows/${w.id}`, name: w.name })),
    tools: a.tools.map((id) => {
      const t = builtInTools.find((t) => t.id === id)
      if (!t) throw new Error(`Homepage stage "${a.verb}": no built-in tool "${id}".`)
      return { href: `/tools#${t.id}`, name: t.name }
    }),
  }
})

export type Stage = (typeof stages)[number]

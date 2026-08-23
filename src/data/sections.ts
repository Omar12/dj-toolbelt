import type { Section, SectionId } from "./types"

export const sections: Section[] = [
  {
    id: "discover",
    name: "Discover",
    tagline: "Find music",
    question: "Where does the next record come from?",
  },
  {
    id: "prepare",
    name: "Prepare",
    tagline: "Buy, analyse, organise",
    question: "How do I get tracks gig-ready?",
  },
  {
    id: "mix",
    name: "Mix",
    tagline: "Harmony, tempo, transitions",
    question: "How do I make these two records work together?",
  },
  {
    id: "record",
    name: "Record",
    tagline: "Capture and stream",
    question: "How do I capture a set properly?",
  },
  {
    id: "publish",
    name: "Publish",
    tagline: "Release and present",
    question: "How do I put this mix out?",
  },
  {
    id: "learn",
    name: "Learn",
    tagline: "Technique and theory",
    question: "What should I get better at next?",
  },
  {
    id: "tools",
    name: "Tools",
    tagline: "Built-in utilities",
    question: "What do I need to work out right now?",
  },
]

export const sectionById = new Map(sections.map((s) => [s.id, s]))

export function isSectionId(value: string): value is SectionId {
  return sectionById.has(value as SectionId)
}

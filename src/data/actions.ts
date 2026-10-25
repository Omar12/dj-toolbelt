import type { SectionId } from "./types"

/** Homepage action cards — the five jobs, in the order they happen. */
export const homeActions: {
  verb: string
  title: string
  detail: string
  href: string
  section: SectionId
  /** Built-in tool ids reached for at this stage, in order of use. */
  tools: string[]
}[] = [
  {
    verb: "Dig",
    title: "Find more tracks like this",
    detail: "Anchor track to shortlist, step by step.",
    href: "/workflows/more-tracks-like-this",
    section: "discover",
    tools: ["bpm-tapper", "key-converter"],
  },
  {
    verb: "Prepare",
    title: "Get a set gig-ready",
    detail: "BPM curve, key path, energy arc.",
    href: "/workflows/prepare-a-set",
    section: "prepare",
    tools: ["energy-evaluator", "set-planner-math", "gig-timeline"],
  },
  {
    verb: "Mix",
    title: "Make two records work together",
    detail: "Camelot rules, then transitions.",
    href: "/workflows/learn-harmonic-mixing",
    section: "mix",
    tools: ["camelot-wheel", "key-compatibility", "bpm-transition", "half-double"],
  },
  {
    verb: "Record",
    title: "Capture a set properly",
    detail: "Booth feed to mastered file.",
    href: "/workflows/record-a-mix",
    section: "record",
    tools: ["storage-calculator"],
  },
  {
    verb: "Publish",
    title: "Put the mix out",
    detail: "Master, artwork, tracklist, upload.",
    href: "/workflows/publish-a-mix",
    section: "publish",
    tools: [],
  },
]

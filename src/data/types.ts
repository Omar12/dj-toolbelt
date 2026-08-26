export type Pricing = "free" | "freemium" | "paid"

export type Platform = "web" | "mac" | "windows" | "ios" | "android" | "linux"

export type SkillLevel = "beginner" | "intermediate" | "advanced"

export interface DJResource {
  id: string
  name: string
  url: string
  description: string
  /** Longer editorial take shown on the resource page. */
  bestFor?: string
  goodFor?: string[]
  /** Visual pipeline shown on the resource page, e.g. ["Track", "DigDeeper", "Similar tracks"]. */
  chain?: string[]
  categories: string[]
  workflows: string[]
  pricing: Pricing
  platforms?: Platform[]
  genres?: string[]
  tags: string[]
  skill?: SkillLevel
  /** Acquisition metadata, used by the Buy Music section. */
  formats?: ("digital" | "vinyl" | "lossless" | "streaming")[]
  regionNotes?: string
  featured?: boolean
  lastVerified?: string
}

export interface Category {
  id: string
  name: string
  description: string
  /** Top-level nav section this category belongs to. */
  section: SectionId
  icon: string
}

export type SectionId =
  | "discover"
  | "prepare"
  | "mix"
  | "record"
  | "publish"
  | "learn"
  | "tools"

export interface Section {
  id: SectionId
  name: string
  tagline: string
  question: string
}

export interface WorkflowStep {
  title: string
  detail: string
  resourceIds?: string[]
}

export interface Workflow {
  id: string
  name: string
  question: string
  description: string
  section: SectionId
  /** Node labels for the visual chain diagram. */
  chain: string[]
  steps: WorkflowStep[]
  resourceIds: string[]
  skill: SkillLevel
  tags: string[]
}

export interface Collection {
  id: string
  name: string
  description: string
  resourceIds: string[]
}

/** How far apart the two tracks' tempos are. "any" matches every selection. */
export type BpmDiff = "same" | "1-6" | "7+" | "any"

export type EnergyDir = "up" | "flat" | "down"

/** How closely the two tracks' genres sit. "any" matches every selection. */
export type GenreRelation = "same" | "similar" | "different" | "any"

export type TechniqueCategory =
  | "blend"
  | "impact"
  | "cut"
  | "fx"
  | "performative"
  | "tempo"
  | "genre-switch"

export interface Technique {
  id: string
  name: string
  description: string
  whenToUse: string
  /** Situations where this is the wrong tool. */
  avoid: string
  /** Concrete worked example with real BPMs/keys. */
  example: string
  /** What goes wrong, and why. */
  risk: string
  category: TechniqueCategory
  bpmDiff: BpmDiff
  energy: EnergyDir[]
  genreRelation: GenreRelation[]
  difficulty: SkillLevel
  genres: string[]
  walkthrough: string[]
}

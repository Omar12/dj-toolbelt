import type {
  BpmDiff,
  DJResource,
  EnergyDir,
  GenreRelation,
  Platform,
  Pricing,
  SkillLevel,
  Technique,
  TechniqueCategory,
} from "@/data/types"

export interface ResourceFilters {
  query?: string
  categories?: string[]
  genres?: string[]
  platforms?: Platform[]
  pricing?: Pricing[]
  workflows?: string[]
  skill?: SkillLevel[]
  formats?: string[]
}

const has = (list: string[] | undefined, wanted: string[] | undefined) =>
  !wanted?.length || Boolean(list?.some((v) => wanted.includes(v)))

export function filterResources(all: DJResource[], f: ResourceFilters): DJResource[] {
  const q = f.query?.trim().toLowerCase()
  return all.filter((r) => {
    if (q) {
      const hay = [r.name, r.description, ...r.tags, ...r.categories].join(" ").toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (!has(r.categories, f.categories)) return false
    if (!has(r.genres, f.genres)) return false
    if (!has(r.platforms, f.platforms)) return false
    if (!has(r.workflows, f.workflows)) return false
    if (!has(r.formats, f.formats)) return false
    if (f.pricing?.length && !f.pricing.includes(r.pricing)) return false
    if (f.skill?.length && (!r.skill || !f.skill.includes(r.skill))) return false
    return true
  })
}

export interface TechniqueFilters {
  bpmDiff?: BpmDiff[]
  energy?: EnergyDir[]
  genreRelation?: GenreRelation[]
  category?: TechniqueCategory[]
}

/** A technique tagged "any" for a facet is valid in every situation, so it survives any selection. */
const hasOrAny = (value: string, wanted: string[] | undefined) =>
  !wanted?.length || value === "any" || wanted.includes(value)

export function filterTechniques(all: Technique[], f: TechniqueFilters): Technique[] {
  return all.filter((t) => {
    if (!hasOrAny(t.bpmDiff, f.bpmDiff)) return false
    if (!has(t.energy, f.energy)) return false
    if (!t.genreRelation.some((g) => hasOrAny(g, f.genreRelation))) return false
    if (f.category?.length && !f.category.includes(t.category)) return false
    return true
  })
}

/** Distinct facet values present in a resource set, sorted by frequency. */
export function facetValues(all: DJResource[], key: "genres" | "platforms" | "categories" | "formats") {
  const counts = new Map<string, number>()
  for (const r of all) for (const v of r[key] ?? []) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([v]) => v)
}

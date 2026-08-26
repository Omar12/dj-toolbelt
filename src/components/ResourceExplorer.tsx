"use client"

import { useMemo, useState } from "react"
import type { DJResource, Platform, Pricing } from "@/data/types"
import { categories } from "@/data/categories"
import { workflows } from "@/data/workflows"
import { facetValues, filterResources } from "@/lib/filters"
import { ResourceGrid } from "./ResourceCard"

const PRICING: Pricing[] = ["free", "freemium", "paid"]

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function FacetGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: T[]
  selected: T[]
  onToggle: (value: T) => void
}) {
  if (!options.length) return null
  return (
    <fieldset className="border-t border-line pt-3">
      <legend className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = selected.includes(o)
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              aria-pressed={active}
              className={`border px-2 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                active
                  ? "border-signal bg-signal-dim/40 text-signal"
                  : "border-line text-muted hover:border-muted"
              }`}
            >
              {o.replace(/-/g, " ")}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function ResourceExplorer({
  resources,
  initialCategories = [],
  showCategoryFacet = true,
}: {
  resources: DJResource[]
  initialCategories?: string[]
  showCategoryFacet?: boolean
}) {
  const [query, setQuery] = useState("")
  const [cats, setCats] = useState<string[]>(initialCategories)
  const [genres, setGenres] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [pricing, setPricing] = useState<Pricing[]>([])
  const [flows, setFlows] = useState<string[]>([])

  const catOptions = useMemo(
    () => facetValues(resources, "categories").filter((c) => categories.some((x) => x.id === c)),
    [resources],
  )
  const genreOptions = useMemo(() => facetValues(resources, "genres").slice(0, 14), [resources])
  const platformOptions = useMemo(
    () => facetValues(resources, "platforms") as Platform[],
    [resources],
  )
  const flowOptions = useMemo(() => {
    const present = new Set(resources.flatMap((r) => r.workflows))
    return workflows.filter((w) => present.has(w.id)).map((w) => w.id)
  }, [resources])

  const filtered = useMemo(
    () =>
      filterResources(resources, {
        query,
        categories: cats,
        genres,
        platforms,
        pricing,
        workflows: flows,
      }),
    [resources, query, cats, genres, platforms, pricing, flows],
  )

  const active = cats.length + genres.length + platforms.length + pricing.length + flows.length

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="space-y-4">
        <div>
          <label htmlFor="resource-filter" className="sr-only">
            Filter resources by name
          </label>
          <input
            id="resource-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name…"
            className="w-full border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-signal"
          />
        </div>

        {showCategoryFacet ? (
          <FacetGroup
            label="Category"
            options={catOptions}
            selected={cats}
            onToggle={(v) => setCats(toggle(cats, v))}
          />
        ) : null}
        <FacetGroup
          label="Price"
          options={PRICING}
          selected={pricing}
          onToggle={(v) => setPricing(toggle(pricing, v))}
        />
        <FacetGroup
          label="Genre"
          options={genreOptions}
          selected={genres}
          onToggle={(v) => setGenres(toggle(genres, v))}
        />
        <FacetGroup
          label="Platform"
          options={platformOptions}
          selected={platforms}
          onToggle={(v) => setPlatforms(toggle(platforms, v))}
        />
        <FacetGroup
          label="Workflow"
          options={flowOptions}
          selected={flows}
          onToggle={(v) => setFlows(toggle(flows, v))}
        />

        {active > 0 ? (
          <button
            type="button"
            onClick={() => {
              setCats([])
              setGenres([])
              setPlatforms([])
              setPricing([])
              setFlows([])
            }}
            className="w-full border border-line px-3 py-2 font-mono text-[11px] uppercase tabular-nums tracking-wider text-muted hover:border-signal/60 hover:text-signal"
          >
            Clear {active} filter{active === 1 ? "" : "s"}
          </button>
        ) : null}
      </aside>

      <div>
        <p aria-live="polite" className="mb-3 font-mono text-xs uppercase tabular-nums tracking-wider text-muted">
          {filtered.length} resource{filtered.length === 1 ? "" : "s"}
        </p>
        <ResourceGrid resources={filtered} />
      </div>
    </div>
  )
}

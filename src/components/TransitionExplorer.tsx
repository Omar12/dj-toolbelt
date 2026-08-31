"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import type {
  BpmDiff,
  EnergyDir,
  GenreRelation,
  Technique,
  TechniqueCategory,
} from "@/data/types"
import { filterTechniques } from "@/lib/filters"
import { FacetGroup, toggle } from "./Facets"
import { Pill } from "./ui"

const BPM: BpmDiff[] = ["same", "1-6", "7+"]
const ENERGY: EnergyDir[] = ["up", "flat", "down"]
const RELATION: GenreRelation[] = ["same", "similar", "different"]
const CATEGORY: TechniqueCategory[] = [
  "blend",
  "impact",
  "cut",
  "fx",
  "performative",
  "tempo",
  "genre-switch",
]

const BPM_LABEL: Record<BpmDiff, string> = {
  same: "same bpm",
  "1-6": "±1–6",
  "7+": "7+",
  any: "any",
}

const ENERGY_LABEL: Record<EnergyDir, string> = { up: "↑ up", flat: "→ flat", down: "↓ down" }

/** A label above a paragraph of prose, matching the card's "When to use" treatment. */
function Note({ label, children }: { label: string; children: string }) {
  return (
    <p className="mt-3 text-sm">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label} </span>
      <span className="text-muted">{children}</span>
    </p>
  )
}

/** Preselect facets from the URL, e.g. /transitions?bpm=7%2B&category=cut — unknown values ignored. */
function fromQuery<T extends string>(
  params: { getAll(key: string): string[] },
  key: string,
  allowed: readonly T[],
): T[] {
  return params.getAll(key).filter((v): v is T => (allowed as readonly string[]).includes(v))
}

export function TransitionExplorer({ techniques }: { techniques: Technique[] }) {
  const params = useSearchParams()
  const [bpm, setBpm] = useState<BpmDiff[]>(() => fromQuery(params, "bpm", BPM))
  const [energy, setEnergy] = useState<EnergyDir[]>([])
  const [relation, setRelation] = useState<GenreRelation[]>([])
  const [category, setCategory] = useState<TechniqueCategory[]>(() =>
    fromQuery(params, "category", CATEGORY),
  )

  const filtered = useMemo(
    () => filterTechniques(techniques, { bpmDiff: bpm, energy, genreRelation: relation, category }),
    [techniques, bpm, energy, relation, category],
  )

  const active = bpm.length + energy.length + relation.length + category.length

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
          Filter by situation
        </p>
        <FacetGroup
          label="BPM difference"
          options={BPM}
          selected={bpm}
          onToggle={(v) => setBpm(toggle(bpm, v))}
          format={(v) => BPM_LABEL[v]}
        />
        <FacetGroup
          label="Energy"
          options={ENERGY}
          selected={energy}
          onToggle={(v) => setEnergy(toggle(energy, v))}
          format={(v) => ENERGY_LABEL[v]}
        />
        <FacetGroup
          label="Genre relationship"
          options={RELATION}
          selected={relation}
          onToggle={(v) => setRelation(toggle(relation, v))}
        />
        <FacetGroup
          label="Type"
          options={CATEGORY}
          selected={category}
          onToggle={(v) => setCategory(toggle(category, v))}
        />

        {active > 0 ? (
          <button
            type="button"
            onClick={() => {
              setBpm([])
              setEnergy([])
              setRelation([])
              setCategory([])
            }}
            className="w-full border border-line px-3 py-2 font-mono text-[11px] uppercase tabular-nums tracking-wider text-muted hover:border-signal/60 hover:text-signal"
          >
            Clear {active} filter{active === 1 ? "" : "s"}
          </button>
        ) : null}
      </aside>

      <div>
        <p
          aria-live="polite"
          className="mb-3 font-mono text-xs uppercase tabular-nums tracking-wider text-muted"
        >
          {filtered.length} transition{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <p className="border border-line bg-surface p-5 text-sm text-muted">
            No transition covers that combination. Loosen a filter — most situations have an answer,
            but not every pairing of tempo, energy and genre does.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((t) => (
              <article
                key={t.id}
                id={t.id}
                className="scroll-mt-32 border border-line bg-surface p-5"
              >
                <h2 className="text-lg font-semibold tracking-tight">{t.name}</h2>
                <p className="mt-1 text-sm text-muted">{t.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Pill tone="signal">{t.difficulty}</Pill>
                  <Pill>{t.category.replace(/-/g, " ")}</Pill>
                  <Pill>{BPM_LABEL[t.bpmDiff]}</Pill>
                  {t.genres.map((g) => (
                    <Pill key={g}>{g}</Pill>
                  ))}
                </div>

                <Note label="When to use">{t.whenToUse}</Note>
                <Note label="Avoid">{t.avoid}</Note>

                <ol className="mt-3 space-y-1.5 border-t border-line pt-3">
                  {t.walkthrough.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-muted">
                      <span className="font-mono text-xs text-signal">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-3 border-t border-line pt-3">
                  <Note label="Example">{t.example}</Note>
                  <Note label="Risk">{t.risk}</Note>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

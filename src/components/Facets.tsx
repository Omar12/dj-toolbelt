"use client"

/** Shared filter-pill primitives for the resource and transition explorers. */

export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

const spaced = (v: string) => v.replace(/-/g, " ")

export function FacetGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
  format = spaced,
}: {
  label: string
  options: T[]
  selected: T[]
  onToggle: (value: T) => void
  /** Defaults to turning dashes into spaces; override where a dash is meaningful, e.g. "1-6". */
  format?: (value: T) => string
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
              {format(o)}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

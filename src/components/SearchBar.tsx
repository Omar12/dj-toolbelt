"use client"

import Link from "next/link"
import { useEffect, useId, useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { search, type SearchDoc } from "@/lib/search"

const kindLabel: Record<SearchDoc["kind"], string> = {
  resource: "Tool",
  workflow: "Workflow",
  collection: "Collection",
  technique: "Technique",
  tool: "Built-in",
}

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const results = useMemo(() => search(query), [query])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div ref={boxRef} className="relative w-full">
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search DJ Toolbelt
      </label>
      <div className="flex items-center gap-2 border border-line bg-surface px-3 py-2 focus-within:border-signal/60">
        <Search size={14} className="shrink-0 text-muted" aria-hidden />
        <input
          id={`${listId}-input`}
          ref={inputRef}
          type="search"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search DJ Toolbelt…"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        <kbd className="hidden shrink-0 border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
          /
        </kbd>
      </div>

      {open && query.trim().length >= 2 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-40 mt-1 max-h-[60vh] overflow-y-auto border border-line bg-surface shadow-xl"
        >
          {results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">
              No matches. Try “dig”, “key”, “record” or “rekordbox”.
            </li>
          ) : (
            results.map((r) => (
              <li key={`${r.kind}-${r.id}`} role="option" aria-selected={false}>
                <Link
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 border-b border-line px-3 py-2.5 last:border-b-0 hover:bg-surface-2"
                >
                  <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-signal">
                    {kindLabel[r.kind]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted">{r.subtitle}</span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}

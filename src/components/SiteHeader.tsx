import Link from "next/link"
import { Star } from "lucide-react"
import { sections } from "@/data/sections"
import { SearchBar } from "./SearchBar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight">DJ Toolbelt</span>
          <span aria-hidden className="waveform hidden h-3 w-10 sm:block" />
        </Link>

        <div className="order-3 w-full sm:order-2 sm:ml-auto sm:w-72">
          <SearchBar />
        </div>

        <Link
          href="/toolbelt"
          className="order-2 ml-auto flex items-center gap-1.5 border border-line px-2.5 py-2 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-signal sm:order-3 sm:ml-0"
        >
          <Star size={13} aria-hidden />
          <span>My Toolbelt</span>
        </Link>
      </div>

      <nav aria-label="Primary" className="mx-auto max-w-6xl px-4">
        <ul className="flex gap-4 overflow-x-auto pb-2 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                href={`/${s.id}`}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
              >
                {s.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/workflows"
              className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
            >
              Workflows
            </Link>
          </li>
          <li>
            <Link
              href="/collections"
              className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="/resources"
              className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
            >
              All resources
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Star } from "lucide-react"
import { sections } from "@/data/sections"
import { SearchBar } from "./SearchBar"

const extraNav = [
  { href: "/workflows", name: "Workflows" },
  { href: "/collections", name: "Collections" },
  { href: "/resources", name: "All resources" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const nav = [...sections.map((s) => ({ href: `/${s.id}`, name: s.name })), ...extraNav]

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
          aria-current={pathname === "/toolbelt" ? "page" : undefined}
          className="order-2 ml-auto flex items-center gap-1.5 border border-line px-2.5 py-2 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-signal aria-[current=page]:text-foreground sm:order-3 sm:ml-0"
        >
          <Star size={13} aria-hidden />
          <span>My Toolbelt</span>
        </Link>
      </div>

      <nav aria-label="Primary" className="mx-auto max-w-6xl px-4">
        <ul className="flex gap-4 overflow-x-auto pb-2 text-sm">
          {nav.map((item) => {
            // Section pages own their sub-routes; the flat routes match exactly.
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`whitespace-nowrap font-mono text-xs uppercase tracking-wider hover:text-foreground ${
                    current ? "text-foreground" : "text-muted"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

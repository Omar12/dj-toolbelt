import Link from "next/link"
import { resources } from "@/data/resources"
import { InspirationDeck } from "@/components/InspirationDeck"

export const metadata = {
  title: "Inspiration",
  description: "Random sets, radio shows, digging detours and DJ challenges to break a rut.",
}

export default function InspirationPage() {
  const sets = resources.filter((r) => r.categories.includes("mixes"))
  const stations = resources.filter((r) => r.categories.includes("radio"))

  return (
    <div className="mx-auto max-w-5xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Unstick</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Inspiration</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          For when everything in your library sounds the same. Take one constraint, follow it for an
          hour, keep three records.
        </p>
      </header>
      <div className="py-10">
        <InspirationDeck sets={sets} stations={stations} />
      </div>
      <p className="pb-16 text-sm text-muted">
        Then run{" "}
        <Link href="/workflows/dig-somewhere-unexpected" className="text-signal underline underline-offset-4">
          Dig Somewhere Unexpected
        </Link>{" "}
        to turn the detour into a crate.
      </p>
    </div>
  )
}

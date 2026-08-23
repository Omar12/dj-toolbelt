"use client"

import Link from "next/link"
import { useState } from "react"
import { Shuffle } from "lucide-react"
import { inspirationPrompts } from "@/data/crates"
import type { DJResource } from "@/data/types"

function useShuffled<T>(items: T[]) {
  // Starts deterministic so server and client agree; shuffling is a user action.
  const [index, setIndex] = useState(0)
  const next = () =>
    setIndex((i) => (i + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length)
  return { item: items[index], next }
}

function Deck({
  eyebrow,
  title,
  children,
  onShuffle,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  onShuffle: () => void
}) {
  return (
    <section className="flex flex-col border border-line bg-surface p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 flex-1 text-sm leading-relaxed text-muted">{children}</div>
      <button
        type="button"
        onClick={onShuffle}
        className="mt-4 inline-flex w-fit items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:border-signal/60 hover:text-signal"
      >
        <Shuffle size={13} aria-hidden />
        Shuffle
      </button>
    </section>
  )
}

export function InspirationDeck({
  sets,
  stations,
}: {
  sets: DJResource[]
  stations: DJResource[]
}) {
  const set = useShuffled(sets)
  const station = useShuffled(stations)
  const dig = useShuffled(inspirationPrompts.dig)
  const challenge = useShuffled(inspirationPrompts.challenge)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Deck eyebrow="Watch a set" title={set.item.name} onShuffle={set.next}>
        <p>{set.item.description}</p>
        <p className="mt-2">
          <Link href={`/resources/${set.item.id}`} className="text-signal underline underline-offset-4">
            Open resource
          </Link>
        </p>
      </Deck>

      <Deck eyebrow="Listen to a show" title={station.item.name} onShuffle={station.next}>
        <p>{station.item.description}</p>
        <p className="mt-2">
          <Link href={`/resources/${station.item.id}`} className="text-signal underline underline-offset-4">
            Open resource
          </Link>
        </p>
      </Deck>

      <Deck eyebrow="Dig somewhere unexpected" title="Today's detour" onShuffle={dig.next}>
        <p className="text-base text-foreground">{dig.item}</p>
      </Deck>

      <Deck eyebrow="DJ challenge" title="This week's constraint" onShuffle={challenge.next}>
        <p className="text-base text-foreground">{challenge.item}</p>
      </Deck>
    </div>
  )
}

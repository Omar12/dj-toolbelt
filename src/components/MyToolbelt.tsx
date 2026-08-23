"use client"

import Link from "next/link"
import { getResources } from "@/data/resources"
import { useFavorites } from "@/lib/favorites"
import { ResourceGrid } from "./ResourceCard"

export function MyToolbelt() {
  const { ids } = useFavorites()

  if (!ids.length) {
    return (
      <div className="border border-dashed border-line p-10 text-center">
        <p className="text-sm text-muted">
          Nothing saved yet. Hit the star on any resource to keep it here.
        </p>
        <Link
          href="/resources"
          className="mt-4 inline-block border border-signal/60 bg-signal-dim/30 px-3 py-2 font-mono text-xs uppercase tracking-wider text-signal hover:bg-signal hover:text-black"
        >
          Browse resources
        </Link>
      </div>
    )
  }
  return <ResourceGrid resources={getResources(ids)} />
}

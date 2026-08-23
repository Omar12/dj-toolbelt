import Link from "next/link"
import type { Category } from "@/data/types"

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/resources?category=${category.id}`}
      className="group flex items-baseline justify-between gap-4 border-b border-line py-3 transition-colors hover:border-signal/60"
    >
      <span>
        <span className="text-base font-medium tracking-tight group-hover:text-signal">
          {category.name}
        </span>
        <span className="block text-sm text-muted">{category.description}</span>
      </span>
      <span className="font-mono text-xs text-muted">{count}</span>
    </Link>
  )
}

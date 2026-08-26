import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode
  tone?: "default" | "signal" | "outline"
}) {
  const tones = {
    default: "bg-surface-2 text-muted border-line",
    signal: "bg-signal-dim/40 text-signal border-signal/40",
    outline: "bg-transparent text-muted border-line",
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-line bg-surface ${className}`}>{children}</div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
      <div>
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`font-mono text-xs uppercase tracking-wider text-muted underline-offset-4 hover:text-signal hover:underline ${className}`}
    />
  )
}

/** Horizontal chain diagram: TRACK → LABEL → DJ. Wraps on small screens. */
export function ChainDiagram({ nodes, dense = false }: { nodes: string[]; dense?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Workflow chain">
      {nodes.map((node, i) => (
        <li key={`${node}-${i}`} className="flex items-center gap-2">
          <span
            className={`border border-line bg-surface-2 font-mono uppercase tracking-wider text-foreground ${
              dense ? "px-2 py-0.5 text-[11px]" : "px-3 py-1.5 text-[11px]"
            }`}
          >
            {node}
          </span>
          {i < nodes.length - 1 ? (
            <span aria-hidden className="font-mono text-xs text-signal">
              ›
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

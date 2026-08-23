import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Dead end</h1>
      <p className="mt-3 text-muted">
        Nothing here. Every other page leads somewhere — try one of these.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[
          ["/", "Home"],
          ["/resources", "All resources"],
          ["/workflows", "Workflows"],
          ["/tools", "Tools"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted hover:border-signal/60 hover:text-signal"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

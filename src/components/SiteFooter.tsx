import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-muted">
        <p className="max-w-md leading-relaxed">
          DJ Toolbelt is a map of how DJs discover, prepare, perform and share music. No account
          needed — favorites are stored in this browser.
        </p>
        <ul className="flex flex-wrap gap-4 font-mono uppercase tracking-wider">
          <li><Link href="/resources" className="hover:text-signal">Resources</Link></li>
          <li><Link href="/workflows" className="hover:text-signal">Workflows</Link></li>
          <li><Link href="/tools" className="hover:text-signal">Tools</Link></li>
          <li><Link href="/inspiration" className="hover:text-signal">Inspiration</Link></li>
        </ul>
      </div>
    </footer>
  )
}

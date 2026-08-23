import { MyToolbelt } from "@/components/MyToolbelt"

export const metadata = {
  title: "My Toolbelt",
  description: "The tools you saved. Stored in this browser, no account required.",
}

export default function ToolbeltPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="border-b border-line py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Saved</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">My Toolbelt</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Favourites live in this browser’s local storage. No account, no sync — clearing site data
          clears them.
        </p>
      </header>
      <div className="py-10">
        <MyToolbelt />
      </div>
    </div>
  )
}

import { ArrowDown, Check, CircleAlert, X } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { ChainDiagram, Pill, SectionHeading } from "@/components/ui"

/* Visual aids for the "find-tracks-that-work-together" workflow page. */

function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{children}</p>
}

/** Energy 1–5 as a row of square cells. */
function EnergyMeter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label={`Energy ${value} of 5`}>
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`h-3 w-3 border ${n <= value ? "border-signal/60 bg-signal-dim/60" : "border-line bg-surface-2"}`} />
        ))}
      </span>
      <span className="font-mono text-xs tabular-nums text-foreground">{value}/5</span>
    </span>
  )
}

/** Vertical energy bars, one per track. `dashed` marks a track whose character changed. */
function EnergyBars({
  values,
  labels,
  highlight,
  dashed,
  compact = false,
}: {
  values: number[]
  labels?: string[]
  highlight?: number
  dashed?: number
  compact?: boolean
}) {
  return (
    <div>
      <div className={`flex items-end gap-1.5 ${compact ? "h-14" : "h-24"}`} aria-hidden>
        {values.map((v, i) => (
          <div
            key={i}
            style={{ height: `${(v / 5) * 100}%` }}
            className={`flex-1 border ${
              i === dashed
                ? "border-dashed border-muted/60 bg-transparent"
                : i === highlight
                  ? "border-signal/60 bg-signal-dim/40"
                  : "border-line bg-surface-2"
            }`}
          />
        ))}
      </div>
      {!compact ? (
        <div className="mt-2 flex gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          {values.map((v, i) => (
            <span key={i} className="flex-1 text-center">
              <span className="block tabular-nums text-foreground">{v}</span>
              {labels?.[i]}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function KeyValueTable({ rows, caption }: { rows: [string, ReactNode][]; caption: string }) {
  return (
    <table className="mt-3 w-full max-w-md border border-line text-sm">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-line last:border-b-0">
            <th scope="row" className="w-32 bg-surface-2 px-3 py-2 text-left font-mono text-[11px] font-normal uppercase tracking-wider text-muted">
              {k}
            </th>
            <td className="px-3 py-2">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* ── Before the steps ─────────────────────────────────────────────── */

const breakdown = [
  { title: "Discover tracks you love", detail: "Each one works on its own." },
  { title: "Play them back to back", detail: "BPM and key line up on paper." },
  { title: "Something shifts", detail: "The next track feels weaker, or too intense, or the groove and mood change unexpectedly." },
]

const dimensions = [
  { name: "Energy", question: "How intense does the music feel?", visual: <EnergyMeter value={3} /> },
  { name: "Groove", question: "How does the rhythm make people move?", examples: ["Rolling", "Funky", "Bouncy", "Driving", "Broken"] },
  { name: "Mood", question: "What atmosphere does the music create?", examples: ["Dark", "Uplifting", "Hypnotic", "Playful", "Soulful"] },
]

const oneChange = [
  ["Energy", "3", "4", true],
  ["Groove", "Rolling", "Rolling", false],
  ["Mood", "Hypnotic", "Hypnotic", false],
] as const
const allChange = [
  ["Energy", "3", "5", true],
  ["Groove", "Rolling", "Broken", true],
  ["Mood", "Hypnotic", "Playful", true],
] as const

function ChangeGrid({ title, rows, verdict }: { title: string; rows: typeof oneChange | typeof allChange; verdict: string }) {
  return (
    <div className="border border-line bg-surface p-5">
      <Label>{title}</Label>
      <table className="mt-3 w-full text-sm">
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-muted">
            <th className="pb-2 text-left font-normal" />
            <th className="pb-2 text-left font-normal">Anchor</th>
            <th className="pb-2 text-left font-normal">Next</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([dim, from, to, changed]) => (
            <tr key={dim} className="border-t border-line">
              <th scope="row" className="py-2 text-left font-mono text-[11px] font-normal uppercase tracking-wider text-muted">{dim}</th>
              <td className="py-2">{from}</td>
              <td className={`py-2 ${changed ? "text-signal" : "text-muted"}`}>{to}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">{verdict}</p>
    </div>
  )
}

function Before() {
  return (
    <>
      <section className="pb-10">
        <SectionHeading eyebrow="The problem" title="Where the set breaks" />
        <div className="border border-line bg-surface p-5 sm:p-8">
          <ol className="flex flex-col items-center text-center">
            {breakdown.map((b) => (
              <li key={b.title} className="flex flex-col items-center">
                <h3 className="text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-1 max-w-md text-sm text-muted">{b.detail}</p>
                <ArrowDown aria-hidden className="my-4 h-4 w-4 text-muted" />
              </li>
            ))}
            <li className="w-full border border-signal/40 bg-signal-dim/10 p-5">
              <h3 className="flex items-center justify-center gap-2 text-lg font-semibold tracking-tight">
                <CircleAlert aria-hidden className="h-5 w-5 text-signal" />
                The set doesn&apos;t flow
              </h3>
              <p className="mt-1 text-sm text-muted">
                Good individual tracks, chosen without knowing whether they create a coherent musical progression.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="The goal" title="Read every track on three dimensions" />
        <ul className="grid gap-3 sm:grid-cols-3">
          {dimensions.map((d) => (
            <li key={d.name} className="flex flex-col gap-3 border border-line bg-surface p-5">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{d.name}</h3>
                <p className="mt-1 text-sm text-muted">{d.question}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {d.visual ?? d.examples?.map((e) => <Pill key={e}>{e}</Pill>)}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-l-2 border-signal pl-4">
          <Label>Core principle</Label>
          <p className="mt-1 text-lg font-semibold tracking-tight">Change one major musical dimension at a time.</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ChangeGrid title="One change" rows={oneChange} verdict="Energy lifts; groove and mood carry the thread. Reads as intentional." />
          <ChangeGrid title="Everything at once" rows={allChange} verdict="Three simultaneous changes. Much harder to make coherent." />
        </div>
      </section>
    </>
  )
}

/* ── Inside the steps ─────────────────────────────────────────────── */

const classes = [
  { name: "Match", values: [3, 3], detail: "Feels like a natural continuation." },
  { name: "Build", values: [3, 4], detail: "Increases intensity while preserving enough musical character." },
  { name: "Reset", values: [3, 2], detail: "Reduces intensity in a deliberate, useful way." },
  { name: "Disconnect", values: [3, 3], dashed: 1, detail: "Changes the musical character without a clear purpose." },
]

const objectives = [
  { name: "Maintain energy", values: [3, 3, 3], detail: "Keep energy, groove and mood relatively consistent.", start: true },
  { name: "Build energy", values: [2, 3, 4], detail: "Increase intensity gradually while keeping a recognizable musical thread." },
  {
    name: "Change direction",
    values: [3, 3, 3],
    detail: "A bridge track connects two different musical characters.",
    labels: ["Rolling house", "Percussive bridge", "Broken beat"],
  },
]

const stepVisuals: ReactNode[] = [
  // 1. Anchor
  <div key="anchor">
    <KeyValueTable
      caption="Example anchor track"
      rows={[
        ["Energy", <EnergyMeter key="e" value={3} />],
        ["Groove", "Rolling"],
        ["Mood", "Hypnotic"],
        ["Role", "Groover"],
      ]}
    />
    <p className="mt-2 text-sm text-muted">
      Not sure of the energy?{" "}
      <Link href="/tools#energy-evaluator" className="text-signal underline underline-offset-2">
        Rate it with the Track Energy Evaluator
      </Link>
      .
    </p>
  </div>,

  // 2. Candidates
  <div key="candidates" className="mt-3 grid gap-3 sm:grid-cols-2">
    <div className="border border-line bg-surface-2 p-4">
      <Label>Look for · share at least 2</Label>
      <ul className="mt-2 space-y-1 text-sm">
        {["Similar rhythmic movement", "Comparable bassline intensity", "Similar percussion density", "Complementary mood", "A useful energy relationship"].map((x) => (
          <li key={x} className="flex gap-2">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
            {x}
          </li>
        ))}
      </ul>
    </div>
    <div className="border border-dashed border-line p-4">
      <Label>Not yet</Label>
      <ul className="mt-2 space-y-1 text-sm text-muted">
        {["BPM", "Musical key"].map((x) => (
          <li key={x} className="flex gap-2">
            <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-muted">They matter for executing a transition, not for choosing one.</p>
    </div>
  </div>,

  // 3. Continuity test
  <div key="continuity" className="mt-3 space-y-4">
    <ChainDiagram dense nodes={["Anchor groove 45–60s", "Hard switch", "Candidate groove", "Judge"]} />
    <KeyValueTable
      caption="Continuity test questions"
      rows={[
        ["Energy", "Does the intensity remain appropriate?"],
        ["Groove", "Does the rhythmic feel connect?"],
        ["Mood", "Does the atmosphere make sense?"],
      ]}
    />
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {classes.map((c) => (
        <li key={c.name} className="flex flex-col gap-3 border border-line bg-surface-2 p-4">
          <EnergyBars compact values={c.values} highlight={0} dashed={c.dashed} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">{c.name}</p>
            <p className="mt-1 text-sm text-muted">{c.detail}</p>
          </div>
        </li>
      ))}
    </ul>
    <p className="text-sm">A reset isn&apos;t a bad transition. An <em>unintended</em> reset is the problem.</p>
  </div>,

  // 4. Three-track chain
  <ul key="chain" className="mt-3 grid gap-3 lg:grid-cols-3">
    {objectives.map((o) => (
      <li key={o.name} className="flex flex-col gap-3 border border-line bg-surface-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">{o.name}</p>
          {o.start ? <Pill tone="signal">Start here</Pill> : null}
        </div>
        <EnergyBars values={o.values} highlight={1} labels={o.labels ?? ["Track A", "Anchor", "Track B"]} />
        <p className="text-sm text-muted">{o.detail}</p>
      </li>
    ))}
  </ul>,

  // 5. Test the transitions
  <div key="transitions" className="mt-3 space-y-3">
    <div className="flex flex-wrap gap-1.5">
      {["Phrase alignment", "Bassline competition", "Percussion overlap", "Breakdowns + energy gaps", "When the main groove lands"].map((x) => (
        <Pill key={x}>{x}</Pill>
      ))}
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="border border-line bg-surface-2 p-4">
        <Label>Technical problem</Label>
        <p className="mt-1 text-sm">Try a different transition point. A good pairing may need one.</p>
      </div>
      <div className="border border-line bg-surface-2 p-4">
        <Label>Musical problem</Label>
        <p className="mt-1 text-sm">Choose a different track. Clean technique can&apos;t always rescue the pairing.</p>
      </div>
    </div>
  </div>,

  // 6. Save the relationship
  <KeyValueTable
    key="relationship"
    caption="Example saved pairing"
    rows={[
      ["From", "Track A"],
      ["To", "Track B"],
      ["Relationship", "Maintain"],
      ["Shared character", "Rolling, hypnotic"],
      ["Transition", "16-bar bass swap"],
      ["Result", <Pill key="r" tone="signal">Proven</Pill>],
    ]}
  />,
]

/* ── After the steps ─────────────────────────────────────────────── */

const challenge = [
  { name: "Maintain", values: [3, 3, 3] },
  { name: "Maintain", values: [2, 2, 2] },
  { name: "Build", values: [2, 3, 4] },
  { name: "Build", values: [3, 4, 5] },
  { name: "Bridge", values: [3, 3, 3], bridge: true },
]

const mistakes = [
  ["Matching only BPM and key", "Compatible metadata does not guarantee compatible groove or energy."],
  ["Comparing intros to drops", "Compare equivalent musical sections before evaluating compatibility."],
  ["Changing everything at once", "Simultaneous changes in mood, groove and intensity are harder to make coherent."],
  ["Trying to fix programming with effects", "Choose a better track or transition point before adding technical complexity."],
  ["Starting every set from scratch", "Reuse proven track relationships."],
]

const deliverables = [
  "One analyzed anchor track",
  "Five evaluated candidates",
  "Two promising track pairings",
  "One recorded three-track sequence",
  "One reusable mini-crate",
  "Clear notes explaining why the sequence works",
]

function After() {
  return (
    <>
      <section className="pb-10">
        <SectionHeading eyebrow="Practice challenge" title="Five proven chains in two weeks" />
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {challenge.map((c, i) => (
            <li key={i} className="flex flex-col gap-3 border border-line bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {String(i + 1).padStart(2, "0")} · {c.name}
              </p>
              <EnergyBars compact values={c.values} highlight={c.bridge ? 1 : undefined} />
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Record and review each sequence. <span className="text-foreground">Success:</span> you can explain why each
          track follows the previous one, and the musical direction feels intentional when listening back.
        </p>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="Avoid" title="Common mistakes" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mistakes.map(([title, detail]) => (
            <li key={title} className="border border-line bg-surface p-4">
              <h3 className="flex gap-2 text-base font-semibold tracking-tight">
                <X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted" />
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="Final result" title="What you walk away with" />
        <ul className="grid gap-2 sm:grid-cols-2">
          {deliverables.map((d) => (
            <li key={d} className="flex items-center gap-3 border border-line bg-surface px-4 py-3 text-sm">
              <Check aria-hidden className="h-4 w-4 shrink-0 text-signal" />
              {d}
            </li>
          ))}
        </ul>
        <blockquote className="mt-8 max-w-3xl border-l-2 border-signal pl-4 text-lg leading-snug">
          Great DJ sets aren&apos;t built by finding songs with matching numbers. They&apos;re built by understanding how
          one musical moment leads into another.
        </blockquote>
      </section>
    </>
  )
}

export const trackCompatibility = { before: <Before />, steps: stepVisuals, after: <After /> }

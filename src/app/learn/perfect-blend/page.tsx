import Link from "next/link"
import { Pill, SectionHeading } from "@/components/ui"
import { PerfectBlend } from "@/components/learn/PerfectBlend"

const link = "text-signal underline underline-offset-2"

export const metadata = {
  title: "The Perfect Blend",
  description:
    "An interactive mixer that walks through a 32-bar blend: bring the next track in with its bass cut, swap the basslines on a phrase boundary, then fade out.",
}

const steps: { bars: string; title: string; detail: string }[] = [
  {
    bars: "Bars 1–8",
    title: "Bring B in with its bass cut",
    detail: "Turn B's LOW knob all the way down before you move its fader. This cuts B's kick too, and that's the point. Raise the fader over the first phrase while A keeps the low end.",
  },
  {
    bars: "Bars 9–16",
    title: "Blend on A's bass",
    detail: "Both tracks play together, but only A's kick and bassline are in. B adds hats and percussion on top.",
  },
  {
    bars: "Bar 17",
    title: "Swap the basslines on the downbeat",
    detail: "On the first beat of the next phrase, turn A's LOW down and B's LOW up together, within one beat. The low end hands over without a gap and without doubling.",
  },
  {
    bars: "Bars 25–32",
    title: "Take A out",
    detail: "A has no bass left, so its fader can come down slowly over the last phrase while B carries the floor.",
  },
]

export default function PerfectBlendPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <nav aria-label="Breadcrumb" className="pt-8">
        <Link href="/learn" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-signal">
          ← Learn
        </Link>
      </nav>

      <header className="border-b border-line py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Mixing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">The Perfect Blend</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Two beatmatched tracks, 32 bars, one bass swap. Scrub through the mix and watch the low end.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Pill tone="signal">Beginner</Pill>
          <Pill>Interactive</Pill>
        </div>
      </header>

      <div className="grid items-start gap-10 py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <PerfectBlend />

        <section>
          <SectionHeading eyebrow="Why" title="Two basslines are one too many" />
          <div className="max-w-prose space-y-3 leading-relaxed text-muted">
            <p>
              Once two tracks are beatmatched, their kicks land on the same beats and their basslines play over each other. With
              both low ends at full, the kicks peak up to 6 dB hotter on the master and the low end turns muddy, however clean your
              beatmatching is.
            </p>
            <p>
              Click or tap the figure to play the same mix without the swap and watch the meter climb. Mids and highs have more
              room; the low end only has room for one.
            </p>
          </div>
        </section>
      </div>

      <section className="pb-10">
        <SectionHeading eyebrow="How" title="The 32-bar blend" />
        <ol className="grid gap-3 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.bars} className="border border-line bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{s.bars}</p>
              <h3 className="mt-1 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          Practise it next in the Transition Toolkit: the{" "}
          <Link href="/transitions#bass-swap" className={link}>Bass Swap</Link> is this move, and the{" "}
          <Link href="/transitions#eq-blend" className={link}>EQ Blend</Link> is the slower version that trades bands over 16–64 bars.
        </p>
      </section>

      <section className="pb-16">
        <SectionHeading eyebrow="Before you start" title="What the figure assumes" />
        <ul className="max-w-3xl list-disc space-y-1.5 pl-5 leading-relaxed text-muted marker:text-signal">
          <li>
            The tempos match. Find the BPM with the{" "}
            <Link href="/tools#bpm-tapper" className={link}>BPM tapper</Link>.
          </li>
          <li>
            The keys are compatible. Check them with the{" "}
            <Link href="/tools#key-compatibility" className={link}>harmonic compatibility checker</Link>{" "}
            or the <Link href="/workflows/learn-harmonic-mixing" className={link}>harmonic mixing workflow</Link>.
          </li>
          <li>
            The levels match. Set each channel&apos;s gain so both tracks peak at the same point on the channel meters.
          </li>
          <li>
            The phrases line up: B starts on the first beat of one of A&apos;s phrases, so bar 17 is a phrase boundary in both tracks.
          </li>
          <li>
            The tracks belong together. See{" "}
            <Link href="/workflows/find-tracks-that-work-together" className={link}>Find Tracks That Work Together</Link>.
          </li>
        </ul>
      </section>
    </div>
  )
}

import type { ReactNode } from "react"
import Link from "next/link"
import { Pill, SectionHeading } from "@/components/ui"
import { ToolShell } from "@/components/tools/BpmTools"
import { EnergyEvaluator } from "@/components/tools/EnergyTools"

export const metadata = {
  title: "Understanding Track Energy",
  description:
    "A practical guide to rating track energy on a 1–5 scale, reading it across genres, and using it to build DJ sets.",
}

const scale = [
  ["1/5", "Very Low", "Atmospheric, sparse, soft rhythms, minimal intensity", "Intro, background, early warm-up"],
  ["2/5", "Low", "Relaxed groove, subtle bass, light percussion", "Warm-up, opening, lounge"],
  ["3/5", "Medium", "Defined rhythm, engaging bassline, danceable groove", "Groove, builder, steady floor"],
  ["4/5", "High", "Driving drums, prominent bass, strong rhythmic intensity", "Energy lift, main-room dancing"],
  ["5/5", "Peak", "Maximum impact, aggressive rhythms, dramatic moments", "Peak-time, climax, major crowd response"],
]

const characteristics: { name: string; intro?: string; levels: [string, string, string]; note?: string }[] = [
  {
    name: "Drum Intensity",
    intro: "Listen for kick strength, percussion activity, transient impact, and rhythmic complexity.",
    levels: ["Soft, understated, or sparse drums.", "Clear, steady, danceable percussion.", "Punchy, aggressive, or highly active drums."],
  },
  {
    name: "Bassline Drive",
    intro: "A bassline can make a track feel powerful even at a relatively slow BPM.",
    levels: ["Subtle, sustained, or atmospheric bass.", "Defined, groovy, and rhythmic bass.", "Relentless, forceful, or highly propulsive bass."],
  },
  {
    name: "Rhythmic Movement",
    intro: "Rhythmic drive measures how strongly the groove encourages physical movement.",
    levels: ["Relaxed or spacious.", "Steady and danceable.", "Urgent, rolling, or highly propulsive."],
  },
  {
    name: "Musical Density",
    intro: "Density describes how much musical information happens simultaneously.",
    levels: ["Few instruments, spacious arrangement.", "Several complementary rhythmic and melodic layers.", "Dense percussion, synths, vocals, and effects."],
    note: "Density can increase perceived energy, but crowded arrangements do not automatically make good dance tracks.",
  },
  {
    name: "Tension and Impact",
    intro: "Listen for musical excitement, buildup, contrast, and release.",
    levels: ["Calm and consistent.", "Noticeable lifts and changes.", "Dramatic build-ups, explosive drops, or powerful musical accents."],
    note: "A track can have strong energy without a conventional drop.",
  },
]

const genres: { name: string; drivers: string; levels: string[]; insight: string }[] = [
  {
    name: "House",
    drivers: "Bassline movement, kick consistency, percussion, vocal intensity, and rhythmic layers.",
    levels: ["Atmospheric or ambient-influenced house", "Relaxed deep house, restrained percussion", "Groovy house with a defined bassline", "Driving house, strong drums and rhythmic momentum", "High-impact, peak-time house with maximum excitement"],
    insight: "House can build considerable energy through groove and repetition without dramatic drops.",
  },
  {
    name: "Deep House",
    drivers: "Bassline warmth, groove, percussion, chord movement, and rhythmic tension.",
    levels: ["Atmospheric, spacious, meditative", "Warm, relaxed, understated", "Deep, rolling, danceable groove", "Punchy, rhythmically driving", "Maximum intensity within a deep house context"],
    insight: "Deep house rewards subtle energy control. A small change in bassline movement or percussion can make a meaningful difference.",
  },
  {
    name: "Tech House",
    drivers: "Kick and bass interaction, groove tension, percussion, vocal hooks, and drop impact.",
    levels: ["Sparse, minimal groove", "Restrained percussion, understated bass", "Rolling, danceable bassline", "Driving bass, prominent drums, energetic hooks", "High-impact, peak-time tech house"],
    insight: "A rolling bassline can sustain high floor energy even without a large melodic buildup.",
  },
  {
    name: "Techno",
    drivers: "Kick pressure, repetition, rhythmic density, tension, distortion, and hypnotic momentum.",
    levels: ["Ambient or extremely minimal techno", "Sparse, restrained hypnotic groove", "Steady, driving rhythm", "Forceful percussion and sustained tension", "Intense, relentless peak-time techno"],
    insight: "Techno energy is often cumulative. Gradually increasing intensity over several tracks can be more effective than relying on individual drops.",
  },
  {
    name: "Trance",
    drivers: "Melodic tension, arpeggios, bass movement, builds, breakdowns, and emotional release.",
    levels: ["Ambient, atmospheric, spacious", "Gentle progressive movement", "Steady melodic drive", "Strong rhythmic and melodic intensity", "Powerful climactic release"],
    insight: "Trance often creates strong contrast between its breakdowns and climactic sections. Rate the overall track and recognize its internal energy changes.",
  },
  {
    name: "Disco and Nu-Disco",
    drivers: "Bass groove, live instrumentation, rhythmic syncopation, vocal excitement, and percussion.",
    levels: ["Downtempo, mellow, atmospheric", "Relaxed, soulful disco groove", "Funky, highly danceable", "Driving rhythm, strong musical excitement", "Euphoric, high-impact dance-floor disco"],
    insight: "Disco energy often comes from rhythmic interaction and musical excitement, not aggression.",
  },
  {
    name: "Hip-Hop and R&B",
    drivers: "Drum impact, bass weight, vocal delivery, rhythmic movement, hooks, and audience familiarity.",
    levels: ["Mellow, atmospheric, reflective", "Laid-back head-nod groove", "Strong rhythmic bounce", "Hard-hitting, dance-oriented", "Explosive party or anthem energy"],
    insight: "Familiarity can strongly affect crowd response. A track with moderate musical intensity may create an enormous reaction when the audience recognizes it.",
  },
  {
    name: "Drum & Bass",
    drivers: "Breakbeat complexity, bass intensity, rhythmic momentum, density, and drop impact.",
    levels: ["Atmospheric, restrained, spacious", "Smooth, soulful, rolling", "Defined breaks and strong groove", "Driving drums, forceful bass", "Maximum rhythmic and bass intensity"],
    insight: "Fast BPM does not automatically mean maximum energy. A smooth liquid drum & bass track can feel less intense than an aggressive track at a similar tempo.",
  },
  {
    name: "UK Garage",
    drivers: "Swing, shuffled percussion, bass movement, vocal chops, and rhythmic bounce.",
    levels: ["Atmospheric, minimal", "Relaxed, soulful garage", "Bouncy, danceable swing", "Driving, bass-heavy rhythmic movement", "Intense, high-impact garage"],
    insight: "Swing and syncopation can make a track feel lively without increasing the tempo.",
  },
  {
    name: "Afro House",
    drivers: "Polyrhythmic percussion, bass movement, chants, melodic layers, and gradually building tension.",
    levels: ["Atmospheric, spacious", "Relaxed, percussion-led groove", "Warm, rolling, strongly danceable", "Dense, driving percussion", "Powerful, climactic, percussion-led intensity"],
    insight: "Afro house can build energy gradually through layered rhythms rather than dramatic transitions.",
  },
]

const setPlan = [
  ["0–10 min", "2", "Establish atmosphere"],
  ["10–20 min", "2–3", "Develop groove"],
  ["20–30 min", "3", "Build engagement"],
  ["30–40 min", "3–4", "Increase intensity"],
  ["40–45 min", "3", "Controlled energy reset"],
  ["45–55 min", "4–5", "Main energy peak"],
  ["55–60 min", "3–4", "Resolve or hand over"],
]

/** Minute → energy points plotted in the journey chart. */
const journey: [number, number][] = [[0, 2], [10, 2], [20, 3], [30, 3], [40, 4], [45, 3], [50, 4], [55, 5], [60, 4]]

function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl space-y-3 leading-relaxed text-muted">{children}</div>
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-line text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-2">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-mono text-[11px] font-normal uppercase tracking-wider text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 align-top ${j === 0 ? "whitespace-nowrap font-mono tabular-nums text-foreground" : "text-muted"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl border-l-2 border-signal bg-surface px-4 py-3 text-sm leading-relaxed">{children}</p>
}

/** Line chart of the 60-minute set: points evenly spaced, labelled by minute. */
function EnergyJourney() {
  const w = 600, h = 260, left = 32, right = 16, top = 16, bottom = 32
  const x = (i: number) => left + (i * (w - left - right)) / (journey.length - 1)
  const y = (e: number) => top + ((5 - e) * (h - top - bottom)) / 4
  const points = journey.map(([, e], i) => `${x(i)},${y(e)}`).join(" ")

  return (
    <figure className="border border-line bg-surface p-4">
      <figcaption className="mb-3 text-sm font-medium">Example 60-minute energy journey</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={`Energy by minute: ${journey.map(([m, e]) => `${m} min ${e}`).join(", ")}`}>
        {[1, 2, 3, 4, 5].map((e) => (
          <g key={e}>
            <line x1={left} x2={w - right} y1={y(e)} y2={y(e)} stroke="var(--border)" strokeDasharray="3 4" />
            <text x={left - 12} y={y(e)} dy="0.35em" textAnchor="middle" className="fill-muted font-mono text-[11px]">{e}</text>
          </g>
        ))}
        <polyline points={points} fill="none" stroke="var(--signal)" strokeWidth={2} strokeLinejoin="round" />
        {journey.map(([m, e], i) => (
          <g key={m}>
            <circle cx={x(i)} cy={y(e)} r={4} fill="var(--background)" stroke="var(--signal)" strokeWidth={2}>
              <title>{`${m} min · Energy ${e}`}</title>
            </circle>
            <text x={x(i)} y={h - 8} textAnchor="middle" className="fill-muted font-mono text-[11px]">{m}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">Minutes · illustrative energy targets, not a rule</p>
    </figure>
  )
}

function List({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul"
  return (
    <Tag className={`max-w-3xl space-y-1.5 pl-5 leading-relaxed text-muted ${ordered ? "list-decimal" : "list-disc marker:text-signal"}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  )
}

export default function TrackEnergyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <nav aria-label="Breadcrumb" className="pt-8">
        <Link href="/learn" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-signal">
          ← Learn
        </Link>
      </nav>

      <header className="border-b border-line py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">Track Analysis</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Understanding Track Energy</h1>
        <p className="mt-3 text-lg text-muted">A practical guide for DJs.</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Pill tone="signal">Beginner to Intermediate</Pill>
          <Pill>7 min read</Pill>
        </div>
      </header>

      <section className="py-10">
        <SectionHeading eyebrow="Intro" title="What is track energy?" />
        <Prose>
          <p>Track energy describes how intense, driving, and exciting a piece of music feels to listeners.</p>
          <p>It influences how people move, how a dance floor responds, and how a DJ builds or releases tension throughout a set.</p>
          <p className="font-semibold text-foreground">Energy is not the same as BPM, loudness, or genre.</p>
          <p>A 118 BPM house track with a powerful bassline and energetic percussion may feel more intense than a sparse 130 BPM techno track.</p>
          <p>Learning to recognize energy helps DJs:</p>
        </Prose>
        <div className="mt-3">
          <List
            items={[
              "Select tracks that work together.",
              "Build momentum without rushing.",
              "Create effective energy peaks and resets.",
              "Organize their libraries by intensity.",
              "Adapt to different venues and audiences.",
              "Plan sets with a deliberate musical progression.",
            ]}
          />
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="01" title="The DJ Toolbelt Energy Scale" />
        <Prose>
          <p>Use a simple 1–5 rating system to classify tracks by their perceived intensity.</p>
        </Prose>
        <div className="my-4">
          <Table caption="Energy scale" head={["Energy", "Classification", "Musical characteristics", "Typical DJ function"]} rows={scale} />
        </div>
        <Callout>
          <strong>Important:</strong> These ratings are relative to the music being played, the venue, and the crowd. A
          high-energy deep house track may have less absolute intensity than a medium-energy hard techno track. The goal is
          consistency within your own DJ library, not universal scientific precision.
        </Callout>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="02" title="What makes a track feel energetic?" />
        <Prose>
          <p>Evaluate five musical characteristics.</p>
        </Prose>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {characteristics.map((c) => (
            <div key={c.name} className="border border-line bg-surface p-4">
              <h3 className="text-base font-semibold tracking-tight">{c.name}</h3>
              {c.intro ? <p className="mt-1 text-sm text-muted">{c.intro}</p> : null}
              <dl className="mt-3 space-y-1.5 text-sm">
                {(["Low", "Medium", "High"] as const).map((level, i) => (
                  <div key={level} className="flex gap-2">
                    <dt className="w-14 shrink-0 font-mono text-[11px] uppercase tracking-wider text-signal">{level}</dt>
                    <dd className="text-muted">{c.levels[i]}</dd>
                  </div>
                ))}
              </dl>
              {c.note ? <p className="mt-3 text-xs italic text-muted">{c.note}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="03" title="How to rate a track's energy" />
        <ol className="space-y-3">
          {[
            {
              title: "Listen to the main groove.",
              body: (
                <p>
                  Avoid judging a track solely by its intro, breakdown, or outro. Find the section that best represents its
                  primary dance-floor character.
                </p>
              ),
            },
            {
              title: "Evaluate the five characteristics.",
              body: (
                <>
                  <p>Give each a score from 1 to 3:</p>
                  <div className="mt-2 max-w-sm">
                    <Table caption="Characteristic scores" head={["Score", "Meaning"]} rows={[["1", "Low intensity"], ["2", "Moderate intensity"], ["3", "High intensity"]]} />
                  </div>
                </>
              ),
            },
            {
              title: "Calculate an initial energy estimate.",
              body: (
                <>
                  <p>Average the five scores. Convert the average to a 1–5 scale using:</p>
                  <code className="mt-2 block w-fit border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-foreground">
                    Energy = round(1 + (Average Score − 1) × 2)
                  </code>
                  <p className="mt-2">This produces an approximate rating from 1 to 5.</p>
                </>
              ),
            },
            {
              title: "Make a musical judgment.",
              body: (
                <>
                  <p>Ask yourself:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-signal">
                    <li>Does this track encourage gentle movement or intense dancing?</li>
                    <li>Does it maintain energy or significantly raise it?</li>
                    <li>Does it feel stronger or weaker than other tracks in the same crate?</li>
                    <li>How does it change when played at performance volume?</li>
                  </ul>
                  <p className="mt-2">The calculated number is only a starting point. Your ears and performance experience take priority.</p>
                </>
              ),
            },
            {
              title: "Tag the track in your DJ library.",
              body: (
                <>
                  <p>Use consistent tags such as:</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Energy: 3", "Mood: Groovy", "Role: Builder", "Intensity: Steady"].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                  <p className="mt-2">A single track can have several useful roles depending on the set.</p>
                </>
              ),
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4 border border-line bg-surface p-4">
              <span className="font-mono text-sm text-signal" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                <div className="mt-1 text-sm leading-relaxed text-muted">{step.body}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <ToolShell id="energy-evaluator" name="Try it: interactive energy evaluator" description="Steps 2 and 3, done for you.">
            <EnergyEvaluator />
          </ToolShell>
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="04" title="Understanding energy across music genres" />
        <Prose>
          <p>
            Different genres create energy through different musical elements. A single absolute energy scale cannot describe
            every genre equally well.
          </p>
          <p>
            The following examples are <strong className="text-foreground">relative ratings within each genre</strong>, not
            fixed classifications or objective measurements.
          </p>
        </Prose>
        <div className="mt-4 space-y-2">
          {genres.map((g) => (
            <details key={g.name} className="group border border-line bg-surface">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 px-4 py-3 hover:text-signal">
                <span className="text-base font-semibold tracking-tight">{g.name}</span>
                <span aria-hidden className="font-mono text-xs text-signal group-open:rotate-90">›</span>
              </summary>
              <div className="space-y-3 border-t border-line p-4 text-sm">
                <p className="text-muted">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Primary energy drivers </span>
                  {g.drivers}
                </p>
                <Table caption={`${g.name} energy levels`} head={["Energy", "Typical characteristics"]} rows={g.levels.map((l, i) => [String(i + 1), l])} />
                <p className="text-muted">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">DJ insight </span>
                  {g.insight}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="05" title="Comparing energy across genres" />
        <Prose>
          <p>Genre-relative energy and absolute perceived intensity are different concepts. For example:</p>
        </Prose>
        <div className="my-4 max-w-xl">
          <Table
            caption="Illustrative genre-relative ratings"
            head={["Track type", "Illustrative genre-relative rating"]}
            rows={[
              ["Relaxed deep house", "2/5"],
              ["Rolling tech house", "3/5"],
              ["Driving disco", "4/5"],
              ["Hypnotic techno", "3/5"],
              ["High-impact drum & bass", "5/5"],
            ]}
          />
        </div>
        <Prose>
          <p>These are examples, not automatic ratings.</p>
          <p>
            When mixing across genres, compare the actual physical and emotional intensity of each track instead of assuming
            their energy from genre or BPM.
          </p>
          <p>A change in rhythm, groove, or musical familiarity can significantly alter how a crowd experiences the transition.</p>
        </Prose>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="06" title="Energy vs. BPM vs. crowd response" />
        <Prose>
          <p>These are three different concepts.</p>
        </Prose>
        <div className="my-4 grid gap-3 sm:grid-cols-3">
          {[
            ["BPM", "How fast the musical beat occurs."],
            ["Track energy", "How intense, driving, or exciting the music feels."],
            ["Crowd response", "How people actually react to the track in a specific environment."],
          ].map(([term, def]) => (
            <div key={term} className="border border-line bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{term}</p>
              <p className="mt-1 text-sm text-muted">{def}</p>
            </div>
          ))}
        </div>
        <Prose>
          <p>They influence one another, but they are not interchangeable.</p>
          <p>A DJ might play a 120 BPM track that creates a stronger crowd reaction than a 135 BPM track.</p>
          <p>Likewise, a high-energy track can clear a dance floor when it does not suit the audience, venue, or moment.</p>
        </Prose>
        <div className="mt-4">
          <Callout>
            <strong>Professional principle:</strong> Use energy ratings to prepare your options. Use crowd response to make
            your decisions during a performance.
          </Callout>
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="07" title="Using energy to build better DJ sets" />
        <Prose>
          <p>Energy ratings become most useful when planning musical progression.</p>
        </Prose>
        <h3 className="mt-6 mb-3 text-lg font-semibold tracking-tight">Example: 60-minute house set</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <EnergyJourney />
          <Table caption="60-minute house set plan" head={["Set time", "Target energy", "Musical role"]} rows={setPlan} />
        </div>
        <div className="mt-4">
          <Prose>
            <p>This is an illustrative programming pattern, not a required formula.</p>
            <p>
              Good DJ sets rarely need a constant upward climb. Contrasts, plateaus, and strategic resets make musical
              journeys more interesting.
            </p>
          </Prose>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="border border-line bg-surface p-4">
            <h3 className="mb-2 text-base font-semibold tracking-tight">When to increase energy</h3>
            <List
              items={[
                "The dance floor is responding positively.",
                "People are becoming more physically engaged.",
                "The current groove has established enough momentum.",
                "The next track offers a meaningful musical lift.",
              ]}
            />
          </div>
          <div className="border border-line bg-surface p-4">
            <h3 className="mb-2 text-base font-semibold tracking-tight">When to reduce energy</h3>
            <List
              items={[
                "The crowd appears fatigued.",
                "The room needs breathing space.",
                "The previous track created a strong peak.",
                "A different groove could refresh the floor.",
                "The next DJ or venue schedule calls for a change.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="08" title="Practice exercise: train your energy judgment">
          <div className="flex gap-1.5">
            <Pill>15–20 min</Pill>
          </div>
        </SectionHeading>
        <Prose>
          <p>
            <strong className="text-foreground">Goal:</strong> Improve your ability to hear and classify musical intensity.
          </p>
        </Prose>
        <div className="mt-3">
          <List
            ordered
            items={[
              "Choose 10 tracks from one genre.",
              "Listen to the main groove of each track.",
              "Assign an energy rating from 1 to 5.",
              "Sort the tracks from lowest to highest energy.",
              "Listen to consecutive tracks and compare their intensity.",
              "Adjust ratings where the musical progression feels inconsistent.",
              "Build two different five-track sequences from the same collection.",
            ]}
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-line bg-surface p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Challenge A</p>
            <h3 className="mt-1 text-base font-semibold tracking-tight">Progressive Build</h3>
            <p className="mt-1 text-sm text-muted">Create a sequence that gradually increases energy.</p>
          </div>
          <div className="border border-line bg-surface p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Challenge B</p>
            <h3 className="mt-1 text-base font-semibold tracking-tight">Energy Wave</h3>
            <p className="mt-1 text-sm text-muted">Create a sequence that rises, briefly resets, and rises again.</p>
          </div>
        </div>
        <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight">What improvement sounds like</h3>
        <Prose>
          <p>Your transitions should produce intentional changes in intensity instead of unexpected jumps or drops.</p>
          <p>Over time, you should become better at predicting how a track will affect a set before playing it.</p>
        </Prose>
      </section>

      <section className="pb-10">
        <SectionHeading eyebrow="09" title="Recommended DJ library tags" />
        <Prose>
          <p>Use energy ratings alongside functional tags rather than replacing them.</p>
        </Prose>
        <div className="my-4 max-w-xl">
          <Table
            caption="Recommended library metadata"
            head={["Metadata", "Example"]}
            rows={[
              ["Energy", "3/5"],
              ["Genre", "Deep House"],
              ["Mood", "Warm / Groovy"],
              ["Set Role", "Builder"],
              ["Groove", "Rolling"],
              ["Vocal Intensity", "Low"],
              ["Situation", "Warm-up"],
              ["Transition Role", "Bridge"],
            ]}
          />
        </div>
        <Prose>
          <p>This allows you to find tracks by musical purpose rather than relying only on genre, BPM, or key.</p>
          <p>
            For example, searching for <strong className="text-foreground">Energy 3 + Groovy + Builder</strong> can identify
            tracks suitable for maintaining momentum without pushing into peak-time territory.
          </p>
        </Prose>
      </section>

      <section className="pb-16">
        <SectionHeading eyebrow="10" title="Key takeaways" />
        <List
          items={[
            "Track energy is perceived musical intensity, not simply BPM.",
            "A 1–5 scale is practical for DJ library organization.",
            "Drums, bass, rhythm, density, and tension all influence perceived energy.",
            "Energy levels should be calibrated within musical genres.",
            "Different genres express energy in different ways.",
            "Crowd response is more important than a fixed energy rating.",
            "Strong DJ programming depends on controlling energy over time, not maximizing it continuously.",
          ]}
        />
        <p className="mt-6 max-w-3xl text-xl font-semibold tracking-tight">
          The goal is not to play the highest-energy tracks. It is to play the right level of energy at the right moment.
        </p>
      </section>
    </div>
  )
}

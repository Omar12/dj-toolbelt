# DJ Toolbelt

A map of how DJs discover, prepare, perform and share music — not just a directory of DJ websites. Every resource is filed under the job it does and the order you use it in.

## What's in it

- **Sections** — Discover, Prepare, Mix, Record, Publish, Learn, Tools. Each answers one question ("Where does the next record come from?", "How do I make these two records work together?").
- **Resources** — ~80 curated sites and apps, tagged with pricing, platforms, genres, skill level and formats, filterable in the explorer.
- **Workflows** — step-by-step routes (dig by label, dig by sample, dig by scene…) that chain resources into a repeatable process.
- **Collections & techniques** — themed groupings and mixing theory writeups.
- **Built-in tools** — 9 client-side utilities, no network: BPM tapper, BPM transition calculator, half/double time, Camelot wheel, key converter, harmonic compatibility checker, set duration math, recording storage calculator, gig timeline generator.
- **My Toolbelt** — favorites kept in `localStorage`, no accounts.

## Layout

| Path | What lives there |
| --- | --- |
| `src/data/` | All content as typed TypeScript — resources, workflows, collections, categories, techniques, sections, tools. No CMS, no database. |
| `src/lib/` | Logic: `camelot.ts` (key wheel), `bpm.ts` (tempo/pitch/storage maths), `search.ts`, `filters.ts`, `favorites.ts`. |
| `src/app/` | Next.js App Router pages, including dynamic `[section]`, `resources/[slug]`, `workflows/[slug]`, `collections/[slug]`. |
| `src/components/` | UI, plus the interactive tool panels under `components/tools/`. |
| `scripts/` | `check.ts` (assertions over the maths), `linkcheck.sh` (HTTP-checks every resource URL). |

Stack: Next.js 16, React 19, Tailwind CSS 4, TypeScript.

## Scripts

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run check      # assert the Camelot / BPM maths still hold
npm run linkcheck  # curl every resource URL, report anything suspect
npm run lint
```

Adding a resource means editing `src/data/resources.ts` — the types enforce the rest.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

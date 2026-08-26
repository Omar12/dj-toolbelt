# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user is the author: a DJ using the site as a personal working reference. It is opened mid-task — while digging for the next record, while preparing tracks for a gig, while working out a key or tempo relationship, or while deciding how to publish a recorded set. Other DJs may use it, but the design target is the author's own workflow, not a general audience or a marketed product.

## Product Purpose

DJ Toolbelt maps how DJs discover, prepare, perform and share music. Every resource is filed under the job it does and the order it is used in, so the answer to "what do I do next" is a place in the map rather than a search. Success is being able to go from a question in the middle of a session ("where does the next record come from?", "will these two records work together?") to the right resource, workflow or calculation without leaving the site.

## Positioning

Three things together, none of which a plain DJ link directory could truthfully copy:

1. **Filed by job, in sequence** — resources sit under Discover → Prepare → Mix → Record → Publish → Learn → Tools, each section framed as one question, rather than an alphabetised category list.
2. **Workflows chain the resources** — step-by-step routes (dig by label, dig by sample, dig by scene) turn individual sites into a repeatable process; the resources are the parts, the workflow is the product.
3. **The calculators live next to the links** — Camelot wheel, key conversion, harmonic compatibility, BPM tapping and transition math, half/double time, set duration, recording storage, gig timeline — nine tools running in-page, so the reference is also the instrument.

## Operating Context

Used during real DJ work, not as a destination to browse: crate digging sessions, gig prep, and post-set publishing. Content is consumed in short interrupted visits, often alongside a DAW, DJ software (library/analysis tools), a store or streaming tab, and hardware. Favorites collected into "My Toolbelt" act as the user's own shortlist across those visits.

## Capabilities and Constraints

- Sections (Discover, Prepare, Mix, Record, Publish, Learn, Tools), each with a name, tagline and the question it answers.
- ~80 curated resources tagged with pricing, platforms, genres, skill level and formats, filterable in the resource explorer, with per-resource detail pages.
- Workflows, collections, crates, techniques and an inspiration deck as their own routes.
- Nine client-side tools: BPM tapper, BPM transition calculator, half/double time, Camelot wheel, key converter, harmonic compatibility checker, set duration math, recording storage calculator, gig timeline generator.
- **No backend and no accounts.** All content is typed TypeScript in `src/data/`; there is no CMS and no database. Favorites live in `localStorage`. The tools compute locally and make no network calls. Design must never imply sign-in, sync, sharing, or server-side state.
- Stack: Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript. Lucide is the only UI dependency.
- Correctness of the maths is checked by `npm run check`; resource URLs are checked by `npm run linkcheck`.

## Brand Commitments

- Name: **DJ Toolbelt**.
- **Dark-only interface is binding.** The record-shop palette in `src/app/globals.css` (near-black ground, layered surfaces, single orange signal colour, mono for numeric/technical text) is a deliberate commitment, not an unreviewed default. No light theme, no theme toggle.
- Voice as established in the existing copy: plain, direct, practical, framed as questions and jobs. No marketing register.

## Evidence on Hand

- Real content: the curated resource set, workflows, collections, techniques and tool implementations in `src/data/` and `src/components/tools/`.
- **No usage statistics, ratings, reviews, testimonials, user counts or press exist.** Never fabricate social proof of any kind.
- **No affiliation, sponsorship, endorsement or affiliate relationship with any listed site exists.** Curation is independent; never imply otherwise.
- No pricing, licensing, or deployment claims have been established.

## Product Principles

1. **The job comes before the tool.** Every entry earns its place by answering a question a DJ actually asks mid-work, in the order they ask it.
2. **Reference and instrument in one place.** If something can be computed in-page instead of linked out to, it should be.
3. **No accounts, no server, no lock-in.** Everything works offline-first and locally; the user's shortlist stays theirs.
4. **Honest curation.** Independent, unsponsored, no invented proof — the list's credibility is the product's credibility.
5. **Built for interruption.** Someone arrives mid-session with a specific question and should reach the answer fast.

## Accessibility & Inclusion

No product-specific standard was established beyond what the implementation already commits to: visible keyboard focus on all interactive elements, a skip-to-content link, and honouring `prefers-reduced-motion`. Dark-only means contrast on the near-black ground must be verified rather than assumed.

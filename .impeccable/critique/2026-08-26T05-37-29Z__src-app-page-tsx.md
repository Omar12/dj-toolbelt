---
target: critique (whole app, anchored on src/app/page.tsx)
total_score: 27
max_score: 40
na_heuristics:
p0_count: 1
p1_count: 4
timestamp: 2026-08-26T05-37-29Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a496a7c9dd2777ecc · B: a66c5382def4623a3)
Target: DJ Toolbelt web app, anchored on `src/app/page.tsx`. Mode: Operate.
Browser visualization: unavailable (no Playwright/Puppeteer, no browser MCP tool). Contrast figures are computed from token hexes, not sampled from a render.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live result count is right (`ResourceExplorer.tsx:169`), but no nav item ever marks the current page — no `aria-current`, no colour state (`SiteHeader.tsx:32-38`). |
| 2 | Match System / Real World | 4 | Camelot, half/double, blend seconds, booth feed, "2× crate" — the vocabulary is the user's. |
| 3 | User Control and Freedom | 2 | No undo, no per-tool reset except the tapper, no back-link out of a section page; only a nuclear "Clear N filters". |
| 4 | Consistency and Standards | 3 | Token discipline excellent; naming is not — nav "All resources" vs footer "Resources", nav "Discover" vs home "Discover Music"; emoji appear on exactly one grid. |
| 5 | Error Prevention | 2 | `min`/`max` advisory only. Empty Track A → `Number("") === 0` → tool prints "Straight blend · Beatmatch and blend normally" (`BpmTools.tsx:98-119`, `lib/bpm.ts:3`). |
| 6 | Recognition Rather Than Recall | 2 | ~50 identical 11px facet toggles, no counts, no evidence which yield results; Workflow facet prints raw de-dashed ids (`ResourceExplorer.tsx:82-85,139-150`). |
| 7 | Flexibility and Efficiency | 2 | `/` focuses search then dead-ends — no arrow traversal, no Enter-to-open (`SearchBar.tsx:31-34,63-66`). 24 sequential tab stops on the wheel. No tool state survives reload or deep-links with values. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained everywhere except the homepage: four equally-weighted card sections, 31 cards, no primary. |
| 9 | Error Recovery | 3 | Best copy in the app ("Not a key I recognise. Try 'F# min' or '4B'", `KeyTools.tsx:151`). Nothing covers out-of-range numbers. |
| 10 | Help and Documentation | 3 | Every tool shell carries a description; nothing explains *why* four neighbours are "safe", or what Open Key is. |
| **Total** | | **27/40** | **Competent, one tier below the system it is built on** |

No heuristic scored n/a.

## Design Specificity Verdict

**Authored, dragged down by its own front door.**

**LLM assessment (unanchored):** This is not a template. The three-tone stack with no shadows, zero radius by default, and a mono/sans split that carries semantics rather than decoration hold everywhere. Two components could not be lifted into any other product: `ChainDiagram` (`ui.tsx:63-83`) renders a workflow as a signal path in 20 dependency-free lines, and the Camelot wheel (`KeyTools.tsx:27-111`) draws harmonic safety as colour on a clock face. `.waveform` (`globals.css:42-49`) is a hand-built 1px-on-4px gradient, not a stock icon. The voice is right: "Learn two properly before adding a third", "Do not start here."

The seam is the homepage. `page.tsx:41-59` renders ten cards fronted by full-colour emoji (🔎 💿 🎚 🎛 📚 🎙 📡 🎥 🚀 📖, `data/actions.ts:3-12`) — the "what do you want to do?" tile wall from every SaaS onboarding, first thing below the hero, and a direct violation of the system's own One Sticker Rule (DESIGN.md: two things orange for two reasons means one is wrong; ten multi-hue glyphs is not one voice).

**Deterministic scan:** `detect.mjs --json src/app src/components` → exit 2, **5 findings, all advisory/quality**:
- `design-system-radius` ×1 — `globals.css:38` (`border-radius: 2px`)
- `design-system-color` ×1 — `globals.css:48` (`#000`)
- `design-system-font-size` ×3 — `SearchBar.tsx:69`, `SearchBar.tsx:93`, `ui.tsx:70` (`text-[10px]`)

**Where the detector and the review agree:** nowhere and everywhere — the detector found almost nothing, which corroborates the review's core judgment. The visual system is genuinely clean: zero non-overlay shadows, zero radii above 4px, zero off-palette hex, zero motion beyond `transition-colors`, every icon-only control named, every field labelled. The problems in this product are not visual drift; they are structural and behavioural.

**False positives (4 of 5 detector findings):** `border-radius: 2px` is documented verbatim in DESIGN.md § Shapes but absent from the `rounded:` token map the detector reads — a documentation gap, not drift. Both `#000` at `globals.css:48` are stops inside a `mask-image` gradient, i.e. alpha channel, nothing painted black. The three `text-[10px]` sites are real drift but within the label register — the type ramp simply has no step below 0.6875rem.

**What the detector caught that the review missed / vice versa** — B's mechanical pass surfaced three things A did not:
- **Missing `tabular-nums` on 8 in-place readouts**, in violation of the system's own Tabular Rule: `KeyTools.tsx:88,135,139,143,147,193,200`, `PlanningTools.tsx:161`, plus `ResourceExplorer.tsx:163,169`. The largest mono readout in the app is one of them.
- **Non-text contrast fails WCAG 1.4.11 (3:1) across the board**: hairline `#26262d` on `#101013` = **1.26:1**; hover border `muted/60` = 2.78:1; **the focus border `signal/60` = 2.86:1** — and on inputs that border *is* the only focus indicator (`outline-none` at `SearchBar.tsx:67`, `ResourceExplorer.tsx:115`, and the shared `field` constant in all three tool files).
- **Three h1 → h3 heading skips**: `resources/page.tsx:22`, `toolbelt/page.tsx:13`, `collections/[slug]/page.tsx:31`.
- Six routes quietly use `max-w-5xl` against the stated `max-w-6xl` Gutter Constant (`tools`, `crates`, `resources/[slug]`, `workflows/[slug]`, `inspiration`, `transitions`).

Text contrast is fine and was verified, not assumed: `#8b8b96` on `#101013` = 5.64:1, Cue Orange on ground = 6.14:1, Sleeve White = 16.26:1. The dark-only commitment holds.

**Visual overlays:** not available. No browser automation exists in this session, so no dev server was started and no injection attempted. Not verified as a result: focus-ring rendering on the SVG `<circle>` Camelot nodes (`outline` on SVG geometry is unreliable across engines — this may be invisible on the system's signature component), actual Cue Orange screen coverage against the 10% rule, and responsive overflow of the two-row sticky header.

## Overall Impression

The design system is better than the product built on it. Someone made real, defensible commitments — flat by rule, square by default, mono means machine — and held them with unusual discipline across ~30 files. Then the homepage sells a directory, and the nine calculators that PRODUCT.md names as the third pillar of positioning are not on it.

The single biggest opportunity: **the front page is a map when it should be an instrument.** Success is defined as answering a mid-session question without leaving the site. The current homepage answers "where do I browse?" — a question nobody has with one hand on a controller.

## What's Working

1. **`ChainDiagram` (`ui.tsx:63-83`)** — a wrapping `<ol>` of mono nodes joined by an orange `›`, `aria-label="Workflow chain"`, with a `dense` variant that survives inside a card. The product's core idea (sequence, not category) rendered as a picture, with no dependency. `TRACK › LABEL › DJ` tells you what a workflow *is* before you read a word.
2. **Camelot wheel accessibility scaffolding (`KeyTools.tsx:55-66`)** — every node carries `role="button"`, `tabIndex`, `aria-label`, `aria-pressed`, and Enter/Space handling. Hand-rolled SVG interaction is exactly where accessibility normally gets skipped.
3. **Honest empty and constraint copy (`MyToolbelt.tsx:13-22`, `ResourceCard.tsx:45-47`, `toolbelt/page.tsx:14-17`, `tools/page.tsx:31`)** — every empty state names the next action instead of apologising, and the localStorage limitation is stated as fact in three places rather than hidden. The "no invented proof" principle is implemented, not just declared.

## Priority Issues

### [P0] The nine tools — the stated differentiator — are absent from the homepage
- **Why it matters:** PRODUCT.md defines success as reaching an answer mid-session and names the in-page calculators as the third positioning pillar. `page.tsx:19-101` has four sections (actions, digging workflows, featured resources, collections) and not one link to a calculator. The hero's "9 built-in tools" (`page.tsx:28-30`) is inert text — and hardcoded, while `resources.length` beside it is computed. The only route to the Camelot wheel from home is the 7th item in a horizontally-scrolling nav strip (`SiteHeader.tsx:29-39`), off-screen on a phone.
- **Fix:** Insert a section directly beneath the hero, above the action grid — mono eyebrow "Work it out now", three or four square links to `/tools#camelot-wheel`, `#bpm-transition`, `#bpm-tapper`, `#set-planner-math`, each with the tool name in mono and one line of what it answers. Make "9 built-in tools" a link, derived from `builtInTools.length`.
- **Suggested command:** `/impeccable shape`

### [P1] Ten emoji tiles break the system's governing colour rule and 2.5× the choice budget
- **Why it matters:** `page.tsx:41-59` renders ten equal-weight cards, each led by a full-colour emoji at `text-xl`. It violates the One Sticker Rule and the "don't drift toward SaaS-dashboard chrome" ban simultaneously — on the largest element of the front door. Three entries ("Discover Music", "Improve My Mixing", "Learn DJing") duplicate nav destinations under different names.
- **Fix:** Drop the emoji; the mono eyebrow already exists as the system's card-labelling device (`WorkflowCard.tsx:9`). Cut to the five genuinely distinct verbs (Dig, Prepare, Mix, Record, Publish); move the rest below a "More" heading or into the section pages they duplicate. If a glyph is wanted, one Lucide icon in Dust Grey — Lucide is already the only UI dependency.
- **Suggested command:** `/impeccable distill`

### [P1] The BPM calculator gives a confident wrong verdict on empty input
- **Why it matters:** `BpmTools.tsx:98-119` binds `onChange={(e) => setA(Number(e.target.value))}`. Clearing the field yields `0`; `pitchPercent` guards with `if (!from) return 0` (`lib/bpm.ts:3`); `transitionAdvice` therefore returns "Straight blend · Within pitch-fader range. Beatmatch and blend normally." and renders it in Cue Orange. Same failure in `HalfDouble` (`BpmTools.tsx:156`) and every numeric input in `PlanningTools.tsx`. Orange means "live, safe, actionable" throughout the system — spending it on a computation with no input is the opposite of the honest-instrument posture the rest of the app maintains, at the one moment a user acts on it in real time.
- **Fix:** Hold inputs as strings; when empty or outside `min`/`max`, render `—` for every readout and replace the verdict with the existing recognise-failure pattern ("Enter a tempo between 40 and 220"). One guard in a shared `numField` helper covers all seven numeric inputs across both files.
- **Suggested command:** `/impeccable harden`

### [P1] Explorer filter state is unshareable and does not survive back-navigation
- **Why it matters:** `ResourceExplorer.tsx:66-71` holds query and five facet arrays in local `useState`. `resources/page.tsx:15-16` reads `?category=` on first render and never writes back. Open a result, press back, all 82 resources return unfiltered. The explorer's entire value is narrowing 82 to 5, and that work is destroyed by the one action a user is guaranteed to take. It also silently half-breaks `CategoryCard` (`CategoryCard.tsx:7`), which builds `?category=` URLs the explorer can receive but never regenerate.
- **Fix:** Mirror the six state values to `searchParams` via `router.replace(..., { scroll: false })` and hydrate on mount. The read path exists; only the write path is missing. Makes a filtered view bookmarkable with no backend — exactly the constraint the product operates under.
- **Suggested command:** `/impeccable harden`

### [P1] Focus indicators fail WCAG 1.4.11, including on the signature component
- **Why it matters:** On every input, `outline-none` is replaced by a border shift to `signal/60` — computed **2.86:1** against `#101013`, below the 3:1 non-text threshold. The hairline it replaces is 1.26:1, so the *change* is also weak. Separately, the Camelot nodes (`KeyTools.tsx:55-67`) are SVG `<circle>` elements relying on the global CSS `outline` (`globals.css:35-39`), where outline rendering on SVG geometry is unreliable across engines — the focus ring may be invisible on the component DESIGN.md calls its clearest statement. PRODUCT.md commits to visible keyboard focus on all interactive elements.
- **Fix:** Raise the focus border to full `--signal` (`#ff5b2e`, 6.14:1) rather than 60% alpha, and give the wheel nodes an explicit focused `stroke`/`stroke-width` state instead of relying on `outline` on SVG.
- **Suggested command:** `/impeccable audit`

### [P2] Filter sidebar dumps ~50 undifferentiated toggles with no counts and no collapse
- **Why it matters:** `ResourceExplorer.tsx:119-150` renders five `FacetGroup`s, all expanded, all `text-[11px]` mono, visually identical whether they hold 3 options or 25. No option shows how many resources it would yield, so zero-result combinations are only discoverable by producing one. This component renders on `/resources` *and* at the bottom of all six section pages (`[section]/page.tsx:118`) — the most-rendered complex surface in the app.
- **Fix:** Append counts to every option (`facetValues` already walks the same array), collapse Genre / Platform / Workflow behind native `<details>` summaries ("Genre (14) +"), leave Price and Category open, and render zero-count options disabled at hairline weight so the shape of the collection stays legible.
- **Suggested command:** `/impeccable layout`

### [P3] System-rule drift and small-target defects
- **Tabular Rule violated on 8+ in-place readouts** — `KeyTools.tsx:88,135,139,143,147,193,200`, `PlanningTools.tsx:161`, `ResourceExplorer.tsx:163,169`. Digits dance on the largest mono readout in the app.
- **Gutter Constant violated on six routes** using `max-w-5xl`: `tools`, `crates`, `resources/[slug]`, `workflows/[slug]`, `inspiration`, `transitions`.
- **Three h1 → h3 heading skips**: `resources/page.tsx:22`, `toolbelt/page.tsx:13`, `collections/[slug]/page.tsx:31`.
- **`FavoriteButton.tsx:16`** — `p-1.5` around a 14px icon is a ~26px hit target, far under 44px, and it sits inside a whole-card link overlay (`ResourceCard.tsx:18-24`): a near-miss navigates away instead of saving.
- **`page.tsx:63`** reads "Five ways to dig" while `diggingRoutes` (`page.tsx:10-17`) holds six ids and six cards render.
- **No `aria-current` or visual current-page state** on any nav item (`SiteHeader.tsx:32-38`).

## Persona Red Flags

**The DJ mid-session, one hand on a controller** (the stated design target)
- The homepage cannot answer their question: ten browse-tiles, zero calculators (`page.tsx:41-59`). Reaching the Camelot wheel means finding the 7th item in a horizontally-scrolling `text-xs` mono strip — one-handed, in a dark booth.
- The header eats the viewport: on narrow screens the search bar drops to its own full-width row (`SiteHeader.tsx:15`, `order-3`) *plus* the nav row, roughly 140px of sticky chrome on a 667px phone before any content.
- Their work evaporates. Every tool is `useState`-only (`BpmTools.tsx:31,82,146`; `PlanningTools.tsx:11-13,61-63,125-126`). A reload or an app-switch wipes the tempo they just tapped, and `/tools#bpm-transition` restores the anchor, never the numbers.
- The tap pad is right (a `py-10` slab, `BpmTools.tsx:50`); the favorite star is wrong (~26px inside a card-wide link overlay).
- The BPM verdict lies on an empty field — the worst possible failure for this persona, because they act on it live.

**Keyboard-only / screen-reader user**
- `/` focuses search and abandons them: `role="combobox"` with `aria-expanded`/`aria-controls` is declared (`SearchBar.tsx:63-66`) but there is no `aria-activedescendant`, no Arrow handling, no Enter-to-open. The ARIA contract promises listbox navigation the implementation does not provide.
- `role="option"` is hardcoded `aria-selected={false}` on every result (`SearchBar.tsx:87`) — a listbox where nothing is ever selectable.
- The wheel is 24 sequential tab stops with no arrow traversal, and its focus ring may not render at all (SVG `outline`).
- Nothing announces the current page — no `aria-current`.

**The new DJ (first visit, doesn't know Camelot)**
- The wheel opens pre-selected on `8A` (`KeyTools.tsx:28`) with no explanation of what "safe neighbours" means; the legend only explains ring geometry (`:81-83`).
- `/tools` presents nine peer instruments behind nine identical anchor chips (`tools/page.tsx:33-43`). Nothing says BPM Tapper is the entry point and Storage Calculator is a post-session concern.
- "Open Key" appears as a readout label (`KeyTools.tsx:142-144`) and is defined nowhere on the site.

**The author on their third visit** (the actual primary user)
- No path back to the tool or filter used last — no recents, no persistence, no URL state.
- My Toolbelt is a flat favorites list with no ordering, notes, or grouping (`MyToolbelt.tsx:26` renders a plain `ResourceGrid`) — after 20 saves it is the same undifferentiated wall the explorer was.
- Crates, Inspiration and the Transition Toolkit are unreachable from the homepage and absent from primary nav; they surface only via the `extras` map on two section pages and the footer.

## Cognitive Load: 5 of 8 fail — high, critical

Failing: single focus (home = four peer sections, 31 cards; `/resources` = 50 toggles beside 82 cards), visual hierarchy (home actions, workflow cards, collections and resource cards are the same hairline rectangle at the same weight — nothing signals the entry point), minimal choices, working memory (filters die on back-navigation), progressive disclosure (all five facet groups and all nine tools render fully expanded).

Passing: chunking, grouping/proximity, one-thing-at-a-time.

Decision points above the ≤4 budget: `page.tsx:41-59` (10 action cards), `page.tsx:66-70` (6 workflows), `page.tsx:77` (9 featured), `page.tsx:84-100` (6 collections), `SiteHeader.tsx:29-64` (10 nav links), `tools/page.tsx:33-43` (9 identical anchor chips), `ResourceExplorer.tsx:119-150` (~50 toggles), `KeyTools.tsx:43-79` (24 nodes — defensible, the ring geometry chunks it).

## Emotional Journey

**Peak:** the Camelot wheel. Click 8A and four neighbours light dim-orange while the selected node goes solid with black text — an abstract music-theory relation becomes a glanceable physical fact. This is where the product justifies its own thesis.

**Valleys:** (1) `/resources` first load — 82 cards, ~50 grey toggles, no counts, no suggested start; the "I'll just Google it" exit. (2) The homepage below the hero — a generic app launcher after a hero that promised "not a directory." (3) Section pages — four monotone scroll-lengths with no landing point.

**Reassurance at high-stakes moments is genuinely good**, and it is where the product's honesty shows: the localStorage caveat is named before you can hit it, "Nothing is uploaded, nothing is stored", no fabricated counts anywhere, hero stats computed from real data. The one betrayal is the BPM verdict on an empty field — every other reassurance is earned; that one is false.

**End: flat.** No page ever closes on "here's the next move" the way the copy elsewhere does.

## Minor Observations

- `page.tsx:29` hardcodes `9 built-in tools` while its siblings are computed — drift the moment a tenth tool ships.
- `scroll-mt-32` (128px) on `ToolShell` and technique articles is a guess at a sticky header that is two rows, sometimes three; deep links may land under it on small screens.
- No `color-scheme: dark` and no `theme-color` meta — native controls (`<select>` at `PlanningTools.tsx:78`, `<input type="time">` at `:145`, the range at `KeyTools.tsx:156`) will render with light-mode chrome in some browsers. That is the one place the binding dark commitment can visibly leak.
- `Pill`'s `outline` tone (`ui.tsx:14`) has no caller — dead variant.
- `ExternalLink` (`ResourceCard.tsx:59-70`) gives no "opens in a new tab" affordance beyond an `aria-hidden` glyph.
- The footer's four links are a different, smaller set than the nav's ten, with a different name for the same destination.
- `useShuffled` (`InspirationDeck.tsx:12-14`) deterministically alternates on a two-item array; "Shuffle" overstates it.

## Questions to Consider

1. If success is "answer a mid-session question without leaving the site," why does the homepage sell the map instead of handing over the instrument? What would the front page look like if the Camelot wheel were *on* it, live, above the fold?
2. The three most-used tools are presumably the same three every time. What is the argument against the homepage being those three, and everything else being nav?
3. `/resources` with 82 items and 50 filters is a directory — the exact thing the hero copy says this is not. Is the explorer a feature, or an admission that the "filed by job" thesis doesn't reach far enough?
4. The system forbids a second accent because severity is carried by Orange / White / Grey — and `transitionAdvice` uses that ladder (`BpmTools.tsx:86-91`). So why does "Cut, do not blend," the most consequential verdict the product issues, render in the *quietest* colour in the system?
5. Ten emoji on the front door, in a system whose north star is "nothing here performs." Which one is actually true?
6. Favorites are a starred bag. The product's whole idea is sequence. What would My Toolbelt be if it were an ordered chain — a personal workflow — instead of a list?

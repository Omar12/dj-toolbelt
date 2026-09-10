---
name: DJ Toolbelt
description: A dark record-shop catalog for DJs — hairline crates, mono legends, one cue-orange signal.
colors:
  ink-black: "#08080a"
  crate-surface: "#101013"
  crate-surface-raised: "#17171c"
  hairline: "#26262d"
  sleeve-white: "#ededf0"
  dust-grey: "#8b8b96"
  cue-orange: "#ff5b2e"
  cue-orange-dim: "#7a2a16"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
  readout:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  none: "0"
  focus: "2px"
  sm: "4px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  section: "40px"
  hero: "48px"
components:
  button-primary:
    backgroundColor: "{colors.cue-orange-dim}"
    textColor: "{colors.cue-orange}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.cue-orange}"
    textColor: "{colors.ink-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dust-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  button-ghost-hover:
    textColor: "{colors.cue-orange}"
  chip:
    backgroundColor: "{colors.crate-surface-raised}"
    textColor: "{colors.dust-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  chip-signal:
    backgroundColor: "{colors.cue-orange-dim}"
    textColor: "{colors.cue-orange}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.crate-surface}"
    textColor: "{colors.sleeve-white}"
    rounded: "{rounded.none}"
    padding: "16px"
  input-field:
    backgroundColor: "{colors.crate-surface-raised}"
    textColor: "{colors.sleeve-white}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
---

# Design System: DJ Toolbelt

## Overview

**Creative North Star: "The Record Shop Backroom"**

The interface is the room behind the counter: lights low, crates in rows, hand-written dividers, and one orange sticker on the records worth pulling. Nothing here performs. The content — a resource, a workflow chain, a BPM readout — sits on a near-black ground inside a hairline rectangle, and the eye moves by reading, not by following decoration. Density is high and deliberate: this is a catalog someone works through mid-session, not a page someone browses.

The material language is flat and physical at once. Surfaces are separated by tone (`#08080a` ground → `#101013` panel → `#17171c` inset) and by a single 1px hairline (`#26262d`), never by shadow. Type does the structural work: Geist Sans carries the reading, Geist Mono carries every technical utterance — eyebrows, tags, key codes, BPM values, nav labels, keyboard hints. The split is not stylistic. Mono means *this is data or a control*; sans means *this is a sentence*.

Controls feel tactile and confident: square corners, firm borders, states that shift colour decisively rather than fading. Cue Orange is the only chromatic voice in the system and it is rationed. The confirmed anti-references are the SaaS dashboard (rounded cards, gradient hero, pastel marketing chrome), the neon EDM poster (purple-cyan gradients, glow), skeuomorphic gear (brushed metal, photoreal knobs, faux LCD), and vinyl-nostalgia kitsch (torn paper, dust textures, retro badges).

**Key Characteristics:**
- Dark-only. No light theme, no theme toggle — the room has one lighting condition.
- Square by default; radius is an exception measured in a single 4px step.
- Flat by rule: tonal layers and hairlines instead of shadows.
- Monospace as the voice of every number, tag, label and control.
- One accent colour, used sparingly enough that it always means something.

## Colors

A near-black room with four greys of separation and exactly one chromatic voice.

### Primary
- **Cue Orange** (`#ff5b2e`): named after the cue button on every DJ mixer. Marks what is live, selected, free, featured, or actionable — eyebrow labels, selected filter chips, external-link and tap-target buttons, hover on links and headings, and the focus ring. Never used as a background wash, never as decoration. On the Camelot wheel it is not an override but a position: the wheel's hue ramp is anchored so key 8 resolves to this colour, which is why the wheel reads as this product rather than a spectrum.
- **Cue Orange Dim** (`#7a2a16`): the accent held at rest. Used at 30–40% alpha as the fill behind accent buttons and selected chips, so orange can indicate without shouting. Its lightness and chroma (`oklch(0.36 0.11 …)`) are also the template for the Camelot wheel's compatible-key tier, applied at each key's own hue rather than at orange.

### Neutral
- **Ink Black** (`#08080a`): the page ground. The room itself; everything else is placed on it.
- **Crate Surface** (`#101013`): the standard panel — resource cards, workflow cards, tool shells, the search dropdown. One step out of the ground.
- **Crate Surface Raised** (`#17171c`): inset and inner elements — input fields, chips, chain-diagram nodes, the favorite button, search-result hover.
- **Hairline** (`#26262d`): every border and divider in the system. The primary structural device.
- **Sleeve White** (`#ededf0`): body and heading text at full strength.
- **Dust Grey** (`#8b8b96`): descriptions, secondary readouts, nav links at rest, counts, and placeholder text. Roughly half the text on any screen.

### Named Rules
**The One Sticker Rule.** Cue Orange covers well under 10% of any screen. If two things on a screen are orange for two different reasons, one of them is wrong. The Camelot wheel is the one exemption, and it is exempt because hue there is data, not emphasis — see The Key Hue Rule.

**The Key Hue Rule.** Chromatic hue outside Cue Orange exists in exactly one place: the Camelot wheel, where it encodes the key number. The mapping is fixed — `hue = 35° + (n − 8) × 30°` — so the twelve wheel positions become twelve evenly spaced hues and key 8 lands on Cue Orange. Three axes carry three meanings and nothing else: hue is the number, lightness is the ring (major sits one step brighter than minor), chroma is the state (`0.03` at rest, `0.10` compatible, `0.19` selected). Hue is always redundant with the printed Camelot code, never the sole carrier of meaning. A second surface wanting key colour extends this mapping; it does not invent one.

**The Hairline Rule.** Separation is a 1px `#26262d` border or a tonal step — never a shadow, never a gradient, never a coloured divider.

**The Black Text Exception.** Text on any fully lit chromatic fill is pure black (`#000`), not Sleeve White. This appears only on button hover and on the selected Camelot key, whichever hue that key carries.

## Typography

**Display / Body Font:** Geist (with `system-ui, sans-serif`)
**Label / Data Font:** Geist Mono (with `ui-monospace, monospace`)

**Character:** A neutral grotesque doing the reading and a monospace doing the instrument work. The pairing reads as a well-set catalog page rather than a product site: sentences are quiet and tightly tracked, while every number, tag and control label snaps into uppercase mono with wide letter-spacing, like legends silk-screened onto a faceplate.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 6vw, 3.75rem)`, line-height 1.05, tracking -0.025em): one per page, the page's question — "What are you trying to do?". Set to a `max-w-3xl` measure so it breaks into two or three lines.
- **Headline** (600, 1.5rem → 1.875rem, tracking -0.025em): section titles inside `SectionHeading`, always sitting on a hairline underline with an optional mono eyebrow above.
- **Title** (600, 1rem–1.125rem, tracking -0.025em): card names — resources, workflows, collections, tool shells. Turns Cue Orange on card hover.
- **Body** (400, 0.875rem, line-height 1.625): descriptions and prose, in Dust Grey inside cards and Sleeve White in running text. The page lede is the one step up (1rem → 1.125rem).
- **Label** (400 mono, 0.6875rem, uppercase, letter-spacing 0.2em; 0.25em on the home eyebrow): eyebrows, chips, field labels, nav items, counts, keyboard hints. The system's connective tissue.
- **Readout** (400 mono, 1.875rem, `tabular-nums`): computed values in the tools — BPM, the selected key. The only large mono in the system, and the reason `tabular-nums` is non-negotiable.

### Named Rules
**The Mono Means Machine Rule.** If it is a number, a tag, a key code, a control label, or a piece of navigation, it is Geist Mono, uppercase, wide-tracked. If it is a sentence, it is Geist Sans, sentence case. Nothing is both.

**The Tabular Rule.** Any number that changes in place — BPM, intervals, tap counts, durations, storage — carries `tabular-nums` so digits do not dance while the value updates.

## Layout

One centred column, `max-w-6xl` (1152px), with `px-4` (16px) gutters that hold at every breakpoint. Vertical rhythm is section-based: the hero runs `py-12` → `sm:py-16` (48/64px) and closes on a hairline; every subsequent section runs `py-10` (40px) with its own `SectionHeading` rule.

Content grids are uniformly `gap-3` (12px) and step `1 → sm:2 → lg:3` columns; chips and inline metadata sit at `gap-1.5` (6px). Card padding is `p-4` (16px) for resources and `p-5` (20px) for the denser workflow, collection and tool panels. Two page types use a sidebar split instead: the resource explorer (`lg:[16rem_1fr]`) and the Camelot wheel (`lg:[20rem_1fr]`); both stack to a single column below `lg`.

The header is sticky with `bg-background/95` and a backdrop blur, carrying the wordmark, search and My Toolbelt on the first row and a horizontally scrollable mono nav on the second. On small screens the search bar drops to its own full-width row (`order-3`) rather than shrinking.

**The Gutter Constant Rule.** Horizontal padding is always 16px and the column never exceeds 1152px. Wide screens get more whitespace, never a wider measure.

## Elevation & Depth

The system is flat by rule. Depth is expressed by a three-step tonal stack — ground `#08080a`, panel `#101013`, inset `#17171c` — plus a single 1px hairline. There are no elevation tokens, no ambient shadows, and no gradients anywhere in the interface.

The one exception is genuine floating: the search results dropdown, which leaves the document flow and uses `shadow-xl` to sit above content. That is the entire shadow vocabulary.

### Named Rules
**The No Shadow Rule.** Surfaces never lift. If something needs to feel separate, move it a tonal step or give it a hairline. Shadows are permitted only on elements that overlay the page (dropdowns, popovers) — never on cards, buttons, headers or inputs.

**The Hover Is Colour, Not Height Rule.** Hover changes border colour, text colour, or background tone. It never translates, scales, or casts.

## Shapes

Square is the default and the point: cards, buttons, panels, inputs, nav items and chain nodes all have zero radius, so the interface reads as filed cards and faceplate cut-outs rather than web widgets. Radius exists in exactly one 4px step (`rounded-sm`), reserved for small badge-like objects that would look brittle squared off: metadata pills and the favorite-star button. The focus ring uses a 2px radius so it traces square corners cleanly.

Borders carry the form language. Every container is defined by a 1px hairline, and the empty state inverts it to `border-dashed` — the only dashed stroke in the system — to read as an unfilled slot. The recurring silhouettes are the hairline rectangle, the mono chain node (`TRACK › LABEL › DJ`), the two concentric Camelot rings, and the `.waveform` strip: a repeating 1px-on-4px linear gradient masked to fade at both ends, used as a divider beside the wordmark.

**The Square Default Rule.** New components ship with zero radius. Reaching for a radius above 4px means the component belongs to a different system.

## Components

### Buttons
- **Shape:** square (0 radius), 1px border, mono uppercase label with `tracking-wider`.
- **Primary / accent** (external links, the BPM tap pad): `#7a2a16` at 30% alpha behind Cue Orange text with a `#ff5b2e` border at 60% alpha; padding `8px 12px` (`px-3 py-2`), or a `py-10` slab for the tap target.
- **Hover / focus:** background flips to solid Cue Orange with pure black text via `transition-colors`. Focus shows the global 2px Cue Orange outline at 2px offset.
- **Ghost / secondary** (Reset, Clear filters): hairline border, Dust Grey mono label, hover shifts text to Cue Orange and border to `#ff5b2e` at 60% alpha. No fill at any state.

### Chips
- **Style:** `Pill` — 4px radius, 1px border, mono 11px uppercase `tracking-wider`, padding `2px 8px`. Default tone is raised surface + Dust Grey + hairline; the `signal` tone is dim orange at 40% alpha + Cue Orange text + orange border at 40%; `outline` is transparent + hairline.
- **State:** filter chips in the explorer are square (not pilled) buttons carrying `aria-pressed`; selected reads solid — `border-signal`, `bg-signal-dim/40`, Cue Orange text — unselected is hairline + Dust Grey with a border-brightening hover.
- **Usage:** pricing, tags, skill level, step counts. Free and Featured are the two chips allowed the signal tone.

### Cards / Containers
- **Corner style:** square (0 radius).
- **Background:** Crate Surface (`#101013`) on Ink Black; internal insets use Crate Surface Raised.
- **Shadow strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline; hover brightens it to Dust Grey at 60% alpha, and accent-linked cards (home actions, collections) brighten to Cue Orange at 60% instead.
- **Internal padding:** 16px for resource cards, 20px for workflow, collection and tool panels.
- **Behavior:** whole-card link via an `after:absolute after:inset-0` overlay on the title anchor, with interactive children (the favorite star) lifted to `relative z-10`. Card titles turn Cue Orange on hover.
- **Empty state:** dashed hairline, centred Dust Grey body text, 32px padding, and copy that names the next action ("Loosen one and try again").

### Inputs / Fields
- **Style:** square, 1px hairline, Crate Surface Raised fill (Crate Surface in the search bar and explorer filter), padding `8px 12px`, mono text in tool fields and sans in search.
- **Focus:** `outline: none` on the input, with the wrapper or field border shifting to Cue Orange at 60% — the border *is* the focus indicator. Placeholder text is Dust Grey.
- **Labels:** always the mono 11px uppercase label style above the field, never a floating or placeholder-as-label pattern.

### Navigation
- **Style:** two rows in a sticky translucent header. Section links are mono `text-xs` uppercase `tracking-wider` in Dust Grey, hovering to Sleeve White; the row scrolls horizontally (`overflow-x-auto`) on narrow screens rather than collapsing into a menu.
- **Wordmark:** "DJ Toolbelt" in 1.125rem semibold, followed by a 40×12px `.waveform` strip that hides below `sm`.
- **Footer:** hairline top rule, a plain-language description of what the product is, and a mono uppercase link row hovering to Cue Orange.

### Camelot Wheel (signature component)
Two concentric rings drawn in SVG on hairline circles: major keys (B) at r=130, minor (A) at r=84, 12 at the top and running clockwise like a clock face. Each key is a 20px circle whose colour is computed, not assigned — hue from the key number per The Key Hue Rule, lightness from the ring, chroma from the state:

- **Rest:** `oklch(0.21 0.03 H)` minor / `oklch(0.25 0.03 H)` major, stroke `oklch(0.34 0.045 H)`, Sleeve White label. Twenty-four barely-tinted darks that read as a dusty spectrum at low volume, not a rainbow.
- **Compatible** (the four safe moves): `oklch(0.33 0.10 H)` minor / `oklch(0.38 0.10 H)` major, stroke `oklch(0.64 0.16 H)`, Sleeve White label.
- **Selected:** `oklch(0.70 0.19 H)` with a `oklch(0.82 0.14 H)` stroke at 2px and a black mono label.

Selecting a key lights it and its four compatible neighbours and leaves the other nineteen dark, so the answer to "what mixes with this" is the only lit thing on the ring. Hover thickens the stroke to 3px — form, not colour, because every node already owns a colour. Fills and strokes carry `transition-[fill,stroke]`; nothing moves. Every node is a keyboard-reachable `role="button"` with `aria-pressed`, and the Camelot code sits on every circle so hue is never the only code. Eight of the twelve selected hues exceed sRGB at that chroma; browser gamut mapping handles them, preserving hue and lightness, and wide-gamut displays get the full colour. Contrast holds across all twenty-four keys in every state: `7.2:1` worst case for the black label on a selected fill, `≥7.6:1` for Sleeve White on a compatible fill.

It is the clearest statement of the system: data as instrument, colour only where it carries meaning.

### Chain Diagram (signature component)
A wrapping ordered list of mono uppercase nodes on Crate Surface Raised separated by a Cue Orange `›`. It renders a workflow as a signal path (`TRACK › LABEL › DJ`) and is the one place the product's sequencing idea becomes a picture.

## Do's and Don'ts

### Do:
- **Do** build new surfaces from the three-tone stack — `#08080a` ground, `#101013` panel, `#17171c` inset — plus 1px `#26262d` hairlines.
- **Do** set every number, tag, control label and nav item in Geist Mono, uppercase, `tracking-[0.2em]` at 11px.
- **Do** give changing numeric readouts `tabular-nums`.
- **Do** express hover as a colour shift on border or text, with `transition-colors`.
- **Do** use the wrapper-border focus shift on inputs and rely on the global 2px Cue Orange `:focus-visible` outline elsewhere — never remove a focus indicator.
- **Do** keep the column at `max-w-6xl` with 16px gutters and 40px section rhythm.
- **Do** pair a mono eyebrow with every section headline when the section answers a question.
- **Do** derive key colour from The Key Hue Rule's mapping when a surface needs it, and keep the Camelot code visible so hue stays redundant.

### Don't:
- **Don't** add a light theme, a theme toggle, or any surface lighter than `#17171c`.
- **Don't** cast a shadow on a card, button, header or input; only true overlays may have one.
- **Don't** use a corner radius above 4px, and default to 0.
- **Don't** introduce a second accent colour, a gradient, or a status palette of greens and reds — severity is already carried by Cue Orange / Sleeve White / Dust Grey. Chromatic hue is licensed only where it encodes data, and today that is the Camelot wheel alone.
- **Don't** let Cue Orange exceed roughly 10% of a screen or appear twice for two different meanings.
- **Don't** drift toward SaaS-dashboard chrome, neon EDM gradients, skeuomorphic gear textures, or vinyl-nostalgia kitsch.
- **Don't** animate beyond colour transitions; `prefers-reduced-motion` is honoured globally and there is nothing decorative to reduce.

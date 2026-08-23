export type CamelotCode = `${number}${"A" | "B"}`

/** Camelot wheel: index 0..11 => number 1..12. A = minor, B = major. */
export const MINOR_KEYS = [
  "Ab min", "Eb min", "Bb min", "F min", "C min", "G min",
  "D min", "A min", "E min", "B min", "F# min", "Db min",
]

export const MAJOR_KEYS = [
  "B maj", "F# maj", "Db maj", "Ab maj", "Eb maj", "Bb maj",
  "F maj", "C maj", "G maj", "D maj", "A maj", "E maj",
]

export interface KeyInfo {
  code: CamelotCode
  /** Standard musical name, e.g. "A min". */
  name: string
  /** Open Key notation, e.g. "1m" — used by some analysis tools. */
  openKey: string
  number: number
  letter: "A" | "B"
}

export const allKeys: KeyInfo[] = Array.from({ length: 12 }, (_, i) => i).flatMap((i) => {
  const n = i + 1
  return [
    {
      code: `${n}A` as CamelotCode,
      name: MINOR_KEYS[i],
      openKey: `${((n + 4) % 12) + 1}m`,
      number: n,
      letter: "A" as const,
    },
    {
      code: `${n}B` as CamelotCode,
      name: MAJOR_KEYS[i],
      openKey: `${((n + 4) % 12) + 1}d`,
      number: n,
      letter: "B" as const,
    },
  ]
})

export const keyByCode = new Map(allKeys.map((k) => [k.code, k]))

const wrap = (n: number) => ((n - 1 + 12) % 12) + 1

export interface Compatibility {
  code: CamelotCode
  relation: string
  note: string
}

/** The four standard moves, plus two riskier energy moves. */
export function compatibleKeys(code: CamelotCode): Compatibility[] {
  const key = keyByCode.get(code)
  if (!key) return []
  const { number: n, letter } = key
  const other = letter === "A" ? "B" : "A"
  return [
    { code: `${n}${letter}` as CamelotCode, relation: "Same key", note: "Identical key. Layer freely." },
    { code: `${wrap(n + 1)}${letter}` as CamelotCode, relation: "+1 · energy up", note: "One step clockwise. Lifts the mix." },
    { code: `${wrap(n - 1)}${letter}` as CamelotCode, relation: "-1 · energy down", note: "One step anticlockwise. Softens the mix." },
    { code: `${n}${other}` as CamelotCode, relation: letter === "A" ? "Relative major" : "Relative minor", note: "Same number, other letter. Changes mood, keeps the notes." },
    { code: `${wrap(n + 7)}${letter}` as CamelotCode, relation: "+7 · energy boost", note: "A semitone up in practice. Big lift, use once a set." },
    { code: `${wrap(n + 3)}${other}` as CamelotCode, relation: "Diagonal", note: "Works often, not always. Test it before the gig." },
  ]
}

export function isCompatible(a: CamelotCode, b: CamelotCode): Compatibility | undefined {
  return compatibleKeys(a).find((c) => c.code === b)
}

/** Musical-name lookup, tolerant of "Am", "A minor", "Amin", "8A". */
export function parseKey(input: string): KeyInfo | undefined {
  const raw = input.trim()
  if (!raw) return undefined
  const camelot = raw.toUpperCase().replace(/\s/g, "")
  if (keyByCode.has(camelot as CamelotCode)) return keyByCode.get(camelot as CamelotCode)

  const m = raw.match(/^([A-Ga-g][#b]?)\s*(m|min|minor|maj|major|major key|d|)$/i)
  if (!m) return undefined
  const root = m[1][0].toUpperCase() + m[1].slice(1).replace("B", "b")
  const rest = m[2].toLowerCase()
  const minor = rest.startsWith("m") && !rest.startsWith("maj")
  const enharmonic: Record<string, string> = {
    "G#": "Ab", "D#": "Eb", "A#": "Bb", "C#": "Db", "F#": "F#", "Cb": "B", "E#": "F",
  }
  const norm = enharmonic[root] ?? root
  const list = minor ? MINOR_KEYS : MAJOR_KEYS
  const idx = list.findIndex((k) => k.split(" ")[0] === norm)
  if (idx === -1) return undefined
  return allKeys.find((k) => k.code === `${idx + 1}${minor ? "A" : "B"}`)
}

/** Pitch-shifted key after a tempo change of `percent` (e.g. +6 => roughly +1 semitone). */
export function keyAfterPitch(code: CamelotCode, semitones: number): CamelotCode | undefined {
  const key = keyByCode.get(code)
  if (!key) return undefined
  // One semitone up moves 7 steps clockwise on the wheel (circle of fifths).
  return `${wrap(key.number + semitones * 7)}${key.letter}` as CamelotCode
}

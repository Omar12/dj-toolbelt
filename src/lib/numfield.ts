/** Shared guard for the tools' numeric fields: raw string in, usable number or null out. */
export function numValue(raw: string, min: number, max: number): number | null {
  const n = Number(raw)
  if (raw.trim() === "" || !Number.isFinite(n)) return null
  return n >= min && n <= max ? n : null
}

/** Names what is wrong and what to type instead. Only called when numValue returned null. */
export function numProblem(raw: string, min: number, max: number): string {
  if (raw.trim() === "") return `Nothing entered. Type a number between ${min} and ${max}.`
  if (!Number.isFinite(Number(raw))) return `Not a number. Type a value between ${min} and ${max}.`
  return `Outside ${min}–${max}. Type a number in that range.`
}

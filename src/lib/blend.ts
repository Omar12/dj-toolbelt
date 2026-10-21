// A 32-bar blend from track A into track B, both beatmatched with phrases aligned.
// Bars 0–8 bring B's fader up with its bass cut, 8–16 run both, the bass swaps on
// the downbeat of bar 17 (one beat), and 24–32 take A's fader down.
// `swap` is 1 for the swap and 0 for leaving both LOW knobs at unity.

export const BARS = 32
export const SWAP_AT = 16
export const SWAP_BEATS = 1

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const ease = (v: number) => {
  const x = clamp01(v)
  return x * x * (3 - 2 * x)
}

export function mixAt(t: number, swap: number) {
  const faderA = 1 - ease((t - 24) / 8)
  const faderB = ease(t / 8)
  const s = clamp01((t - SWAP_AT) / (SWAP_BEATS / 4))
  const lowA = swap * (1 - s) + (1 - swap)
  const lowB = swap * s + (1 - swap)
  // Beatmatched kicks and basslines sum in phase: amplitudes add.
  const low = faderA * lowA + faderB * lowB
  const db = 20 * Math.log10(Math.max(low, 0.01))
  return { faderA, faderB, lowA, lowB, low, db }
}

export function phaseAt(t: number, swap: number) {
  if (t < 8) return "B in, bass cut"
  if (swap < 0.5) return t < 24 ? "two basslines" : "A out"
  if (t < SWAP_AT) return "on A's bass"
  if (t < SWAP_AT + SWAP_BEATS / 4) return "bass swap"
  return t < 24 ? "on B's bass" : "A out"
}

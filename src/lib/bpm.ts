/** Percentage pitch change needed to take `from` BPM to `to` BPM. */
export function pitchPercent(from: number, to: number): number {
  if (!from) return 0
  return ((to - from) / from) * 100
}

export interface TransitionAdvice {
  label: string
  detail: string
  severity: "easy" | "workable" | "hard"
  /** Transition Toolkit filters that match this verdict. */
  href: string
}

export function transitionAdvice(from: number, to: number): TransitionAdvice {
  const pct = Math.abs(pitchPercent(from, to))
  // Half/double-time counts as a match: 70 and 140 share a pulse.
  const halfDouble = Math.min(
    Math.abs(pitchPercent(from * 2, to)),
    Math.abs(pitchPercent(from / 2, to)),
  )
  if (pct <= 3)
    return { label: "Straight blend", detail: "Within pitch-fader range. Beatmatch and blend normally.", severity: "easy", href: "/transitions?bpm=same&bpm=1-6&category=blend&category=impact" }
  if (pct <= 6)
    return { label: "Blend with care", detail: "Noticeable pitch shift. Move the tempo gradually across a phrase.", severity: "workable", href: "/transitions?bpm=1-6&category=blend&category=fx" }
  if (halfDouble <= 6)
    return { label: "Half/double time", detail: "Treat one track at half or double tempo — the pulse still lines up.", severity: "workable", href: "/transitions?bpm=7%2B&category=tempo" }
  return { label: "Cut, do not blend", detail: "Too far apart to blend. Use an echo out, a drop swap or a tool track.", severity: "hard", href: "/transitions?bpm=7%2B&category=cut" }
}

export function bpmFromTaps(timestamps: number[]): { bpm: number; interval: number; taps: number } {
  if (timestamps.length < 2) return { bpm: 0, interval: 0, taps: timestamps.length }
  const intervals = timestamps.slice(1).map((t, i) => t - timestamps[i])
  const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
  return { bpm: avg > 0 ? 60000 / avg : 0, interval: avg, taps: timestamps.length }
}

/** Uncompressed audio file size in MB. */
export function recordingSizeMb(minutes: number, sampleRate: number, bitDepth: number, channels: number) {
  return (minutes * 60 * sampleRate * bitDepth * channels) / 8 / 1_000_000
}

/** Constant-bitrate (MP3/AAC) size in MB. */
export function encodedSizeMb(minutes: number, kbps: number) {
  return (minutes * 60 * kbps) / 8 / 1000
}

export const energyLabels = ["Very Low", "Low", "Medium", "High", "Peak"] as const

/** Five 1–3 characteristic scores → 1–5 energy: round(1 + (average − 1) × 2). */
export function energyFromScores(scores: number[]) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(1 + (avg - 1) * 2)
}

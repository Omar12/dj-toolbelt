/** The crate system — a taxonomy for organising a library beyond genre folders. */
export const crateSystem = [
  {
    id: "function",
    name: "Function",
    description: "What the track does to a room. The most useful axis under pressure.",
    values: ["Opener", "Builder", "Peak", "Reset", "Closer"],
  },
  {
    id: "energy",
    name: "Energy",
    description: "A 1–5 rating. Keep it blunt; nuance makes it useless mid-set.",
    values: ["1 — background", "2 — moving", "3 — locked in", "4 — hands up", "5 — room breaks"],
  },
  {
    id: "mood",
    name: "Mood",
    description: "How it feels, independent of tempo or genre.",
    values: ["Dark", "Euphoric", "Groovy", "Funky", "Hypnotic", "Atmospheric"],
  },
  {
    id: "situation",
    name: "Situation",
    description: "Where the track belongs. Saves you from playing a club record at a pool party.",
    values: ["Warm-up", "Club", "Lounge", "After-hours", "Pool", "Radio", "Festival"],
  },
  {
    id: "transition-role",
    name: "Transition role",
    description: "How the track behaves between other tracks.",
    values: ["Bridge", "Tool", "Acapella", "Loop", "Emergency track"],
  },
]

export const inspirationPrompts = {
  dig: [
    "Explore Brazilian funk from 1982.",
    "Explore Detroit techno labels from 1995–2005.",
    "Find three tracks from a country you have never played music from.",
    "Pick a label with fewer than ten releases and hear all of them.",
    "Find a record that samples something you already own.",
    "Dig one genre entirely through its B-sides.",
  ],
  challenge: [
    "Build a 30-minute set using tracks under 120 BPM.",
    "Build a crate using only music released before 2000.",
    "Find five tracks from one unfamiliar label.",
    "Record a mix where every transition is a bass swap.",
    "Play a set that never rises above energy 3.",
    "Open and close with the same artist, different decades.",
  ],
}

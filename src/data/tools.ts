export interface BuiltInTool {
  id: string
  name: string
  description: string
  tags: string[]
}

/** Utilities that ship inside DJ Toolbelt. All client-side, no network. */
export const builtInTools: BuiltInTool[] = [
  { id: "bpm-tapper", name: "BPM Tapper", description: "Tap along to a track and read the tempo, average interval and tap count.", tags: ["bpm", "tap", "tempo"] },
  { id: "bpm-transition", name: "BPM Transition Calculator", description: "Difference, pitch percentage and a transition recommendation between two tempos.", tags: ["bpm", "pitch", "transition"] },
  { id: "half-double", name: "Half / Double BPM", description: "Convert a tempo to its half and double time for open-format mixing.", tags: ["bpm", "half time", "double time"] },
  { id: "camelot-wheel", name: "Camelot Wheel", description: "Interactive wheel: pick a key, see every compatible move and what it does.", tags: ["camelot", "key", "harmonic"] },
  { id: "key-converter", name: "Key Converter", description: "Musical key to Camelot and Open Key notation, and back.", tags: ["key", "camelot", "open key"] },
  { id: "key-compatibility", name: "Harmonic Compatibility Checker", description: "Two keys in, a verdict out — with the reason it works or does not.", tags: ["harmonic", "compatibility", "key"] },
  { id: "set-planner-math", name: "Set Duration & Track Count", description: "How many tracks fill a slot at a given average track length.", tags: ["set", "duration", "planning"] },
  { id: "storage-calculator", name: "Recording Storage Calculator", description: "File size for a recorded set at any sample rate, bit depth or bitrate.", tags: ["recording", "storage", "wav"] },
  { id: "gig-timeline", name: "Gig Timeline Generator", description: "Turn a set time and length into a phase-by-phase plan you can print.", tags: ["gig", "timeline", "planning"] },
]

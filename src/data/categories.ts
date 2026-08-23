import type { Category } from "./types"

export const categories: Category[] = [
  { id: "discovery", name: "Music Discovery", description: "Ways to surface tracks you have never heard.", section: "discover", icon: "Radar" },
  { id: "crate-digging", name: "Crate Digging", description: "Structured digging strategies and the tools behind them.", section: "discover", icon: "Shovel" },
  { id: "tracklists", name: "Tracklists", description: "Turn other people's sets into your next crate.", section: "discover", icon: "ListMusic" },
  { id: "radio", name: "Radio", description: "Curated stations and archives worth trusting.", section: "discover", icon: "RadioTower" },
  { id: "mixes", name: "DJ Mixes", description: "Long-form sets, residencies and podcast series.", section: "discover", icon: "Disc3" },
  { id: "blogs", name: "Blogs & Editorial", description: "Human writing that points at music algorithms miss.", section: "discover", icon: "Newspaper" },
  { id: "inspiration", name: "Inspiration", description: "Prompts and detours for when digging goes stale.", section: "discover", icon: "Sparkles" },

  { id: "buy-music", name: "Buy Music", description: "Where to legally obtain a track, digital or physical.", section: "prepare", icon: "ShoppingBag" },
  { id: "vinyl", name: "Vinyl", description: "Record shops, pressings and marketplaces.", section: "prepare", icon: "Disc" },
  { id: "analysis", name: "Track Analysis", description: "BPM, key, energy and structure detection.", section: "prepare", icon: "Activity" },
  { id: "library", name: "Library Management", description: "Crates, playlists, cues, backups and migration.", section: "prepare", icon: "Library" },
  { id: "metadata", name: "Metadata & Tagging", description: "Clean tags, artwork and consistent filenames.", section: "prepare", icon: "Tags" },
  { id: "set-planning", name: "Set Planning", description: "Shape BPM, key and energy across a set.", section: "prepare", icon: "LineChart" },

  { id: "harmonic", name: "Harmonic Mixing", description: "Camelot notation, key compatibility, key shifting.", section: "mix", icon: "CircleDot" },
  { id: "performance", name: "Performance Software", description: "The software and hardware you actually play on.", section: "mix", icon: "SlidersHorizontal" },

  { id: "recording", name: "Recording", description: "Capture a set cleanly from booth to file.", section: "record", icon: "Mic" },
  { id: "mastering", name: "Mastering & Loudness", description: "Normalisation, LUFS targets, final polish.", section: "record", icon: "AudioWaveform" },
  { id: "hardware", name: "Hardware", description: "Recorders, interfaces and capture gear.", section: "record", icon: "Cable" },
  { id: "streaming", name: "Streaming", description: "Broadcast a set live without the audio falling apart.", section: "record", icon: "Signal" },

  { id: "publishing", name: "Mix Publishing", description: "Upload, tag, chapter and present a finished mix.", section: "publish", icon: "Upload" },
  { id: "visuals", name: "Visuals", description: "Artwork, video and audio-reactive graphics.", section: "publish", icon: "Palette" },
  { id: "branding", name: "Identity & Branding", description: "Name, logo, typography, socials, EPK.", section: "publish", icon: "Fingerprint" },

  { id: "learning", name: "Learning", description: "Courses, channels, articles and references.", section: "learn", icon: "GraduationCap" },
  { id: "community", name: "Community", description: "Forums and scenes where DJs answer each other.", section: "learn", icon: "Users" },
  { id: "production", name: "Production", description: "Edits, stems and making your own material.", section: "learn", icon: "Music4" },
]

export const categoryById = new Map(categories.map((c) => [c.id, c]))

export function categoriesForSection(section: string): Category[] {
  return categories.filter((c) => c.section === section)
}

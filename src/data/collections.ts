import type { Collection } from "./types"

export const collections: Collection[] = [
  {
    id: "best-music-discovery-tools",
    name: "Best Music Discovery Tools",
    description: "The shortlist that finds records nothing else surfaces.",
    resourceIds: ["digdeeper", "cosine", "bandcamp", "1001tracklists", "nts", "every-noise", "radiooooo", "whosampled"],
  },
  {
    id: "best-free-dj-tools",
    name: "Best Free DJ Tools",
    description: "Everything here costs nothing and is still gig-worthy.",
    resourceIds: ["mixxx", "audacity", "obs-studio", "onetagger", "keyfinder", "musicbrainz-picard", "hydra", "dupeguru", "1001tracklists", "nts"],
  },
  {
    id: "best-tools-for-house-djs",
    name: "Best Tools for House DJs",
    description: "Stores, charts and digging routes weighted toward house and its offshoots.",
    resourceIds: ["traxsource", "bandcamp", "beatport", "phonica", "test-pressing", "nts", "1001tracklists"],
  },
  {
    id: "best-tools-for-open-format",
    name: "Best Tools for Open-Format DJs",
    description: "Cross-genre digging, sample lineage and tempo maths for sets that jump around.",
    resourceIds: ["whosampled", "every-noise", "tunebat", "music-map", "serato-dj", "youtube"],
  },
  {
    id: "best-dj-tools-for-rekordbox",
    name: "Best DJ Tools for Rekordbox",
    description: "Get metadata, cues and crates into rekordbox without hand-editing everything.",
    resourceIds: ["rekordbox", "lexicon", "onetagger", "mixed-in-key", "rekordcloud", "dupeguru"],
  },
  {
    id: "best-tools-for-harmonic-mixing",
    name: "Best Tools for Harmonic Mixing",
    description: "Detect keys, convert to Camelot, and check compatibility before you load the track.",
    resourceIds: ["mixed-in-key", "keyfinder", "tunebat", "songdata", "harmonic-mixing-guide"],
  },
  {
    id: "best-dj-visual-tools",
    name: "Best DJ Visual Tools",
    description: "From zero-install browser visuals to full node-based audio reactivity.",
    resourceIds: ["hydra", "synesthesia", "resolume", "touchdesigner", "p5js", "davinci-resolve"],
  },
  {
    id: "best-tools-for-publishing-mixes",
    name: "Best Tools for Publishing DJ Mixes",
    description: "Master, package and release a recorded set properly.",
    resourceIds: ["auphonic", "youlean-loudness-meter", "mp3tag", "canva", "mixcloud", "soundcloud", "youtube"],
  },
  {
    id: "record-store-map",
    name: "Where to Buy Records",
    description: "Digital stores and vinyl shops, with formats and region notes on each page.",
    resourceIds: ["bandcamp", "beatport", "traxsource", "juno-download", "bleep", "boomkat", "discogs", "juno-records", "decks-de", "hardwax", "phonica", "hhv", "vinyl-hub"],
  },
]

export const collectionById = new Map(collections.map((c) => [c.id, c]))

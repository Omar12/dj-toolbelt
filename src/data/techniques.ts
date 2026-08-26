import type { Technique } from "./types"

/** Transition toolkit — educational cards, no external resource required. */
export const techniques: Technique[] = [
  {
    id: "eq-blend",
    name: "EQ Blend",
    description:
      "Overlap intros and outros over 16–64 bars, trading frequency bands between the two tracks. Bass out of A, bass in on B, on a phrase boundary.",
    whenToUse:
      "House, techno, trance, drum and bass. Any genre where flow continuity matters more than impact.",
    avoid: "Very different genres, large BPM gaps, or when the crowd needs a jolt.",
    example:
      "A 124 BPM deep house track into a 126 BPM tech house track, both four-on-the-floor. You blend for 32 bars, swap the bass on bar 33, and track A is fully gone by bar 64.",
    risk: "Bass clash if both lows play at once. An off-phrase entry sounds wrong even to non-musicians.",
    category: "blend",
    bpmDiff: "1-6",
    energy: ["up", "flat"],
    genreRelation: ["same", "similar"],
    difficulty: "beginner",
    genres: ["house", "techno", "minimal"],
    walkthrough: [
      "Cue the incoming track to its intro, on the first phrase.",
      "Bring it in at low volume with the low band cut.",
      "Match tempo and phrasing — wait for the 1 of a 32-bar phrase.",
      "Gradually raise the incoming mids and highs.",
      "On a strong phrase boundary, swap the bass: cut A's low, restore B's.",
      "Roll off A's remaining mids and highs over the next 16–32 bars, then close the fader.",
    ],
  },
  {
    id: "bass-swap",
    name: "Bass Swap",
    description: "The sharp version of an EQ blend: both basses swap on a single downbeat.",
    whenToUse: "When both tracks have strong, similar low-end that would clash if layered.",
    avoid:
      "Tracks whose low-end carries the melody — cutting it mid-phrase leaves an audible hole.",
    example:
      "Two 128 BPM tech house tracks. B's top end sits over A's groove for 16 bars, then on the downbeat of a new 16 the entire bottom belongs to B in one move.",
    risk: "Land the swap off the downbeat and the groove stumbles. There is no gradual version to hide behind.",
    category: "blend",
    bpmDiff: "1-6",
    energy: ["up", "flat"],
    genreRelation: ["same", "similar"],
    difficulty: "intermediate",
    genres: ["house", "tech house", "techno"],
    walkthrough: [
      "Beatmatch and phrase-align both tracks.",
      "Incoming bass cut, fader open, let the top end sit over the outgoing groove.",
      "On the downbeat of a new 16, kill the outgoing bass and restore the incoming bass in one move.",
      "Clean up the outgoing mids over the following bars.",
    ],
  },
  {
    id: "drop-swap",
    name: "Drop Swap",
    description:
      "The outgoing track enters its breakdown. The incoming track's drop hits exactly when the build resolves.",
    whenToUse:
      "Bass music, dubstep, trance, big-room. Any genre with defined build and drop architecture.",
    avoid: "Tracks without a clear breakdown. Never improvise this — plan it and practise it.",
    example:
      "Track A is a trance record in a 32-bar breakdown. B comes in quietly underneath. As A's filter sweep peaks and its drop would land, B's drop lands instead. A is killed on the spot.",
    risk: "Harmonic clash if the keys fight. Timing off by even half a bar sounds wrong.",
    category: "impact",
    bpmDiff: "1-6",
    energy: ["up"],
    genreRelation: ["same", "similar"],
    difficulty: "intermediate",
    genres: ["open format", "bass", "trance"],
    walkthrough: [
      "Identify the breakdown point in the outgoing track, where the drums fall away.",
      "Load the incoming track and know exactly where its drop sits.",
      "Beatmatch during the breakdown.",
      "Bring the incoming track in under the build, low in the mix.",
      "Hit its drop exactly as the outgoing build resolves.",
      "Cut or fade the outgoing track immediately — do not let two drops coexist.",
    ],
  },
  {
    id: "double-drop",
    name: "Double Drop",
    description:
      "Both tracks' drops hit at the same time. Maximum impact when it works, and it only works with compatible keys and matched energy weight.",
    whenToUse: "Peak moments only, when you want the most dramatic possible impact. Always planned.",
    avoid:
      "Incompatible keys — it will sound terrible. Also skip it when one drop is far harder than the other.",
    example:
      "Two tech house tracks in 8A and 9A, adjacent on the Camelot wheel, both at 128 BPM. The drops land on the same beat and the room reads it as one moment. After 16 bars you fade A out.",
    risk: "The highest-risk transition here. A clash or a timing error in front of a crowd is very visible — rehearse the specific pair.",
    category: "impact",
    bpmDiff: "same",
    energy: ["up"],
    genreRelation: ["same"],
    difficulty: "advanced",
    genres: ["tech house", "bass", "drum and bass"],
    walkthrough: [
      "Pick two tracks in compatible keys — same Camelot code or one step away.",
      "Match tempo exactly.",
      "Find the drop point in both.",
      "Align them so both drops fall on the same bar 1.",
      "Bring both to full volume together at the drop.",
      "Decide in advance which track you phase out, usually within 32 bars.",
    ],
  },
  {
    id: "hard-cut",
    name: "Hard Cut",
    description: "Drop the new track on the 1 of a phrase with no overlap. Fast, decisive, intentional.",
    whenToUse:
      "Hip hop, dancehall, baile funk, jersey club, open-format sets. When the energy shift is the point.",
    avoid: "House and techno flow sets, or any groove the crowd is settled into and you want to keep.",
    example:
      "You are playing hip hop at 90 BPM and want Afrobeats at 100. At the end of a 32-bar phrase you slam B in on its beat 1. The tempo change re-energises the floor.",
    risk: "Played timidly it sounds like a mistake. Played with commitment it reads as a decision. The difference is entirely conviction.",
    category: "cut",
    bpmDiff: "any",
    energy: ["up", "flat", "down"],
    genreRelation: ["any"],
    difficulty: "beginner",
    genres: ["hip hop", "dancehall", "open format"],
    walkthrough: [
      "Count to the end of the outgoing phrase — bar 32 or 64.",
      "Have the incoming track cued to its first beat.",
      "In one motion: kill the outgoing volume, release the incoming at full.",
      "Commit. Hesitation is what makes it sound like an accident.",
    ],
  },
  {
    id: "spinback-cut",
    name: "Spinback + Cut",
    description: "Pull the platter backward for the rewind, then slam the new track in at full volume.",
    whenToUse:
      "Peak energy moments, reggae and dancehall climaxes, hip hop pivots — anywhere you want a visible reaction.",
    avoid: "More than once or twice a set. Overused it becomes a crutch rather than a moment.",
    example:
      "You are deep in a dancehall section and the MC calls for a rewind. You spin back, the room goes up, and you slam in the next track — or the same one from the top.",
    risk: "The entry timing is everything. Early or late and the moment deflates.",
    category: "cut",
    bpmDiff: "any",
    energy: ["up"],
    genreRelation: ["any"],
    difficulty: "intermediate",
    genres: ["dancehall", "hip hop", "open format"],
    walkthrough: [
      "Have the incoming track cued and ready.",
      "On a strong beat, grab the platter and pull it backward.",
      "As the rewind fades, release the incoming track on its beat 1.",
      "Sell it — the technique is half performance.",
    ],
  },
  {
    id: "echo-out",
    name: "Echo Out",
    description:
      "Feed the outgoing track into a delay and kill the dry signal. The tail carries the gap while the next track arrives underneath.",
    whenToUse:
      "Rescuing a transition that will not sit cleanly. Punctuation between sections. Any moment that needs a clear break.",
    avoid:
      "Using it as your default. Every two or three tracks and it starts to signal that you are solving problems rather than performing.",
    example:
      "Your blend is not working — the keys are slightly off and the tension is audible. You hit the delay, kill the channel, and the spacey tail covers the seam while B comes in clean underneath.",
    risk: "The most overused technique in modern DJing. A set built on echo-outs sounds like continuous damage control.",
    category: "fx",
    bpmDiff: "any",
    energy: ["down", "flat"],
    genreRelation: ["any"],
    difficulty: "beginner",
    genres: ["open format", "hip hop", "bass"],
    walkthrough: [
      "Set a synced delay to 1/2 or 1/4 with high feedback.",
      "Engage it on the last bar of a phrase.",
      "Cut the channel fader immediately — only the wet tail plays.",
      "Bring the next track in under the decaying tail, on the downbeat.",
    ],
  },
  {
    id: "filter-transition",
    name: "Filter Sweep",
    description:
      "A high-pass sweeps the outgoing track out — lows first, then mids — while a low-pass brings the incoming track in from the top end down.",
    whenToUse:
      "Trance, progressive house, melodic techno. Long blends that want extra texture through the middle.",
    avoid: "Routine use — it dates your style fast. Also genres where unfiltered impact is the point.",
    example:
      "Two melodic trance tracks. You high-pass A until it is thin and airy while B enters from the highs. In the middle both are filtered, a swirling moment, then B opens up fully.",
    risk: "High-passing strips all the energy out of the outgoing track — do not linger in that zone.",
    category: "fx",
    bpmDiff: "1-6",
    energy: ["up", "flat"],
    genreRelation: ["same", "similar"],
    difficulty: "beginner",
    genres: ["house", "disco", "nu disco"],
    walkthrough: [
      "Begin a standard EQ blend.",
      "High-pass the outgoing track, sweeping up slowly — bass first, then mids.",
      "At the same time low-pass the incoming track, opening from the highs down.",
      "Sit in the middle briefly with both filtered — that texture is the point.",
      "Release both filters as the incoming track takes over, then close the outgoing channel.",
    ],
  },
  {
    id: "loop-transition",
    name: "Loop Roll Out",
    description:
      "Loop the last bar of the outgoing track and halve it repeatedly — 1 bar, 1/2, 1/4, 1/8 — then cut to the next track.",
    whenToUse: "Building tension into a transition, or signalling that a change is coming.",
    avoid: "Once or twice a set at most, and only if your timing is precise enough for the cuts to land.",
    example:
      "A tech house set. You loop the last bar before the outro, halve it three times until it stutters, then cut to the next track's opening kick. The stutter builds; the cut releases.",
    risk: "Timing the final cut under pressure is hard. Drill it before you use it live.",
    category: "performative",
    bpmDiff: "any",
    energy: ["up", "flat"],
    genreRelation: ["any"],
    difficulty: "intermediate",
    genres: ["techno", "house", "drum and bass"],
    walkthrough: [
      "Set a 1-bar loop on a percussive section of the outgoing track.",
      "Have the incoming track cued and ready.",
      "Engage the loop and let it play once or twice.",
      "Halve it: 1 bar, 1/2, 1/4, 1/8.",
      "On the tightest loop, cut to the incoming drop or beat 1.",
    ],
  },
  {
    id: "half-double-time",
    name: "Half-Time / Double-Time Blend",
    description:
      "Exploit the 2:1 tempo relationship. 140 and 70 BPM are rhythmically identical — every other kick aligns, so you mix them as if they share a tempo.",
    whenToUse:
      "Genres that sit at double or half each other's tempo. Hip hop into drum and bass. House into dubstep.",
    avoid: "BPM pairs that are not close to 2:1 — it will not lock, and it will sound broken.",
    example:
      "Hip hop at 90 BPM into drum and bass at 180. Every other D&B kick lands on the hip hop kick. Sixteen bars of blend and the floor feels an energy shift, not a tempo change.",
    risk: "The ratio has to be exact. A single BPM of offset creates audible drift.",
    category: "tempo",
    bpmDiff: "7+",
    energy: ["up", "flat", "down"],
    genreRelation: ["similar", "different"],
    difficulty: "advanced",
    genres: ["drum and bass", "hip hop", "breaks"],
    walkthrough: [
      "Identify the 2:1 pair — 90 BPM hip hop against 180 BPM drum and bass.",
      "Set the incoming tempo to exactly double or half the outgoing one.",
      "Beatmatch: every other incoming kick should land on an outgoing kick.",
      "Blend with standard EQ technique — the rhythms lock on their own.",
      "The floor experiences a change of feel, not of tempo.",
    ],
  },
  {
    id: "tempo-bridge",
    name: "Tempo Bridge Track",
    description:
      "Use an intermediate-BPM track between two tempo zones. Two clean blends instead of one impossible one.",
    whenToUse: "Any large BPM jump with no 2:1 relationship available. 100 to 140 via a 120 bridge.",
    avoid:
      "When a 2:1 ratio does exist — the half-time blend is more elegant. Do not bridge just to dodge learning it.",
    example:
      "A 100 BPM hip hop section into a 128 BPM house section, via a 114 BPM afrobeats or dancehall record. Two smooth blends, and the crowd hears a journey rather than a collision.",
    risk: "If the bridge is obviously filler, the crowd notices. It has to make musical sense, not just arithmetic sense.",
    category: "tempo",
    bpmDiff: "7+",
    energy: ["up", "flat"],
    genreRelation: ["any"],
    difficulty: "intermediate",
    genres: ["open format", "afrobeats", "dancehall"],
    walkthrough: [
      "Find the BPM midpoint between the two zones.",
      "Pick a bridge track at or near it.",
      "Blend from the outgoing track into the bridge as normal.",
      "Blend from the bridge into the destination track as normal.",
      "Choose the bridge for the music, not just the number.",
    ],
  },
  {
    id: "breakdown-handoff",
    name: "Breakdown Handoff",
    description:
      "Wait for the outgoing breakdown, bring the incoming intro in underneath, and by the time the build resolves the new track is already driving.",
    whenToUse:
      "Invisible genre switches, when you have time to wait for the right moment and both genres share an energy level.",
    avoid: "When the crowd needs a faster turnaround, or when the outgoing track has no real breakdown.",
    example:
      "Melodic house moving to techno. As A's breakdown starts, the techno intro comes in quiet underneath and rises over 32 bars while A's melody fades. The genre changed; the journey did not break.",
    risk: "Requires patience — you cannot rush the breakdown. No breakdown, no technique.",
    category: "genre-switch",
    bpmDiff: "1-6",
    energy: ["flat", "up"],
    genreRelation: ["similar", "different"],
    difficulty: "advanced",
    genres: ["house", "techno", "progressive"],
    walkthrough: [
      "Identify the breakdown in the outgoing track, where the drums fall away.",
      "Start beatmatching in the bars before it arrives.",
      "As the breakdown lands, bring the incoming intro in low in the mix.",
      "Raise it gradually under the outgoing atmospherics.",
      "Where the outgoing build would drop, let the incoming track take over instead.",
      "Fade or kill the outgoing track once the new energy is established.",
    ],
  },
  {
    id: "acapella-transition",
    name: "Acapella / Vocal Reset",
    description:
      "Strip back to a vocal with no kick. Without a kick to reference, the room's sense of tempo resets and the next track can enter at any BPM.",
    whenToUse:
      "Large tempo jumps with no 2:1 relationship. Emotional peaks. Bridging two instrumentals that share a key but little else.",
    avoid:
      "Peak physical energy — stopping the rhythm kills momentum. It also needs a vocal the room actually knows.",
    example:
      "Ending a 128 BPM tech house section for a 95 BPM hip hop moment. The room sings along to a known acapella with no kick under it, then the hip hop track arrives at 95 and feels like an arrival rather than a collision.",
    risk: "The vocal choice carries the whole thing. A weak or unfamiliar one leaves you with silence and no plan.",
    category: "tempo",
    bpmDiff: "any",
    energy: ["down", "flat"],
    genreRelation: ["any"],
    difficulty: "advanced",
    genres: ["house", "garage", "open format"],
    walkthrough: [
      "Check the acapella's key against the incoming track — same Camelot code or one step.",
      "Drop it over the outgoing break, then kill the music underneath it.",
      "Let the vocal run 4–16 bars with no beat.",
      "Bring the incoming intro in — the new tempo establishes itself fresh.",
      "Carry the vocal over that intro for continuity, then fade it.",
    ],
  },
  {
    id: "tempo-transition",
    name: "Tempo Transition",
    description: "Move the set to a new tempo without the change being audible.",
    whenToUse: "Shifting tempo ranges across a long set, where no single jump would be forgiven.",
    avoid: "Short sets, and any jump big enough to need a bridge track or a vocal reset instead.",
    example:
      "Over one 32-bar phrase you nudge the outgoing pitch from 124 up toward 128, no more than 2% at a time, then land the incoming track on a downbeat and relax the pitch back to zero.",
    risk: "Push the pitch too fast and the vocals or melody give it away immediately.",
    category: "tempo",
    bpmDiff: "1-6",
    energy: ["up", "flat"],
    genreRelation: ["same", "similar"],
    difficulty: "advanced",
    genres: ["open format", "breaks", "drum and bass"],
    walkthrough: [
      "Nudge the outgoing track's pitch gradually across a full phrase, no more than 2% at a time.",
      "Or use a percussive tool track that reads at both tempos.",
      "For a half/double jump, match 70 to 140 and let the listener's ear pick the pulse.",
      "Land the incoming track on a downbeat, then relax the pitch back to zero.",
    ],
  },
]

export const techniqueById = new Map(techniques.map((t) => [t.id, t]))

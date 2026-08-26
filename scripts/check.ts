/** Smallest runnable check for the non-trivial client-side maths. Run: npm run check */
import assert from "node:assert/strict"
import { allKeys, compatibleKeys, isCompatible, keyAfterPitch, parseKey } from "../src/lib/camelot.ts"
import { bpmFromTaps, pitchPercent, transitionAdvice, recordingSizeMb, encodedSizeMb } from "../src/lib/bpm.ts"
import { numProblem, numValue } from "../src/lib/numfield.ts"

// Camelot ↔ musical key mapping anchors.
assert.equal(parseKey("A minor")?.code, "8A")
assert.equal(parseKey("Am")?.code, "8A")
assert.equal(parseKey("C maj")?.code, "8B")
assert.equal(parseKey("8A")?.name, "A min")
assert.equal(parseKey("A#m")?.code, "3A") // enharmonic with Bb min
assert.equal(parseKey("banana"), undefined)
assert.equal(allKeys.length, 24)

// 8A → 7A / 8A / 9A / 8B, per the spec example.
const safe = compatibleKeys("8A").slice(0, 4).map((c) => c.code)
assert.deepEqual(safe.sort(), ["7A", "8A", "8B", "9A"])
assert.ok(isCompatible("8A", "9A"))
assert.equal(isCompatible("8A", "2B"), undefined)

// Wheel wraps: 12A +1 = 1A, 1A -1 = 12A.
assert.equal(compatibleKeys("12A")[1].code, "1A")
assert.equal(compatibleKeys("1A")[2].code, "12A")

// One semitone up moves 7 steps clockwise.
assert.equal(keyAfterPitch("8A", 1), "3A")
assert.equal(keyAfterPitch("8A", 0), "8A")

// BPM maths.
assert.equal(pitchPercent(124, 128).toFixed(4), "3.2258")
assert.equal(pitchPercent(0, 128), 0)
assert.equal(transitionAdvice(124, 126).severity, "easy")
assert.equal(transitionAdvice(124, 131).severity, "workable")
assert.equal(transitionAdvice(70, 140).label, "Half/double time")
assert.equal(transitionAdvice(90, 174).label, "Half/double time") // 180 is within pitch range of 174
assert.equal(transitionAdvice(100, 174).severity, "hard")

const taps = [0, 500, 1000, 1500]
assert.equal(Math.round(bpmFromTaps(taps).bpm), 120)
assert.equal(bpmFromTaps([]).bpm, 0)
assert.equal(bpmFromTaps([1]).bpm, 0)

// 1 minute of 48k/24-bit stereo ≈ 17.28 MB.
assert.equal(recordingSizeMb(1, 48000, 24, 2).toFixed(2), "17.28")
assert.equal(encodedSizeMb(60, 320).toFixed(1), "144.0")

console.log("all checks passed")

// Numeric field guard: empty, junk and out-of-range all refuse to produce a number.
assert.equal(numValue("124", 40, 220), 124)
assert.equal(numValue("", 40, 220), null)
assert.equal(numValue("   ", 40, 220), null)
assert.equal(numValue("abc", 40, 220), null)
assert.equal(numValue("39.9", 40, 220), null)
assert.equal(numValue("220.1", 40, 220), null)
assert.equal(numValue("40", 40, 220), 40) // bounds are inclusive
assert.equal(numValue("220", 40, 220), 220)
assert.match(numProblem("", 40, 220), /Nothing entered/)
assert.match(numProblem("abc", 40, 220), /Not a number/)
assert.match(numProblem("999", 40, 220), /Outside 40–220/)

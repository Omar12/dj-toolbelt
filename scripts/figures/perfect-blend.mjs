// Builds the static art for the /learn/perfect-blend figure with the anatomy skill's iso kit
// and writes it to src/components/learn/perfect-blend-art.ts. The live behaviour is in
// PerfectBlend.tsx. Regenerate after editing:
//   node --experimental-strip-types scripts/figures/perfect-blend.mjs
// ANATOMY_KIT points at the skill's kit/ directory (default ~/.claude/skills/anatomy/kit).
import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { BARS, mixAt } from "../../src/lib/blend.ts";

const KIT = process.env.ANATOMY_KIT ?? join(homedir(), ".claude/skills/anatomy/kit");
const k = await import(join(KIT, "iso-kit.mjs"));

const WIDTH = 600;
const HEIGHT = 400;

const CASE = { x: -72, y: -104, w: 144, d: 208, r: 7 };
const CASE_H = 22;
const FOOT_H = 4;
const PLATE = k.insetPlan(CASE, 3);
const TOP = CASE_H + 1.2;
const COLLAR_H = 0.6;

const CH = [-42, 42];
const KNOBS = { gain: -70, hi: -48, mid: -28, low: -8 };
const KNOB_R = 6.2;
const CAP_R = 4.6;
const CAP_H = 5;
const KNOB_TOP = TOP + COLLAR_H + 1.6 + CAP_H;
const KILL = (-150 * Math.PI) / 180;

const SLOT = { y0: 10, y1: 66 };
const FADER = { full: 14, zero: 62 };
const CAP = { x: -6, y: -3.5, w: 12, d: 7, r: 1.6 };
const CAP_TOP = TOP + 6;

const METER_X = [-4.5, 4.5];
const METER_DB = [-20, -15, -10, -7, -5, -3, -2, -1, 0, 1, 2, 3, 4, 6];
const METER_Y0 = -18;
const METER_STEP = 4.4;

const P = k.fitProjection(
  [...k.boxCorners(CASE, -FOOT_H, CASE_H), [CH[0], KNOBS.gain, KNOB_TOP], [CH[1], KNOBS.gain, KNOB_TOP]],
  WIDTH,
  HEIGHT,
  { pad: 34, azimuth: 58, elevation: 36 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const depth = (x, y, z = TOP) => k.depthOf([x, y, z], P);
const byDepth = (points) => [...points].sort((a, b) => depth(a[0], a[1], 0) - depth(b[0], b[1], 0));


function chassis() {
  const out = [`<path class="iso-halo" d="${k.haloOf(CASE, -FOOT_H, CASE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(CASE, 16))) {
    out.push(S(k.cylinder(x, y, 7, -FOOT_H, 1.2, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.6, -FOOT_H + 1.2, FOOT_H - 1.2, P, 28), { tone: "lo" }));
  }
  const seam = k.sideSeam(CASE, 7, P, 8);
  out.push(S(k.slabOf(CASE, 0, CASE_H, P, 8, 1.2), { tone: "mid", inner: L(seam, { tone: "faint" }) }));
  // Vent grille on the +x cheek: closed slots in the face plane, between the seam and the lid.
  const cheek = CASE.x + CASE.w;
  const slot = (y) => {
    const ring = [];
    for (let i = 0; i <= 8; i++) { const a = Math.PI + (i / 8) * Math.PI; ring.push([y + Math.cos(a) * 1, 17 + Math.sin(a) * -1]); }
    for (let i = 0; i <= 8; i++) { const a = (i / 8) * Math.PI; ring.push([y + Math.cos(a) * 1, 11 + Math.sin(a) * -1]); }
    return "M" + ring.map(([sy, sz]) => at([cheek, sy, sz]).join(" ")).join("L") + "Z";
  };
  out.push(L(Array.from({ length: 15 }, (_, i) => slot(-86 + i * 5)).join(""), { tone: "lo" }));
  out.push(D([[-94, 14], [-10, 14]].map(([y, z]) => at([cheek, y, z])), { size: 0.55, tone: "mid" }));
  // Headphone jack and its nut on the front face.
  const front = CASE.y + CASE.d;
  out.push(L(k.sideRing([-48, front, 12], 3.4, "y", P, 32), { tone: "mid" }));
  out.push(L(k.sideRing([-48, front, 12], 1.6, "y", P, 24), { tone: "lo" }));
  out.push(L(k.sideRing([-36, front, 12], 2.2, "y", P, 28), { tone: "lo" }));
  out.push(D([at([-48, front, 12]), at([-36, front, 12])], { size: 0.6, tone: "hi" }));
  return out.join("");
}

function faceplate() {
  const out = [S(k.slabOf(PLATE, CASE_H, TOP - CASE_H, P, 8, 0.5), { tone: "mid", crease: "lo" })];
  out.push(L(k.planOutline(k.insetPlan(PLATE, 4), TOP, P), { tone: "faint" }));
  const screws = k.corners(PLATE, 7);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, TOP, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, TOP])), { size: 0.5 }));
  // Channel dividers: full-depth grooves between the strips and the master section.
  for (const x of [-22, 22]) out.push(L(k.lineOnTop([x, PLATE.y + 4], [x, 76], TOP, P), { tone: "faint" }));
  out.push(L(k.lineOnTop([PLATE.x + 4, 76], [PLATE.x + PLATE.w - 4, 76], TOP, P), { tone: "faint" }));
  return out.join("");
}

function phraseStrip() {
  const strip = { x: -60, y: -96, w: 120, d: 8, r: 1.5 };
  const out = [S(k.slabOf(strip, TOP, 0.8, P, 3), { tone: "lo", crease: "none" })];
  out.push(L(k.planOutline(k.insetPlan(strip, 1.2), TOP + 0.8, P, 3), { tone: "faint" }));
  out.push(D([at([strip.x + 2.4, strip.y + 4, TOP + 0.8]), at([strip.x + strip.w - 2.4, strip.y + 4, TOP + 0.8])], { size: 0.45 }));
  for (let bar = 0; bar < BARS; bar++) {
    const x = -54.6 + bar * 3.3 + Math.floor(bar / 8) * 2.5;
    const point = at([x, strip.y + 4, TOP + 0.8]);
    out.push(`<g data-bar="${bar}">${D([point], { size: bar % 8 === 0 ? 0.95 : 0.7, tone: "faint" })}</g>`);
  }
  return out.join("");
}

function meter() {
  const win = { x: -9, y: METER_Y0 - (METER_DB.length - 1) * METER_STEP - 4, w: 18, d: (METER_DB.length - 1) * METER_STEP + 8, r: 2 };
  const out = [S(k.slabOf(win, TOP, 0.6, P, 3), { tone: "lo", crease: "none" })];
  out.push(L(k.planOutline(k.insetPlan(win, 1.2), TOP + 0.6, P, 3), { tone: "faint" }));
  // The 0 dB rule runs across the window, edge to edge.
  const zeroY = METER_Y0 - METER_DB.indexOf(0) * METER_STEP;
  out.push(L(k.lineOnTop([win.x + 1.2, zeroY - METER_STEP / 2], [win.x + win.w - 1.2, zeroY - METER_STEP / 2], TOP + 0.6, P), { tone: "lo" }));
  METER_DB.forEach((db, index) => {
    const y = METER_Y0 - index * METER_STEP;
    const points = METER_X.map((x) => at([x, y, TOP + 0.6]));
    out.push(`<g data-seg="${index}">${D(points, { size: db > 0 ? 1.05 : 0.85, tone: "faint" })}</g>`);
  });
  return out.join("");
}

function collar(x, y, r = 10.4) {
  const out = [S(k.cylinder(x, y, r, TOP, COLLAR_H, P, 48), { tone: "lo", crease: "none" })];
  const ticks = k.radialTicks(x, y, r, 10, 5, TOP + COLLAR_H, [1.1, 2.1], P, KILL, -2 * KILL);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function knob(x, y, { part, tone = "hi", angle = 0, lit = false, small = false } = {}) {
  const r = small ? 5 : KNOB_R;
  const cap = small ? 3.8 : CAP_R;
  const z0 = TOP + COLLAR_H;
  const top = z0 + 1.6 + CAP_H;
  const out = [S(k.cylinder(x, y, r, z0, 1.6, P, 36), { tone: "mid" })];
  out.push(S(k.cylinder(x, y, cap, z0 + 1.6, CAP_H, P, 36, 0.4), { tone, crease: "lo" }));
  out.push(L(k.knurl(x, y, cap, z0 + 1.6, top - 1.2, 28, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, cap, top - 1.2, P, 24), { tone: "faint" }));
  const d = k.lineOnTop([x, y], [x + Math.sin(angle) * (cap - 0.8), y - Math.cos(angle) * (cap - 0.8)], top + 0.1, P);
  out.push(`<path class="iso-line" data-tone="${lit ? "lit" : "hi"}" data-free="start"${part ? ` data-part="${part}"` : ""} d="${d}" style="stroke-width:${lit ? 1.1 : 0.8}"/>`);
  return out.join("");
}

function faderBed(x) {
  const out = [];
  const slot = { x: x - 1.3, y: SLOT.y0, w: 2.6, d: SLOT.y1 - SLOT.y0, r: 1.3 };
  out.push(S(k.slabOf(slot, TOP - 0.05, 0.1, P, 3), { tone: "lo", flat: true, crease: "none" }));
  out.push(L(k.planOutline(slot, TOP, P, 3), { tone: "lo" }));
  const strip = { x: x + 6, y: FADER.full - 2, w: 4.5, d: FADER.zero - FADER.full + 4, r: 0.8 };
  out.push(S(k.slabOf(strip, TOP, 0.4, P, 2), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(FADER.full, FADER.zero, 4, 3, strip.x, TOP + 0.4, [1.8, 3.4], P, "y");
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function faderCap() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(CAP, 1), TOP, 0.1, P)}" style="filter:blur(2px)"/>`];
  out.push(S(k.slabOf({ x: -1.2, y: -1.2, w: 2.4, d: 2.4, r: 1 }, TOP, 2, P, 3), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf(CAP, TOP + 2, CAP_TOP - TOP - 2, P, 4, 0.4), { tone: "hi", crease: "lo" }));
  for (const y of [-1.6, 0, 1.6]) out.push(L(k.lineOnTop([CAP.x, y], [CAP.x + CAP.w, y], CAP_TOP, P), { tone: y === 0 ? "mid" : "lo" }));
  return out.join("");
}

function crossfader() {
  const out = [];
  const slot = { x: -30, y: 87.7, w: 60, d: 2.6, r: 1.3 };
  out.push(S(k.slabOf(slot, TOP - 0.05, 0.1, P, 3), { tone: "lo", flat: true, crease: "none" }));
  out.push(L(k.planOutline(slot, TOP, P, 3), { tone: "lo" }));
  const strip = { x: -30, y: 93, w: 60, d: 4, r: 0.8 };
  out.push(S(k.slabOf(strip, TOP, 0.4, P, 2), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(-28, 28, 4, 7, strip.y, TOP + 0.4, [1.6, 3], P, "x");
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function crossCap() {
  const plan = { x: -3.5, y: 85.5, w: 7, d: 7, r: 1.6 };
  return S(k.slabOf(plan, TOP, 5, P, 4, 0.4), { tone: "mid", crease: "lo" }) + L(k.lineOnTop([plan.x + 3.5, plan.y], [plan.x + 3.5, plan.y + plan.d], TOP + 5, P), { tone: "lo" });
}

function cue(x, y) {
  const plan = { x: x - 4.5, y: y - 3, w: 9, d: 6, r: 1.4 };
  return S(k.slabOf(k.insetPlan(plan, -1), TOP, 0.5, P, 3), { tone: "lo", crease: "none" }) + S(k.slabOf(plan, TOP + 0.5, 1.8, P, 3, 0.4), { tone: "mid" });
}

function labelPlate() {
  const plan = { x: 44, y: 83, w: 20, d: 11, r: 1 };
  const z = TOP + 0.6;
  const out = [S(k.slabOf(plan, TOP, 0.6, P, 3), { tone: "lo", crease: "none" })];
  out.push(L(k.planOutline(k.insetPlan(plan, 1.4), z, P, 3), { tone: "faint" }));
  [[4, 14], [4, 10], [4, 12]].forEach(([from, length], index) => out.push(L(k.lineOnTop([plan.x + from, plan.y + 3.4 + index * 2.2], [plan.x + from + length - 2, plan.y + 3.4 + index * 2.2], z, P), { tone: "lo", free: true })));
  return out.join("");
}

// Flat inlays first, then everything that stands up, far to near.
const rest = mixAt(0, 1);
const faderY = (level) => FADER.zero - level * (FADER.zero - FADER.full);
const flat = [phraseStrip(), meter(), crossfader(), labelPlate()];
const tall = [];
CH.forEach((x, index) => {
  const side = index === 0 ? "a" : "b";
  flat.push(faderBed(x));
  for (const [name, y] of Object.entries(KNOBS)) {
    flat.push(collar(x, y));
    const low = name === "low";
    const level = low ? (index === 0 ? rest.lowA : rest.lowB) : 1;
    tall.push({ key: depth(x, y), svg: knob(x, y, { part: low ? `low-${side}` : undefined, lit: low, angle: KILL * (1 - level), tone: name === "gain" ? "mid" : "hi" }) });
  }
  const level = index === 0 ? rest.faderA : rest.faderB;
  tall.push({ key: depth(x, faderY(level)), svg: `<g data-part="fader-${side}" transform="${k.translateAlong(P, [x, faderY(level), 0])}">${faderCap()}</g>` });
  tall.push({ key: depth(x, 74), svg: cue(x, 74) });
});
for (const [y, small] of [[8, false], [28, true], [48, true]]) {
  flat.push(collar(0, y, small ? 8.4 : 10.4));
  tall.push({ key: depth(0, y), svg: knob(0, y, { small, tone: "mid" }) });
}
tall.push({ key: depth(0, 89), svg: crossCap() });
tall.sort((a, b) => a.key - b.key);

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A two-channel DJ mixer. Each channel has gain, high, mid and low knobs over a long fader; between them sit a master meter and a row of 32 bar lights. Over a 32-bar blend, channel B's fader rises with its low cut, the two low knobs swap on the downbeat of bar 17, and channel A's fader falls, so the master meter stays at 0 dB.",
  body: [chassis(), faceplate(), ...flat, ...tall.map((item) => item.svg)],
});

const body = k.plateHtml({
  fig: "Fig 1",
  title: "The perfect blend",
  hint: "Hover: scrub · click: no swap",
  readout: "bar 1 · B in, bass cut · bass 0.0 dB",
  keys: [
    { mark: "lit", label: "Low knobs: the bass swaps on the downbeat of bar 17" },
    { mark: "raised", label: "Channel faders: B in over bars 1–8, A out over 25–32" },
    { mark: "dotted", label: "Bar lights: four 8-bar phrases" },
  ],
  caption:
    "The meter shows the low end: steady at 0 dB with the swap, peaking up to +6 dB with both basslines in.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="DJ mixer blend: arrow keys move through the 32 bars, Enter toggles the bass swap" aria-valuemin="1" aria-valuemax="32" aria-valuenow="1">${svg}</div>`,
});


const origin = k.iso([0, 0, 0], P);
const axis = (v) => k.axisVector(P, v).map((n) => Math.round(n * 1e4) / 1e4);
const art = {
  html: body,
  origin: origin.map((n) => Math.round(n * 1e4) / 1e4),
  ax: axis([1, 0, 0]),
  ay: axis([0, 1, 0]),
  az: axis([0, 0, 1]),
  ch: CH,
  lowY: KNOBS.low,
  kill: KILL,
  capR: CAP_R,
  knobTop: KNOB_TOP,
  fader: FADER,
  meterDb: METER_DB,
};
const out = new URL("../../src/components/learn/perfect-blend-art.ts", import.meta.url);
writeFileSync(out, `// Generated by scripts/figures/perfect-blend.mjs. Do not edit by hand.\nexport const art = ${JSON.stringify(art, null, 2)} as const\n`);
console.log("wrote", out.pathname);

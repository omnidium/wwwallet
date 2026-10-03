<script setup lang="ts">
// A globe drawn as a field of dots, with a dozen
// equal nodes spread across it, linked into a network with no centre and
// nobody's node bigger than anyone else's. Signals travel along the links.
// Generated here rather than shipped as an image: original artwork,
// theme-aware via CSS variables, and a few KB of markup.
//
// The network is drawn afresh on every load — where the nodes sit, which
// are linked and how many links there are, each node's colour (one of the
// brand gradient's three hues; a link fades between its two ends') and the
// signals' timing. It's a dozen points' worth of arithmetic, done once as
// the component is created: no measurable delay, nothing running per frame
// beyond the existing CSS signal animation. Both users render client-side
// only, so there's no server copy for this to disagree with.
//
// Shared by the marketing site's hero and the wallet app's lock screen
// (where it's a full-screen watermark — `fill`), so the two stay one
// artwork. Uses only shared/design-tokens.css variables, which both load.

// ─── Tuning ────────────────────────────────────────────────────────────────
// Everything about how the animation looks and moves. Sizes are in the
// artwork's own units: the globe is 392 across (R × 2) in a 380 box.
// (On the wallet's lock screen the whole globe is also dimmed — see
// `.lock-watermark`'s opacity in frontend/src/assets/main.css.)

/** Pills (the signals travelling along the links) */

/** Seconds a pill takes to travel its link, picked per link at random from
 *  this range: higher is slower; a narrower range, more even speeds. */
const PILL_TRIP_SECONDS = { min: 4, max: 12.6 }
/** Each link's first pill sets off at a random point within this many
 *  seconds of the page loading, so they don't all move in step. */
const PILL_START_SPREAD_SECONDS = PILL_TRIP_SECONDS.max
/** How long a pill is, as a percentage of its link's length. */
const PILL_LENGTH_PERCENT = 6
/** How thick a pill is (the links themselves are 1.4). */
const PILL_WIDTH = 2.9

/** Flashes (a node lighting up as a pill reaches it) */

/** How far through its trip a pill is when its node flashes, from 0 to 1.
 *  The pill's front touches the node at 1 − PILL_LENGTH_PERCENT / 100
 *  (0.94); raise it slightly if the flash seems to fire before the pill lands. */
const FLASH_AT = 0.95
/** The flash's colour: null to light each node in its own colour (one of
 *  the three brand hues), or any CSS colour — '#fff', 'var(--accent)' — for
 *  every flash to be the same. */
const FLASH_COLOUR: string | null = 'var(--flash-hue)' //null
/** Brightness at the burst's peak, from 0 (invisible) to 1 (full). */
const FLASH_PEAK_OPACITY = 0.8
/** Seconds from nothing to full brightness: the "burst". Keep it short. */
const FLASH_BURST_SECONDS = 0.05
/** Seconds the glow around the node takes to fade out after the burst. */
const FLASH_GLOW_FADE_SECONDS = 1
/** Seconds the node's lit-up centre takes to fade out after the burst. */
const FLASH_CORE_FADE_SECONDS = 1.5
/** The fade's shape. 'ease-out': most of the light goes quickly and the
 *  last of it lingers. 'linear': an even fade. 'ease-in': holds bright,
 *  then drops away. Any CSS easing works. Fades are cut short if they'd
 *  run into the same link's next flash. */
const FLASH_FADE_EASING = 'ease-out'
/** Radius of the glow around the node (the node's ring is 4.2; its
 *  always-on halo, 9). */
const FLASH_GLOW_RADIUS = 22
/** How much the glow swells as it fades: 1 for not at all. */
const FLASH_GLOW_GROWTH = 1.35
/** The glow's strength from 0 to 1, at its centre and halfway out; it
 *  always fades to nothing at its edge. Higher is a brighter, harder glow. */
const FLASH_GLOW_STRENGTH = { centre: 0.85, halfway: 0.35 }
/** Radius of the node's centre filling with light. Much past 3.4 starts to
 *  cover the node's ring (4.2). */
const FLASH_CORE_RADIUS = 3
// ───────────────────────────────────────────────────────────────────────────

const props = defineProps<{
  /** Grow to whatever size the container gives it, rather than the hero's 460px cap. */
  fill?: boolean
}>()

const SIZE = 380
const C = SIZE / 2
const R = 196
// Tilts the globe toward the viewer so the dot rows read as latitude lines.
const TILT = (22 * Math.PI) / 180

interface P3 { x: number; y: number; z: number }

function project(lat: number, lon: number): P3 {
  const x = Math.cos(lat) * Math.sin(lon)
  const y = Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lon)
  // Rotate about the x axis by TILT.
  const y2 = y * Math.cos(TILT) - z * Math.sin(TILT)
  const z2 = y * Math.sin(TILT) + z * Math.cos(TILT)
  return { x: C + R * x, y: C - R * y2, z: z2 }
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1))

const dots: { x: number; y: number; o: number }[] = []
for (let latDeg = -78; latDeg <= 78; latDeg += 8) {
  const lat = (latDeg * Math.PI) / 180
  // Roughly even spacing along each ring: fewer dots near the poles.
  const count = Math.max(6, Math.round(46 * Math.cos(lat)))
  for (let i = 0; i < count; i++) {
    const p = project(lat, (i / count) * 2 * Math.PI)
    if (p.z > -0.05) dots.push({ x: p.x, y: p.y, o: 0.18 + 0.62 * Math.max(0, p.z) })
  }
}

// Nodes from a Fibonacci sphere (the even spread sunflower seeds use),
// spun to a random longitude and nudged a little each, keeping those on the
// visible face and well apart: scattered evenly, no two clumped, none
// privileged — and never the same arrangement twice.
const CANDIDATES = 64
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const MIN_NODE_GAP = 62
const spin = rand(0, 2 * Math.PI)
const nodes: P3[] = []
for (let i = 0; i < CANDIDATES; i++) {
  const lat = Math.asin(1 - (2 * (i + 0.5)) / CANDIDATES) + rand(-0.06, 0.06)
  const p = project(lat, i * GOLDEN_ANGLE + spin + rand(-0.08, 0.08))
  if (p.z > 0.3 && nodes.every((n) => Math.hypot(n.x - p.x, n.y - p.y) > MIN_NODE_GAP)) nodes.push(p)
}

const dist = (i: number, j: number) => Math.hypot(nodes[i]!.x - nodes[j]!.x, nodes[i]!.y - nodes[j]!.y)

// Straight chords cross if each pair of ends lies on opposite sides of the
// other — close enough for the gently bowed arcs actually drawn.
function crosses([a, b]: [number, number], [c, d]: [number, number]): boolean {
  if (a === c || a === d || b === c || b === d) return false
  const side = (p: P3, q: P3, r: P3) => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x))
  const [A, B, Cn, D] = [nodes[a]!, nodes[b]!, nodes[c]!, nodes[d]!]
  return side(A, B, Cn) !== side(A, B, D) && side(Cn, D, A) !== side(Cn, D, B)
}

// Links: first the shortest tree joining every node (Prim's), so the
// network is always one piece; then a random handful of extra short links —
// each among a node's three nearest, and never crossing one already drawn.
const edges: [number, number][] = []
if (nodes.length > 1) {
  const joined = new Set([0])
  while (joined.size < nodes.length) {
    let best: [number, number] | null = null
    for (const i of joined) {
      for (let j = 0; j < nodes.length; j++) {
        if (!joined.has(j) && (!best || dist(i, j) < dist(best[0], best[1]))) best = [i, j]
      }
    }
    edges.push(best!)
    joined.add(best![1])
  }
  const has = (i: number, j: number) => edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
  const extras = nodes
    .flatMap((_, i) =>
      nodes
        .map((_, j) => j)
        .filter((j) => j !== i)
        .sort((p, q) => dist(i, p) - dist(i, q))
        .slice(0, 3)
        .map((j): [number, number] => [Math.min(i, j), Math.max(i, j)]),
    )
    .filter(([i, j], k, all) => !has(i, j) && all.findIndex(([a, b]) => a === i && b === j) === k)
    .sort(() => Math.random() - 0.5)
  let wanted = randInt(2, Math.min(6, Math.ceil(nodes.length / 2)))
  for (const edge of extras) {
    if (wanted === 0) break
    if (edges.some((e) => crosses(e, edge))) continue
    edges.push(edge)
    wanted--
  }
}

// Each node takes one of the brand gradient's hues; a link fades from one
// end's colour to the other's.
const HUES = ['var(--ink-1)', 'var(--ink-2)', 'var(--ink-3)']
const nodeHue = nodes.map(() => HUES[randInt(0, HUES.length - 1)]!)

// Unique per mount, so gradient ids can't collide with another instance's.
const uid = Math.random().toString(36).slice(2, 8)

// Arcs bow outward from the globe's centre so they read as routes over its
// surface.
const links = edges.map(([i, j], k) => {
  const a = nodes[i]!
  const b = nodes[j]!
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const lift = 0.22
  const cx = mx + (mx - C) * lift
  const cy = my + (my - C) * lift
  return {
    id: `hero-link-${uid}-${k}`,
    d: `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
    from: { x: a.x, y: a.y, hue: nodeHue[i]! },
    to: { x: b.x, y: b.y, hue: nodeHue[j]! },
    toNode: j,
    delay: rand(0, PILL_START_SPREAD_SECONDS),
    dur: rand(PILL_TRIP_SECONDS.min, PILL_TRIP_SECONDS.max),
  }
})

const signalStyle = (link: (typeof links)[number]) => ({
  animationDelay: `${link.delay}s`,
  animationDuration: `${link.dur}s`,
  strokeWidth: PILL_WIDTH,
  strokeDasharray: `${PILL_LENGTH_PERCENT} ${100 - PILL_LENGTH_PERCENT}`,
})

// Each link lights its far node as its pill arrives: the flash repeats on
// the pill's cycle, started FLASH_AT of the way into it, so the burst lands
// on the impact and the fade can run on past the cycle's end into the next.
const flashes = links.map((link) => ({
  key: link.id,
  x: nodes[link.toNode]!.x,
  y: nodes[link.toNode]!.y,
  hueIndex: HUES.indexOf(nodeHue[link.toNode]!),
  delay: link.delay + FLASH_AT * link.dur,
  dur: link.dur,
}))
const flashGlowColours = FLASH_COLOUR ? [FLASH_COLOUR] : HUES
const flashGlowFill = (hueIndex: number) => `url(#hero-flash-${uid}-${FLASH_COLOUR ? 0 : hueIndex})`
const flashCoreColour = (hueIndex: number) => FLASH_COLOUR ?? HUES[hueIndex]!

// Run with the Web Animations API rather than CSS keyframes, whose
// percentages couldn't come from the settings above: burst and fade are set
// in seconds, so they hold whatever a link's trip time. They run on the
// compositor, like the pills; nothing here runs per frame.
function flashKeyframes(dur: number, fadeSeconds: number, grow: boolean): Keyframe[] {
  const burst = Math.min(FLASH_BURST_SECONDS / dur, 0.5)
  // Out by the time the same link's next flash starts.
  const faded = Math.min(burst + fadeSeconds / dur, 0.98)
  const scale = (value: number) => (grow ? { transform: `scale(${value})` } : {})
  return [
    { offset: 0, opacity: 0, ...scale(0.4), easing: 'ease-out' },
    { offset: burst, opacity: Math.min(Math.random(), FLASH_PEAK_OPACITY), ...scale(1), easing: FLASH_FADE_EASING },
    { offset: faded, opacity: 0, ...scale(FLASH_GLOW_GROWTH) },
    { offset: 1, opacity: 0, ...scale(FLASH_GLOW_GROWTH) },
  ]
}

const reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
const running = new Map<string, Animation>()

// A template ref callback: Vue calls it with the element once it's in the
// page (start its flash) and with null once it's gone (stop it).
function flashRef(flash: (typeof flashes)[number], part: 'glow' | 'core') {
  const key = `${part}:${flash.key}`
  return (el: unknown) => {
    if (!(el instanceof Element)) {
      running.get(key)?.cancel()
      running.delete(key)
      return
    }
    if (running.has(key) || reducedMotion || typeof el.animate !== 'function') return
    const fade = part === 'glow' ? FLASH_GLOW_FADE_SECONDS : FLASH_CORE_FADE_SECONDS
    running.set(
      key,
      el.animate(flashKeyframes(flash.dur, fade, part === 'glow'), {
        duration: flash.dur * 1000,
        delay: flash.delay * 1000,
        iterations: Infinity,
      }),
    )
  }
}
</script>

<template>
  <svg class="hero-graphic" :class="{ 'hero-graphic--fill': props.fill }" :viewBox="`0 0 ${SIZE} ${SIZE}`" role="img"
    aria-hidden="true">
    <defs>
      <!-- One per link, running end to end along it in its two nodes' hues. -->
      <linearGradient v-for="link in links" :id="link.id" :key="link.id" gradientUnits="userSpaceOnUse"
        :x1="link.from.x" :y1="link.from.y" :x2="link.to.x" :y2="link.to.y">
        <stop offset="0%" :style="{ stopColor: link.from.hue }" />
        <stop offset="100%" :style="{ stopColor: link.to.hue }" />
      </linearGradient>
      <!-- A soft burst of light per hue, for the nodes' flashes. -->
      <radialGradient v-for="(colour, h) in flashGlowColours" :id="`hero-flash-${uid}-${h}`" :key="`f${h}`">
        <stop offset="0%" :style="{ stopColor: colour, stopOpacity: FLASH_GLOW_STRENGTH.centre }" />
        <stop offset="50%" :style="{ stopColor: colour, stopOpacity: FLASH_GLOW_STRENGTH.halfway }" />
        <stop offset="100%" :style="{ stopColor: colour, stopOpacity: 0 }" />
      </radialGradient>
      <radialGradient id="hero-glow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" style="stop-color: rgb(var(--accent-rgb) / 0.16)" />
        <stop offset="100%" style="stop-color: rgb(var(--accent-rgb) / 0)" />
      </radialGradient>
    </defs>

    <circle :cx="C" :cy="C" :r="R + 30" fill="url(#hero-glow)" />
    <circle :cx="C" :cy="C" :r="R" class="hero-rim" />

    <g class="hero-dots">
      <circle v-for="(dot, i) in dots" :key="i" :cx="dot.x" :cy="dot.y" r="1.6" :opacity="dot.o" />
    </g>

    <g fill="none" stroke-linecap="round">
      <path v-for="link in links" :key="`l${link.id}`" :d="link.d" :stroke="`url(#${link.id})`" class="hero-link" />
      <path v-for="link in links" :key="`s${link.id}`" :d="link.d" :stroke="`url(#${link.id})`" pathLength="100"
        class="hero-signal" :style="signalStyle(link)" />
    </g>

    <!-- Under the nodes: the glow each arriving signal sets off. -->
    <circle v-for="flash in flashes" :key="`g${flash.key}`" :ref="flashRef(flash, 'glow')" :cx="flash.x" :cy="flash.y"
      :r="FLASH_GLOW_RADIUS" :fill="flashGlowFill(flash.hueIndex)" class="hero-flash" />

    <g v-for="(node, i) in nodes" :key="`n${i}`" :style="{ color: nodeHue[i] }">
      <circle :cx="node.x" :cy="node.y" r="9" class="hero-node-halo" />
      <circle :cx="node.x" :cy="node.y" r="4.2" class="hero-node" />
    </g>

    <!-- Over them: the hollow centre filling with light at the same moment. -->
    <circle v-for="flash in flashes" :key="`c${flash.key}`" :ref="flashRef(flash, 'core')" :cx="flash.x" :cy="flash.y"
      :r="FLASH_CORE_RADIUS" :style="{ fill: flashCoreColour(flash.hueIndex) }" class="hero-flash" />
  </svg>
</template>

<style scoped>
.hero-graphic {
  width: 100%;
  height: auto;
  max-width: 460px;
  overflow: visible;
}

.hero-graphic--fill {
  max-width: none;
  height: 100%;
}

.hero-rim {
  fill: none;
  stroke: rgb(var(--border-rgb) / 10%);
  stroke-width: 1;
}

.hero-dots {
  fill: var(--accent-ink);
}

.hero-link {
  stroke-width: 1.4;
  opacity: 0.55;
}

.hero-signal {
  /* Width and length: PILL_WIDTH, PILL_LENGTH_PERCENT. */
  stroke-dashoffset: 100;
  opacity: 0;
  animation: hero-signal linear infinite;
}

@keyframes hero-signal {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  /* Fully lit until it reaches its node, then gone into it. */
  93% {
    opacity: 1;
  }

  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

/* A node lighting up as a signal arrives — animated from the script (see
 * the FLASH_ settings), and invisible until then. */
.hero-flash {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  pointer-events: none;
}

.hero-node {
  fill: var(--bg);
  stroke: currentColor;
  stroke-width: 2.2;
}

/* Each node's group sets `color` to its hue. */
.hero-node-halo {
  fill: currentColor;
  fill-opacity: 0.14;
}

@media (prefers-reduced-motion: reduce) {

  /* The flashes check this themselves, before starting. */
  .hero-signal {
    animation: none;
  }
}
</style>

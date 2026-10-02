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

const props = defineProps<{
  /** Grow to whatever size the container gives it, rather than the hero's 460px cap. */
  fill?: boolean
}>()

const SIZE = 440
const C = SIZE / 2
const R = 176
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
    delay: rand(0, 5),
    dur: rand(3.2, 5.6),
  }
})
</script>

<template>
  <svg class="hero-graphic" :class="{ 'hero-graphic--fill': props.fill }" :viewBox="`0 0 ${SIZE} ${SIZE}`" role="img" aria-hidden="true">
    <defs>
      <!-- One per link, running end to end along it in its two nodes' hues. -->
      <linearGradient v-for="link in links" :id="link.id" :key="link.id" gradientUnits="userSpaceOnUse"
        :x1="link.from.x" :y1="link.from.y" :x2="link.to.x" :y2="link.to.y">
        <stop offset="0%" :style="{ stopColor: link.from.hue }" />
        <stop offset="100%" :style="{ stopColor: link.to.hue }" />
      </linearGradient>
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
        class="hero-signal" :style="{ animationDelay: `${link.delay}s`, animationDuration: `${link.dur}s` }" />
    </g>

    <g v-for="(node, i) in nodes" :key="`n${i}`" :style="{ color: nodeHue[i] }">
      <circle :cx="node.x" :cy="node.y" r="9" class="hero-node-halo" />
      <circle :cx="node.x" :cy="node.y" r="4.2" class="hero-node" />
    </g>
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
  stroke-width: 2.6;
  stroke-dasharray: 6 94;
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

  80% {
    opacity: 1;
  }

  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
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
  .hero-signal {
    animation: none;
  }
}
</style>

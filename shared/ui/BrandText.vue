<script setup lang="ts">
// Renders a translated string with every "wwwallet" in it set apart as the
// brand, so the name never blurs into the noun "wallet": in the accent
// colour, medium weight in running text (text that's already bold keeps its
// weight; buttons, whose background is often the accent, keep their colour).
//
// Done at render time, on the finished translation, rather than with a
// {brand} placeholder in the copy: the name is never translated (DeepL keeps
// it as written in every locale), so finding it here works in all of them,
// while splitting sentences around it wouldn't (see master_en.ts). Only for
// visible text — titles, aria-labels and other attributes stay plain strings.
//
// Shared by the website and the wallet app. No imports, so it type-checks
// from either project (see NetworkGlobe.vue).

const props = defineProps<{ text: string }>()

const BRAND = 'wwwallet'
const PATTERN = new RegExp(`(${BRAND})`)
// split() keeps the captured name in place, as its own part.
const parts = () => props.text.split(PATTERN)
</script>

<template>
  <!-- One wrapping element, so in a flex row (an icon beside its label) the
       text stays one item instead of each part becoming its own column. -->
  <span>
    <template v-for="(part, i) in parts()" :key="i">
      <span v-if="part === BRAND" class="brand-name">{{ part }}</span>
      <template v-else>{{ part }}</template>
    </template>
  </span>
</template>

<!-- Unscoped: it's styled by where it sits (a heading, a button), which a
     scoped style couldn't see. -->
<style>
.brand-name {
  /* Medium: the heaviest body weight both apps load (Roboto 300–500), so
   * it's the real face rather than a bolder one synthesised from it. */
  font-weight: 500;
  color: var(--accent-ink);
  /* Never broken across lines, and always lowercase — even in text set in
   * capitals, like the website's section eyebrows. */
  white-space: nowrap;
  text-transform: none;
  /* Spacing meant for capitals spreads a lowercase word apart. */
  letter-spacing: normal;
}

/* Already-bold text: keeps its own weight, still in the accent colour. */
:is(h1, h2, h3, h4, h5, h6, strong, b, summary, th, dt, .v-card-title, .v-alert-title, .v-toolbar-title) .brand-name {
  font-weight: inherit;
}

/* Buttons: the accent is often their own background, so the name takes the
 * button's text colour and weight instead. */
:is(button, .btn, .v-btn) .brand-name {
  font-weight: inherit;
  color: inherit;
}
</style>

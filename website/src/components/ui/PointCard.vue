<script setup lang="ts">
import LineIcon, { type IconName } from './LineIcon.vue'

defineProps<{ title: string; body: string; icon?: IconName }>()
</script>

<template>
  <article class="point-card">
    <span v-if="icon" class="point-icon">
      <LineIcon :name="icon" :size="22" />
    </span>
    <h3>{{ title }}</h3>
    <p>{{ body }}</p>
  </article>
</template>

<style scoped>
.point-card {
  background: rgb(var(--surface-rgb) / 60%);
  border: 1px solid rgb(var(--border-rgb) / 10%);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-card);
}

/* A soft tile in the accent tint — enough to anchor each card visually
   without competing with its heading. */
.point-icon {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-md);
  color: var(--accent-ink);
  background: rgb(var(--accent-rgb) / 12%);
  border: 1px solid rgb(var(--accent-rgb) / 22%);
}

.point-card h3 {
  font-size: 1.1rem;
  margin-bottom: var(--space-2);
}

.point-card p {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.95rem;
}
</style>

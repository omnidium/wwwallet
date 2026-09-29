<script setup lang="ts">
defineProps<{ title: string; body: string }>()
</script>

<template>
  <article class="point-card">
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

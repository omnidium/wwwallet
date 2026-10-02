<script setup lang="ts">
defineProps<{ question: string; answer: string }>()
</script>

<template>
  <details class="faq-item">
    <summary>
      <span>{{ question }}</span>
      <svg class="chevron" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </summary>
    <p>{{ answer }}</p>
  </details>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid rgb(var(--border-rgb) / 10%);
  padding: var(--space-3) 0;
}

.faq-item summary {
  cursor: pointer;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.05rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.chevron {
  flex-shrink: 0;
  color: var(--accent-ink);
  transition: transform 0.15s ease;
}

.faq-item[open] .chevron {
  transform: rotate(180deg);
}

.faq-item p {
  margin: var(--space-2) 0 0;
  color: var(--text-muted);
}
</style>

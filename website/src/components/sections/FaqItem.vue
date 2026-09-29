<script setup lang="ts">
defineProps<{ question: string; answer: string }>()
</script>

<template>
  <details class="faq-item">
    <summary>
      <span>{{ question }}</span>
      <svg
        class="chevron"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
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
  color: var(--accent);
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

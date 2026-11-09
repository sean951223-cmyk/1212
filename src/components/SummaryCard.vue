<script setup>
defineProps({
  label: String, value: [String, Number], icon: String,
  tone: { type: String, default: 'brown' }, hint: String
})
</script>

<template>
  <article class="summary-card">
    <div class="summary-top">
      <span class="summary-label">{{ label }}</span>
      <span class="summary-icon" :class="tone">{{ icon }}</span>
    </div>
    <strong class="summary-value">{{ value }}</strong>
    <span class="summary-hint">{{ hint }}</span>
  </article>
</template>

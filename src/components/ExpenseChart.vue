<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)
const props = defineProps({ items: { type: Array, default: () => [] } })
const canvas = ref(null)
let chart
function draw() {
  const totals = {}
  props.items.filter(x => x.type === 'expense').forEach(x => {
    totals[x.category] = (totals[x.category] || 0) + Number(x.amount)
  })
  const labels = Object.keys(totals)
  const data = Object.values(totals)
  if (chart) chart.destroy()
  if (!canvas.value) return
  chart = new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: labels.length ? labels : ['尚無支出'],
      datasets: [{ data: data.length ? data : [1], backgroundColor: ['#c77b45', '#8b654d', '#e2b98c', '#a8a17d', '#d99b70', '#6f8979', '#c9aa8c', '#b9a7a0'], borderWidth: 0, hoverOffset: 5 }]
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 18, font: { family: 'inherit' } } } } }
  })
}
onMounted(draw)
watch(() => props.items, draw, { deep: true })
onBeforeUnmount(() => chart?.destroy())
</script>

<template><div class="chart-wrap"><canvas ref="canvas"></canvas></div></template>

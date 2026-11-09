<script setup>
import { computed, ref } from 'vue'
import { transactions } from '../composables/useFinance'
import ExpenseChart from '../components/ExpenseChart.vue'
const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const items = computed(() => transactions.value.filter(x => x.date?.startsWith(selectedMonth.value)))
const income = computed(() => items.value.filter(x => x.type === 'income').reduce((s,x) => s + Number(x.amount), 0))
const expense = computed(() => items.value.filter(x => x.type === 'expense').reduce((s,x) => s + Number(x.amount), 0))
const groups = computed(() => {
  const result = {}
  items.value.filter(x => x.type === 'expense').forEach(x => result[x.category] = (result[x.category] || 0) + Number(x.amount))
  return Object.entries(result).sort((a,b) => b[1] - a[1])
})
const money = n => '$' + new Intl.NumberFormat('zh-TW').format(n)
</script>

<template>
  <div class="page-heading"><div><span class="eyebrow">STATISTICS</span><h2>統計分析</h2><p>透過數據了解自己的消費習慣。</p></div><input v-model="selectedMonth" type="month" class="month-picker" /></div>
  <div class="summary-grid two">
    <article class="summary-card"><span class="summary-label">本月收入</span><strong class="summary-value income-text">{{ money(income) }}</strong><span class="summary-hint">所選月份的收入總額</span></article>
    <article class="summary-card"><span class="summary-label">本月支出</span><strong class="summary-value expense-text">{{ money(expense) }}</strong><span class="summary-hint">所選月份的支出總額</span></article>
  </div>
  <div class="dashboard-grid statistics-grid">
    <section class="panel"><div class="panel-heading"><div><h3>支出比例</h3><p>各類別支出分布</p></div></div><ExpenseChart :items="items" /></section>
    <section class="panel"><div class="panel-heading"><div><h3>分類明細</h3><p>依支出金額由高至低排列</p></div></div>
      <div v-if="groups.length" class="category-breakdown">
        <div v-for="[name, amount] in groups" :key="name" class="category-line"><div><strong>{{ name }}</strong><span>{{ money(amount) }}</span></div><div class="progress-track"><div class="progress-fill" :style="{ width: (expense ? amount / expense * 100 : 0) + '%' }"></div></div><small>{{ expense ? (amount / expense * 100).toFixed(1) : 0 }}%</small></div>
      </div>
      <div v-else class="empty-state"><div>📊</div><strong>尚無支出資料</strong><span>選擇其他月份或新增支出紀錄。</span></div>
    </section>
  </div>
  <section class="panel insight-panel"><span class="insight-icon">💡</span><div><strong>本月收支小結</strong><p>本月收支差額為 <b>{{ money(income - expense) }}</b>。持續記錄每筆消費，就能更清楚掌握金錢流向。</p></div></section>
</template>

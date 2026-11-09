<script setup>
import { computed, ref, watch } from 'vue'
import { monthlyBudget, transactions, monthKey } from '../composables/useFinance'
const draft = ref(monthlyBudget.value)
watch(monthlyBudget, value => draft.value = value)
const thisMonthExpense = computed(() => transactions.value.filter(x => x.type === 'expense' && x.date?.slice(0,7) === monthKey()).reduce((s,x) => s + Number(x.amount), 0))
const percent = computed(() => monthlyBudget.value > 0 ? thisMonthExpense.value / monthlyBudget.value * 100 : 0)
const remaining = computed(() => monthlyBudget.value - thisMonthExpense.value)
const money = n => '$' + new Intl.NumberFormat('zh-TW').format(n)
function save() {
  if (Number(draft.value) > 0) monthlyBudget.value = Number(draft.value)
}
</script>

<template>
  <div class="page-heading"><div><span class="eyebrow">BUDGET PLANNER</span><h2>預算管理</h2><p>為自己設定每月支出目標，讓消費更有計畫。</p></div></div>
  <section class="panel budget-editor">
    <div class="panel-heading"><div><h3>設定每月預算</h3><p>設定完成後，首頁會同步顯示預算使用狀況。</p></div><span class="budget-icon">◎</span></div>
    <div class="budget-input-row"><label class="field"><span>每月支出上限（NT$）</span><input v-model.number="draft" type="number" min="1" step="100" /></label><button class="btn btn-primary" @click="save">儲存預算</button></div>
  </section>
  <section class="panel budget-status">
    <div class="panel-heading"><div><h3>本月預算狀態</h3><p>{{ new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' }) }}</p></div><span class="status-pill" :class="{ danger: percent >= 100, warning: percent >= 80 && percent < 100 }">{{ percent >= 100 ? '已超出預算' : percent >= 80 ? '接近預算上限' : '控制良好' }}</span></div>
    <div class="budget-large-number">{{ money(thisMonthExpense) }} <span>/ {{ money(monthlyBudget) }}</span></div>
    <div class="progress-track large"><div class="progress-fill" :class="{ warning: percent >= 80, danger: percent >= 100 }" :style="{ width: Math.min(100, percent) + '%' }"></div></div>
    <div class="budget-detail"><div><span>預算使用率</span><strong>{{ percent.toFixed(1) }}%</strong></div><div><span>{{ remaining >= 0 ? '尚可使用' : '超出金額' }}</span><strong :class="remaining >= 0 ? 'income-text' : 'expense-text'">{{ money(Math.abs(remaining)) }}</strong></div></div>
  </section>
  <section class="tip-card wide-tip"><span>🌱 預算小技巧</span><p>可以先記錄一個月的日常開銷，再依照實際需求設定合理的預算。預算是幫助規劃生活，不是限制生活。</p></section>
</template>

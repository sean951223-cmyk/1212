<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { transactions, totalIncome, totalExpense, balance, monthlyBudget, monthKey } from '../composables/useFinance'
import SummaryCard from '../components/SummaryCard.vue'
import TransactionList from '../components/TransactionList.vue'
import ExpenseChart from '../components/ExpenseChart.vue'
const router = useRouter()
const money = value => '$' + new Intl.NumberFormat('zh-TW').format(value)
const monthItems = computed(() => transactions.value.filter(x => x.date?.slice(0, 7) === monthKey()))
const monthIncome = computed(() => monthItems.value.filter(x => x.type === 'income').reduce((s, x) => s + Number(x.amount), 0))
const monthExpense = computed(() => monthItems.value.filter(x => x.type === 'expense').reduce((s, x) => s + Number(x.amount), 0))
const recent = computed(() => [...transactions.value].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 5))
const budgetPercent = computed(() => monthlyBudget.value > 0 ? Math.min(100, monthExpense.value / monthlyBudget.value * 100) : 0)
</script>

<template>
  <div class="page-heading">
    <div><span class="eyebrow">OVERVIEW</span><h2>早安，今天也好好管理每一筆錢 ☀️</h2><p>這是你的財務概況，持續記錄就能看見改變。</p></div>
    <button class="btn btn-primary" @click="router.push('/transactions')">＋ 新增收支</button>
  </div>

  <div class="summary-grid">
    <SummaryCard label="總收入" :value="money(totalIncome)" icon="↗" tone="green" hint="所有已記錄收入" />
    <SummaryCard label="總支出" :value="money(totalExpense)" icon="↘" tone="orange" hint="所有已記錄支出" />
    <SummaryCard label="目前結餘" :value="money(balance)" icon=" wallet " tone="brown" hint="總收入 − 總支出" />
    <SummaryCard label="本月支出" :value="money(monthExpense)" icon="▣" tone="peach" hint="本月消費累計" />
  </div>

  <div class="dashboard-grid">
    <section class="panel">
      <div class="panel-heading"><div><h3>本月預算使用</h3><p>掌握本月消費進度</p></div><RouterLink to="/budget" class="text-link">管理預算 →</RouterLink></div>
      <div class="budget-number"><strong>{{ money(monthExpense) }}</strong><span> / {{ money(monthlyBudget) }}</span></div>
      <div class="progress-track"><div class="progress-fill" :class="{ warning: budgetPercent >= 80 }" :style="{ width: budgetPercent + '%' }"></div></div>
      <div class="progress-caption"><span>已使用 {{ budgetPercent.toFixed(0) }}%</span><span>剩餘 {{ money(Math.max(0, monthlyBudget - monthExpense)) }}</span></div>
      <div class="mini-stats">
        <div><span>本月收入</span><strong class="income-text">{{ money(monthIncome) }}</strong></div>
        <div><span>本月支出</span><strong class="expense-text">{{ money(monthExpense) }}</strong></div>
      </div>
    </section>
    <section class="panel chart-panel">
      <div class="panel-heading"><div><h3>支出分類</h3><p>依照消費類別統計</p></div><RouterLink to="/statistics" class="text-link">查看分析 →</RouterLink></div>
      <ExpenseChart :items="monthItems" />
    </section>
  </div>

  <section class="panel recent-panel">
    <div class="panel-heading"><div><h3>最近的收支紀錄</h3><p>最新的 5 筆交易</p></div><RouterLink to="/transactions" class="text-link">查看全部 →</RouterLink></div>
    <TransactionList :items="recent" />
  </section>
</template>

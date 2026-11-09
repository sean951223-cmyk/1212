<script setup>
import { computed, ref } from 'vue'
import { transactions, addTransaction, updateTransaction, deleteTransaction } from '../composables/useFinance'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'
const showForm = ref(false)
const editing = ref(null)
const keyword = ref('')
const typeFilter = ref('all')
const monthFilter = ref('')
const filtered = computed(() => transactions.value.filter(item => {
  const matchKeyword = `${item.title} ${item.category} ${item.note || ''}`.toLowerCase().includes(keyword.value.toLowerCase())
  const matchType = typeFilter.value === 'all' || item.type === typeFilter.value
  const matchMonth = !monthFilter.value || item.date.startsWith(monthFilter.value)
  return matchKeyword && matchType && matchMonth
}).sort((a,b) => b.date.localeCompare(a.date)))
function save(data) {
  if (editing.value) updateTransaction(editing.value.id, data)
  else addTransaction(data)
  showForm.value = false
  editing.value = null
}
function edit(item) { editing.value = { ...item }; showForm.value = true }
function remove(id) {
  if (confirm('確定要刪除這筆紀錄嗎？')) deleteTransaction(id)
}
</script>

<template>
  <div class="page-heading">
    <div><span class="eyebrow">TRANSACTIONS</span><h2>收支紀錄</h2><p>新增、搜尋、編輯或刪除你的每一筆交易。</p></div>
    <button class="btn btn-primary" @click="editing = null; showForm = !showForm">＋ 新增紀錄</button>
  </div>

  <section v-if="showForm" class="panel form-panel">
    <div class="panel-heading"><div><h3>{{ editing ? '編輯紀錄' : '新增一筆收支' }}</h3><p>請填寫以下資料</p></div><button class="icon-btn" @click="showForm = false; editing = null">×</button></div>
    <TransactionForm :initial="editing" :submit-label="editing ? '儲存修改' : '新增紀錄'" @submit="save" @cancel="showForm = false; editing = null" />
  </section>

  <section class="panel">
    <div class="filters">
      <input v-model="keyword" class="search-input" placeholder="⌕ 搜尋項目、分類或備註..." />
      <select v-model="typeFilter"><option value="all">全部類型</option><option value="income">收入</option><option value="expense">支出</option></select>
      <input v-model="monthFilter" type="month" aria-label="選擇月份" />
    </div>
    <div class="list-heading"><h3>所有紀錄</h3><span>共 {{ filtered.length }} 筆</span></div>
    <TransactionList :items="filtered" :show-actions="true" @edit="edit" @delete="remove" />
  </section>
</template>

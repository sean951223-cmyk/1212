import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'money-track-transactions-v1'
const BUDGET_KEY = 'money-track-monthly-budget-v1'

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export const transactions = ref(loadTransactions())
export const monthlyBudget = ref(Number(localStorage.getItem(BUDGET_KEY) || 12000))

watch(transactions, value => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}, { deep: true })

watch(monthlyBudget, value => {
  localStorage.setItem(BUDGET_KEY, String(value))
})

export const categories = {
  expense: ['飲食', '交通', '購物', '娛樂', '生活用品', '學習', '醫療', '其他'],
  income: ['薪水', '零用錢', '獎金', '投資', '其他收入']
}

export const totalIncome = computed(() =>
  transactions.value.filter(item => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount), 0)
)

export const totalExpense = computed(() =>
  transactions.value.filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount), 0)
)

export const balance = computed(() => totalIncome.value - totalExpense.value)

export function monthKey(date = new Date()) {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function currentMonthItems() {
  const key = monthKey()
  return transactions.value.filter(item => item.date?.slice(0, 7) === key)
}

export function addTransaction(data) {
  transactions.value.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: data.title.trim(),
    type: data.type,
    category: data.category,
    amount: Number(data.amount),
    date: data.date,
    note: (data.note || '').trim(),
    createdAt: new Date().toISOString()
  })
}

export function updateTransaction(id, data) {
  const index = transactions.value.findIndex(item => item.id === id)
  if (index !== -1) {
    transactions.value[index] = { ...transactions.value[index], ...data, amount: Number(data.amount) }
  }
}

export function deleteTransaction(id) {
  transactions.value = transactions.value.filter(item => item.id !== id)
}

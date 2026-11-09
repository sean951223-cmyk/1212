<script setup>
import { reactive, watch, computed } from 'vue'
import { categories } from '../composables/useFinance'

const props = defineProps({
  initial: { type: Object, default: null },
  submitLabel: { type: String, default: '新增紀錄' }
})
const emit = defineEmits(['submit', 'cancel'])
const form = reactive({
  title: '', type: 'expense', category: '飲食',
  amount: '', date: new Date().toISOString().slice(0, 10), note: ''
})
const availableCategories = computed(() => categories[form.type])

watch(() => props.initial, value => {
  Object.assign(form, value ? { ...value } : {
    title: '', type: 'expense', category: '飲食', amount: '',
    date: new Date().toISOString().slice(0, 10), note: ''
  })
}, { immediate: true })

watch(() => form.type, type => {
  if (!categories[type].includes(form.category)) form.category = categories[type][0]
})

function submit() {
  if (!form.title.trim() || !form.amount || Number(form.amount) <= 0 || !form.date) return
  emit('submit', { ...form, amount: Number(form.amount) })
}
</script>

<template>
  <form class="form-grid" @submit.prevent="submit">
    <label class="field full">
      <span>項目名稱</span>
      <input v-model="form.title" required maxlength="40" placeholder="例如：午餐、打工薪水" />
    </label>
    <label class="field">
      <span>紀錄類型</span>
      <select v-model="form.type">
        <option value="expense">支出</option>
        <option value="income">收入</option>
      </select>
    </label>
    <label class="field">
      <span>分類</span>
      <select v-model="form.category">
        <option v-for="category in availableCategories" :key="category" :value="category">{{ category }}</option>
      </select>
    </label>
    <label class="field">
      <span>金額（NT$）</span>
      <input v-model.number="form.amount" type="number" min="1" step="1" required placeholder="請輸入金額" />
    </label>
    <label class="field">
      <span>日期</span>
      <input v-model="form.date" type="date" required />
    </label>
    <label class="field full">
      <span>備註（選填）</span>
      <input v-model="form.note" maxlength="100" placeholder="補充說明..." />
    </label>
    <div class="form-actions full">
      <button v-if="initial" type="button" class="btn btn-ghost" @click="emit('cancel')">取消</button>
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>

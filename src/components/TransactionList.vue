<script setup>
defineProps({ items: { type: Array, default: () => [] }, showActions: { type: Boolean, default: false } })
defineEmits(['edit', 'delete'])
const money = value => new Intl.NumberFormat('zh-TW').format(value)
const icons = { 飲食: '🍜', 交通: '🚌', 購物: '🛍️', 娛樂: '🎬', 生活用品: '🧴', 學習: '📚', 醫療: '💊', 薪水: '💼', 零用錢: '🪙', 獎金: '🎁', 投資: '📈' }
</script>

<template>
  <div v-if="items.length" class="transaction-list">
    <div v-for="item in items" :key="item.id" class="transaction-row">
      <div class="transaction-symbol">{{ icons[item.category] || '📌' }}</div>
      <div class="transaction-info">
        <strong>{{ item.title }}</strong>
        <span>{{ item.category }} · {{ item.date }}<template v-if="item.note"> · {{ item.note }}</template></span>
      </div>
      <strong class="transaction-amount" :class="item.type">
        {{ item.type === 'income' ? '+' : '−' }}${{ money(item.amount) }}
      </strong>
      <div v-if="showActions" class="row-actions">
        <button class="icon-btn" title="編輯" @click="$emit('edit', item)">✎</button>
        <button class="icon-btn delete" title="刪除" @click="$emit('delete', item.id)">×</button>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">
    <div>🧾</div><strong>目前還沒有紀錄</strong><span>新增第一筆收支，開始管理你的財務吧！</span>
  </div>
</template>

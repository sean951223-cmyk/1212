<script setup>
import { useRoute } from 'vue-router'
import { totalIncome, totalExpense, balance } from './composables/useFinance'

const route = useRoute()
const navItems = [
  { path: '/', label: '總覽', icon: '⌂' },
  { path: '/transactions', label: '收支紀錄', icon: '▤' },
  { path: '/statistics', label: '統計分析', icon: '▥' },
  { path: '/budget', label: '預算管理', icon: '◎' }
]
const money = value => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value)
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">M</div>
        <div><strong>MoneyTrack</strong><small>PERSONAL FINANCE</small></div>
      </div>
      <div class="nav-caption">工作空間</div>
      <nav>
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
          class="nav-link" :class="{ active: route.path === item.path }">
          <span class="nav-icon">{{ item.icon }}</span>{{ item.label }}
        </RouterLink>
      </nav>
      <div class="sidebar-bottom">
        <div class="tip-card">
          <span>☕ 今日理財小提醒</span>
          <p>每天花一點時間記帳，慢慢建立自己的理財習慣。</p>
        </div>
        <small>MoneyTrack v1.0 · 資料儲存於此裝置</small>
      </div>
    </aside>

    <main class="main-area">
      <header class="topbar">
        <div>
          <span class="eyebrow">PERSONAL FINANCE</span>
          <h1>個人財務管理</h1>
        </div>
        <div class="topbar-right">
          <span class="today">{{ new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          <div class="avatar">我</div>
        </div>
      </header>
      <section class="page-content">
        <RouterView />
      </section>
      <footer class="footer">© 2026 MoneyTrack · 用簡單記帳，讓生活更有方向</footer>
    </main>
  </div>
</template>

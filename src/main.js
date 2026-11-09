import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import Transactions from './views/Transactions.vue'
import Statistics from './views/Statistics.vue'
import Budget from './views/Budget.vue'
import './style.css'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/transactions', component: Transactions },
  { path: '/statistics', component: Statistics },
  { path: '/budget', component: Budget }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

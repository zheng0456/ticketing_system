import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import TicketView from '../views/TicketView.vue'

const routes = [
  {
    path: '/index',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: TicketView
  },
  {
    path: '/ticket/multi',
    name: 'transferTicket',
    component: TicketView
  },
  // 添加重定向，使根路径跳转到 /index
  {
    path: '/',
    redirect: '/index'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
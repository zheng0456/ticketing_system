import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import TicketView from '../views/TicketView.vue'
import SceneryView from '../views/SceneryView.vue'
import SceneryMessageView from '../views/SceneryMessageView.vue'
import TicketMessagesView from '../views/TicketMessagesView.vue'
import AdminView from '../views/AdminView.vue'
import AdminIndex from '../components/admin/index/AdminIndex.vue'
import AdminScenery from '../components/admin/ticket/AdminScenery.vue'
import AdminTicket from '../components/admin/ticket/AdminTicket.vue'
import AdminTrain from '../components/admin/train/AdminTrain.vue'

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
  {
    path: '/scenery',
    name: 'scenery',
    component: SceneryView
  },
  {    
    path: '/scenerymessage',
    name: 'sceneryMessage',
    component: SceneryMessageView
  },
  {    
    path: '/ticketmessages',
    name: 'ticketMessages',
    component: TicketMessagesView
  },
  // 添加重定向，使根路径跳转到 /index
  {
    path: '/',
    redirect: '/index'
  },
  // 添加管理员后台路由
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    // 这里可以添加子路由，对应数据统计等功能
    children: [
      {
        path: '',
        name: 'adminHome',
        component: AdminIndex
      },
      // 票务管理相关路由
      {
        path: 'train',
        name: 'train',
        component: AdminTrain
      },
      {
        path: 'train-tickets',
        name: 'trainTickets',
        component: AdminTicket
      },
      {
        path: 'scenery-tickets',
        name: 'sceneryTickets',
        component: AdminScenery
      },
      {
        path: 'refund-tickets',
        name: 'refundTickets',
        component: () => import('../components/admin/ticket/AdminReturnTicket.vue')
      },
      {
        path: 'refund-scenery',
        name: 'refundScenery',
        component: () => import('../components/admin/ticket/AdminReturnScenery.vue')
      },
      // 数据统计路由
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../components/admin/statistics/AdminDataStatistics.vue')
      },
      // 收支明细路由
      {
        path: 'ticket-details',
        name: 'ticketDetails',
        component: () => import('../components/admin/account/DetailsTicket.vue')
      },
      {
        path: 'scenery-details',
        name: 'sceneryDetails',
        component: () => import('../components/admin/account/DetailsScenery.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 控制路由切换时的滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则恢复到该位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则滚动到顶部
      return { top: 0 }
    }
  }
})

export default router
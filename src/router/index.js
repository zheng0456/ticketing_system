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
import AdminTrainStation from '../components/admin/train/AdminTrainStation.vue'
import UserLogOut from '../components/admin/user/UserLogOut.vue'
import AdminPermission from '../components/admin/user/AdminPermission.vue'

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
  // 添加重定向，使根路径跳转到 /login
  {
    path: '/',
    redirect: '/login'
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
        path: 'trainStation',
        name: 'trainStation',
        component: AdminTrainStation,
        meta: { title: '车站管理' }
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
      {        path: 'scenery-details',
        name: 'sceneryDetails',
        component: () => import('../components/admin/account/DetailsScenery.vue')
      },
      // 账号注销路由
      {
          path: 'logout',
          name: 'logout',
          component: UserLogOut,
          meta: { title: '账号注销' }
        },
        {
          path: 'permission',
          name: 'permission',
          component: AdminPermission,
          meta: { title: '权限管理' }
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

// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取用户登录信息
  const userInfo = localStorage.getItem('userInfo');
  const isLoggedIn = userInfo ? JSON.parse(userInfo).isLoggedIn : false;
  
  // 定义不需要登录的白名单路由
  const whiteList = ['/login'];
  
  // 当用户访问登录页面时，自动清除登录状态
  if (to.path === '/login') {
    localStorage.removeItem('userInfo');
  }
  
  // 如果用户未登录且访问的不是白名单路由，则重定向到登录页面
  if (!isLoggedIn && !whiteList.includes(to.path)) {
    next('/login');
  } else {
    next();
  }
});

export default router
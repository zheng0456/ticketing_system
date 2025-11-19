<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h3>个人中心</h3>
      <div class="menu-group">
        <h4 @click="toggleOrderMenu">订单中心 {{ orderMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="orderMenuExpanded">
          <li @click="showTicketOrder" :class="{ active: activeMenuItem === 'ticketOrder' }" class="clickable-item">火车票订单</li>
          <li @click="showAlternateTicket" :class="{ active: activeMenuItem === 'alternateTicket' }" class="clickable-item">候补订单</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4 @click="showMyOrderTicket" :class="{ active: activeMenuItem === 'myOrderTicket' }">本人车票</h4>
      </div>
      <div class="menu-group">
        <h4 @click="togglePersonalInfoMenu">个人信息 {{ personalInfoMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="personalInfoMenuExpanded">
          <li @click="showPersonalInfo" :class="{ active: activeMenuItem === 'personalInfo' }" class="clickable-item">查看个人信息</li>
          <li @click="showAccountSecurity" :class="{ active: activeMenuItem === 'accountSecurity' }" class="clickable-item">账号安全</li>
          <li @click="showMobileVerification" :class="{ active: activeMenuItem === 'mobileVerification' }" class="clickable-item">手机核验</li>
          <li @click="showAccountDeletion" :class="{ active: activeMenuItem === 'accountDeletion' }" class="clickable-item">账号注销</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4 @click="toggleCommonInfoMenu">常用信息管理 {{ commonInfoMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="commonInfoMenuExpanded">
          <li @click="showPassenger" :class="{ active: activeMenuItem === 'passenger' }" class="clickable-item">乘车人</li>
          <li @click="showAddressManagement" :class="{ active: activeMenuItem === 'addressManagement' }" class="clickable-item">地址管理</li>
        </ul>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TicketOrder from './TicketOrder.vue'
import AlternateTicket from './AlternateTicket.vue'
import MyOrderTicket from './MyOrderTicket.vue'
import PersonOrder from './PersonOrder.vue'
import AccountSecurity from './AccountSecurity.vue'
import MobileVerification from './MobileVerification.vue'
import AccountDeletion from './AccountDeletion.vue'
import PassengerManager from './Passenger.vue'
import AddressManagement from './AddressManagement.vue'

// 响应式数据控制菜单展开/收起状态
const orderMenuExpanded = ref(true)
const personalInfoMenuExpanded = ref(true)
const commonInfoMenuExpanded = ref(true)

// 控制当前激活的菜单项
const activeMenuItem = ref('ticketOrder')

// 控制右侧显示的组件
const currentComponent = ref(TicketOrder)

// 获取路由信息
const route = useRoute()

// 切换订单中心菜单
const toggleOrderMenu = () => {
  orderMenuExpanded.value = !orderMenuExpanded.value
}

// 切换个人信息菜单
const togglePersonalInfoMenu = () => {
  personalInfoMenuExpanded.value = !personalInfoMenuExpanded.value
}

// 切换常用信息管理菜单
const toggleCommonInfoMenu = () => {
  commonInfoMenuExpanded.value = !commonInfoMenuExpanded.value
}

// 显示火车票订单页面
const showTicketOrder = () => {
  currentComponent.value = TicketOrder
  activeMenuItem.value = 'ticketOrder'
}

// 显示候补订单页面
const showAlternateTicket = () => {
  currentComponent.value = AlternateTicket
  activeMenuItem.value = 'alternateTicket'
}

// 显示本人车票页面
const showMyOrderTicket = () => {
  currentComponent.value = MyOrderTicket
  activeMenuItem.value = 'myOrderTicket'
}

// 显示个人信息页面
const showPersonalInfo = () => {
  currentComponent.value = PersonOrder
  activeMenuItem.value = 'personalInfo'
}

// 显示账号安全页面
const showAccountSecurity = () => {
  currentComponent.value = AccountSecurity
  activeMenuItem.value = 'accountSecurity'
}

// 显示手机核验页面
const showMobileVerification = () => {
  currentComponent.value = MobileVerification
  activeMenuItem.value = 'mobileVerification'
}

// 显示账号注销页面
const showAccountDeletion = () => {
  currentComponent.value = AccountDeletion
  activeMenuItem.value = 'accountDeletion'
}

// 显示乘车人页面
const showPassenger = () => {
  currentComponent.value = PassengerManager
  activeMenuItem.value = 'passenger'
}

// 显示地址管理页面
const showAddressManagement = () => {
  currentComponent.value = AddressManagement
  activeMenuItem.value = 'addressManagement'
}

// 组件挂载时检查URL参数
onMounted(() => {
  const tab = route.query.tab
  if (tab === 'uncompleted') {
    // 如果是从退票链接进入，自动选择火车票订单
    showTicketOrder()
  }
})
</script>

<script>
export default {
  name: 'OrderMessage'
}
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  font-family: "Microsoft Yahei", sans-serif;
  color: #333;
}

/* 左侧 sidebar 样式 */
.sidebar {
  width: 215px;
  background: #fff;
  border-right: 1px solid #eaeaea;
  padding: 20px;
}

.sidebar h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.menu-group h4 {
  font-size: 16px;
  margin: 15px 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none; /* 防止文字被选中 */
}

.menu-group h4:hover {
  color: #409EFF;
}

.menu-group h4.active {
  color: #409EFF;
  font-weight: 500;
}

.menu-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease; /* 添加过渡动画 */
}

.menu-group li {
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
}

.menu-group li:hover {
  color: #409EFF;
}

.menu-group li.active {
  color: #409EFF;
  font-weight: 500;
}

.menu-group li.clickable-item {
  cursor: pointer;
}

.menu-group li.clickable-item:hover {
  color: #409EFF;
}
</style>
<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h3>个人中心</h3>
      <div class="menu-group">
        <h4 @click="toggleOrderMenu">订单中心 {{ orderMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="orderMenuExpanded">
          <li class="active">火车票订单</li>
          <li>候补订单</li>
          <li>计次·定期票...</li>
          <li>约号订单</li>
          <li>雪具快运订单</li>
          <li>餐饮·特产</li>
          <li>保险订单</li>
          <li>电子发票</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4>本人车票</h4>
      </div>
      <div class="menu-group">
        <h4>会员中心</h4>
      </div>
      <div class="menu-group">
        <h4 @click="togglePersonalInfoMenu">个人信息 {{ personalInfoMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="personalInfoMenuExpanded">
          <li>查看个人信息</li>
          <li>账号安全</li>
          <li>手机核验</li>
          <li>账号注销</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4 @click="toggleCommonInfoMenu">常用信息管理 {{ commonInfoMenuExpanded ? '▼' : '▲' }}</h4>
        <ul v-show="commonInfoMenuExpanded">
          <li>乘车人</li>
          <li>地址管理</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4 @click="toggleWarmServiceMenu">温馨服务 {{ warmServiceMenuExpanded ? '▼' : '▲' }}</h4>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <TicketOrder />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TicketOrder from './TicketOrder.vue'

// 响应式数据控制菜单展开/收起状态
const orderMenuExpanded = ref(true)
const personalInfoMenuExpanded = ref(false)
const commonInfoMenuExpanded = ref(false)
const warmServiceMenuExpanded = ref(false)

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

// 切换温馨服务菜单
const toggleWarmServiceMenu = () => {
  warmServiceMenuExpanded.value = !warmServiceMenuExpanded.value
}
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
</style>
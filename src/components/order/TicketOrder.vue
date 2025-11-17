<template>
  <main class="main-content">
    <!-- 选项卡 -->
    <div class="tabs">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab" 
        :class="{ active: activeTab === index }"
        @click="switchTab(index)"
      >
        {{ tab.name }}
      </button>
    </div>
    <!-- 空订单提示 -->
    <div class="empty-order">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="24" y="24" width="24" height="32" rx="2" stroke="#409EFF" stroke-width="2" fill="white"/>
          <rect x="28" y="28" width="16" height="24" rx="1" fill="white"/>
          <circle cx="36" cy="36" r="2" fill="#8BC3FF"/>
          <path d="M36 38V44" stroke="#409EFF" stroke-width="2" stroke-linecap="round"/>
          <circle cx="42" cy="32" r="1" fill="#C0E0FF"/>
          <circle cx="26" cy="30" r="1" fill="#C0E0FF"/>
        </svg>
      </div>
      <div class="empty-text">
        <p>{{ tabs[activeTab].emptyMessage }}</p>
        <p>您可以通过<a href="#" class="link">车票预订</a>功能，来制定出行计划。</p>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="tips">
      <h4>温馨提示</h4>
      <ol>
        <li v-for="(tip, index) in tabs[activeTab].tips" :key="index">{{ tip }}</li>
      </ol>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// 当前激活的选项卡索引
const activeTab = ref(0)

// 选项卡数据
const tabs = ref([
  {
    name: '未完成订单',
    emptyMessage: '您没有未完成的订单哦~',
    tips: [
      '席位已锁定，请在指定时间内完成网上支付。',
      '逾期未支付，系统将取消本次交易。',
      '在完成支付或取消本订单之前，您将无法购买其他车票。'
    ]
  },
  {
    name: '未出行订单',
    emptyMessage: '您没有未出行的订单哦~',
    tips: [
      '请提前到达车站，预留充足时间取票和安检。',
      '出行前请确认车次和站点信息，避免误车。',
      '如需退票或改签，请在规定时间内办理。'
    ]
  },
  {
    name: '历史订单',
    emptyMessage: '您暂无历史订单记录~',
    tips: [
      '历史订单保留最近6个月的记录。',
      '您可以查看历史订单的详细信息。',
      '如需发票，请在订单完成后申请开具。'
    ]
  }
])

// 切换选项卡
const switchTab = (index) => {
  activeTab.value = index
}
</script>

<script>
export default {
  name: 'TicketOrder'
}
</script>

<style scoped>
/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
}

.current-location {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab:hover {
  color: #409EFF;
}

.tab.active {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
  font-weight: 500;
}

.empty-order {
  border: 1px solid #409EFF;
  border-radius: 4px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.empty-icon svg {
  margin-bottom: 10px;
}

.empty-text p {
  margin: 5px 0;
}

.link {
  color: #409EFF;
  text-decoration: none;
}

.tips {
  background: #FFF8E6;
  border-radius: 4px;
  padding: 15px;
  text-align: left;
}

.tips h4 {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  text-align: left;
}

.tips ol {
  padding-left: 20px;
  margin: 0;
  text-align: left;
}

.tips li {
  margin-bottom: 5px;
  font-size: 14px;
  text-align: left;
}
</style>
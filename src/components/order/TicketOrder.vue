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
    
    <!-- 订单列表 -->
    <div v-if="activeTab === 0 && orders.length > 0" class="order-list">
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <div class="order-header">
          <span class="order-date">订票日期: {{ order.orderDate }}</span>
        </div>
        <div class="order-content">
          <table class="order-table">
            <thead>
              <tr>
                <th>车次信息</th>
                <th>旅客信息</th>
                <th>席位信息</th>
                <th>票价</th>
                <th>车票状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="train-info">
                  <div class="train-name">{{ order.trainInfo.trainName }}</div>
                  <div class="train-time">{{ order.trainInfo.date }} {{ order.trainInfo.departureTime }}开</div>
                </td>
                <td class="passenger-info">
                  <div class="passenger-name">{{ order.passenger.name }}</div>
                  <div class="passenger-id">居民身份证</div>
                </td>
                <td class="seat-info">{{ order.seatInfo }}</td>
                <td class="price-info">
                  <div>成人票</div>
                  <div class="price">{{ order.price }}</div>
                </td>
                <td class="status-info">{{ order.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="order-actions">
          <button class="cancel-btn" @click="cancelOrder(index)">取消订单</button>
          <button class="pay-btn" @click="goToPay(index)">去支付</button>
        </div>
      </div>
    </div>
    
    <!-- 空订单提示 -->
    <div v-else class="empty-order">
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 当前激活的选项卡索引
const activeTab = ref(0)

// 获取路由信息
const route = useRoute()

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

// 默认订单数据
const orders = ref([
  {
    orderDate: '2025-11-26',
    trainInfo: {
      trainName: '北京→成都西 K545',
      date: '2025-11-26',
      departureTime: '12:50'
    },
    passenger: {
      name: '郑利平'
    },
    seatInfo: '硬卧 02车05号中铺',
    price: '441.0元',
    status: '待支付'
  }
])

// 切换选项卡
const switchTab = (index) => {
  activeTab.value = index
}

// 取消订单
const cancelOrder = (index) => {
  // 这里可以添加取消订单的逻辑
  console.log('取消订单:', index)
}

// 去支付
const goToPay = (index) => {
  // 这里可以添加去支付的逻辑
  console.log('去支付:', index)
}

// 组件挂载时检查URL参数
onMounted(() => {
  const tab = route.query.tab
  if (tab === 'uncompleted') {
    // 如果是从退票链接进入，自动选择未出行订单（索引1）
    activeTab.value = 1
  }
})
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

/* 订单列表样式 */
.order-list {
  margin-bottom: 20px;
}

.order-item {
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
}

.order-header {
  background-color: #f5f7fa;
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #eaeaea;
}

.order-date {
  color: #666;
}

.order-content {
  padding: 15px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th {
  text-align: left;
  font-weight: normal;
  color: #999;
  font-size: 14px;
  padding-bottom: 10px;
}

.order-table td {
  padding: 10px 0;
  border-top: 1px solid #eaeaea;
  font-size: 14px;
}

.train-info .train-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.train-info .train-time {
  color: #666;
  font-size: 13px;
}

.passenger-info .passenger-name {
  margin-bottom: 5px;
}

.passenger-info .passenger-id {
  color: #666;
  font-size: 13px;
}

.price-info .price {
  color: #ff6700;
  font-weight: 500;
  margin-top: 5px;
}

.status-info {
  color: #ff6700;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  border-top: 1px solid #eaeaea;
  gap: 10px;
}

.cancel-btn {
  padding: 6px 15px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.cancel-btn:hover {
  color: #409EFF;
  border-color: #c6e2ff;
}

.pay-btn {
  padding: 6px 15px;
  border: 1px solid #ff6700;
  background-color: #ff6700;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.pay-btn:hover {
  background-color: #ff7a23;
  border-color: #ff7a23;
}

/* 空订单样式 */
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

/* 温馨提示样式 */
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
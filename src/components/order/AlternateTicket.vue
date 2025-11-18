<template>
  <main class="main-content">
    <!-- 标签栏 -->
    <div class="tabs">
      <button 
        class="tab" 
        :class="{ active: activeTab === 'pendingPayment' }" 
        @click="activeTab = 'pendingPayment'"
      >
        待支付订单
      </button>
      <button 
        class="tab" 
        :class="{ active: activeTab === 'pendingRedeem' }" 
        @click="activeTab = 'pendingRedeem'"
      >
        待兑现订单
      </button>
      <button 
        class="tab" 
        :class="{ active: activeTab === 'processed' }" 
        @click="activeTab = 'processed'"
      >
        已处理订单
      </button>
    </div>

    <!-- 内容区域 -->
    <div v-if="activeTab === 'pendingPayment'" class="empty-order">
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
        <p>您没有待支付候补订单</p>
        <p>您可以通过<a href="#" class="link">车票预订</a>进行预约购买</p>
      </div>
    </div>
    <div v-else-if="activeTab === 'pendingRedeem'" class="empty-order">
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
        <p>待兑现订单内容（可根据需求扩展）</p>
      </div>
    </div>
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
        <p>已处理订单内容（可根据需求扩展）</p>
      </div>
    </div>

    <!-- 温馨提示 -->
    <div class="tips">
      <h4>温馨提示</h4>
      <ol>
        <li>系统将持续尝试为您兑现候补需求，若无满足您需求的席位，将在截止兑现时间自动终止兑现。</li>
        <li>兑现时，将根据您所候补列车的席位实际情况予以分配（座席分配包含卧代座），多人出行时，可能分配到不同车厢。系统优先为60岁以上老年人分配下铺，下铺售完时自动分配其他铺别。</li>
        <li>同一候补购票订单中需求不进行部分兑现。</li>
        <li>兑现时实名制和行程冲突规则按既有规则办理。</li>
        <li>兑现成功车票的退改签规则按既有规则办理，退票费按如下规则核收：票面乘车站开车时间前8天（含）以上不收取退票费，48小时以上的按票价5%计，24小时以上、不足48小时的按票价10%计，不足24小时的按票价20%计。上述计算的尾数以5角为单位，尾数小于2.5角的舍去、2.5角（含）以上且小于7.5角的计为5角、7.5角（含）以上的进为1元。退票费最低按2元计收。</li>
      </ol>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// 响应式变量：当前激活的标签
const activeTab = ref('pendingPayment');
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
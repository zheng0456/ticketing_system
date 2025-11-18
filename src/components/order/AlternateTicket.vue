<template>
  <div class="order-page">
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
    <div class="tab-content">
      <template v-if="activeTab === 'pendingPayment'">
        <div class="empty-state">
          <img src="https://via.placeholder.com/60x60?text=订单图标" alt="空状态图标" class="empty-icon">
          <p>您没有待支付候补订单</p>
          <p>您可以通过<a href="#" class="link">车票预订</a>进行预约购买</p>
        </div>
      </template>
      <template v-else-if="activeTab === 'pendingRedeem'">
        <div>待兑现订单内容（可根据需求扩展）</div>
      </template>
      <template v-else>
        <div>已处理订单内容（可根据需求扩展）</div>
      </template>
    </div>

    <!-- 温馨提示 -->
    <div class="notice">
      <h3 class="notice-title">温馨提示</h3>
      <ul class="notice-list">
        <li>1.系统将持续尝试为您兑现候补需求，若无满足您需求的席位，将在截止兑现时间自动终止兑现。</li>
        <li>2.兑现时，将根据您所候补列车的席位实际情况予以分配（座席分配包含卧代座），多人出行时，可能分配到不同车厢。系统优先为60岁以上老年人分配下铺，下铺售完时自动分配其他铺别。</li>
        <li>3.同一候补购票订单中需求不进行部分兑现。</li>
        <li>4.兑现时实名制和行程冲突规则按既有规则办理。</li>
        <li>5.兑现成功车票的退改签规则按既有规则办理，退票费按如下规则核收：票面乘车站开车时间前8天（含）以上不收取退票费，48小时以上的按票价5%计，24小时以上、不足48小时的按票价10%计，不足24小时的按票价20%计。上述计算的尾数以5角为单位，尾数小于2.5角的舍去、2.5角（含）以上且小于7.5角的计为5角、7.5角（含）以上的进为1元。退票费最低按2元计收。</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 响应式变量：当前激活的标签
const activeTab = ref('pendingPayment');
</script>

<style scoped>
.order-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Microsoft Yahei", sans-serif;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  min-height: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.link {
  color: #007bff;
  text-decoration: none;
}

.notice {
  margin-top: 20px;
  background-color: #fff8e6;
  border: 1px solid #ffe58f;
  padding: 15px;
  border-radius: 4px;
}

.notice-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.notice-list li {
  margin-bottom: 8px;
}
</style>
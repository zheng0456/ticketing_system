<template>
  <div class="payment-container">
    <!-- 顶部标题 -->
    <div class="payment-header">
      <h2 class="payment-title">订单支付</h2>
      <div class="countdown" v-if="countdown > 0">
        <span class="countdown-label">支付剩余时间：</span>
        <span class="countdown-time">{{ formatCountdown }}</span>
      </div>
      <div class="countdown expired" v-else>
        <span class="countdown-label">订单已超时</span>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info-section">
      <h3 class="section-title">订单信息</h3>
      <div class="order-info-content">
        <div class="order-info-row">
          <span class="info-label">订单编号：</span>
          <span class="info-value">{{ orderInfo.orderId }}</span>
        </div>
        <div class="order-info-row">
          <span class="info-label">车次信息：</span>
          <span class="info-value">{{ orderInfo.trainInfo }}</span>
        </div>
        <div class="order-info-row">
          <span class="info-label">乘车人数：</span>
          <span class="info-value">{{ orderInfo.passengerCount }}人</span>
        </div>
        <div class="order-info-row">
          <span class="info-label">出发时间：</span>
          <span class="info-value">{{ orderInfo.departureTime }}</span>
        </div>
      </div>
    </div>

    <!-- 乘客信息 -->
    <div class="passenger-info-section">
      <h3 class="section-title">乘客信息</h3>
      <div class="passenger-list">
        <div class="passenger-item" v-for="(passenger, index) in orderInfo.passengers" :key="index">
          <div class="passenger-name">{{ passenger.name }}</div>
          <div class="passenger-details">
            <span class="passenger-seat">{{ passenger.seatType }} {{ passenger.seat }}</span>
            <span class="passenger-price">¥{{ passenger.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付金额 -->
    <div class="amount-section">
      <div class="amount-row">
        <span class="amount-label">订单总额：</span>
        <span class="amount-value">¥{{ orderInfo.totalAmount }}</span>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="payment-method-section">
      <h3 class="section-title">选择支付方式</h3>
      <div class="payment-methods">
        <div 
          class="payment-method-item" 
          :class="{ active: selectedPaymentMethod === 'wechat' }"
          @click="selectPaymentMethod('wechat')"
        >
          <div class="payment-method-icon wechat-icon">
            <svg viewBox="0 0 24 24" fill="#07C160" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 14.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5-5.5-2.5-5.5-5.5zm-2 0c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5-7.5 3.4-7.5 7.5z"/>
            </svg>
          </div>
          <div class="payment-method-info">
            <div class="payment-method-name">微信支付</div>
            <div class="payment-method-desc">推荐使用微信支付</div>
          </div>
          <div class="payment-method-check">
            <div class="check-icon" v-if="selectedPaymentMethod === 'wechat'">✓</div>
          </div>
        </div>

        <div 
          class="payment-method-item" 
          :class="{ active: selectedPaymentMethod === 'alipay' }"
          @click="selectPaymentMethod('alipay')"
        >
          <div class="payment-method-icon alipay-icon">
            <svg viewBox="0 0 24 24" fill="#1677FF" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="payment-method-info">
            <div class="payment-method-name">支付宝</div>
            <div class="payment-method-desc">安全快捷的支付方式</div>
          </div>
          <div class="payment-method-check">
            <div class="check-icon" v-if="selectedPaymentMethod === 'alipay'">✓</div>
          </div>
        </div>

        <div 
          class="payment-method-item" 
          :class="{ active: selectedPaymentMethod === 'card' }"
          @click="selectPaymentMethod('card')"
        >
          <div class="payment-method-icon card-icon">
            <svg viewBox="0 0 24 24" fill="#FF9500" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
          </div>
          <div class="payment-method-info">
            <div class="payment-method-name">银行卡支付</div>
            <div class="payment-method-desc">支持各大银行卡</div>
          </div>
          <div class="payment-method-check">
            <div class="check-icon" v-if="selectedPaymentMethod === 'card'">✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付按钮 -->
    <div class="payment-actions">
      <button class="cancel-btn" @click="handleCancel" :disabled="countdown <= 0">取消订单</button>
      <button class="pay-btn" @click="handlePay" :disabled="!selectedPaymentMethod || countdown <= 0">
        立即支付 ¥{{ orderInfo.totalAmount }}
      </button>
    </div>

    <!-- 支付成功提示 -->
    <div class="payment-success" v-if="paymentSuccess">
      <div class="success-icon">✓</div>
      <div class="success-text">支付成功！</div>
      <div class="success-desc">订单已生成，请前往"我的订单"查看</div>
      <button class="view-order-btn" @click="handleViewOrder">查看订单</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js';

export default {
  name: 'PaymentComponent',
  props: {
    orderData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedPaymentMethod: 'wechat',
      countdown: 1800,
      countdownTimer: null,
      paymentSuccess: false,
      orderInfo: {
        orderId: '',
        trainInfo: '',
        passengerCount: 0,
        departureTime: '',
        passengers: [],
        totalAmount: 0
      }
    }
  },
  computed: {
    formatCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.initOrderInfo();
    this.startCountdown();
  },
  beforeUnmount() {
    this.stopCountdown();
  },
  methods: {
    initOrderInfo() {
      if (this.orderData && Object.keys(this.orderData).length > 0) {
        this.orderInfo = {
          orderId: this.orderData.orderId || '',
          trainInfo: this.orderData.trainInfo || '',
          passengerCount: this.orderData.passengerCount || 0,
          departureTime: this.orderData.departureTime || '',
          passengers: this.orderData.passengers || [],
          totalAmount: this.orderData.totalAmount || 0
        };
      }
    },
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.stopCountdown();
        }
      }, 1000);
    },
    stopCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    handleCancel() {
      if (confirm('确定要取消订单吗？')) {
        this.$emit('cancel');
      }
    },
    handlePay() {
      if (!this.selectedPaymentMethod) {
        alert('请选择支付方式');
        return;
      }

      const paymentData = {
        orderId: this.orderInfo.orderId,
        paymentMethod: this.selectedPaymentMethod,
        amount: this.orderInfo.totalAmount
      };

      api.post('/payment/pay', paymentData)
        .then(response => {
          this.paymentSuccess = true;
          this.stopCountdown();
          this.$emit('success', response.data);
        })
        .catch(error => {
          console.error('支付失败:', error);
          alert('支付失败，请重试');
        });
    },
    handleViewOrder() {
      this.$emit('viewOrder');
    }
  }
}
</script>

<style scoped>
.payment-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  font-family: "Microsoft YaHei", sans-serif;
}

/* 顶部标题 */
.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #FF9500;
}

.payment-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.countdown {
  font-size: 14px;
  color: #606266;
}

.countdown-label {
  margin-right: 8px;
}

.countdown-time {
  font-size: 18px;
  font-weight: 600;
  color: #FF9500;
}

.countdown.expired {
  color: #f56c6c;
}

/* 区块标题 */
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

/* 订单信息 */
.order-info-section,
.passenger-info-section,
.amount-section,
.payment-method-section {
  margin-bottom: 32px;
}

.order-info-content {
  padding-left: 20px;
}

.order-info-row {
  display: flex;
  margin-bottom: 12px;
  font-size: 14px;
}

.info-label {
  color: #909399;
  width: 100px;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-weight: 500;
}

/* 乘客信息 */
.passenger-list {
  padding-left: 20px;
}

.passenger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 8px;
}

.passenger-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.passenger-details {
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.passenger-seat {
  color: #606266;
}

.passenger-price {
  color: #FF9500;
  font-weight: 600;
}

/* 金额 */
.amount-section {
  background-color: #fff7e6;
  padding: 16px 20px;
  border-radius: 4px;
  border-left: 3px solid #FF9500;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount-label {
  font-size: 16px;
  color: #606266;
}

.amount-value {
  font-size: 24px;
  font-weight: 600;
  color: #FF9500;
}

/* 支付方式 */
.payment-methods {
  padding-left: 20px;
}

.payment-method-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-method-item:hover {
  border-color: #FF9500;
  background-color: #fff7e6;
}

.payment-method-item.active {
  border-color: #FF9500;
  background-color: #fff7e6;
}

.payment-method-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 16px;
}

.payment-method-icon svg {
  width: 32px;
  height: 32px;
}

.wechat-icon {
  background-color: #e8f5e9;
}

.alipay-icon {
  background-color: #e6f7ff;
}

.card-icon {
  background-color: #fff7e6;
}

.payment-method-info {
  flex: 1;
}

.payment-method-name {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.payment-method-desc {
  font-size: 12px;
  color: #909399;
}

.payment-method-check {
  width: 24px;
  height: 24px;
  border: 2px solid #dcdfe6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.payment-method-item.active .payment-method-check {
  border-color: #FF9500;
  background-color: #FF9500;
}

.check-icon {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

/* 支付按钮 */
.payment-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}

.cancel-btn,
.pay-btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.cancel-btn {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #f5f7fa;
  border-color: #c0c4cc;
}

.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pay-btn {
  background-color: #FF9500;
  color: #fff;
}

.pay-btn:hover:not(:disabled) {
  background-color: #ffad33;
}

.pay-btn:disabled {
  background-color: #c0c4cc;
  cursor: not-allowed;
}

/* 支付成功 */
.payment-success {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 1000;
}

.success-icon {
  width: 80px;
  height: 80px;
  background-color: #52c41a;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  margin: 0 auto 20px;
}

.success-text {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.success-desc {
  font-size: 14px;
  color: #909399;
  margin-bottom: 24px;
}

.view-order-btn {
  padding: 12px 48px;
  background-color: #FF9500;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.view-order-btn:hover {
  background-color: #ffad33;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .payment-container {
    padding: 16px;
  }

  .payment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .payment-title {
    font-size: 20px;
  }

  .passenger-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .passenger-details {
    width: 100%;
    justify-content: space-between;
  }

  .payment-actions {
    flex-direction: column;
  }
}
</style>

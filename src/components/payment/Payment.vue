<template>
  <div class="payment-modal-overlay" @click.self="handleOverlayClick">
    <div class="payment-modal-container">
      <div class="payment-modal-header">
        <h2 class="payment-title">订单支付</h2>
        <button class="close-btn" @click.stop="handleClose" aria-label="关闭">×</button>
      </div>
      <div class="payment-modal-body">
        <div class="payment-container">
          <!-- 顶部标题 -->
          <div class="payment-header">
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
      </div>
    </div>

    <!-- 乘客信息 -->
    <div class="passenger-info-section">
      <h3 class="section-title">乘客信息</h3>
      <div class="passenger-list">
        <div class="passenger-item" v-for="(passenger, index) in orderInfo.passengers" :key="index">
          <div class="passenger-name">{{ passenger.name }}</div>
          <div class="passenger-details">
            <span class="passenger-id">{{ maskIdNumber(passenger.idNumber) }}</span>
            <span class="passenger-ticket-type">{{ passenger.ticketType }}</span>
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
          :class="{ active: selectedPaymentMethod === 'alipay' }"
          @click="selectPaymentMethod('alipay')"
        >
          <div class="payment-method-icon alipay-icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1677FF" d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z"/>
              <path fill="#FFFFFF" d="M736 416H288c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32z"/>
              <path fill="#FFFFFF" d="M352 320h320c17.7 0 32-14.3 32-32s-14.3-32-32-32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
              <path fill="#FFFFFF" d="M352 704h320c17.7 0 32-14.3 32-32s-14.3-32-32-32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
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
      </div>
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
      selectedPaymentMethod: 'alipay',
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
        console.log('Payment.vue 接收到的 orderData:', this.orderData);
        console.log('Payment.vue 接收到的 orderId:', this.orderData.orderId);
        console.log('Payment.vue orderId 类型:', typeof this.orderData.orderId);
        
        const ticketList = this.orderData.ticketList || [];
        const passengers = ticketList.map(ticket => ({
          name: ticket.name,
          seatType: ticket.seatType,
          seat: ticket.seat,
          ticketType: ticket.ticketType,
          idType: ticket.idType,
          idNumber: ticket.idNumber,
          price: ticket.price
        }));
        
        const totalAmount = ticketList.reduce((sum, ticket) => sum + (ticket.price || 0), 0);
        
        this.orderInfo = {
          orderId: this.orderData.orderId || '',
          trainInfo: this.orderData.trainInfo || '',
          passengerCount: ticketList.length,
          departureTime: '',
          passengers: passengers,
          totalAmount: totalAmount
        };
        
        console.log('Payment.vue 设置后的 orderInfo.orderId:', this.orderInfo.orderId);
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
    handleClose() {
      this.$emit('close');
    },
    handleOverlayClick() {
      this.$emit('close');
    },
    maskIdNumber(idNumber) {
      if (!idNumber) return '';
      const len = idNumber.length;
      if (len <= 8) return idNumber;
      return idNumber.substring(0, 4) + '*'.repeat(len - 8) + idNumber.substring(len - 4);
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
/* 弹窗遮罩层 */
.payment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* 弹窗容器 */
.payment-modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 弹窗头部 */
.payment-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.payment-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  font-size: 28px;
  color: #909399;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s;
  line-height: 1;
  padding: 0;
  position: relative;
  z-index: 100;
}

.close-btn:hover {
  background-color: #f5f7fa;
  color: #303133;
}

/* 弹窗主体 */
.payment-modal-body {
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.payment-container {
  padding: 24px;
  background-color: #fff;
  font-family: "Microsoft YaHei", sans-serif;
}

/* 顶部标题 */
.payment-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #FF9500;
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
  min-width: 80px;
}

.passenger-details {
  display: flex;
  gap: 30px;
  font-size: 14px;
  align-items: center;
  margin-left: 20px;
}

.passenger-id {
  color: #909399;
  min-width: 140px;
}

.passenger-ticket-type {
  color: #606266;
  min-width: 60px;
}

.passenger-seat {
  color: #606266;
  min-width: 100px;
}

.passenger-price {
  color: #FF9500;
  font-weight: 600;
  min-width: 80px;
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

.alipay-icon {
  background-color: #e6f7ff;
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

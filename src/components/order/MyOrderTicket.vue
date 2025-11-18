<template>
  <div class="order-page">
    <!-- 订单保存期限提示 -->
    <div class="notice-bar">订单信息保存期限为30日。</div>

    <!-- 查询条件区域 -->
    <div class="query-section">
      <label class="query-label">乘车日期</label>
      <input type="date" v-model="startDate" class="date-input" />
      <span class="separator">-</span>
      <input type="date" v-model="endDate" class="date-input" />
      <input type="checkbox" id="studentTicket" v-model="isStudentTicket" class="checkbox" />
      <label for="studentTicket" class="checkbox-label">学生票</label>
      <button class="query-btn" @click="handleQuery">查询</button>
    </div>

    <!-- 订单卡片区域 -->
    <div class="order-card" v-if="orders.length > 0">
      <div class="order-date-tag">{{ orders[0].date }} 周四</div>
      <div class="order-no">订单号：{{ orders[0].orderNo }}</div>
      
      <div class="ticket-main">
        <div class="train-section">
          <div class="train-number">{{ orders[0].trainNum }}</div>
          <div class="route-info">
            <div class="station departure-station">
              <div class="station-name">{{ orders[0].departureStation }}</div>
              <div class="time">{{ orders[0].departureTime }}</div>
            </div>
            <div class="route-arrow">
              <svg width="120" height="2" viewBox="0 0 120 2" fill="none">
                <line x1="0" y1="1" x2="120" y2="1" stroke="#4285F4" stroke-width="2"/>
              </svg>
              <div class="ticket-valid">车票当日当次有效</div>
            </div>
            <div class="station arrival-station">
              <div class="station-info">
                <div class="station-name">{{ orders[0].arrivalStation }}</div>
                <div class="time">{{ orders[0].arrivalTime }}</div>
              </div>
              <div class="station-with-status">
                <div class="order-status">{{ orders[0].status }}</div>
                <button class="refund-btn">退票</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ticket-details">
          <div class="seat-info">
            <span class="seat-type">{{ orders[0].seatType }}</span>
          </div>
          <div class="price-info">
            <div class="ticket-type">
              {{ orders[0].ticketType }} ¥{{ orders[0].price }}
              <span class="discount-tag">{{ orders[0].discount }}折</span>
            </div>
            <div class="qualification-tag" v-if="orders[0].qualificationChecked">学生资质已核验</div>
          </div>
          <div class="action-section">
              <!-- 退票按钮已移动到到达站区域 -->
            </div>
        </div>
      </div>
      
      <div class="order-meta">
        <div class="purchase-type">
          <span class="tag">线上购买</span>
          <span class="tag">非现金支付</span>
        </div>
        <div class="operate-btns">
          <button class="operate-btn">改签</button>
          <button class="operate-btn">变更到站</button>
        </div>
      </div>
    </div>

    <!-- 分页区域 -->
    <div class="pagination" v-if="orders.length > 0">
      <span>共1页</span>
      <button class="page-btn active">1</button>
      <span>到</span>
      <input type="number" class="page-input" />
      <span>页</span>
      <button class="page-btn">确定</button>
    </div>

    <!-- 空状态 -->
    <div class="empty-tip" v-else>暂无订单信息</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 响应式数据
const startDate = ref('2025-11-18');
const endDate = ref('2025-12-18');
const isStudentTicket = ref(false);
const orders = ref([
  {
    date: '2025-11-27',
    trainNum: 'K1189',
    departureStation: '北京',
    departureTime: '16:10开',
    arrivalStation: '通辽',
    arrivalTime: '06:14到',
    seatType: '14车 057号',
    ticketType: '学生票',
    price: '56.0',
    discount: '5',
    qualificationChecked: true,
    status: '已支付',
    orderNo: 'E151920699',
  },
]);

// 查询方法
const handleQuery = () => {
  console.log('查询条件：', {
    startDate: startDate.value,
    endDate: endDate.value,
    isStudentTicket: isStudentTicket.value,
  });
};
</script>

<style scoped>
.order-page {
  font-family: "Microsoft Yahei", sans-serif;
  max-width: 3000px;
  margin: 0 0 0 150px;
  padding: 20px;
  color: #333;
}

.notice-bar {
  background-color: #fff3e0;
  border: 1px solid #ffcc80;
  padding: 8px;
  color: #e65100;
  margin-bottom: 20px;
  text-align: center;
}

.query-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.query-label {
  margin-right: 10px;
  font-weight: 500;
}

.date-input {
  padding: 6px;
  border: 1px solid #ddd;
  margin-right: 5px;
  border-radius: 3px;
}

.separator {
  margin: 0 5px;
}

.checkbox {
  margin: 0 8px 0 20px;
}

.checkbox-label {
  margin-right: 15px;
}

.query-btn {
  padding: 6px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 3px;
}

.order-card {
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;
  width: 800px;
}

.order-date-tag {
  background-color: #00897b;
  color: #fff;
  padding: 8px 15px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  margin-right: 658px;
}

.order-no {
  position: absolute;
  top: 8px;
  right: 15px;
  font-size: 12px;
  color: #666;
  z-index: 2;
}

.ticket-main {
  padding: 20px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.train-section {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.train-number {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 30px;
  min-width: 80px;
}

.route-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.station {
  text-align: center;
  min-width: 100px;
}

.station-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.time {
  font-size: 14px;
  color: #666;
}

.route-arrow {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.ticket-valid {
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  padding: 3px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 8px;
}

.ticket-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.seat-info {
  min-width: 120px;
}

.seat-type {
  font-size: 14px;
  color: #666;
  background-color: #f8f9fa;
  padding: 6px 20px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  display: inline-block;
}

.price-info {
  text-align: center;
  min-width: 150px;
}

.ticket-type {
  font-size: 14px;
  margin-bottom: 5px;
}

.discount-tag {
  background-color: #f44336;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  margin-left: 5px;
}

.qualification-tag {
  background-color: #81c784;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  display: inline-block;
  margin-top: 5px;
}

.action-section {
  text-align: right;
  min-width: 120px;
}

.arrival-station {
  display: flex;
  align-items: flex-start;
  gap: 30px;
}

.station-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.station-with-status {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}

.arrival-station .order-status {
  font-size: 14px;
  font-weight: 500;
  color: #2e7d32;
  background-color: #e8f5e8;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.arrival-station .refund-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(238, 90, 36, 0.3);
}

.arrival-station .refund-btn:hover {
  background: linear-gradient(135deg, #ee5a24, #d63031);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(238, 90, 36, 0.4);
}

.refund-btn {
  color: #2196f3;
  background-color: #fff;
  border: 1px solid #2196f3;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.refund-btn:hover {
  background-color: #2196f3;
  color: #fff;
}

.order-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-top: 1px solid #eee;
}

.purchase-type .tag {
  display: inline-block;
  border: 1px solid #2196f3;
  color: #2196f3;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 5px;
}

.operate-btns {
  display: flex;
}

.operate-btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 3px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.print-btn {
  background-color: #ff9800;
  color: #fff;
  border: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 14px;
}

.pagination span {
  margin: 0 5px;
}

.page-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 3px;
}

.page-btn.active {
  background-color: #2196f3;
  color: #fff;
  border-color: #2196f3;
}

.page-input {
  width: 50px;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 3px;
}

.empty-tip {
  text-align: center;
  padding: 40px 0;
  color: #666;
}
</style>
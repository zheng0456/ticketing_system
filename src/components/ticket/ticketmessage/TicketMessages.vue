<template>
  <div class="ticket-message-container">
    <!-- 列车信息标题栏 -->
    <div class="ticket-header">
      列车信息（以下票价信息仅供参考）
    </div>
    
    <!-- 列车详细信息 -->
    <div class="train-info">
      {{ trainInfo.date }}（{{ trainInfo.weekday }}）{{ trainInfo.trainNumber }}次 {{ trainInfo.departureStation }}（{{ trainInfo.departureTime }}开）→{{ trainInfo.arrivalStation }}（{{ trainInfo.arrivalTime }}到）
    </div>
    
    <!-- 票价信息 -->
    <div class="ticket-prices">
      <span 
        v-for="(price, index) in ticketPrices" 
        :key="index"
        class="price-item"
      >
        {{ price.seat_type }} {{ price.seat_type }}（¥{{ price.price }}元）剩余{{ price.num }}
      </span>
      <div style="text-align: left; margin-top: 10px; font-size: 12px; color: #ff6b6b;">
        *显示的价格均为实际活动折扣后票价，供您参考，查看公布票价。具体票价以您确认支付时实际购买的铺别票价为准。
      </div>
    </div>
    
    <!-- 乘客信息表单 -->
    <div class="passenger-info">
      <!-- 乘客信息标题栏 -->
      <div class="passenger-header">
        乘客信息（填写说明）
      </div>
      
      
      <!-- 乘车人列表 -->
      <div class="passenger-section">
        <div class="section-title">
          <span class="passenger-icon">👥</span> 乘车人
        </div>
        <div class="passenger-checkboxes">
          <div 
            v-for="passenger in normalPassengers" 
            :key="passenger.id"
            class="passenger-checkbox"
          >
            <input 
              type="checkbox" 
              :id="`passenger-${passenger.id}`"
              :checked="selectedPassengers.includes(passenger.id)"
              @change="selectPassenger(passenger.id)"
            >
            <label :for="`passenger-${passenger.id}`">
              {{ passenger.name }}
              <span v-if="passenger.isStudent">(学生)</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- 票务信息表格 -->
      <div class="ticket-form">
        <table class="ticket-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>票种</th>
              <th>席别</th>
              <th>姓名</th>
              <th>证件类型</th>
              <th>证件号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ticket, index) in ticketList" :key="ticket.id">
              <td>{{ index + 1 }}</td>
              <td>
                <select 
                  class="ticket-type-select"
                  v-model="ticket.ticketType"
                >
                  <option 
                    v-for="type in ticketTypes" 
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
              </td>
              <td>
                <select 
                  class="seat-type-select"
                  v-model="ticket.seatType"
                >
                  <option 
                    v-for="seat in seatTypes" 
                    :key="seat"
                    :value="seat"
                  >
                    {{ seat }}
                  </option>
                </select>
              </td>
              <td><input 
                type="text" 
                class="name-input"
                v-model="ticket.name"
                placeholder="请输入姓名"
              ></td>
              <td>
                <select 
                  class="id-type-select"
                  v-model="ticket.idType"
                >
                  <option 
                    v-for="idType in idTypes" 
                    :key="idType"
                    :value="idType"
                  >
                    {{ idType }}
                  </option>
                </select>
              </td>
              <td><input 
                type="text" 
                class="id-number-input"
                v-model="ticket.idNumber"
                placeholder="请输入证件号"
                style="padding-right: 0px;"
              ></td>
            </tr>
          </tbody>
        </table>

      </div>
      
      <!-- 车票图片 -->
      <div class="ticket-image-container">
        <img src="@/assets/img/车票1.png" alt="车票" class="ticket-image">
      </div>
      
      <!-- 提交按钮 -->
      <div class="submit-section">
        <p class="agreement-text">提交订单表示已阅读并同意《国铁集团铁路旅客运输规程》《服务条款》</p>
        <div class="button-group">
          <button class="prev-btn" @click="goBack">上一步</button>
          <button class="submit-btn" @click="submitOrder">提交订单</button>
        </div>
      </div>
      
      <!-- 温馨提示 -->
      <div class="tips-section">
        <h4>温馨提示：</h4>
        <p>1. 一张有效身份证件同一乘车日期同一车次只能购买一张车票，高铁快助列车除外。改签或变更到站后车票的乘车日期在春运期间，如再办理退票将按票面价格20%核收退票费。请合理安排行程，更多改签规则请查看《退改签说明》。</p>
        <p>2. 购买儿童票时，乘车儿童需有有效身份证件的，请填写本人有效身份证件信息。自2023年1月1日起，每一名持票成年人旅客可免费携带一名未满6周岁且不单独占用席位的儿童乘车，超过一名时，超过人数购买儿童优惠票。免费儿童可以在购票成功后添加。</p>
        <p>3. 购买残疾军人（伤残警察）优待票时，须在购票后、开车前办理换票手续方可进站乘车。换票时，不符合规定的减价优待条件，没有有效"中华人民共和国残疾军人证"或"中华人民共和国伤残人民警察证"的，不予换票，所购车票按规定办理退票手续。</p>
      </div>
    </div>

    <!-- 订单确认弹窗 -->
        <div v-if="showConfirmation" class="modal-overlay" @click.self="closeConfirmation">
          <div class="modal-content">
            <TicketSteateMessage :trainInfo="trainInfoText" :ticketList="ticketList" @cancel="closeConfirmation" />
          </div>
        </div>
  </div>
</template>

<script>
import TicketSteateMessage from './TicketSteateMessage.vue'
import api from '@/api/index.js'
import { ElMessage } from 'element-plus'

export default {
  name: 'TicketMessages',
  components: {
    TicketSteateMessage
  },
  props: {
    // 如果需要动态传递列车信息，可以在这里定义props
    trainData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 乘车人数据
      passengers: [],
      // 加载状态
      loading: false,
      // 错误信息
      error: '',
      
      // 已选乘车人
      selectedPassengers: [],
      
      // 票务信息列表
      ticketList: [
        {
          id: 1,
          ticketType: '成人票',
          seatType: '硬卧（中铺¥441.0元 下铺¥456.0元 上铺¥426.0元）',
          name: '',
          idType: '居民身份证',
          idNumber: ''
        }
      ],
      
      // 票种选项
      ticketTypes: ['成人票', '学生票', '儿童票'],
      
      // 席别选项
      seatTypes: [
        '硬卧（中铺¥441.0元 下铺¥456.0元 上铺¥426.0元）',
        '软卧（上铺¥673.0元 下铺¥703.0元）',
        '硬座（¥251.0元）',
        '一等座（¥251.0元）',
        '二等座（¥251.0元）',
        '商务座（¥251.0元）'
      ],
      
      // 证件类型选项
      idTypes: ['居民身份证', '护照', '军官证'],
      // 弹窗显示状态
      showConfirmation: false,
      // 火车信息文本
      trainInfoText: '',
      // 列车信息对象
      trainInfo: {
        trainNumber: '',
        departureStation: '',
        arrivalStation: '',
        departureTime: '',
        arrivalTime: '',
        date: '',
        weekday: '',
        duration: ''
      },
      // 票价信息列表
      ticketPrices: []
    }
  },
  methods: {
    
    // 选择乘车人
    selectPassenger(passengerId) {
      const index = this.selectedPassengers.indexOf(passengerId);
      const passenger = this.passengers.find(p => p.id === passengerId);
      
      if (index > -1) {
        // 取消选中，移除对应的票务信息
        this.selectedPassengers.splice(index, 1);
        
        // 移除对应的票务信息
        const ticketIndex = this.ticketList.findIndex(t => t.name === passenger.name && t.idNumber === passenger.idNumber);
        if (ticketIndex > -1) {
          this.ticketList.splice(ticketIndex, 1);
        }
        
        // 重新整理票务信息，确保剩余乘客信息与选择顺序一致
        this.reorganizeTicketList();
      } else {
        // 选中乘客，添加到已选列表
        this.selectedPassengers.push(passengerId);
        
        // 创建新的票务信息并填充乘客信息
        const newTicket = {
          id: Date.now(),
          ticketType: passenger.isStudent ? '学生票' : '成人票',
          seatType: this.seatTypes[0], // 默认选择第一个座位类型
          name: passenger.name,
          idType: '居民身份证',
          idNumber: passenger.idNumber
        };
        
        // 如果是第一个选中的乘客，填充到序号1的行（即ticketList的第一个元素）
        if (this.selectedPassengers.length === 1) {
          // 如果ticketList已有第一个元素，则更新它；否则添加新元素
          if (this.ticketList.length > 0) {
            this.ticketList[0] = newTicket;
          } else {
            this.ticketList.push(newTicket);
          }
        } else {
          // 对于后续选中的乘客，添加到ticketList末尾
          this.ticketList.push(newTicket);
        }
      }
      
      console.log('已选乘车人:', this.selectedPassengers);
      console.log('票务信息:', this.ticketList);
    },
    
    // 重新整理票务信息，确保与选择顺序一致
    reorganizeTicketList() {
      // 保存当前ticketList中用户修改过的票种和座位类型设置
      const userModifiedSettings = {};
      this.ticketList.forEach(ticket => {
        if (ticket.name && ticket.idNumber) {
          userModifiedSettings[`${ticket.name}-${ticket.idNumber}`] = {
            ticketType: ticket.ticketType,
            seatType: ticket.seatType,
            idType: ticket.idType
          };
        }
      });
      
      // 创建新的ticketList，根据selectedPassengers顺序重新排列乘客信息
      const newTicketList = [];
      
      // 首先添加已选乘客的信息，保留用户之前的设置
      this.selectedPassengers.forEach(passengerId => {
        const passenger = this.passengers.find(p => p.id === passengerId);
        if (passenger) {
          const key = `${passenger.name}-${passenger.idNumber}`;
          const savedSettings = userModifiedSettings[key] || {};
          
          newTicketList.push({
            id: Date.now(),
            ticketType: savedSettings.ticketType || (passenger.isStudent ? '学生票' : '成人票'),
            seatType: savedSettings.seatType || this.seatTypes[0],
            name: passenger.name,
            idType: savedSettings.idType || '居民身份证',
            idNumber: passenger.idNumber
          });
        }
      });
      
      // 添加空行，确保表格至少有一行
      if (newTicketList.length === 0) {
        newTicketList.push({
          id: Date.now(),
          ticketType: '成人票',
          seatType: this.seatTypes[0],
          name: '',
          idType: '居民身份证',
          idNumber: ''
        });
      }
      
      // 更新ticketList
      this.ticketList = newTicketList;
    },
    
    // 添加票务信息
    addTicket() {
      const newTicket = {
        id: Date.now(), // 简单生成唯一ID
        ticketType: '成人票',
        seatType: '硬卧（中铺¥441.0元 下铺¥456.0元 上铺¥426.0元）',
        name: '',
        idType: '居民身份证',
        idNumber: ''
      };
      this.ticketList.push(newTicket);
    },
    
    // 删除票务信息
    removeTicket(ticketId) {
      const index = this.ticketList.findIndex(ticket => ticket.id === ticketId);
      if (index > -1) {
        this.ticketList.splice(index, 1);
      }
    },
    
    // 上一步
    goBack() {
      console.log('返回上一步');
      // 回退到/ticket页面
      this.$router.push('/ticket');
    },
    
    // 提交订单
    submitOrder() {
      console.log('提交订单:', this.ticketList);
      // 显示确认弹窗
      this.showConfirmation = true;
    },
    // 关闭弹窗
    closeConfirmation() {
      this.showConfirmation = false;
    },
    // 获取乘车人信息
    async getPassengers() {
      this.loading = true;
      this.error = '';
      try {
        const response = await api.post('/user/passenger/list');
        this.passengers = response.data.data || response.data || [];
      } catch (error) {
        console.error('获取乘车人信息失败:', error);
        this.error = '获取乘车人信息失败，请稍后重试';
        ElMessage.error(error.response?.data?.msg || '获取乘车人信息失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },
    // 获取票价信息
    async getTicketPrices() {
      this.loading = true;
      this.error = '';
      try {
        const response = await api.post('/product/ticketMessages', {
          trainId: this.$route.query.id
        });
        console.log('票价信息响应:', response);
        console.log('票价信息数据:', response.data);
        this.ticketPrices = response.data.data || response.data || [];
      } catch (error) {
        console.error('获取票价信息失败:', error);
        this.error = '获取票价信息失败，请稍后重试';
        ElMessage.error(error.response?.data?.msg || '获取票价信息失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // 从路由参数获取列车信息
    const query = this.$route.query;
    if (query.trainNumber) {
      this.trainInfo = {
        trainNumber: query.trainNumber || '',
        departureStation: query.departureStation || '',
        arrivalStation: query.arrivalStation || '',
        departureTime: query.departureTime || '',
        arrivalTime: query.arrivalTime || '',
        date: query.date || '',
        weekday: query.weekday || '',
        duration: query.duration || ''
      };
    }
    // 获取火车信息文本
    this.trainInfoText = this.$el.querySelector('.train-info').textContent.trim();
    // 获取乘车人信息
    this.getPassengers();
    // 获取票价信息
    this.getTicketPrices();
  },
  computed: {
    // 受让人列表
    assignees() {
      return this.passengers.filter(passenger => passenger.isAssignee);
    },
    
    // 乘车人列表（非受让人）
    normalPassengers() {
      return this.passengers.filter(passenger => !passenger.isAssignee);
    }
  }
}
</script>

<style scoped>
.ticket-message-container {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
}

.ticket-header {
  background-color: #1890ff;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  text-align: left;
}

.train-info {
  padding: 15px;
  background-color: #fafafa;
  border-bottom: 1px dashed #e0e0e0;
  line-height: 1.5;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.ticket-prices {
  padding: 15px;
  border-bottom: 1px dashed #e0e0e0;
  text-align: left;
}

.price-item {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-align: left;
}

.ticket-note {
  padding: 10px 15px;
  font-size: 12px;
  color: #ff6b6b;
  background-color: #fffaf0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .price-item {
    display: block;
    margin-right: 0;
  }
}

/* 乘客信息区域样式 */
.passenger-info {
  margin-top: 25px; /* 确保距离上一个div有15px间距 */
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
}

/* 乘客信息标题栏 */
.passenger-header {
  background-color: #1890ff;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  text-align: left;
  position: relative;
}



/* 乘车人部分 */
.passenger-section {
  padding: 15px;
  border-bottom: 1px dashed #e0e0e0;
  text-align: left;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.passenger-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.passenger-checkbox {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
}

.passenger-checkbox input {
  margin-right: 5px;
}

/* 票务信息表格 */
.ticket-form {
  padding: 15px;
  border-bottom: 1px dashed #e0e0e0;
}

.ticket-table {
  width: 100%;
  border-collapse: collapse;
}

.ticket-table th,
.ticket-table td {
  padding: 10px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.ticket-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.ticket-table select,
.ticket-table input {
  width: 100%;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
}

.ticket-table select:focus,
.ticket-table input:focus {
  border-color: #1890ff;
  outline: none;
}

.remove-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

/* 车票图片样式 */
.ticket-image-container {
  border-bottom: 1px dashed #e0e0e0;
  overflow: hidden;
}

.ticket-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 提交按钮区域 */
.submit-section {
  padding: 20px 15px;
  text-align: center;
  border-bottom: 1px dashed #e0e0e0;
}

.agreement-text {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.prev-btn {
  padding: 8px 20px;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 3px;
  cursor: pointer;
}

.submit-btn {
  padding: 8px 20px;
  border: 1px solid #1890ff;
  background-color: #1890ff;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

/* 温馨提示 */
.tips-section {
  background-color: #fff7e6;
  padding: 15px;
  font-size: 12px;
  color: #666;
  text-align: left;
}

.tips-section h4 {
  margin: 0 0 10px 0;
  color: #fa8c16;
}

.tips-section p {
  margin: 5px 0;
  line-height: 1.5;
}

/* 响应式设计补充 */
@media (max-width: 768px) {

  
  .passenger-checkboxes {
    flex-direction: column;
  }
  
  .ticket-table {
    font-size: 12px;
  }
  
  .ticket-table th,
  .ticket-table td {
    padding: 5px;
  }
  
  .insurance-banner {
    flex-direction: column;
  }
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
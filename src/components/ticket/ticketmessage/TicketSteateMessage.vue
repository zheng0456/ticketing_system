<template>
 <div class="check-info">请核对以下信息</div>
  <div class="ticket-message-container">
    <!-- 顶部车次信息 -->
    <h3 class="train-info">{{ trainInfo }}</h3>
    

    <!-- 乘客信息表格 -->
    <div class="passenger-table-container">
      <table class="passenger-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>席别</th>
            <th>票种</th>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号码</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in ticketList" :key="ticket.id || index">
            <td>{{ index + 1 }}</td>
            <td>{{ticket.seatType }}</td>
            <td>{{ ticket.ticketType }}</td>
            <td>{{ ticket.name }}</td>
            <td>{{ ticket.idType }}</td>
            <td>{{ maskIdNumber(ticket.idNumber) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 提示信息 -->
    <div class="notice-text">
      *如剩余席位（铺位）无法满足您的需求，系统将自动为您分配。
    </div>

    <!-- 铺位选择 -->
    <div class="berth-selection" v-if="showBerthSelection">
      <div class="berth-title">
        <i class="icon-select"></i> 选铺啦
      </div>
      <div class="berth-options">
        <div class="berth-item">
          <span class="berth-name">下铺</span>
          <button class="berth-btn minus" @click="decrementBerth('lower')">-</button>
          <span class="berth-count">{{ lowerBerth }}</span>
          <button class="berth-btn plus" @click="incrementBerth('lower')">+</button>
        </div>
        <div class="berth-item">
          <span class="berth-name">中铺</span>
          <button class="berth-btn minus" @click="decrementBerth('middle')">-</button>
          <span class="berth-count">{{ middleBerth }}</span>
          <button class="berth-btn plus" @click="incrementBerth('middle')">+</button>
        </div>
        <div class="berth-item">
          <span class="berth-name">上铺</span>
          <button class="berth-btn minus" @click="decrementBerth('upper')">-</button>
          <span class="berth-count">{{ upperBerth }}</span>
          <button class="berth-btn plus" @click="incrementBerth('upper')">+</button>
        </div>
      </div>
      <div class="selected-count">
        已选铺{{ totalSelectedBerths }}/{{ ticketList.length }}
      </div>
    </div>
    <!-- 座位选择界面 -->
    <div class="seat-selection" v-if="showSeatSelection">
      <div class="seat-selection-header">
        <span class="seat-title">选座啦</span>
      </div>
      <div class="seat-container">
        <div class="seat-row">
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('A') }" @click="selectSeat('A')">A</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('B') }" @click="selectSeat('B')">B</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('C') }" @click="selectSeat('C')">C</div>
          <div class="aisle">过道</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('D') }" @click="selectSeat('D')">D</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('F') }" @click="selectSeat('F')">F</div>
        </div>
      </div>
      <div class="selected-seat-info">
        已选座{{ selectedSeats.length }}/{{ ticketList.length }}
      </div>
    </div>

    <!-- 座位选择界面 -->
    <div class="seat-selection" v-if="showSeatSelections">
      <div class="seat-selection-header">
        <span class="seat-title">选座啦</span>
      </div>
      <div class="seat-container">
        <div class="seat-row">
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('A') }" @click="selectSeat('A')">A</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('C') }" @click="selectSeat('C')">C</div>
          <div class="aisle">过道</div>
          <div class="seat seat-available" :class="{ selected: selectedSeats.includes('F') }" @click="selectSeat('F')">F</div>
        </div>
      </div>
      <div class="selected-seat-info">
        已选座{{ selectedSeats.length }}/{{ ticketList.length }}
      </div>
    </div>

    <!-- 学生票提示 -->
    <div class="student-notice">
      *按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。
    </div>

    <!-- 余票信息 -->
    <div class="remaining-tickets">
      本次列车，{{ remainingTicketsInfo }}。
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="btn-cancel" @click="handleCancel">返回修改</button>
      <button class="btn-confirm" @click="handleConfirm">确认</button>
    </div>
    
  </div>
</template>

<script>
import api from '@/api/index.js';

export default {
  name: 'TicketSteateMessage',
  props: {
    trainInfo: {
      type: String,
      default: '2025-11-26（周三） K545次 北京站（12:50开）→成都西站（22:21到）'
    },
    ticketList: {
      type: Array,
      default: () => [{
        seatType: '硬卧',
        ticketType: '学生票',
        name: '郑锦春',
        idType: '居民身份证',
        idNumber: '1526***********712'
      }]
    },
    remainingTickets: {
      type: Object,
      default: () => ({
        '硬卧': 81
      })
    }
  },
  data() {
    return {
      lowerBerth: 0,
      middleBerth: 0,
      upperBerth: 0,
      selectedSeats: []
    }
  },
  computed: {
    totalSelectedBerths() {
      return this.lowerBerth + this.middleBerth + this.upperBerth
    },
    selectedSeat() {
      return this.selectedSeats.length > 0 ? this.selectedSeats[0] : null
    },
    currentSeatType() {
      if (!this.ticketList || this.ticketList.length === 0) {
        return '';
      }
      return this.ticketList[0].seatType || '';
    },
    uniqueSeatTypes() {
      if (!this.ticketList || this.ticketList.length === 0) {
        return [];
      }
      const seatTypes = this.ticketList.map(ticket => {
        const seatType = ticket.seatType || '';
        const match = seatType.match(/^(.+?)(?:（|$)/);
        return match ? match[1] : seatType;
      });
      return [...new Set(seatTypes)];
    },
    remainingTicketsInfo() {
      console.log('remainingTickets:', this.remainingTickets);
      console.log('uniqueSeatTypes:', this.uniqueSeatTypes);
      return this.uniqueSeatTypes.map(seatType => {
        const count = this.remainingTickets[seatType] || 0;
        console.log(`seatType: ${seatType}, count: ${count}`);
        return `${seatType}余票${count}张`;
      }).join('，');
    },
    showBerthSelection() {
      // 当ticketList中包含软卧或硬卧时显示铺位选择界面
      if (!this.ticketList || this.ticketList.length === 0) {
        return false; // 当没有数据时默认不显示
      }
      // 检查是否包含软卧或硬卧：使用includes进行字符串包含判断
      return this.ticketList.some(ticket => {
        const seatType = ticket.seatType || ''; // 直接使用原始座位类型字符串
        return seatType.includes('软卧') || seatType.includes('硬卧');
      });
    },
    showSeatSelection() {
      // 当ticketList中包含二等座或一等座时显示座位选择界面
      return this.ticketList.some(ticket => {
        const seatType = ticket.seatType || '';
        return seatType.includes('二等座') || seatType.includes('一等座');
      });
    },
    showSeatSelections() {
      // 当ticketList中包含二等座或一等座时显示座位选择界面
      return this.ticketList.some(ticket => {
        const seatType = ticket.seatType || '';
        return seatType.includes('商务');
      });
    }
  },
  methods: {
    // 增加铺位数量
    incrementBerth(type) {
      if (this.totalSelectedBerths < this.ticketList.length) {
        if (type === 'lower') {
          this.lowerBerth++
        } else if (type === 'middle') {
          this.middleBerth++
        } else if (type === 'upper') {
          this.upperBerth++
        }
      }
    },
    // 减少铺位数量
    decrementBerth(type) {
      if (type === 'lower' && this.lowerBerth > 0) {
        this.lowerBerth--
      } else if (type === 'middle' && this.middleBerth > 0) {
        this.middleBerth--
      } else if (type === 'upper' && this.upperBerth > 0) {
        this.upperBerth--
      }
    },
    // 处理取消
    handleCancel() {
      // 这里可以添加返回修改的逻辑
      console.log('返回修改')
      this.$emit('cancel')
    },
    
    // 对证件号码进行脱敏处理
    maskIdNumber(idNumber) {
      if (!idNumber) return '';
      // 保留前4位和后4位，中间用*代替
      const len = idNumber.length;
      if (len <= 8) return idNumber;
      return idNumber.substring(0, 4) + '*'.repeat(len - 8) + idNumber.substring(len - 4);
    },
    
    // 处理确认
    handleConfirm() {
      const selectedBerths = [];
      if (this.lowerBerth > 0) selectedBerths.push(`下铺${this.lowerBerth}个`);
      if (this.middleBerth > 0) selectedBerths.push(`中铺${this.middleBerth}个`);
      if (this.upperBerth > 0) selectedBerths.push(`上铺${this.upperBerth}个`);
      
      const berthInfo = selectedBerths.join('、') || '无';
      
      const requestData = {
        ticketList: this.ticketList,
        berthInfo,
        selectedSeats: this.selectedSeats.length > 0 ? this.selectedSeats.join('、') : '未选座'
      };

      api.post('/order/createOrder', requestData)
        .then(response => {
          this.$emit('confirm', response.data);
        })
        .catch(error => {
          console.error('创建订单失败:', error);
          this.$emit('confirm', {
            ...requestData,
            error: error.message
          });
        });
    },
    
    // 处理座位选择的方法
    selectSeat(seat) {
      // 如果点击已选中的座位，则取消选择
      const index = this.selectedSeats.indexOf(seat);
      if (index > -1) {
        this.selectedSeats.splice(index, 1);
      } else {
        // 如果未达到最大选择数量，则添加新座位
        if (this.selectedSeats.length < this.ticketList.length) {
          this.selectedSeats.push(seat);
        }
      }
    }
  }
}
</script>

<style scoped>
.ticket-message-container {
  max-width: 758px;
  margin-top: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.check-info {
  background-color: #1890ff;
  color: white;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}

.train-info {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  padding-left: 5px;
}

.passenger-table-container {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.passenger-table {
  width: 100%;
  border-collapse: collapse;
}

.passenger-table th,
.passenger-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}

.passenger-table th {
  background-color: #fafafa;
  font-weight: 600;
  color: #262626;
}

.passenger-table td {
  color: #595959;
}

.notice-text,
.student-notice {
  color: #ff4d4f;
  font-size: 14px;
  margin-bottom: 15px;
  padding-left: 5px;
}

.berth-selection {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.berth-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #262626;
}

.icon-select {
  width: 20px;
  height: 20px;
  background-color: #faad14;
  border-radius: 50%;
  margin-right: 8px;
  display: inline-block;
  position: relative;
}

.icon-select::after {
  content: '♪';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}

.berth-options {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.berth-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.berth-name {
  font-size: 14px;
  color: #595959;
}

.berth-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.berth-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.berth-count {
  font-size: 14px;
  min-width: 20px;
  text-align: center;
}

.selected-count {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
  
  /* 座位选择样式 */
  .seat-selection {
    margin-top: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .seat-selection-header {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .seat-title {
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }
  
  .seat-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  
  .seat-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .seat {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e8e8e8;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
  }
  
  .seat:hover {
    background-color: #d9d9d9;
  }
  
  .seat-available {
    background-color: #1890ff;
    color: white;
    border-color: #1890ff;
  }
  
  .seat-available:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  
  .seat.selected {
    background-color: #52c41a;
    border-color: #52c41a;
  }
  
  .aisle {
    margin: 0 20px;
    color: #666;
    font-size: 14px;
    white-space: nowrap;
  }
  
  .selected-seat-info {
    text-align: center;
    color: #666;
    font-size: 14px;
  }

.remaining-tickets {
  font-size: 14px;
  color: #52c41a;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-cancel {
  background-color: white;
  border: 1px solid #d9d9d9;
  color: #595959;
}

.btn-cancel:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.btn-confirm {
  background-color: #ff7a45;
  color: white;
}

.btn-confirm:hover {
  background-color: #ff4d1a;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ticket-message-container {
    padding: 10px;
  }
  
  .check-info {
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .passenger-table {
    font-size: 14px;
  }
  
  .passenger-table th,
  .passenger-table td {
    padding: 8px 5px;
  }
  
  .berth-options {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-confirm {
    width: 100%;
  }
}
</style>
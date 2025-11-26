<template>
  <div class="ticket-message-container">
    <div class="check-info">请核对以下信息</div>
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
            <td>{{ formatSeatType(ticket.seatType) }}</td>
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
        已选铺{{ totalSelectedBerths }}/1
      </div>
    </div>

    <!-- 学生票提示 -->
    <div class="student-notice">
      *按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。
    </div>

    <!-- 余票信息 -->
    <div class="remaining-tickets">
      本次列车，硬卧余票81张。
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="btn-cancel" @click="handleCancel">返回修改</button>
      <button class="btn-confirm" @click="handleConfirm">确认</button>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {
      lowerBerth: 0,
      middleBerth: 0,
      upperBerth: 0
    }
  },
  computed: {
    totalSelectedBerths() {
      return this.lowerBerth + this.middleBerth + this.upperBerth
    },
    showBerthSelection() {
      // 判断是否显示选铺信息：当选座类型包含硬座或无座时不显示选铺
      if (!this.ticketList || this.ticketList.length === 0) {
        return true; // 当没有数据时默认显示
      }
      // 检查是否包含硬座或无座：使用includes进行字符串包含判断
      const hasHardSeatOrNoSeat = this.ticketList.some(ticket => {
        const seatType = ticket.seatType || ''; // 直接使用原始座位类型字符串
        return seatType.includes('硬座') || seatType.includes('无座');
      });
      // 如果包含硬座或无座则返回false（不显示选铺），否则返回true（显示选铺）
      return !hasHardSeatOrNoSeat;
    }
  },
  methods: {
    // 增加铺位数量
    incrementBerth(type) {
      if (this.totalSelectedBerths < 1) {
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
    // 格式化席别显示
    formatSeatType(seatType) {
      // 从seatType字符串中提取席别信息
      if (seatType.includes('硬卧')) {
        return '硬卧';
      } else if (seatType.includes('软卧')) {
        return '软卧';
      } else if (seatType.includes('硬座')) {
        return '硬座';
      } else if (seatType.includes('无座')) {
        return '无座';
      }
      return seatType;
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
      // 这里可以添加确认的逻辑
      console.log('确认订单')
      this.$emit('confirm', {
        lowerBerth: this.lowerBerth,
        middleBerth: this.middleBerth,
        upperBerth: this.upperBerth,
        ticketList: this.ticketList
      })
      // 确认后关闭弹窗
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.ticket-message-container {
  max-width: 800px;
  margin: 0 auto;
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
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
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
  font-size: 14px;
  color: #595959;
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
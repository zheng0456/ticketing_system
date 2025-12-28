<template>
  <div class="train-search">
    <!-- 顶部查询栏 -->
    <div class="top-bar">
      <div class="trip-type">
        <label><input type="radio" v-model="tripType" value="single" /> 单程</label>
        <label><input type="radio" v-model="tripType" value="round" /> 往返</label>
      </div>
      <div class="location">
        <input type="text" v-model="departure" placeholder="出发地" class="input" />
        <el-button class="swap-btn" @click="swapLocation" :icon="Switch" circle></el-button>
        <input type="text" v-model="destination" placeholder="目的地" class="input" />
      </div>
      <div class="date">
        <label>出发日</label>
        <input type="date" v-model="departDate" class="date-input" :min="minDate" />
        <label v-if="tripType === 'round'">返程日</label>
        <input type="date" v-model="returnDate" class="date-input" v-if="tripType === 'round'" :min="departDate" />
      </div>
      <div class="right-section">
        <div class="passenger-type">
          <label><input type="radio" v-model="passengerType" value="normal" checked /> 普通</label>
        <label><input type="radio" v-model="passengerType" value="student" /> 学生</label>
        </div>
        <button class="query-btn" @click="handleQuery">查询</button>
      </div>
    </div>

    <!-- 日期选择栏 -->
    <div class="date-nav">
      <button 
        v-for="(date, index) in dateList" 
        :key="index"
        class="date-item" 
        :class="{ active: date.isActive }"
        @click="selectDate(index)"
      >
        {{ date.date }} {{ date.weekday }}
      </button>
    </div>

    <!-- 筛选条件 -->
    <div class="filter">
      <div class="train-type">
        <label>车次类型：</label>
        <label><span class="tag" @click="clearTrainTypes">全部</span></label>
        <label><input type="checkbox" value="gc" v-model="selectedTrainTypes" @change="onFilterChange" /> GC-高铁/城际</label>
        <label><input type="checkbox" value="d" v-model="selectedTrainTypes" @change="onFilterChange" /> D-动车</label>
        <label><input type="checkbox" value="z" v-model="selectedTrainTypes" @change="onFilterChange" /> Z-直达</label>
        <label><input type="checkbox" value="t" v-model="selectedTrainTypes" @change="onFilterChange" /> T-特快</label>
        <label><input type="checkbox" value="k" v-model="selectedTrainTypes" @change="onFilterChange" /> K-快速</label>
        <label><input type="checkbox" value="other" v-model="selectedTrainTypes" @change="onFilterChange" /> 其他</label>
        <label><input type="checkbox" value="fx" v-model="selectedTrainTypes" @change="onFilterChange" /> 复兴号</label>
        <label><input type="checkbox" value="zn" v-model="selectedTrainTypes" @change="onFilterChange" /> 智能动车组</label>
        <div class="departure-time">
          <label>发车时间：</label>
          <select v-model="departureTimeRange" @change="onFilterChange">
            <option value="00:00--24:00">00:00--24:00</option>
            <option value="00:00--06:00">00:00--06:00</option>
            <option value="06:00--12:00">06:00--12:00</option>
            <option value="12:00--18:00">12:00--18:00</option>
            <option value="18:00--24:00">18:00--24:00</option>
          </select>
        </div>
      </div>
      <div class="station">
        <div class="station-row">
          <label>出发车站：</label>
          <span class="tag">全部</span>
        </div>
        <div class="station-row">
          <label>到达车站：</label>
          <span class="tag">全部</span>
        </div>
        <div class="station-row">
          <label>车次席别：</label>
          <span class="tag" @click="clearSeatTypes">全部</span>
          <label><input type="checkbox" value="rw" v-model="selectedSeatTypes" @change="onFilterChange" />软卧</label>
        <label><input type="checkbox" value="nw" v-model="selectedSeatTypes" @change="onFilterChange" />硬卧</label>
        <label><input type="checkbox" value="nz" v-model="selectedSeatTypes" @change="onFilterChange" />硬座</label>
        </div>
      </div>
    </div>

    <!-- 车次表格 -->
    <div class="train-table-container">
      <table class="train-table">
        <thead>
          <tr>
            <th width="8%">车次</th>
            <th width="12%">出发站<br>到达站</th>
            <th width="12%">出发时间<br>到达时间</th>
            <th width="10%">历时
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="sort-icon">
                <path d="M18 13L12 19L6 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </th>
            <th width="8%">商务座</th>
            <th width="8%">一等座</th>
            <th width="8%">二等座</th>
            <th width="8%">软卧</th>
            <th width="8%">硬卧</th>
            <th width="8%">硬座</th>
            <th width="8%">无座</th>
            <th width="8%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="12" style="text-align: center; padding: 30px; background-color: #f5f7fa;">
              <div style="display: inline-flex; align-items: center; gap: 10px;">
                <div class="loading-spinner"></div>
                <span>正在查询中...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="trainList.length === 0">
            <td colspan="12" style="text-align: center; padding: 30px; background-color: #f5f7fa;">
              暂无车次信息
            </td>
          </tr>
          <tr v-else v-for="(train, index) in trainList" :key="index">
            <td>
              <!-- 显示车次号，确保总是带下划线 -->
              <div style="border-bottom: 1px solid #333; padding-bottom: 2px; display: inline-block; text-align: center;">
                <span>{{ train.trainNumber || '--' }}</span>
              </div>
            </td>
            <td>
              {{ train.departureStation || '--' }}<br>
              {{ train.arrivalStation || '--' }}
            </td>
            <td>
              {{ train.departureTime || '--' }}<br>
              {{ train.arrivalTime || '--' }}
            </td>
            <td>{{ train.duration || '--' }}</td>
            <td>
              <span :class="{ 'seat-available': train.businessSeat > 0, 'seat-unavailable': train.businessSeat <= 0 }">
                {{ train.businessSeat === '--' ? '--' : (train.businessSeat <= 10 && train.businessSeat > 0 ? train.businessSeat : (train.businessSeat > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.firstClass > 0, 'seat-unavailable': train.firstClass <= 0 }">
                {{ train.firstClass === '--' ? '--' : (train.firstClass <= 10 && train.firstClass > 0 ? train.firstClass : (train.firstClass > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.secondClass > 0, 'seat-unavailable': train.secondClass <= 0 }">
                {{ train.secondClass === '--' ? '--' : (train.secondClass <= 10 && train.secondClass > 0 ? train.secondClass : (train.secondClass > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.softSleeper > 0, 'seat-unavailable': train.softSleeper <= 0 }">
                {{ train.softSleeper === '--' ? '--' : (train.softSleeper <= 10 && train.softSleeper > 0 ? train.softSleeper : (train.softSleeper > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.hardSleeper > 0, 'seat-unavailable': train.hardSleeper <= 0 }">
                {{ train.hardSleeper === '--' ? '--' : (train.hardSleeper <= 10 && train.hardSleeper > 0 ? train.hardSleeper : (train.hardSleeper > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.hardSeat > 0, 'seat-unavailable': train.hardSeat <= 0 }">
                {{ train.hardSeat === '--' ? '--' : (train.hardSeat <= 10 && train.hardSeat > 0 ? train.hardSeat : (train.hardSeat > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <span :class="{ 'seat-available': train.noSeat > 0, 'seat-unavailable': train.noSeat <= 0 }">
                {{ train.noSeat === '--' ? '--' : (train.noSeat <= 10 && train.noSeat > 0 ? train.noSeat : (train.noSeat > 0 ? '有' : '无')) }}
              </span>
            </td>
            <td>
              <button 
                class="book-button"
                @click="navigateToTicketMessages"
              >
                预定
              </button>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Switch } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import api from '@/api/index.js';

// 行程类型：单程/往返
const tripType = ref('single');
const route = useRoute();
const router = useRouter();
// 出发地、目的地
const departure = ref('');
const destination = ref('');
// 日期
const today = new Date().toISOString().split('T')[0];
const departDate = ref(today);
const returnDate = ref(today);
const minDate = ref(today);
// 乘客类型：普通/学生
const passengerType = ref('normal');

// 查询结果
const trainList = ref([]);
const loading = ref(false);

// 默认车次图片数据
const defaultTrainList = ref([
  {
    trainNumber: 'D11045',
    trainNumberImage: '/src/assets/img/D11045.png',
    imageError: false,
    departureStation: '清河',
    arrivalStation: '成都东',
    departureTime: '11:41',
    arrivalTime: '23:00',
    duration: '当日到达',
    // 确保不重复添加duration字段，保持原样显示
    businessSeat: '--',
    preferredFirstClass: '--',
    firstClass: 8,
    secondClass: 15,
    advancedSoftSleeper: '--',
    softSleeper: '--',
    hardSleeper: '--',
    softSeat: '--',
    hardSeat: 3,
    noSeat: '--',
    other: '--',
    remark: '--'
  }
]);



// 筛选条件
const selectedTrainTypes = ref([]);
const selectedSeatTypes = ref([]);
const departureTimeRange = ref('00:00--24:00');

// 生成日期列表
const dateList = ref([]);

// 获取当前日期并生成日期列表
const generateDateList = () => {
  const dates = [];
  const today = new Date();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  
  for (let i = 0; i < 15; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const weekday = weekdays[currentDate.getDay()];
    
    dates.push({
      date: `${month}-${day}`,
      weekday: weekday,
      fullDate: currentDate.toISOString().split('T')[0],
      isActive: i === 0
    });
  }
  
  dateList.value = dates;
};

// 交换出发地和目的地
const swapLocation = () => {
  const temp = departure.value;
  departure.value = destination.value;
  destination.value = temp;
};

// 选择日期
const selectDate = (index) => {
  dateList.value.forEach((date, i) => {
    date.isActive = i === index;
  });
  departDate.value = dateList.value[index].fullDate;
};

// 查询车票
const handleQuery = async () => {
  // 验证输入
  if (!departure.value.trim()) {
    ElMessage.warning('请输入出发地');
    return;
  }
  if (!destination.value.trim()) {
    ElMessage.warning('请输入目的地');
    return;
  }
  if (!departDate.value) {
    ElMessage.warning('请选择出发日期');
    return;
  }
  
  // 验证日期是否有效
  if (departDate.value < today) {
    ElMessage.warning('出发日期不能早于今天');
    return;
  }
  
  // 如果是往返，验证返程日期
  if (tripType.value === 'round') {
    if (!returnDate.value) {
      ElMessage.warning('请选择返程日期');
      return;
    }
    if (returnDate.value < departDate.value) {
      ElMessage.warning('返程日期不能早于出发日期');
      return;
    }
  }
  
  try {
    loading.value = true;
    
    // 构建查询参数，包含所有筛选条件
    const formatDate = (dateStr) => {
      return `${dateStr} 00:00:00`;
    };
    
    const queryParams = {
      departure: departure.value,
      destination: destination.value,
      departDate: formatDate(departDate.value),
      tripType: tripType.value,
      passengerType: passengerType.value,
      trainTypes: selectedTrainTypes.value,
      seatTypes: selectedSeatTypes.value,
      departureTimeRange: departureTimeRange.value
    };
    
    // 如果是往返，也格式化返程日期
    if (tripType.value === 'round') {
      queryParams.returnDate = formatDate(returnDate.value);
    }
    
    // 发送请求到后端
    console.log('查询请求开始:', { url: '/product/tickets', params: queryParams });
    const response = await api.post('/product/tickets', queryParams);
    
    console.log('查询响应完整数据:', JSON.stringify(response, null, 2));
    console.log('查询响应状态:', response.status);
    console.log('查询响应数据:', JSON.stringify(response.data, null, 2));
    
    if (response.data.code === 200) {
      // 数据转换：将API返回的结构映射到模板所需的字段
      const formattedTrainList = (response.data.data || []).map(train => {
        // 座位类型映射
        const seatMap = {
          '商务座': 'businessSeat',
          '一等座': 'firstClass',
          '二等座': 'secondClass',
          '高级软卧': 'advancedSoftSleeper',
          '软卧': 'softSleeper',
          '硬卧': 'hardSleeper',
          '软座': 'softSeat',
          '硬座': 'hardSeat',
          '无座': 'noSeat'
        };
        
        // 初始化座位信息
        const seatInfo = {
          businessSeat: '--',
          firstClass: '--',
          secondClass: '--',
          advancedSoftSleeper: '--',
          softSleeper: '--',
          hardSleeper: '--',
          softSeat: '--',
          hardSeat: '--',
          noSeat: '--',
          other: '--'
        };
        
        // 处理车厢座位信息
        train.carriage.forEach(carriage => {
          const seatKey = seatMap[carriage.seat_type];
          if (seatKey) {
            seatInfo[seatKey] = carriage.num;
          } else {
            seatInfo.other = carriage.num;
          }
        });
        
        // 格式化时间
        const formatTime = (timeString) => {
          return new Date(timeString).toTimeString().slice(0, 5);
        };
        
        return {
          ...seatInfo,
          trainNumber: train.train_no,
          departureStation: train.station_name,
          arrivalStation: train.end_station_name,
          departureTime: formatTime(train.start_time),
          arrivalTime: formatTime(train.end_time),
          duration: train.time,
          id: train.id
        };
      });
      
      trainList.value = formattedTrainList;
      ElMessage.success('查询成功');
    } else {
      ElMessage.error(response.data.msg || '查询失败');
      // 如果查询失败，使用默认数据
      trainList.value = defaultTrainList.value;
    }
  } catch (error) {
    console.error('查询请求失败:', error);
    ElMessage.error('查询失败，请检查网络连接或稍后重试');
    // 如果请求失败，使用默认数据
    trainList.value = defaultTrainList.value;
  } finally {
    loading.value = false;
  }
};

// 筛选条件变化时的处理函数
const onFilterChange = async () => {
  // 如果已经有出发地、目的地和日期，则自动重新查询
  if (departure.value.trim() && destination.value.trim() && departDate.value) {
    await handleQuery();
  }
};

// 清除车次类型选择
const clearTrainTypes = () => {
  selectedTrainTypes.value = [];
  onFilterChange();
};

// 清除席别类型选择
const clearSeatTypes = () => {
  selectedSeatTypes.value = [];
  onFilterChange();
};

// 跳转到列车信息详情页面
const navigateToTicketMessages = () => {
  router.push('/ticketmessages');
};

// 组件挂载时生成日期列表和设置行程类型
onMounted(async () => {
  generateDateList();
  
  // 根据URL参数设置行程类型和其他查询参数
  const ticketType = route.query.type;
  if (ticketType === 'round') {
    tripType.value = 'round';
  } else {
    tripType.value = 'single';
  }
  
  // 设置出发地和目的地
  if (route.query.departureCity) {
    departure.value = route.query.departureCity;
  }
  if (route.query.arrivalCity) {
    destination.value = route.query.arrivalCity;
  }
  
  // 设置出发日期
  if (route.query.departureDate) {
    let parsedDate = route.query.departureDate;
    // 检查日期是否在今天之前，如果是则使用今天
    if (parsedDate < today) {
      parsedDate = today;
    }
    departDate.value = parsedDate;
    // 如果URL中有出发日期参数，更新日期列表中的激活状态
    const index = dateList.value.findIndex(date => date.fullDate === departDate.value);
    if (index !== -1) {
      dateList.value.forEach((date, i) => {
        date.isActive = i === index;
      });
    }
  }
  
  // 如果是往返，设置返程日期
  if (tripType.value === 'round' && route.query.returnDate) {
    let parsedReturnDate = route.query.returnDate;
    // 检查返程日期是否在出发日期之前，如果是则使用出发日期
    if (parsedReturnDate < departDate.value) {
      parsedReturnDate = departDate.value;
    }
    returnDate.value = parsedReturnDate;
  }
  
  // 设置学生票选项
  if (route.query.isStudent === 'true') {
    passengerType.value = 'student';
  } else {
    passengerType.value = 'normal';
  }
  
  // 设置高铁/动车选项
  if (route.query.isHighSpeed === 'true') {
    selectedTrainTypes.value = ['gc', 'd'];
  }
  
  // 当从TicketForm跳转过来且参数完整时，自动调用查询方法
  if (departure.value && destination.value && departDate.value) {
    await handleQuery();
  } else {
    // 组件加载时显示默认数据
    trainList.value = defaultTrainList.value;
  }
});
</script>

<style scoped>
.train-search {
  font-family: "Microsoft YaHei", sans-serif;
  color: #333;
  width: 1105px;
  margin-left: 180px;
}

/* 顶部查询栏 */
.top-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #e6f2ff;
  border: 1px solid #b3d9ff;
}

.trip-type {
  margin-right: 10px;
  font-size: 15px;
}

.location {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.input {
  border: 1px solid #ccc;
  padding: 4px;
  margin: 0 3px;
}

.swap-btn {
  border: none;
  background: transparent;
  padding: 4px;
  cursor: pointer;
  color: #666;
  font-size: 16px;
}

.date {
  margin-right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 280px;
  font-size: 15px;
}

.date-input {
  border: 1px solid #ccc;
  padding: 4px;
  margin: 0 3px;
}

.right-section {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;
}

.passenger-type {
  display: flex;
  gap: 5px;
}

.query-btn {
  background-color: #ff9900;
  color: #fff;
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  margin-left: auto;
}

/* 日期选择栏 */
.date-nav {
  display: flex;
  margin: 10px 0;
  border: 1px solid #b3d9ff;
  border-top: none;
}

.date-item {
  padding: 8px 15px;
  border: none;
  background: #fff;
  cursor: pointer;
}

.date-item.active {
  background-color: #e6f2ff;
  font-weight: bold;
}

/* 筛选条件 */
.filter {
  border: 1px solid #b3d9ff;
  border-top: none;
  padding: 10px;
  background: #f9fcff;
}

.train-type, .station, .filter-btn, .extra-filter {
  margin-bottom: 10px;
}

.train-type {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  font-size: 12px;
}

.train-type label {
  margin: 0;
  white-space: nowrap;
  font-size: 12px;
}

.departure-time {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 12px;
}

.station {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
}

.station-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.tag {
  background-color: #b3d9ff;
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 12px;
}

.orange-btn {
  background-color: #ff9900;
  color: #fff;
  border: none;
  padding: 6px 15px;
  cursor: pointer;
  margin-left: auto;
  display: block;
}

.extra-filter {
  text-align: right;
}

/* 车次表格 */
.train-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.train-table th {
  background-color: #007acc;
  color: #fff;
  padding: 8px;
  text-align: center;
  border: 1px solid #b3d9ff;
}

.train-table td {
  border: 1px solid #b3d9ff;
  padding: 8px;
  text-align: center;
}

.sort-icon {
  display: inline-block;
  margin-left: 5px;
}

/* 表格容器 */
.train-table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 座位状态样式 */
.seat-available {
  color: #52c41a;
  font-weight: bold;
}

.seat-unavailable {
  color: #ff4d4f;
}

/* 预定按钮样式 */
.book-button {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 6px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.book-button:hover {
  background-color: #40a9ff;
}

.book-button:active {
  background-color: #096dd9;
}

/* 加载动画 */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 122, 204, 0.3);
  border-radius: 50%;
  border-top-color: #007acc;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
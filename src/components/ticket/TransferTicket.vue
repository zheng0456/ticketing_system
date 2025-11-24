<template>
  <div class="transfer-ticket-search">
    <!-- 搜索表单容器 -->
    <div class="search-form-container">
      <!-- 顶部输入区域 -->
      <div class="top-input-section">
        <!-- 出发地 -->
        <div class="input-group">
          <label class="input-label">* 出发地</label>
          <TicketFromCity v-model="departure" placeholder="请输入出发地" />
        </div>

        <!-- 目的地 -->
        <div class="input-group">
          <label class="input-label">* 目的地</label>
          <TicketFromCity v-model="destination" placeholder="请输入目的地" />
        </div>

        <!-- 乘车日期 -->
        <div class="input-group">
          <label class="input-label">* 乘车日期</label>
          <div class="input-wrapper">
            <input type="date" v-model="departDate" class="form-input">
          </div>
        </div>
      </div>

      <!-- 中间选项区域 -->
      <div class="middle-options-section">
        <!-- 指定换乘站 -->
        <div class="option-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="specifyTransfer" class="checkbox-input">
            <span class="checkbox-text">指定换乘站</span>
          </label>
          <div class="input-wrapper transfer-input-wrapper" v-if="specifyTransfer">
            <input type="text" v-model="transferStation" class="form-input transfer-input" placeholder="">
            <el-icon class="icon location-icon gray-icon"><Location /></el-icon>
          </div>
        </div>

        <!-- 只显示有座席车次 -->
        <div class="option-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="onlyWithSeats" class="checkbox-input">
            <span class="checkbox-text">只显示有座席车次</span>
          </label>
        </div>

        <!-- 乘客类型 -->
        <div class="option-group passenger-type-group">
          <label class="radio-label">
            <input type="radio" v-model="passengerType" value="normal" class="radio-input">
            <span class="radio-text">普通</span>
          </label>
          <label class="radio-label">
            <input type="radio" v-model="passengerType" value="student" class="radio-input">
            <span class="radio-text">学生</span>
          </label>
        </div>

        <!-- 查询按钮 -->
        <button class="search-btn" @click="handleSearch">查询</button>
      </div>

      <!-- 温馨提示 -->
      <div class="warning-box">
        <p class="warning-text">
          温馨提示：以下仅为您展示途中换乘一次的部分列车余票信息,购票时请您充分考虑各种影响换乘的因素,并自愿承担因自身或第三方等原因导致延误换乘的风险。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Location } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import TicketFromCity from '@/components/index/TicketFromCity.vue';

// 获取当前系统日期（格式：YYYY-MM-DD）
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 表单数据
const departure = ref('');
const destination = ref('');
const departDate = ref(getCurrentDate());
const specifyTransfer = ref(false);
const transferStation = ref('');
const onlyWithSeats = ref(true);
const passengerType = ref('normal');

// 查询处理
const handleSearch = () => {
  // 验证必填项
  if (!departure.value || !departure.value.trim()) {
    ElMessage.warning('请输入出发地');
    return;
  }
  if (!destination.value || !destination.value.trim()) {
    ElMessage.warning('请输入目的地');
    return;
  }
  if (!departDate.value) {
    ElMessage.warning('请选择乘车日期');
    return;
  }
  
  console.log('查询换乘票', {
    departure: departure.value,
    destination: destination.value,
    departDate: departDate.value,
    specifyTransfer: specifyTransfer.value,
    transferStation: transferStation.value,
    onlyWithSeats: onlyWithSeats.value,
    passengerType: passengerType.value
  });
  // TODO: 实现查询逻辑
};
</script>

<style scoped>
.transfer-ticket-search {
  font-family: "Microsoft YaHei", sans-serif;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 搜索表单容器 */
.search-form-container {
  background-color: #fff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 顶部输入区域 */
.top-input-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.input-label {
  font-size: 14px;
  color: #333;
  font-weight: normal;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  flex: 1;
  padding: 8px 35px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  height: 32px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  color: #333;
}

/* 针对 date 类型输入框，确保日历图标在右侧 */
input[type="date"].form-input {
  padding-right: 8px;
  position: relative;
  background-color: #f9f9f9;
}

input[type="date"].form-input::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 5px;
  cursor: pointer;
  opacity: 0.7;
  filter: brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(2000%) hue-rotate(200deg);
}

.form-input:focus {
  border-color: #b3d9ff;
  background-color: #fff;
}

.icon {
  position: absolute;
  right: 10px;
  font-size: 16px;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.location-icon {
  color: #4a9eff;
}

.calendar-icon {
  color: #4a9eff;
}

.gray-icon {
  color: #999;
}

/* 中间选项区域 */
.middle-options-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 20px;
  align-items: flex-start;
  margin-top: 15px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.transfer-input-wrapper {
  margin-top: 8px;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  user-select: none;
}

.checkbox-input,
.radio-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;
  accent-color: #4a9eff;
}

.checkbox-text,
.radio-text {
  user-select: none;
}

.transfer-input {
  margin-top: 0;
}

.passenger-type-group {
  flex-direction: row;
  gap: 15px;
  align-items: center;
}

/* 查询按钮 */
.search-btn {
  background-color: #ff9900;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 25px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.search-btn:hover {
  background-color: #ff8800;
}

.search-btn:active {
  background-color: #ff7700;
}

/* 温馨提示框 */
.warning-box {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  grid-column: 1 / -1; /* 跨越所有列 */
}

.warning-text {
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

/* 覆盖 TicketFromCity 组件样式以匹配图片 */
.input-group :deep(.city-selector) {
  width: 100%;
}

.input-group :deep(.input-with-btn) {
  position: relative;
}

.input-group :deep(.input-with-btn input[type="text"]) {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px 35px 8px 10px;
  height: 32px;
  font-size: 14px;
  color: #333;
  width: 100%;
  box-sizing: border-box;
}

.input-group :deep(.input-with-btn input[type="text"]:focus) {
  border-color: #b3d9ff;
  background-color: #fff;
  box-shadow: none;
}

.input-group :deep(.select-btn) {
  color: #4a9eff;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px;
}

.input-group :deep(.select-btn:hover) {
  background: rgba(74, 158, 255, 0.1);
  border-radius: 2px;
}

.input-group :deep(.select-btn .el-icon) {
  font-size: 16px;
}
</style>

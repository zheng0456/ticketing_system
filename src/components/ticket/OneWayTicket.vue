<template>
  <div class="train-search">
    <!-- 顶部查询栏 -->
    <div class="top-bar">
      <div class="trip-type">
        <label><input type="radio" v-model="tripType" value="single" checked> 单程</label>
        <label><input type="radio" v-model="tripType" value="round"> 往返</label>
      </div>
      <div class="location">
        <input type="text" v-model="departure" placeholder="出发地" class="input">
        <el-button class="swap-btn" @click="swapLocation" :icon="Switch" circle></el-button>
        <input type="text" v-model="destination" placeholder="目的地" class="input">
      </div>
      <div class="date">
        <label>出发日</label>
        <input type="date" v-model="departDate" class="date-input">
        <label v-if="tripType === 'round'">返程日</label>
        <input type="date" v-model="returnDate" class="date-input" v-if="tripType === 'round'">
      </div>
      <div class="right-section">
        <div class="passenger-type">
          <label><input type="radio" v-model="passengerType" value="normal" checked> 普通</label>
          <label><input type="radio" v-model="passengerType" value="student"> 学生</label>
        </div>
        <button class="query-btn">查询</button>
      </div>
    </div>

    <!-- 日期选择栏 -->
    <div class="date-nav">
      <button class="date-item active">11-19 周三</button>
      <button class="date-item">11-20</button>
      <button class="date-item">11-21</button>
      <button class="date-item">11-22</button>
      <button class="date-item">11-23</button>
      <button class="date-item">11-24</button>
      <button class="date-item">11-25</button>
      <button class="date-item">11-26</button>
      <button class="date-item">11-27</button>
      <button class="date-item">11-28</button>
      <button class="date-item">11-29</button>
      <button class="date-item">11-30</button>
      <button class="date-item">12-01</button>
      <button class="date-item">12-02</button>
      <button class="date-item">12-03</button>
    </div>

    <!-- 筛选条件 -->
    <div class="filter">
      <div class="train-type">
        <label>车次类型：</label>
        <label><span class="tag">全部</span></label>
        <label><input type="checkbox" value="gc"> GC-高铁/城际</label>
        <label><input type="checkbox" value="d"> D-动车</label>
        <label><input type="checkbox" value="z"> Z-直达</label>
        <label><input type="checkbox" value="t"> T-特快</label>
        <label><input type="checkbox" value="k"> K-快速</label>
        <label><input type="checkbox" value="other"> 其他</label>
        <label><input type="checkbox" value="fx"> 复兴号</label>
        <label><input type="checkbox" value="zn"> 智能动车组</label>
      </div>
      <div class="station">
        <label>出发车站：</label>
        <span class="tag">全部</span>
        <label>到达车站：</label>
        <span class="tag">全部</span>
        <label>车次席别：</label>
        <span class="tag">全部</span>
        <label>发车时间：</label>
        <select>
          <option>00:00--24:00</option>
        </select>
      </div>
      <div class="filter-btn">
        <button class="orange-btn">筛选 ▲</button>
      </div>
      <div class="extra-filter">
        <label><input type="checkbox"> 显示折扣车次</label>
        <label><input type="checkbox"> 显示积分兑换车次</label>
        <label><input type="checkbox"> 显示全部可预订车次</label>
      </div>
    </div>

    <!-- 车次表格 -->
    <table class="train-table">
      <thead>
        <tr>
          <th>车次</th>
          <th>出发站<br>到达站</th>
          <th>出发时间<br>到达时间 
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="sort-icon">
              <path d="M18 13L12 19L6 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 11L12 5L6 11" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </th>
          <th>历时 
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="sort-icon">
              <path d="M18 13L12 19L6 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </th>
          <th>商务座<br>特等座</th>
          <th>优选<br>一等座</th>
          <th>一等座</th>
          <th>二等座<br>二等包座</th>
          <th>高级<br>软卧</th>
          <th>软卧/动卧<br>一等卧</th>
          <th>硬卧<br>二等卧</th>
          <th>软座</th>
          <th>硬座</th>
          <th>无座</th>
          <th>其他</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <!-- 实际车次数据可通过循环渲染，此处暂为空 -->
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Switch } from '@element-plus/icons-vue';

// 行程类型：单程/往返
const tripType = ref('single');
// 出发地、目的地
const departure = ref('商都');
const destination = ref('集宁南');
// 日期
const departDate = ref('2025-11-19');
const returnDate = ref('2025-11-20');
// 乘客类型：普通/学生
const passengerType = ref('normal');

// 交换出发地和目的地
const swapLocation = () => {
  const temp = departure.value;
  departure.value = destination.value;
  destination.value = temp;
};
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

.tag {
  background-color: #b3d9ff;
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 10px;
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
  margin-top: 10px;
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
</style>
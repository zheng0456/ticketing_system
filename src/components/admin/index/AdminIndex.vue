<template>
  <div class="admin-index">
    <div><h2>欢迎来到管理员界面</h2></div>
    <!-- 统计卡片区域 -->
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon blue">
          <el-icon><Document /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-label">今日订单总数</div>
          <div class="stat-value">200</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon orange">
          <el-icon><Histogram /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-label">今日销售额</div>
          <div class="stat-value">¥5000.00</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon purple">
          <el-icon><Coin /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-label">昨日销售总额</div>
          <div class="stat-value">¥5000.00</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon green">
          <el-icon><Calendar /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-label">近7天销售总额</div>
          <div class="stat-value">¥50000.00</div>
        </div>
      </div>
    </div>
    
    <!-- 待处理事务区域 -->
    <div class="pending-tasks">
      <h3>待处理事务</h3>
      <div class="tasks-grid">
        <div class="task-item">
          <span class="task-name">待付款订单</span>
          <span class="task-count">(10)</span>
        </div>
        <div class="task-item">
          <span class="task-name">已完成订单</span>
          <span class="task-count">(10)</span>
        </div>
        <div class="task-item">
          <span class="task-name">待确认退货订单</span>
          <span class="task-count">(10)</span>
        </div>
        <div class="task-item">
          <span class="task-name">待处理退款申请</span>
          <span class="task-count">(10)</span>
        </div>
        <div class="task-item">
          <span class="task-name">已发货订单</span>
          <span class="task-count">(10)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Document, Histogram, Coin, Calendar } from '@element-plus/icons-vue'

export default {
  name: 'AdminIndex',
  components: {
    Document,
    Histogram,
    Coin,
    Calendar
  }
}
</script>

<style scoped>
.admin-index {
  padding: 20px;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* 统计卡片样式 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: #fff;
}

.stat-icon.blue {
  background-color: #409EFF;
}

.stat-icon.orange {
  background-color: #FF9800;
}

.stat-icon.purple {
  background-color: #9C27B0;
}

.stat-icon.green {
  background-color: #4CAF50;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

/* 待处理事务样式 */
.pending-tasks,
.quick-entry {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #e4e7ed;
}

.task-name {
  color: #606266;
}

.task-count {
  color: #f56c6c;
  font-weight: 500;
}

/* 运营快捷入口样式 */
.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.entry-item:hover {
  transform: scale(1.05);
}

.entry-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 24px;
  color: #fff;
}

.entry-icon.plus {
  background-color: #409EFF;
}

.entry-icon.list {
  background-color: #67C23A;
}

.entry-icon.user {
  background-color: #E6A23C;
}

.entry-icon.chart {
  background-color: #F56C6C;
}

.entry-icon.mail {
  background-color: #909399;
}

.entry-icon.ad {
  background-color: #C0C4CC;
}

.entry-icon.topic {
  background-color: #FA541C;
}

.entry-icon.flash {
  background-color: #722ED1;
}

.entry-icon.new {
  background-color: #13C2C2;
}

.entry-name {
  font-size: 14px;
  color: #606266;
}
</style>
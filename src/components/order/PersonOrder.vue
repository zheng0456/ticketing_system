<template>
  <div class="info-container">
    <!-- 基本信息区域 -->
    <section class="info-section">
      <h3 class="section-title">基本信息</h3>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">用户名：</span>
          <span class="value">{{ basicInfo.username }}</span>
        </div>
        <div class="info-row">
          <span class="label">姓名：</span>
          <span class="value">{{ basicInfo.name }}</span>
        </div>
        <div class="info-row">
          <span class="label">国家/地区：</span>
          <span class="value">{{ basicInfo.country }}</span>
        </div>
        <div class="info-row">
          <span class="label">证件类型：</span>
          <span class="value">{{ basicInfo.idType }}</span>
        </div>
        <div class="info-row">
          <span class="label">证件号码：</span>
          <span class="value">{{ basicInfo.idNumber }}</span>
        </div>
        <div class="info-row">
          <span class="label">核验状态：</span>
          <span class="value verified">{{ basicInfo.verifyStatus }}</span>
        </div>
      </div>
    </section>

    <!-- 联系方式区域 -->
    <section class="info-section">
      <div class="section-header">
        <h3 class="section-title">联系方式</h3>
        <button class="edit-btn">编辑</button>
      </div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">手机号：</span>
          <span class="value">{{ contact.phone }}</span>
          <span class="verified">{{ contact.phoneVerify }}</span>
        </div>
        <div class="info-row">
          <span class="label">邮箱：</span>
          <span class="value">{{ contact.email }}</span>
        </div>
      </div>
    </section>

    <!-- 附加信息区域 -->
    <section class="info-section">
      <div class="section-header">
        <h3 class="section-title">附加信息</h3>
        <button class="edit-btn">编辑</button>
      </div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">优惠(待)类型：</span>
          <span class="value">{{ extraInfo.discountType }}</span>
        </div>
      </div>
    </section>

    <!-- 学生资质查询区域 -->
    <section class="info-section">
      <h3 class="section-title">学生资质查询</h3>
      <p class="query-desc">学生资质查询服务，提供查询本人的学生购票资质、购票优惠区间及年度剩余优惠票购票次数。</p>
      <div class="query-btns">
        <button class="refresh-btn">刷新</button>
        <button class="query-btn">查询</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 基本信息数据
const basicInfo = ref({
  username: 'J13848247017',
  name: '郑锦春',
  country: '中国China',
  idType: '居民身份证',
  idNumber: '1526********712',
  verifyStatus: '已通过'
});

// 联系方式数据
const contact = ref({
  phone: '(+86) 138****7017',
  phoneVerify: '已通过核验',
  email: ''
});

// 附加信息数据
const extraInfo = ref({
  discountType: '学生'
});
</script>

<style scoped>
.info-container {
  width: 800px;
  height: 700px;
  margin: 0 150px;
  padding: 20px;
  font-family: "Microsoft Yahei", Arial, sans-serif;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow-y: auto;
}

.info-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  line-height: 1.6;
  min-height: 24px;
}

.label {
  width: 120px;
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
}

.value {
  color: #333;
  margin-right: 8px;
}

.verified {
  color: #ff7d00;
  font-weight: 500;
}

.edit-btn, .refresh-btn, .query-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.edit-btn {
  color: #666;
  border-color: #ddd;
}

.edit-btn:hover {
  background-color: #f5f5f5;
  border-color: #999;
}

.refresh-btn {
  background-color: #ff7d00;
  color: #fff;
  border-color: #ff7d00;
}

.refresh-btn:hover {
  background-color: #ff6b00;
  border-color: #ff6b00;
}

.query-btn {
  background-color: #f5f5f5;
  color: #333;
  border-color: #ddd;
  margin-left: 8px;
}

.query-btn:hover {
  background-color: #e8e8e8;
  border-color: #999;
}

.query-desc {
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.query-btns {
  text-align: right;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .info-container {
    padding: 16px;
  }
  
  .label {
    width: 100px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .edit-btn {
    align-self: flex-end;
  }
}
</style>
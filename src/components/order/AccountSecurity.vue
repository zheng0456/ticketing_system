<template>
  <div class="settings-container">
    <div 
      v-for="(item, index) in settings" 
      :key="index" 
      class="setting-item"
    >
      <div class="item-title">
        <el-icon v-if="item.title === '登录密码'" class="lock-icon"><Lock /></el-icon>
        <el-icon v-else-if="item.title === '手机核验'" class="phone-icon"><Iphone /></el-icon>
        <el-icon v-else-if="item.title === '安全邮箱'" class="email-icon"><Message /></el-icon>
        {{ item.title }}
      </div>
      <div class="item-desc">{{ item.desc }}</div>
      <button class="modify-btn">修改</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Lock, Iphone, Message } from '@element-plus/icons-vue';

const settings = ref([
  {
    title: '登录密码',
    desc: '建议您定期更改密码以保护账户安全'
  },
  {
    title: '手机核验',
    desc: '使用手机接收铁路客户服务信息'
  },
  {
    title: '安全邮箱',
    desc: '使用邮箱接收铁路客户服务信息'
  }
]);
</script>

<style scoped>
.settings-container {
  border: 1px solid #e5e7eb;
  width: 900px; /* 可根据场景调整宽度 */
  height: 200px;
  margin: 0 auto;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.setting-item:last-child {
  border-bottom: none;
}

.item-title {
  font-weight: 500;
  color: #1f2937;
  display: flex;
  align-items: center;
}

.lock-icon {
  color: #409EFF;
  font-size: inherit;
  margin-right: 8px;
}

.phone-icon {
  color: #409EFF;
  font-size: inherit;
  margin-right: 8px;
}

.email-icon {
  color: #409EFF;
  font-size: inherit;
  margin-right: 8px;
}

.item-desc {
  flex: 1;
  margin: 0 16px;
  color: #6b7280;
  font-size: 14px;
}

.modify-btn {
  padding: 6px 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.modify-btn:hover {
  border-color: #9ca3af;
}
</style>
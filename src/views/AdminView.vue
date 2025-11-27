<template>
  <div class="admin-container">
    <!-- 侧边导航栏 -->
    <AdminNave />
    
    <!-- 主内容区域 -->
    <div class="content-area">
      <router-view />
    </div>
  </div>
</template>

<script>
// 引入组件
import AdminNave from '../components/admin/nave/AdminNave.vue'

export default {
  name: 'AdminView',
  components: {
    AdminNave
  }
}
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.content-area {
  flex: 1;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-header {
  background-color: white;
  padding: 20px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e6e6e6;
}

.content-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.content-body {
  flex: 1;
  padding: 30px;
}

.content-body p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}
</style>
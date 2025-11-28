<template>
  <div class="logout-container">
    <el-card class="logout-card">
      <template #header>
        <div class="card-header">
          <span>账号注销确认</span>
        </div>
      </template>
      
      <div class="logout-content">
        <el-alert
          title="警告"
          type="warning"
          :closable="false"
          show-icon
        >
          <p>您正在执行账号注销操作，此操作将：</p>
          <ul style="margin-top: 10px; margin-left: 20px;">
            <li>立即退出当前登录状态</li>
            <li>清除所有登录凭证</li>
            <li>需要重新登录才能访问管理系统</li>
          </ul>
        </el-alert>
        
        <div class="logout-actions">
          <el-button type="primary" @click="handleLogout" style="margin-right: 10px;">
            确认注销
          </el-button>
          <el-button @click="handleCancel">
            取消
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserLogOut',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleLogout() {
      this.loading = true
      // 这里可以添加实际的注销API调用
      // 模拟注销过程
      setTimeout(() => {
        // 清除本地存储的登录信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        
        // 显示成功提示
        this.$message({
          type: 'success',
          message: '账号已成功注销'
        })
        
        // 跳转到登录页面
        this.$router.push('/login')
        
        this.loading = false
      }, 800)
    },
    
    handleCancel() {
      // 如果是从其他页面进入，可以返回上一页
      if (this.$route.query.from) {
        this.$router.push(this.$route.query.from)
      } else {
        // 否则返回首页
        this.$router.push('/admin')
      }
    }
  },
  mounted() {
    // 可以在这里添加页面访问权限检查
    // 确保只有管理员才能访问此页面
  }
}
</script>

<style scoped>
.logout-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.logout-content {
  padding: 20px 0;
}

.logout-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div class="header">
    <div class="logo-area">
      <img src="@/assets/img/log.png" alt="Logo" class="logo" />
    </div>
    <div class="search-bar">
      <input type="text" placeholder="搜索车票、餐饮、常旅客、相关规章" class="search-input" />
      <button class="search-btn"><el-icon><Search /></el-icon></button>
    </div>
    <!-- 添加一个灰色盒子容器 -->
    <div class="gray-box" style="width: 400px; height: 30px; background-color:#DDDDDD;">
      <div class="nav-links">
        <a href="#" class="link">无障碍</a>
        <a href="#" class="link">敬老版</a>
        <a href="#" class="link">English</a>
        <a href="#" class="link">我的12306</a>
        <a href="#" class="link" @click.prevent="goToLogin">登录</a>
        <a href="#" class="link" @click.prevent="goToLogin">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  color: #333;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 250px;
  height: 100px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 600px; /* 设置搜索栏宽度为600px，与图片一致 */
  transition: all 0.2s ease;
  border: 1px solid black;
}
.search-bar:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  border: 1px solid #007aff;
}
.search-bar:focus-within {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  border: 1px solid #007aff;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  /* 确保输入框不会超出容器 */
  max-width: calc(100% - 32px); /* 为按钮预留空间，按钮宽度约32px */
  min-width: 0; /* 防止内容被挤压 */
}
.search-btn {
  padding: 8px 12px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:hover {
  background: #0066cc;
}
.gray-box {
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}
.link {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  line-height: 1;
}
.link:hover {
  color: #007aff;
}
</style>
<template>
  <div class="header">
    <div class="header-container">
      <div class="logo-area">
        <img src="@/assets/img/log.png" alt="Logo" class="logo" />
        <div class="logo-text-wrapper">
          <span class="logo-text">中国铁路12306</span>
          <span class="logo-en">12306 CHINA RAILWAY</span>
        </div>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="搜索车票、餐饮、常旅客、相关规章" class="search-input" />
        <button class="search-btn">🔍</button>
      </div>
      <div class="nav-links">
        <a href="#" class="link">无障碍</a>
        <a href="#" class="link">敬老版</a>
        <a href="#" class="link">English</a>
        <a href="#" class="link">我的12306</a>
        <a href="#" class="link">登录</a>
        <a href="#" class="link">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
}
</script>

<style scoped>
.header {
  background: #f5f5f5;
  color: #333;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.header-container {
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
  width: 60px;
  height: 60px;
}
.logo-text-wrapper {
  display: flex;
  flex-direction: column;
}
.logo-text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 2px;
}
.logo-en {
  font-size: 12px;
  color: #666;
}
.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 14px;
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
.nav-links {
  display: flex;
  gap: 15px;
}
.link {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}
.link:hover {
  color: #007aff;
}
</style>
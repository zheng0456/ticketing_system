<template>
  <div class="header">
    <div class="logo-area">
      <span class="logo">🚄</span>
      <span class="logo-text">中国铁路12306</span>
      <span class="logo-en">12306 CHINA RAILWAY</span>
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
    <div class="main-nav">
      <a href="#" class="nav-item active">首页</a>
      <a href="#" class="nav-item">车票</a>
      <a href="#" class="nav-item">团购服务</a>
      <a href="#" class="nav-item">会员服务</a>
      <a href="#" class="nav-item">站车服务</a>
      <a href="#" class="nav-item">商旅服务</a>
      <a href="#" class="nav-item">出行指南</a>
      <a href="#" class="nav-item">信息查询</a>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #0066cc;
  color: #fff;
  padding: 10px 20px;
}
.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.logo {
  font-size: 24px;
  margin-right: 5px;
}
.logo-text {
  font-size: 18px;
  font-weight: bold;
}
.logo-en {
  font-size: 12px;
  margin-left: 5px;
}
.search-bar {
  display: flex;
  margin-bottom: 10px;
}
.search-input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px 0 0 4px;
}
.search-btn {
  padding: 8px 12px;
  background: #fff;
  color: #0066cc;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
.nav-links {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.link {
  color: #fff;
  text-decoration: none;
  margin-left: 15px;
  font-size: 12px;
}
.main-nav {
  display: flex;
}
.nav-item {
  color: #fff;
  text-decoration: none;
  padding: 8px 15px;
  font-size: 14px;
}
.nav-item.active {
  background: #0055aa;
  border-radius: 4px;
}
</style>
<template>
  <div class="main-nav">
    <router-link to="/index" class="nav-item active">首页</router-link>
    <div class="nav-item dropdown">
      <a href="#" class="dropdown-toggle">车票</a>
      <div class="dropdown-menu">
        <div class="menu-column">
          <a href="#" class="menu-item">购买</a>
          <a href="#" class="menu-item">单程</a>
          <a href="#" class="menu-item">中转换乘</a>
        </div>
        <div class="menu-column">
          <a href="#" class="menu-item">往返</a>
          <a href="#" class="menu-item">计次定期票</a>
        </div>
        <div class="menu-column">
          <a href="#" class="menu-item">变更</a>
          <a href="#" class="menu-item">退票</a>
          <a href="#" class="menu-item">变更到站</a>
          <a href="#" class="menu-item">改签</a>
        </div>
        <div class="menu-column">
          <a href="#" class="menu-item">更多</a>
          <a href="#" class="menu-item">中铁银通卡</a>
          <a href="#" class="menu-item">国际列车</a>
        </div>
      </div>
    </div>
    <a href="#" class="nav-item">团购服务</a>
    <a href="#" class="nav-item">会员服务</a>
    <a href="#" class="nav-item">站车服务</a>
    <a href="#" class="nav-item">商旅服务</a>
    <a href="#" class="nav-item">出行指南</a>
    <a href="#" class="nav-item">信息查询</a>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
}
</script>

<style scoped>
.main-nav {
  display: flex;
  align-items: center;
  height: 50px;
  background: #0066cc;
  padding: 0 20px;
  justify-content: center;
}
.nav-item {
  color: #fff;
  text-decoration: none;
  padding: 8px 15px;
  font-size: 14px;
  margin: 0 25px;
}
.nav-item.active {
  background: #0055aa;
  border-radius: 4px;
}
.dropdown {
  position: relative;
}
.dropdown-toggle {
  display: block;
  padding: 8px 15px;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 100%;
  z-index: 1000;
}
.dropdown-menu .menu-column {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  width: 25%;
}
.dropdown-menu .menu-item {
  display: block;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.dropdown-menu .menu-item:hover {
  background-color: #f5f5f5;
  color: #0066cc;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu::after {
  content: "";
  position: absolute;
  top: -7px;
  left: 20px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #ddd;
}
</style>
<template>
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
</template>

<script>
export default {
  name: 'HeaderNav',
}
</script>

<style scoped>
.main-nav {
  display: flex;
  background: #0066cc;
  padding: 0 20px;
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
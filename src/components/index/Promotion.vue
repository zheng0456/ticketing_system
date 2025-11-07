<template>
  <div class="promotion-container">
    <div class="promotion-item">
      <h3>会员服务</h3>
      <p>铁路畅行 尊享体验</p>
      <p>12306铁路会员积分服务</p>
      <img src="https://via.placeholder.com/150" alt="会员服务" />
    </div>
    <div class="promotion-item">
      <h3>餐饮·特产</h3>
      <p>带有温度的旅途配餐</p>
      <p>享受星级的体验和家乡的味道</p>
      <img src="https://via.placeholder.com/150" alt="餐饮特产" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePromotion', // 修改组件名为多词形式
}
</script>

<style scoped>
.promotion-container {
  display: flex;
  padding: 20px;
  background: #f9f9f9;
}
.promotion-item {
  flex: 1;
  text-align: center;
}
.promotion-item h3 {
  margin-bottom: 10px;
  color: #0066cc;
}
.promotion-item p {
  margin-bottom: 5px;
  font-size: 14px;
}
.promotion-item img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
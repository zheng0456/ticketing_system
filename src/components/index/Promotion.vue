<template>
  <div class="promotion-container">
    <div class="promotion-item">
      <h3>景点服务</h3>
      <p>景点畅行 尊享体验</p>
    </div>
    <div class="promotion-item">
      <h3>酒店服务</h3>
      <p>酒店畅行 舒适体验</p>
    </div>
    <div class="promotion-item">
      <h3>出行指南</h3>
      <p>旅行畅行 美好体验</p>
    </div>
    <div class="promotion-item">
      <h3>信息查询</h3>
      <p>顺畅出行</p>
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
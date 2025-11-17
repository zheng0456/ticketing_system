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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;
  padding: 40px 20px;
  background: #ffffff;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .promotion-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 20px;
    padding: 30px 15px;
    margin: 15px;
  }
  
  .promotion-item {
    padding: 25px 15px;
  }
  
  .promotion-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }
  
  .promotion-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .promotion-item h3 {
    font-size: 18px;
  }
  
  .promotion-item p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .promotion-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
    padding: 20px 10px;
  }
}
</style>
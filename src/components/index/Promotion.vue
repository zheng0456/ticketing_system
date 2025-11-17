<template>
  <div class="promotion-container">
    <div class="promotion-item">
      <img src="../../assets/img/景点服务index.png" alt="景点服务" />
    </div>
    <div class="promotion-item">
      <img src="../../assets/img/酒店服务index.png" alt="酒店服务" />
    </div>
    <div class="promotion-item">
      <img src="../../assets/img/出行指南index.png" alt="出行指南" />
    </div>
    <div class="promotion-item">
      <img src="../../assets/img/信息查询index.png" alt="信息查询" />
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
.promotion-item img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
}
.promotion-item p {
  margin-bottom: 5px;
  font-size: 14px;
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
  
  .promotion-item img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    margin-bottom: 15px;
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
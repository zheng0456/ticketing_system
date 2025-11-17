<template>
  <div class="promotion-container">
    <div class="promotion-item" :style="{ backgroundImage: 'url(' + jingdianImage + ')' }">
    </div>
    <div class="promotion-item" :style="{ backgroundImage: 'url(' + jiudianImage + ')' }">
    </div>
    <div class="promotion-item" :style="{ backgroundImage: 'url(' + chuxingImage + ')' }">
    </div>
    <div class="promotion-item" :style="{ backgroundImage: 'url(' + xinxinImage + ')' }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePromotion',
  data() {
    return {
      jingdianImage: require('@/assets/img/景点服务index.png'),
      jiudianImage: require('@/assets/img/酒店服务index.png'),
      chuxingImage: require('@/assets/img/出行指南index.png'),
      xinxinImage: require('@/assets/img/信息查询index.png')
    }
  }
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
    padding: 0;
    min-height: 150px;
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
<template>
  <div class="expanded-content">
    <div v-for="subRegion in subRegions" :key="subRegion.name" class="sub-region">
      <span class="sub-region-name">{{ subRegion.name }}</span>
      <div class="sub-region-cities">
        <span 
          v-for="city in subRegion.cities" 
          :key="city" 
          class="sub-region-city"
          @click="handleCityClick(city)"
        >{{ city }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收子区域数据作为props
// eslint-disable-next-line no-undef
defineProps({
  subRegions: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 处理城市点击事件
const handleCityClick = (city) => {
  // 当点击北京时，在新页面打开scenerymessage路由
  if (city === '北京') {
    window.open('/scenerymessage', '_blank');
  }
  // 其他城市保持原有行为，这里可以根据需要添加其他逻辑
};
</script>

<style scoped>
/* 展开内容样式 */
.expanded-content {
  position: absolute;
  left: 236px; /* 调整左边距 */
  top: -1px; /* 调整上边距，不再向上偏移 */
  right: 20px; /* 添加右边距 */
  width: 1178px; /* 根据左右边距自动调整宽度 */
  height:750px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 9; /* 设置合理的z-index */
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
}

/* 子区域样式 */
.sub-region {
  margin-bottom: 15px;
  text-align: left;
}

.sub-region-name {
  font-weight: 600;
  color: #333;
  margin-right: 10px;
  font-size: 14px;
  display: inline-block;
  min-width: 80px;
}

.sub-region-cities {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 5px;
  justify-content: flex-start;
  text-align: left;
}

.sub-region-city {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
}

.sub-region-city:hover {
  color: #000;
}
</style>
<template>
  <div class="expanded-content">
    <div v-for="subRegion in subRegions" :key="subRegion.name" class="sub-region">
      <span class="sub-region-name">{{ subRegion.name }}</span>
      <div class="sub-region-cities">
        <span v-for="city in subRegion.cities" :key="city" class="sub-region-city">{{ city }}</span>
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
</script>

<style scoped>
/* 展开内容样式 */
.expanded-content {
  position: absolute;
  left: 205px;
  top: 0;
  width: 1100px;
  height: calc(100vh - 40px); /* 与左侧导航栏高度一致 */
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
}

/* 子区域样式 */
.sub-region {
  margin-bottom: 15px;
}

.sub-region-name {
  font-weight: 600;
  color: #333;
  margin-right: 10px;
  font-size: 14px;
}

.sub-region-cities {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 5px;
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
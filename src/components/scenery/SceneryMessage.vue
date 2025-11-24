<template>
  <main class="main-content">
    <div class="hero-image">
      <img src="https://picsum.photos/id/1043/1200/600" alt="山水景观" />
    </div>
    <div class="card-slider">
      <div class="card" v-for="(card, index) in cards" :key="index">
        <div class="card-img-wrapper">
          <img :src="card.image" :alt="card.title" />
          <span class="card-label" v-if="card.label">{{ card.label }}</span>
        </div>
        <p class="card-title">{{ card.title }}</p>
        <p class="card-author">{{ card.author }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// 卡片数据
const cards = ref([
  {
    image: 'https://picsum.photos/id/1036/400/300',
    label: '头条游记',
    title: '巴厘岛 | 总有一个假日，要...',
    author: '筱莲',
  },
  {
    image: 'https://picsum.photos/id/1039/400/300',
    label: '',
    title: '手绘琅勃拉邦 | 来日方长，...',
    author: 'Rinko咩咩',
  },
  {
    image: 'https://picsum.photos/id/1041/400/300',
    label: '',
    title: '成都在做，幸福在右，人间...',
    author: '林深Live',
  },
]);
</script>

<style scoped>
/* 右侧内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.card-slider {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  margin-top: 20px;
  padding-bottom: 10px;
}

.card {
  min-width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  background: #fff;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.card-img-wrapper {
  position: relative;
}

.card-img-wrapper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-label {
  position: absolute;
  top: 10px;
  left: 0;
  background: #ff672b;
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 0 4px 4px 0;
}

.card-title {
  padding: 12px 10px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-author {
  padding: 0 10px 12px;
  font-size: 14px;
  color: #999;
}
</style>
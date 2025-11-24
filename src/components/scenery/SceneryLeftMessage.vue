<template>
  <div class="app-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <nav>
        <div v-for="item in navItems" :key="item.region" class="nav-group">
          <h3 class="region-title">{{ item.region }}</h3>
          <ul class="city-list">
            <li v-for="city in item.cities" :key="city">{{ city }}</li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- 右侧内容区 -->
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
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 导航栏数据
const navItems = ref([
  { region: '国内（含港澳台）', cities: ['北京', '上海', '西湖', '成都'] },
  { region: '亚洲', cities: ['新加坡', '京都', '普吉岛', '东京'] },
  { region: '欧洲', cities: ['佛罗伦萨', '巴黎', '巴塞罗那', '罗马'] },
  { region: '非洲', cities: ['舍夫沙万', '桑给巴尔岛', '撒哈拉沙漠', '马赛马拉国家...'] },
  { region: '北美洲', cities: ['洛杉矶', '拉斯维加斯', '纽约', '华特迪士尼世界度假区'] },
  { region: '南美洲', cities: ['伊瓜苏国家公园(阿根廷)', '火地岛国家公园', '复活节岛'] },
  { region: '大洋洲', cities: ['墨尔本', '悉尼', '奥克兰', '皇后镇'] },
]);

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
/* 更新文件内容以修复可能的编码或格式问题 */
.app-container {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 左侧导航样式 */
.sidebar {
  width: 280px;
  border-right: 1px solid #eee;
  padding: 20px;
  background: #fff;
}

.nav-group {
  margin-bottom: 24px;
}

.region-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.city-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.city-list li {
  padding: 8px 0;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.city-list li:hover {
  color: #000;
}

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
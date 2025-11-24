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

    <!-- 右侧内容区 - 使用 SceneryMessage 组件 -->
    <SceneryMessage />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SceneryMessage from './SceneryMessage.vue';

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
  text-align: left;
}

.city-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.city-list li {
  padding: 4px 0;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
  font-size: 14px;
  white-space: nowrap;
}

.city-list li:hover {
  color: #000;
}
</style>
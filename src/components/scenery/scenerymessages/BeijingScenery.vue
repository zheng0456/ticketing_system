<template>
  <div class="beijing-scenery-container">
    <!-- 标题区域 -->
    <div class="header-title">
      <h1>北京 <span class="english-title">BEIJING</span></h1>
    </div>
    
    <!-- 导航栏 -->
    <div class="navigation-bar">
      <router-link 
        v-for="(item, index) in navItems" 
        :key="index"
        :to="item.path"
        :class="['nav-item', { active: item.active }]"
        @click="setActiveNav(index)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </router-link>
    </div>
    
    <!-- 长城图片展示 -->
    <div class="image-container">
      <img 
          :src="require('@/assets/img/北京故宫.png')" 
          alt="北京故宫风景" 
          class="scenery-image"
          @error="handleImageError"
        >
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeijingScenery',
  data() {
    return {
      // 导航项数据
      navItems: [
        { path: '/scenerymessage', icon: '▲', text: '景点', active: true },
        { path: '/accommodation', icon: '🏠', text: '住宿', active: false },
        { path: '/food', icon: '🍜', text: '美食', active: false },
        { path: '/shopping', icon: '🛍️', text: '购物', active: false },
        { path: '/travel-notes', icon: '📝', text: '游记', active: false },
        { path: '/local-guide', icon: '🧑', text: '当地向导', active: false },
        { path: '/vacation', icon: '🌴', text: '旅游度假', active: false }
      ]
    }
  },
  methods: {
    // 设置当前激活的导航项
    setActiveNav(index) {
      this.navItems.forEach((item, i) => {
        item.active = i === index;
      });
    },
    // 处理图片加载错误
    handleImageError(event) {
      // 使用默认图片或者提示信息
      console.log('图片加载失败');
      // 设置一个默认图片路径
      try {
        event.target.src = require('@/assets/img/index1.jpg');
      } catch (e) {
        // 如果默认图片也不存在，使用简单的占位符
        event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="12">图片加载失败</text></svg>';
      }
    }
  },
  // 监听路由变化，更新激活状态
  watch: {
    $route(to) {
      const index = this.navItems.findIndex(item => to.path.includes(item.path));
      if (index !== -1) {
        this.setActiveNav(index);
      }
    }
  }
}
</script>

<style scoped>
.beijing-scenery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-title {
  text-align: center;
  margin-bottom: 20px;
}

.header-title h1 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.english-title {
  font-size: 24px;
  color: #666;
  margin-left: 10px;
  font-weight: normal;
}

.navigation-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
}

.nav-item {
    display: flex;
    align-items: center;
    margin-right: 30px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-decoration: none;
    color: inherit;
  }

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.active {
  color: #1890ff;
  font-weight: bold;
}

.nav-icon {
  margin-right: 5px;
  font-size: 18px;
}

.nav-text {
  font-size: 16px;
}

.image-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scenery-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .beijing-scenery-container {
    padding: 10px;
  }
  
  .header-title h1 {
    font-size: 24px;
  }
  
  .english-title {
    font-size: 18px;
  }
  
  .nav-item {
    margin-right: 20px;
  }
  
  .nav-text {
    font-size: 14px;
  }
}
</style>
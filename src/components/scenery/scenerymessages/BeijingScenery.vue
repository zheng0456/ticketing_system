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
    
    <!-- 北京长城图片展示 -->
    <div class="image-container">
      <img 
          :src="require('@/assets/img/长城.png')" 
          alt="长城风景" 
          class="scenery-image"
          @error="handleImageError"
        >
    </div>
    
    <!-- 故宫博物院信息展示容器 -->
    <div class="scenery-cards-container">
      <!-- 故宫博物院信息展示 1 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/故宫博物馆.png')" 
            alt="故宫博物院" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">故宫博物院</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.8分</span>
          </div>
          <p class="forbidden-city-description">穿越明清两朝的皇家宫殿群</p>
        </div>
      </div>
      
      <!-- 故宫博物院信息展示 2 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/八达岭长城.png')" 
            alt="八达岭长城" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">八达岭长城</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.7分</span>
          </div>
          <p class="forbidden-city-description">不到长城非好汉</p>
        </div>
      </div>

      <!-- 故宫博物院信息展示 3 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/北京环球度假区.png')" 
            alt="北京环球影城" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">北京环球影城</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.6分</span>
          </div>
          <p class="forbidden-city-description">大片世界，在此成真</p>
        </div>
      </div>
    </div>

    <!-- 故宫博物院信息展示容器 -->
    <div class="scenery-cards-container-1">
      <!-- 故宫博物院信息展示 1 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/恭王府.png')" 
            alt="恭王府" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">恭王府</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.7分</span>
          </div>
          <p class="forbidden-city-description">旧时清朝大臣和珅的府邸</p>
        </div>
      </div>
      
      <!-- 故宫博物院信息展示 2 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/天坛.png')" 
            alt="天坛公园" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">天坛公园</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.7分</span>
          </div>
          <p class="forbidden-city-description">明清时期皇帝祭天的地方</p>
        </div>
      </div>

      <!-- 故宫博物院信息展示 3 -->
      <div class="forbidden-city-info" style="width: 400px; height: 300px;">
        <div class="forbidden-city-image">
          <img 
            :src="require('@/assets/img/颐和园.png')" 
            alt="颐和园" 
            class="forbidden-city-img"
            @error="handleImageError"
          >
        </div>
        <div class="forbidden-city-details">
          <h3 class="forbidden-city-title">颐和园</h3>
          <div class="forbidden-city-rating">
            <span class="rating-score">4.6分</span>
          </div>
          <p class="forbidden-city-description">走入清朝皇帝的皇家园林</p>
        </div>
      </div>
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
        { path: '/accommodation', icon: '🏠', text: '住宿', active: false }
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
  text-align: left;
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

/* 景点卡片容器样式 */
.scenery-cards-container {
  display: flex;
  gap: 10px;
  margin-top: 60px;
}

/* 故宫博物院信息展示样式 */
.forbidden-city-info {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.forbidden-city-image {
  width: 100%;
  height: 350px;
  overflow: hidden;
}

.forbidden-city-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.forbidden-city-details {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.forbidden-city-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  text-align: left;
}

.forbidden-city-rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

.rating-score {
  font-size: 18px;
  color: #ff6700;
  font-weight: bold;
  margin-right: 10px;
  text-align: left;
}

.rating-count {
  font-size: 14px;
  color: #999;
  text-align: left;
}

.forbidden-city-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  text-align: left;
}

.scenery-cards-container-1{
  display: flex;
  gap: 10px;
  margin-top: 20px;
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
  
  .scenery-cards-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .forbidden-city-info {
    width: 100% !important;
    height: auto !important;
  }
  
  .forbidden-city-image {
    height: 200px;
  }
}

</style>
<template>
  <div class="nave-container">
    <!-- Logo区域 -->
    <div class="logo-section">
      <div class="logo">
        <!-- 使用emoji替代logo图片，避免图片不存在问题 -->
        <span class="logo-emoji">📸</span>
      </div>
      <div class="logo-text">
        <h1>Travel Admin</h1>
      </div>
    </div>

    <!-- 导航菜单 -->
    <div class="menu-section">
      <!-- 我的主页 -->
      <router-link to="/home" class="menu-item">
        <el-icon><Platform /></el-icon><span>我的主页</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!-- 订单中心 -->
      <router-link to="/order" class="menu-item">
        <el-icon><SetUp /></el-icon>
        <span>订单中心</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!--列车管理中心 -->
      <router-link to="/train" class="menu-item">
        <el-icon><Guide /></el-icon>
        <span>列车管理</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!-- 票务管理 -->
      <router-link to="/tickets" class="menu-item">
        <el-icon><MapLocation /></el-icon>
        <span>票务管理</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>
     

      <!-- 数据统计（带下拉菜单） -->
      <router-link to="/products" class="menu-item">
        <el-icon><PieChart /></el-icon>
        <span>数据统计</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!-- 收支明细 -->
      <router-link to="/finance" class="menu-item">
        <el-icon><Money /></el-icon>
        <span>收支明细</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!-- 基础设置 -->
      <router-link to="/settings" class="menu-item">
        <el-icon><Setting /></el-icon>
        <span>基础设置</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Platform, ArrowRight, SetUp, PieChart, Money, Setting, Guide, MapLocation } from '@element-plus/icons-vue'

export default {
  name: 'AdminNave',
  components: {
     Platform,
     ArrowRight,
     SetUp,
     PieChart,
     Money,
     Setting,
     Guide,
     MapLocation
    },
  // 组件数据
  data() {
    return {
      // 默认展开数据统计下拉菜单，与图片显示一致
      dropdownOpen: true
    }
  },
  // 组件方法
  methods: {
    /**
     * 切换下拉菜单的显示状态
     */
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    /**
     * 点击外部关闭下拉菜单的处理函数
     * @param {MouseEvent} event - 鼠标点击事件
     */
    handleClickOutside(event) {
      const dropdownElement = this.$el.querySelector('.dropdown');
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    }
  },
  // 生命周期钩子：组件挂载后
  mounted() {
    // 添加点击外部关闭下拉菜单的事件监听器
    document.addEventListener('click', this.handleClickOutside);
  },
  // 生命周期钩子：组件卸载前 (Vue 3 规范使用 beforeUnmount)
  beforeUnmount() {
    // 移除事件监听器，避免内存泄漏
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.nave-container {
  width: 220px;
  height: 100vh;
  background-color: #1E88E5;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* Logo区域 */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo-emoji {
  font-size: 40px;
}

.logo-text h1 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.logo-text p {
  margin: 5px 0 0 0;
  font-size: 12px;
  opacity: 0.8;
}

/* 菜单区域 */
.menu-section {
  flex: 1;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  color: white;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 激活状态的菜单项 */
.menu-item.active {
  background-color: #1976D2;
}

.menu-item i {
  margin-right: 12px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.menu-item span {
  flex: 1;
}

.icon-arrow {
  font-size: 16px;
  opacity: 0.6;
  font-weight: bold;
}

/* 下拉菜单样式 */
.dropdown {
  position: relative;
}

.dropdown-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  cursor: pointer;
}

.dropdown-header:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-header i {
  margin-right: 12px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.dropdown-header span {
  flex: 1;
}

.icon-dropdown {
  font-size: 12px;
  transition: transform 0.3s;
  font-weight: bold;
}

.icon-dropdown.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  background-color: #1976D2;
  padding: 0;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 12px 40px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 图标样式 */
.icon-home::before { content: "🖥️"; }
.icon-order::before { content: "📋"; }
.icon-product::before { content: "🛍️"; }
.icon-stats::before { content: "📊"; }
.icon-finance::before { content: "💰"; }
.icon-settings::before { content: "⚙️"; }
.icon-arrow::before { content: "›"; }
.icon-dropdown::before { content: "▼"; }
</style>
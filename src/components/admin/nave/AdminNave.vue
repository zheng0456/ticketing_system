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
      <div class="menu-item" @click="navigateToAdmin" :class="{active: isAdminPageActive}">
        <el-icon><Platform /></el-icon><span>我的主页</span>
        <el-icon><ArrowRight /></el-icon>
      </div>



      <!-- 列车管理中心 -->
      <div class="menu-item" @click="toggleTrainMenu" :class="{active: isTrainMenuOpen}">
        <el-icon><Guide /></el-icon>
        <span>列车管理</span>
        <el-icon v-if="!isTrainMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="isTrainMenuOpen" class="submenu">
        <!-- 车辆管理 -->
        <router-link to="/train" class="menu-item" active-class="active">
          <span>车辆管理</span>
        </router-link>
        <!-- 车站管理 -->
        <router-link to="/train" class="menu-item" active-class="active">
          <span>车站管理</span>
        </router-link>
      </div>

      <!-- 票务管理 -->
      <div class="menu-item" @click="toggleTicketsMenu" :class="{active: isTicketsMenuOpen}">
        <el-icon><MapLocation /></el-icon>
        <span>票务管理</span>
        <el-icon v-if="!isTicketsMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="isTicketsMenuOpen" class="submenu">
        <!-- 车票管理 -->
        <div class="menu-item" @click="navigateToTrainTickets" :class="{active: isTrainTicketsActive}">
          <span>车票管理</span>
        </div>
        <!-- 景点票管理 -->
        <div class="menu-item" @click="navigateToSceneryTickets" :class="{active: isSceneryTicketsActive}">
          <span>景点票管理</span>
        </div>
        <!-- 退票管理 -->
        <div class="menu-item" @click="navigateToRefundTickets" :class="{active: isRefundTicketsActive}">
          <span>退票管理</span>
        </div>
      </div>
     

      <!-- 数据统计 -->
      <div class="menu-item" @click="navigateToStatistics" :class="{active: isStatisticsActive}">
        <el-icon><PieChart /></el-icon>
        <span>数据统计</span>
        <el-icon><ArrowRight /></el-icon>
      </div>

      <!-- 收支明细 -->
      <router-link to="/finance" class="menu-item" active-class="active" exact>
        <el-icon><Money /></el-icon>
        <span>收支明细</span>
        <el-icon><ArrowRight /></el-icon>
      </router-link>

      <!-- 基础设置 -->
      <div class="menu-item" @click="toggleSettingsMenu" :class="{active: isSettingsMenuOpen}">
        <el-icon><Setting /></el-icon>
        <span>基础设置</span>
        <el-icon v-if="!isSettingsMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="isSettingsMenuOpen" class="submenu">
        <!-- 退出登录 -->
        <router-link to="/settings" class="menu-item" active-class="active" exact>
          <span>退出登录</span>
        </router-link>
        <!-- 账号注销 -->
        <router-link to="/settings" class="menu-item" active-class="active" exact>
          <span>账号注销</span>
        </router-link>
        <!-- 权限管理 -->
        <router-link to="/settings" class="menu-item" active-class="active" exact>
          <span>权限管理</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Platform, ArrowRight, ArrowDown, PieChart, Money, Setting, Guide, MapLocation } from '@element-plus/icons-vue'

export default {
  name: 'AdminNave',
  components: {
     Platform,
     ArrowRight,
     ArrowDown,
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
        dropdownOpen: true,
        isTicketsMenuOpen: false,
        isTrainMenuOpen: false,
        isSettingsMenuOpen: false,
        isAdminPageActive: false,
        isTrainTicketsActive: false,
        isSceneryTicketsActive: false,
        isRefundTicketsActive: false,
        isStatisticsActive: false
      }
  },
  // 组件方法
    methods: {
      /**
       * 导航到管理员主页
       */
      navigateToAdmin() {
        // 设置当前页面为选中状态
        this.isAdminPageActive = true;
        // 关闭其他菜单的选中状态
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isSettingsMenuOpen = false;
        // 重置其他选中状态
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isStatisticsActive = false;
        // 导航到管理员页面
        this.$router.push('/admin');
      },
      /**
        * 切换下拉菜单的显示状态
        */
       toggleDropdown() {
         this.dropdownOpen = !this.dropdownOpen;
         // 重置其他选中状态
         this.isAdminPageActive = false;
         this.isTrainMenuOpen = false;
         this.isTicketsMenuOpen = false;
         this.isSettingsMenuOpen = false;
         this.isTrainTicketsActive = false;
         this.isSceneryTicketsActive = false;
         this.isRefundTicketsActive = false;
         this.isStatisticsActive = false;
       },
      /**
       * 导航到车票管理页面
       */
      navigateToTrainTickets() {
        // 设置当前选中状态
        this.isTrainTicketsActive = true;
        // 保持父级菜单展开
        this.isTicketsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isStatisticsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/train-tickets');
      },
      /**
       * 导航到景点票管理页面
       */
      navigateToSceneryTickets() {
        // 设置当前选中状态
        this.isSceneryTicketsActive = true;
        // 保持父级菜单展开
        this.isTicketsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isStatisticsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/scenery-tickets');
      },
      /**
       * 导航到退票管理页面
       */
      navigateToRefundTickets() {
        // 设置当前选中状态
        this.isRefundTicketsActive = true;
        // 保持父级菜单展开
        this.isTicketsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isStatisticsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/refund-tickets');
      },
    /**
        * 切换票务管理菜单显示状态
        */
       toggleTicketsMenu() {
      // 重置"我的主页"的选中状态
      this.isAdminPageActive = false;
      // 切换票务管理菜单状态
      this.isTicketsMenuOpen = !this.isTicketsMenuOpen;
      // 关闭其他菜单
      this.isTrainMenuOpen = false;
      this.isSettingsMenuOpen = false;
      // 重置票务管理子菜单选中状态
      this.isTrainTicketsActive = false;
      this.isSceneryTicketsActive = false;
      this.isRefundTicketsActive = false;
      this.isStatisticsActive = false;
       },
    /**
     * 切换列车管理菜单显示状态
     */
    toggleTrainMenu() {
      // 重置"我的主页"的选中状态
      this.isAdminPageActive = false;
      // 切换列车管理菜单状态
      this.isTrainMenuOpen = !this.isTrainMenuOpen;
      // 关闭其他菜单
      this.isTicketsMenuOpen = false;
      this.isSettingsMenuOpen = false;
      // 重置票务管理子菜单选中状态
      this.isTrainTicketsActive = false;
      this.isSceneryTicketsActive = false;
      this.isRefundTicketsActive = false;
      this.isStatisticsActive = false;
    },
    /**
        * 切换基础设置菜单显示状态
        */
       /**
       * 导航到数据统计页面
       */
      navigateToStatistics() {
        // 设置当前选中状态
        this.isStatisticsActive = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/statistics');
      },
      /**
       * 切换基础设置菜单显示状态
       */
      toggleSettingsMenu() {
         // 重置"我的主页"的选中状态
         this.isAdminPageActive = false;
         // 切换基础设置菜单状态
         this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
         // 关闭其他菜单
         this.isTrainMenuOpen = false;
         this.isTicketsMenuOpen = false;
         // 重置其他选中状态
         this.isTrainTicketsActive = false;
         this.isSceneryTicketsActive = false;
         this.isRefundTicketsActive = false;
         this.isStatisticsActive = false;
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
  color: #e0e0e0;
}

.menu-item i {
  margin-right: 12px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

/* 子菜单样式 */
.submenu {
  width: 100%;
}

.submenu .menu-item {
  background-color: #1976D2;
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

</style>
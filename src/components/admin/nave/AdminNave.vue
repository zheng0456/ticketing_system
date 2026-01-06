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
      <div v-if="hasTrainMenuAccess" class="menu-item" :class="{active: isTrainMenuOpen}" @click="handleTrainMenuClick" data-path="/admin/trains">
        <el-icon><Guide /></el-icon>
        <span>列车管理</span>
        <el-icon v-if="!isTrainMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="hasTrainMenuAccess && isTrainMenuOpen" class="submenu">
        <!-- 车辆管理 -->
        <router-link to="/admin/train" class="menu-item" active-class="active">
          <span>车辆管理</span>
        </router-link>
        <!-- 车站管理 -->
        <router-link to="/admin/trainStation" class="menu-item" active-class="active">
          <span>车站管理</span>
        </router-link>
        <!-- 途径车站管理 -->
        <router-link to="/admin/train-pass-station" class="menu-item" active-class="active">
          <span>途径车站管理</span>
        </router-link>
      </div>

      <!-- 票务管理 -->
      <div v-if="hasTicketsMenuAccess" class="menu-item" @click="handleTicketsMenuClick" :class="{active: isTicketsMenuOpen}" data-path="/admin/tickets">
        <el-icon><MapLocation /></el-icon>
        <span>票务管理</span>
        <el-icon v-if="!isTicketsMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="hasTicketsMenuAccess && isTicketsMenuOpen" class="submenu">
        <!-- 车票管理 -->
        <div v-if="hasTrainTicketsAccess" class="menu-item" @click="navigateToTrainTickets" :class="{active: isTrainTicketsActive}">
          <span>车票管理</span>
        </div>
        <!-- 景点票管理 -->
        <div v-if="hasSceneryTicketsAccess" class="menu-item" @click="navigateToSceneryTickets" :class="{active: isSceneryTicketsActive}">
          <span>景点票管理</span>
        </div>
        <!-- 退票管理 -->
        <div v-if="hasRefundTicketsAccess" class="menu-item" @click="navigateToRefundTickets" :class="{active: isRefundTicketsActive}">
          <span>车票退票管理</span>
        </div>
        <!-- 景点退票管理 -->
        <div v-if="hasRefundSceneryAccess" class="menu-item" @click="navigateToRefundScenery" :class="{active: isRefundSceneryActive}">
          <span>景点退票管理</span>
        </div>
      </div>
     

      <!-- 数据统计 -->
      <div v-if="hasStatisticsAccess" class="menu-item" @click="navigateToStatistics" :class="{active: isStatisticsActive}">
        <el-icon><PieChart /></el-icon>
        <span>数据统计</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      
      <!-- 火车票收支明细 -->
      <div v-if="hasTicketDetailsAccess" class="menu-item" @click="navigateToTicketDetails" :class="{active: isTicketDetailsActive}">
        <el-icon><Money /></el-icon>
        <span>火车票收支明细</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      
      <!-- 景点票收支明细 -->
      <div v-if="hasSceneryDetailsAccess" class="menu-item" @click="navigateToSceneryDetails" :class="{active: isSceneryDetailsActive}">
        <el-icon><Money /></el-icon>
        <span>景点票收支明细</span>
        <el-icon><ArrowRight /></el-icon>
      </div>

      <!-- 基础设置 -->
      <div class="menu-item" @click="handleSettingsMenuClick" :class="{active: isSettingsMenuOpen}" data-path="/admin/settings">
        <el-icon><Setting /></el-icon>
        <span>基础设置</span>
        <el-icon v-if="!isSettingsMenuOpen"><ArrowRight /></el-icon>
        <el-icon v-else><ArrowDown /></el-icon>
      </div>
      <div v-if="isSettingsMenuOpen" class="submenu">
        <!-- 退出登录 -->
        <div class="menu-item" @click="navigateToLogin" :class="{active: isLoginActive}">
          <span>退出登录</span>
        </div>
        <!-- 账号注销 -->
        <div class="menu-item" @click="navigateToLogout" :class="{active: isLogoutActive}">
          <span>账号注销</span>
        </div>
        <!-- 权限管理 -->
        <div v-if="hasPermissionMenuAccess" class="menu-item" @click="navigateToPermission" :class="{active: isPermissionActive}">
          <span>权限管理</span>
        </div>
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
        isRefundSceneryActive: false,
        isStatisticsActive: false,
        isTicketDetailsActive: false,
        isSceneryDetailsActive: false,
        // 基础设置子菜单激活状态
        isLoginActive: false,
        isLogoutActive: false,
        isPermissionActive: false,
        // 权限控制相关
        userMenu: [], // 存储用户可访问的菜单路径
        hasTrainMenuAccess: false,
        hasTicketsMenuAccess: false,
        hasPermissionMenuAccess: false,
        hasStatisticsAccess: false,
        hasTicketDetailsAccess: false,
        hasSceneryDetailsAccess: false,
        hasTrainTicketsAccess: false,
        hasSceneryTicketsAccess: false,
        hasRefundTicketsAccess: false,
        hasRefundSceneryAccess: false
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
        this.isRefundSceneryActive = false;
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
         this.isRefundSceneryActive = false;
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
        this.isRefundSceneryActive = false;
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
        this.isRefundSceneryActive = false;
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
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/refund-tickets');
      },
      /**
       * 导航到景点退票管理页面
       */
      navigateToRefundScenery() {
        // 设置当前选中状态
        this.isRefundSceneryActive = true;
        // 保持父级菜单展开
        this.isTicketsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isStatisticsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/refund-scenery');
      },
    /**
     * 处理票务管理菜单点击事件
     */
    handleTicketsMenuClick() {
      this.toggleTicketsMenu();
      // 改变URL地址但不触发页面跳转
      this.$router.replace('/admin/tickets');
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
      this.isRefundSceneryActive = false;
      this.isStatisticsActive = false;
       },
    /**
     * 处理列车管理菜单点击事件
     */
    handleTrainMenuClick() {
      this.toggleTrainMenu();
      // 改变URL地址但不触发页面跳转
      this.$router.replace('/admin/trains');
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
      this.isRefundSceneryActive = false;
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
        this.isRefundSceneryActive = false;
        this.isTicketDetailsActive = false;
        this.isSceneryDetailsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/statistics');
      },
      
      /**
       * 导航到火车票收支明细页面
       */
      navigateToTicketDetails() {
        // 设置当前选中状态
        this.isTicketDetailsActive = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        this.isSceneryDetailsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/ticket-details');
      },
      
      /**
       * 导航到景点票收支明细页面
       */
      navigateToSceneryDetails() {
        // 设置当前选中状态
        this.isSceneryDetailsActive = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isSettingsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        this.isTicketDetailsActive = false;
        // 执行路由跳转
        this.$router.push('/admin/scenery-details');
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
         this.isRefundSceneryActive = false;
         this.isStatisticsActive = false;
         this.isTicketDetailsActive = false;
         this.isSceneryDetailsActive = false;
         // 重置基础设置子菜单选中状态
         this.isLoginActive = false;
         this.isLogoutActive = false;
         this.isPermissionActive = false;
       },
      /**
       * 处理基础设置菜单点击事件
       */
      handleSettingsMenuClick() {
        this.toggleSettingsMenu();
      },
      /**
       * 导航到登录页（退出登录）
       */
      navigateToLogin() {
        // 设置当前选中状态
        this.isLoginActive = true;
        // 保持父级菜单展开
        this.isSettingsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        this.isTicketDetailsActive = false;
        this.isSceneryDetailsActive = false;
        this.isLogoutActive = false;
        this.isPermissionActive = false;
        // 执行路由跳转
        this.$router.push('/login');
      },
      /**
       * 导航到账号注销页
       */
      navigateToLogout() {
        // 设置当前选中状态
        this.isLogoutActive = true;
        // 保持父级菜单展开
        this.isSettingsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        this.isTicketDetailsActive = false;
        this.isSceneryDetailsActive = false;
        this.isLoginActive = false;
        this.isPermissionActive = false;
        // 执行路由跳转
        this.$router.push('/admin/logout');
      },
      /**
       * 导航到权限管理页
       */
      navigateToPermission() {
        // 设置当前选中状态
        this.isPermissionActive = true;
        // 保持父级菜单展开
        this.isSettingsMenuOpen = true;
        // 重置其他选中状态
        this.isAdminPageActive = false;
        this.isTrainMenuOpen = false;
        this.isTicketsMenuOpen = false;
        this.isTrainTicketsActive = false;
        this.isSceneryTicketsActive = false;
        this.isRefundTicketsActive = false;
        this.isRefundSceneryActive = false;
        this.isStatisticsActive = false;
        this.isTicketDetailsActive = false;
        this.isSceneryDetailsActive = false;
        this.isLoginActive = false;
        this.isLogoutActive = false;
        // 执行路由跳转
        this.$router.push('/admin/permission');
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
    },
    /**
     * 加载用户菜单数据
     */
    loadUserMenu() {
      try {
        console.log('🔍 开始加载用户菜单数据...');
        const userMenuStr = localStorage.getItem('userMenu');
        console.log('📦 localStorage 中的 userMenu 字符串:', userMenuStr);
        
        if (userMenuStr) {
          this.userMenu = JSON.parse(userMenuStr);
          console.log('✅ 加载用户菜单数据成功:', this.userMenu);
          console.log('📊 菜单数量:', this.userMenu.length);
          this.checkMenuPermissions();
        } else {
          console.log('⚠️  未找到用户菜单数据，localStorage 中没有 userMenu');
          console.log('📋 localStorage 所有键值:', Object.keys(localStorage));
          this.userMenu = [];
        }
      } catch (error) {
        console.error('❌ 加载用户菜单数据失败:', error);
        this.userMenu = [];
      }
    },
    
    /**
     * 检查菜单访问权限
     */
    checkMenuPermissions() {
      // 检查列车管理菜单权限
      this.hasTrainMenuAccess = this.userMenu.some(item => 
        item.filePath && (item.filePath === '/admin/train' || item.filePath === '/admin/trainStation' || item.filePath === '/admin/train-pass-station')
      );
      
      // 检查票务管理菜单权限
      this.hasTicketsMenuAccess = this.userMenu.some(item => 
        item.filePath && (item.filePath === '/admin/train-tickets' || item.filePath === '/admin/scenery-tickets' || item.filePath === '/admin/refund-tickets' || item.filePath === '/admin/refund-scenery')
      );
      
      // 检查票务管理子菜单权限
      this.hasTrainTicketsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/train-tickets'
      );
      
      this.hasSceneryTicketsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/scenery-tickets'
      );
      
      this.hasRefundTicketsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/refund-tickets'
      );
      
      this.hasRefundSceneryAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/refund-scenery'
      );
      
      // 检查权限管理菜单权限
      this.hasPermissionMenuAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/permission'
      );
      
      // 检查数据统计菜单权限
      this.hasStatisticsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/statistics'
      );
      
      // 检查火车票收支明细菜单权限
      this.hasTicketDetailsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/ticket-details'
      );
      
      // 检查景点票收支明细菜单权限
      this.hasSceneryDetailsAccess = this.userMenu.some(item => 
        item.filePath && item.filePath === '/admin/scenery-details'
      );
      
      console.log('🔍 菜单权限检查结果:');
      console.log('   - 列车管理菜单:', this.hasTrainMenuAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 票务管理菜单:', this.hasTicketsMenuAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 车票管理:', this.hasTrainTicketsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 景点票管理:', this.hasSceneryTicketsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 退票管理:', this.hasRefundTicketsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 景点退票管理:', this.hasRefundSceneryAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 数据统计:', this.hasStatisticsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 火车票收支明细:', this.hasTicketDetailsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 景点票收支明细:', this.hasSceneryDetailsAccess ? '✅ 可访问' : '❌ 不可访问');
      console.log('   - 权限管理:', this.hasPermissionMenuAccess ? '✅ 可访问' : '❌ 不可访问');
    },
    
    /**
     * 根据当前路由更新菜单激活状态
     */
    updateActiveMenu() {
      // 获取当前路径
      const currentPath = this.$route.path;
      // 重置所有激活状态
      this.isAdminPageActive = false;
      this.isTrainMenuOpen = false;
      this.isTicketsMenuOpen = false;
      this.isSettingsMenuOpen = false;
      this.isTrainTicketsActive = false;
      this.isSceneryTicketsActive = false;
      this.isRefundTicketsActive = false;
      this.isRefundSceneryActive = false;
      this.isStatisticsActive = false;
      this.isTicketDetailsActive = false;
      this.isSceneryDetailsActive = false;
      // 重置基础设置子菜单激活状态
      this.isLoginActive = false;
      this.isLogoutActive = false;
      this.isPermissionActive = false;
      
      // 根据当前路径设置对应的激活状态
      if (currentPath === '/admin') {
        this.isAdminPageActive = true;
      } else if (currentPath === '/admin/train' || currentPath === '/admin/trains' || currentPath === '/admin/trainStation' || currentPath === '/admin/train-pass-station') {
        this.isTrainMenuOpen = true;
      } else if (currentPath === '/admin/tickets') {
        this.isTicketsMenuOpen = true;
      } else if (currentPath === '/admin/train-tickets') {
        this.isTicketsMenuOpen = true;
        this.isTrainTicketsActive = true;
      } else if (currentPath === '/admin/scenery-tickets') {
        this.isTicketsMenuOpen = true;
        this.isSceneryTicketsActive = true;
      } else if (currentPath === '/admin/refund-tickets') {
        this.isTicketsMenuOpen = true;
        this.isRefundTicketsActive = true;
      } else if (currentPath === '/admin/refund-scenery') {
        this.isTicketsMenuOpen = true;
        this.isRefundSceneryActive = true;
      } else if (currentPath === '/admin/statistics') {
        this.isStatisticsActive = true;
      } else if (currentPath === '/admin/ticket-details') {
        this.isTicketDetailsActive = true;
      } else if (currentPath === '/admin/scenery-details') {
        this.isSceneryDetailsActive = true;
      } else if (currentPath === '/admin/settings') {
        this.isSettingsMenuOpen = true;
      } else if (currentPath === '/login') {
        this.isSettingsMenuOpen = true;
        this.isLoginActive = true;
      } else if (currentPath === '/admin/logout') {
        this.isSettingsMenuOpen = true;
        this.isLogoutActive = true;
      } else if (currentPath === '/admin/permission') {
        this.isSettingsMenuOpen = true;
        this.isPermissionActive = true;
      }
    }
  },
  // 监听路由变化
  watch: {
    '$route.path': {
      handler() {
        this.updateActiveMenu();
      },
      immediate: true
    }
  },
  // 生命周期钩子：组件挂载后
  mounted() {
    // 添加点击外部关闭下拉菜单的事件监听器
    document.addEventListener('click', this.handleClickOutside);
    // 加载用户菜单数据
    this.loadUserMenu();
    // 检查初始路由，设置正确的激活状态
    this.updateActiveMenu();
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
  color: white;
}

.menu-link {
  display: flex;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: white;
}

.submenu .menu-item {
  text-decoration: none !important;
}

.submenu .menu-item.router-link-active {
  text-decoration: none !important;
}

.submenu .menu-item.router-link-exact-active {
  text-decoration: none !important;
}

/* 直接针对submenu中的router-link设置样式，确保去掉所有状态下的下划线 */
.submenu router-link {
  text-decoration: none !important;
}

.submenu router-link:hover {
  text-decoration: none !important;
}

.submenu router-link.router-link-active {
  text-decoration: none !important;
}

.submenu router-link.router-link-exact-active {
  text-decoration: none !important;
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
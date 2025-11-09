<template>
  <div class="ticket-nav-container">
    <div class="nav-tabs">
      <!-- 购票标签 -->
      <div class="tab-item active" @click="selectTab('purchase')">
        <span class="tab-title">购票</span>
        <div class="sub-menu">
          <div class="menu-item">单程</div>
          <div class="menu-item">往返</div>
          <div class="menu-item">中转换乘</div>
        </div>
      </div>

      <!-- 变更标签 -->
      <div class="tab-item" @click="selectTab('change')">
        <span class="tab-title">变更</span>
        <div class="sub-menu">
          <div class="menu-item">退票</div>
          <div class="menu-item">改签</div>
          <div class="menu-item">变更到站</div>
        </div>
      </div>

      <!-- 更多标签 -->
      <div class="tab-item" @click="selectTab('more')">
        <span class="tab-title">更多</span>
        <div class="sub-menu">
          <div class="menu-item">中铁银通卡</div>
          <div class="menu-item">国际列车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNaveTicket',
  data() {
    return {
      activeTab: 'purchase' // 默认选中购票标签
    }
  },
  methods: {
    selectTab(tabName) {
      this.activeTab = tabName
    }
  }
}
</script>

<style scoped>
.ticket-nav-container {
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab-item {
  position: relative;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  border-right: 1px solid #ddd;
}

.tab-item:last-child {
  border-right: none;
}

.tab-item.active {
  color: #0066cc;
  font-weight: bold;
}

.tab-item:hover {
  background-color: #f5f5f5;
}

.tab-title {
  display: block;
  padding: 8px 0;
  text-align: center;
}

.sub-menu {
  display: flex;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-top: none;
  min-width: 200px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
}

.tab-item:hover .sub-menu {
  display: flex;
}

.menu-item {
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid #ddd;
  margin: 0 5px;
  transition: all 0.2s ease;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
}

.menu-item:hover {
  background-color: #f5f5f5;
  color: #0066cc;
}

.menu-item.active {
  background-color: #0066cc;
  color: white;
}

.menu-item:last-child {
  margin-right: 0;
}

/* 确保在移动端显示时不会被遮挡 */
@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
  }
  
  .tab-item {
    border-bottom: 1px solid #ddd;
    border-right: none;
  }
  
  .tab-item:last-child {
    border-bottom: none;
  }
  
  .sub-menu {
    position: static;
    display: block;
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: auto;
  }
  
  .menu-item {
    padding: 8px 15px;
  }
}
</style>
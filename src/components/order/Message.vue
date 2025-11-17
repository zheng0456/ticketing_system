<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h3>个人中心</h3>
      <div class="menu-group">
        <h4>订单中心 ▼</h4>
        <ul>
          <li class="active">火车票订单</li>
          <li>候补订单</li>
          <li>计次·定期票...</li>
          <li>约号订单</li>
          <li>雪具快运订单</li>
          <li>餐饮·特产</li>
          <li>保险订单</li>
          <li>电子发票</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4>本人车票</h4>
      </div>
      <div class="menu-group">
        <h4>会员中心</h4>
      </div>
      <div class="menu-group">
        <h4>个人信息 ▼</h4>
        <ul>
          <li>查看个人信息</li>
          <li>账号安全</li>
          <li>手机核验</li>
          <li>账号注销</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4>常用信息管理 ▼</h4>
        <ul>
          <li>乘车人</li>
          <li>地址管理</li>
        </ul>
      </div>
      <div class="menu-group">
        <h4>温馨服务 ▼</h4>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <div class="current-location">当前位置：个人中心 &gt; 火车票订单</div>
      <!-- 选项卡 -->
      <div class="tabs">
        <button class="tab active">未完成订单</button>
        <button class="tab">未出行订单</button>
        <button class="tab">历史订单</button>
      </div>
      <!-- 空订单提示 -->
      <div class="empty-order">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="24" y="24" width="24" height="32" rx="2" stroke="#409EFF" stroke-width="2" fill="white"/>
            <rect x="28" y="28" width="16" height="24" rx="1" fill="white"/>
            <circle cx="36" cy="36" r="2" fill="#8BC3FF"/>
            <path d="M36 38V44" stroke="#409EFF" stroke-width="2" stroke-linecap="round"/>
            <circle cx="42" cy="32" r="1" fill="#C0E0FF"/>
            <circle cx="26" cy="30" r="1" fill="#C0E0FF"/>
          </svg>
        </div>
        <div class="empty-text">
          <p>您没有未完成的订单哦~</p>
          <p>您可以通过<a href="#" class="link">车票预订</a>功能，来制定出行计划。</p>
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="tips">
        <h4>温馨提示</h4>
        <ol>
          <li>席位已锁定，请在指定时间内完成网上支付。</li>
          <li>逾期未支付，系统将取消本次交易。</li>
          <li>在完成支付或取消本订单之前，您将无法购买其他车票。</li>
        </ol>
      </div>
    </main>
  </div>
</template>

<script setup>
// 可在此处添加 Vue3 逻辑（如数据响应、方法等）
</script>

<script>
export default {
  name: 'OrderMessage'
}
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  font-family: "Microsoft Yahei", sans-serif;
  color: #333;
}

/* 左侧 sidebar 样式 */
.sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #eaeaea;
  padding: 20px;
}

.sidebar h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.menu-group h4 {
  font-size: 16px;
  margin: 15px 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-group li {
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
}

.menu-group li.active {
  color: #409EFF;
  font-weight: 500;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
}

.current-location {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
}

.tab.active {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
  font-weight: 500;
}

.empty-order {
  border: 1px solid #409EFF;
  border-radius: 4px;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.empty-icon svg {
  margin-bottom: 10px;
}

.empty-text p {
  margin: 5px 0;
}

.link {
  color: #409EFF;
  text-decoration: none;
}

.tips {
  background: #FFF8E6;
  border-radius: 4px;
  padding: 15px;
}

.tips h4 {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
}

.tips ol {
  padding-left: 20px;
  margin: 0;
}

.tips li {
  margin-bottom: 5px;
  font-size: 14px;
}
</style>
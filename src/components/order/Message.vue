<template>
  <div class="container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="current-location">当前位置：个人中心 &gt; 火车票订单</div>
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
    <TicketOrder />
  </div>
</template>

<script setup>
import TicketOrder from './TicketOrder.vue'
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
  width: 215px;
  background: #fff;
  border-right: 1px solid #eaeaea;
  padding: 20px;
}

.sidebar .current-location {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
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
</style>
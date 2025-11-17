<template>
  <div class="ticket-nav-dropdown">
    <div class="ticket-nav-content">
      <div class="ticket-nav-section">
        <h4>新闻资讯</h4>
        <ul>
          <li><router-link to="/news/latest">最新动态</router-link></li>
          <li><router-link to="/news/industry">行业新闻</router-link></li>
          <li><router-link to="/news/policy">政策法规</router-link></li>
        </ul>
      </div>
      <div class="ticket-nav-section">
        <h4>公告通知</h4>
        <ul>
          <li><router-link to="/notice/system">系统公告</router-link></li>
          <li><router-link to="/notice/maintenance">维护通知</router-link></li>
          <li><router-link to="/notice/update">更新说明</router-link></li>
        </ul>
      </div>
      <div class="ticket-nav-section">
        <h4>帮助中心</h4>
        <ul>
          <li><router-link to="/help/faq">常见问题</router-link></li>
          <li><router-link to="/help/guide">使用指南</router-link></li>
          <li><router-link to="/help/contact">联系客服</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNaveNews'
}
</script>

<style scoped>
.ticket-nav-dropdown {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  min-width: 990px;
  position: fixed;
  z-index: 1000;
}

.ticket-nav-content {
  display: flex;
  padding: 15px 0;
}

.ticket-nav-section {
  flex: 1;
  border-right: 1px solid #f0f0f0;
  padding: 0 20px;
}

.ticket-nav-section:last-child {
  border-right: none;
}

.ticket-nav-section h4 {
  color: #333;
  font-size: 14px;
  margin-bottom: 12px;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.ticket-nav-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ticket-nav-section li {
  margin-bottom: 6px;
  line-height: 24px;
}

.ticket-nav-section a {
  color: #666;
  text-decoration: none;
  font-size: 13px;
  display: block;
  transition: color 0.2s;
  padding: 2px 0;
}

.ticket-nav-section a:hover {
  color: #0066cc;
  text-decoration: underline;
}
</style>
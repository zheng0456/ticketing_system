<template>
  <div class="ticket-nav-dropdown">
    <div class="ticket-nav-content">
      <div class="ticket-nav-section">
        <h4>景点预约</h4>
        <ul>
          <li><router-link to="/scenery">门票预订</router-link></li>
        </ul>
      </div>
      <div class="ticket-nav-section">
        <h4>景点服务</h4>
        <ul>
          <li><router-link to="/service/guide">修改预订</router-link></li>
          <li><router-link to="/service/guide">退款服务</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNaveTravel'
}
</script>

<style scoped>
.ticket-nav-dropdown {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  min-width: 990px;
  position: relative;
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
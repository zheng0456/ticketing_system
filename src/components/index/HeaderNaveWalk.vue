<template>
  <div class="ticket-nav-dropdown">
    <div class="ticket-nav-content">
      <div class="ticket-nav-section">
        <h4>交通指南</h4>
        <ul>
          <li><router-link to="/guide/traffic">公共交通</router-link></li>
          <li><router-link to="/guide/subway">地铁线路</router-link></li>
          <li><router-link to="/guide/bus">公交线路</router-link></li>
        </ul>
      </div>
      <div class="ticket-nav-section">
        <h4>便民服务</h4>
        <ul>
          <li><router-link to="/service/weather">天气预报</router-link></li>
          <li><router-link to="/service/map">地图导航</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNaveWalk'
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
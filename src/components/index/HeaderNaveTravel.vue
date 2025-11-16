<template>
  <div class="travel-dropdown">
    <div class="travel-content">
      <div class="travel-section">
        <h3>旅游服务</h3>
        <div class="travel-links">
          <a href="#" class="travel-link">酒店预订</a>
          <a href="#" class="travel-link">景点门票</a>
          <a href="#" class="travel-link">旅游套餐</a>
          <a href="#" class="travel-link">租车服务</a>
        </div>
      </div>
      <div class="travel-section">
        <h3>热门目的地</h3>
        <div class="travel-links">
          <a href="#" class="travel-link">北京</a>
          <a href="#" class="travel-link">上海</a>
          <a href="#" class="travel-link">广州</a>
          <a href="#" class="travel-link">深圳</a>
        </div>
      </div>
      <div class="travel-section">
        <h3>旅游资讯</h3>
        <div class="travel-links">
          <a href="#" class="travel-link">旅游攻略</a>
          <a href="#" class="travel-link">天气查询</a>
          <a href="#" class="travel-link">交通指南</a>
          <a href="#" class="travel-link">美食推荐</a>
        </div>
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
.travel-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 600px;
  padding: 20px;
  margin-top: 5px;
}

.travel-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.travel-section {
  flex: 1;
}

.travel-section h3 {
  color: #333;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
  border-bottom: 2px solid #0066cc;
  padding-bottom: 5px;
}

.travel-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.travel-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 0;
  transition: color 0.3s;
}

.travel-link:hover {
  color: #0066cc;
  text-decoration: underline;
}
</style>
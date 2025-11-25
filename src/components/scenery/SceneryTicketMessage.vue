<template>
  <div class="scenery-cards-container">
    <div class="scenery-card">
      <img src="@/assets/img/北京故宫.png" alt="北京" class="scenery-image" style="user-select: none; -webkit-user-drag: none;">
      <div class="scenery-info">
        <h3 class="scenery-title">故宫</h3>
      </div>
    </div>
    <div class="scenery-card">
      <img src="@/assets/img/上海东方明珠.png" alt="上海" class="scenery-image" style="user-select: none; -webkit-user-drag: none;">
      <div class="scenery-info">
        <h3 class="scenery-title">东方明珠</h3>
      </div>
    </div>
    <div class="scenery-card">
      <img src="@/assets/img/西湖.png" alt="西湖" class="scenery-image" style="user-select: none; -webkit-user-drag: none;">
      <div class="scenery-info">
        <h3 class="scenery-title">西湖</h3>
      </div>
    </div>
    <div class="scenery-card">
      <img src="@/assets/img/熊猫.png" alt="熊猫" class="scenery-image" style="user-select: none; -webkit-user-drag: none;">
      <div class="scenery-info">
        <h3 class="scenery-title">熊猫</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneryTicketMessage'
}
</script>

<style scoped>
.scenery-card {
  width: 330px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #fff;
  padding: 0;
  margin: 0;
}

.scenery-card * {
  box-sizing: border-box;
}

.scenery-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  vertical-align: bottom;
}

.scenery-image:hover {
  transform: scale(1.05);
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: none;
}

.scenery-info {
  padding: 12px 12px 0 12px;
  background-color: #fff;
}

.scenery-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.scenery-cards-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-left:30px ;
}

.scenery-desc {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
  padding-bottom: 12px;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
  display: inline-block;
  width: 14px;
  height: 14px;
  text-align: center;
}

.desc-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  line-height: 1.4;
}
</style>
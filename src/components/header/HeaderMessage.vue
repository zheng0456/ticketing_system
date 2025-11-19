<template>
  <div class="header-message">
    <div class="current-location">
      当前位置： <router-link to="/" class="location-link">首页</router-link> &gt;个人中心 
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMessage'
}
</script>

<style scoped>
.header-message {
  width: 100%;
  padding: 10px 20px;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center;
}

.current-location {
  font-size: 12px;
  color: #666;
  padding-bottom: 5px;
}

.location-link {
  color: #409EFF;
  text-decoration: none;
  cursor: pointer;
}

.location-link:hover {
  text-decoration: underline;
  color: #337ecc;
}
</style>
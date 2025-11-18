<template>
  <div class="header-message">
    <div class="current-location">当前位置： 首页 &gt;个人中心 &gt; 火车票订单</div>
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
</style>
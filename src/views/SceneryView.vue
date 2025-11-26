<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <SceneryLeftMessage />
    
    <!-- 单独放置SceneryTicketMessage组件，占据一整行 -->
    <div class="ticket-message-container">
      <SceneryTicketMessage />
    </div>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import SceneryLeftMessage from '@/components/scenery/SceneryLeftMessage.vue'
import SceneryTicketMessage from '@/components/scenery/SceneryTicketMessage.vue'
import PageFooter from '@/components/index/Footer.vue'
</script>

<style scoped>
/* 可以在这里添加额外的样式 */
.home {
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
/* 调整PageHeader和HeaderNav组件之间的间距 */
.home > .header {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
.home > .main-nav {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
/* 为SceneryTicketMessage容器添加样式，确保占据一整行 */
.ticket-message-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: 20px;
}
</style>
<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <HeaderMessage />
    <div class="content-wrapper">
      <OrderMessage />
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import HeaderMessage from '@/components/header/HeaderMessage.vue'
import OrderMessage from '../components/order/Message.vue'
</script>

<style scoped>
/* 可以在这里添加额外的样式 */
.home {
  padding: 0;
  width: 100%;
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
.content-wrapper {
  position: relative;
  z-index: 1;
}
</style>
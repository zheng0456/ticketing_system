<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <div class="content-wrapper">
      <OrderMessage />
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import OrderMessage from '../components/order/Message.vue'
</script>

<style scoped>
/* 可以在这里添加额外的样式 */
.home {
  padding: 0;
  width: 100%;
}
.content-wrapper {
  position: relative;
  z-index: 1;
}
</style>
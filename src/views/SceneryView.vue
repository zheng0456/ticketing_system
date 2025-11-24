<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <SceneryLeftMessage />
  </div>
</template>

<script setup>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import SceneryLeftMessage from '@/components/scenery/SceneryLeftMessage.vue'
</script>

<style scoped>
/* 可以在这里添加额外的样式 */
.home {
  padding: 0;
  width: 100%;
}
</style>
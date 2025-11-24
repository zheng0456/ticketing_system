<template>
    <div class="home">
    <PageHeader />
    <HeaderNav />
    <div class="ticket-view">
        <OneWayTicket v-if="!isTransferTicket" />
        <TransferTicket v-else />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import OneWayTicket from '../components/ticket/OneWayTicket.vue';
import TransferTicket from '../components/ticket/TransferTicket.vue';

const route = useRoute();

// 根据路由路径判断是否显示换乘票组件
const isTransferTicket = computed(() => {
  return route.path === '/ticket/multi' || route.path.includes('/multi');
});
</script>

<style scoped>
.home {
  padding: 0;
  width: 100%;
}
.ticket-view {
  width: 100%;
  padding: 20px;
}
</style>
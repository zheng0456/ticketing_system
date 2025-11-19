<template>
    <div class="home">
    <PageHeader />
    <HeaderNav />
    <div class="ticket-view">
        <OneWayTicket />
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import OneWayTicket from '../components/ticket/OneWayTicket.vue';
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
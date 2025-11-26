<template>
  <div class="home">
    <PageHeader />  
    <HeaderNav />  
    <!-- 列车信息组件 -->
    <div class="ticket-container">
      <!-- 直接使用TicketMessages组件，弹窗逻辑在其内部实现 -->
      <TicketMessages />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import TicketMessages from '@/components/ticket/ticketmessage/TicketMessages.vue'

export default {
  components: {
    PageHeader,
    HeaderNav,
    TicketMessages
  }
}
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

.ticket-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}
</style>
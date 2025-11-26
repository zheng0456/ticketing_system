<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <div class="content-wrapper">
      <TicketForm />
      <FeatureIcons />
      <PagePromotion />
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import TicketForm from '@/components/index/TicketForm.vue'
import FeatureIcons from '@/components/index/FeatureIcons.vue'
import PagePromotion from '@/components/index/Promotion.vue'
import PageFooter from '@/components/index/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    PageHeader,
    HeaderNav,
    TicketForm,
    FeatureIcons,
    PagePromotion,
    PageFooter
  }
}
</script>

<style scoped>
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
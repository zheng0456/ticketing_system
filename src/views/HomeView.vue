<template>
  <div class="home">
    <PageHeader />
    <HeaderNav />
    <TicketForm />
    <FeatureIcons />
    <PagePromotion />
  </div>
</template>

<script>
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import TicketForm from '@/components/index/TicketForm.vue'
import FeatureIcons from '@/components/index/FeatureIcons.vue'
import PagePromotion from '@/components/index/Promotion.vue'

export default {
  name: 'HomeView',
  components: {
    PageHeader,
    HeaderNav,
    TicketForm,
    FeatureIcons,
    PagePromotion
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
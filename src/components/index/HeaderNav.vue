<template>
  <div class="main-nav">
    <router-link to="/index" class="nav-item active">首页</router-link>
    <div 
      class="nav-item ticket-item" 
      @mouseenter="showTicketMenu = true"
      @mouseleave="showTicketMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>车票</a>
      <transition name="fade">
        <HeaderNaveTicket v-show="showTicketMenu" class="ticket-dropdown" />
      </transition>
    </div>
    <div 
      class="nav-item travel-item" 
      @mouseenter="showTravelMenu = true"
      @mouseleave="showTravelMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>景点服务</a>
      <transition name="fade">
        <HeaderNaveTravel v-show="showTravelMenu" class="travel-dropdown" />
      </transition>
    </div>
    <a href="#" class="nav-item">酒店服务</a>
    <a href="#" class="nav-item">出行指南</a>
    <a href="#" class="nav-item">信息查询</a>
  </div>
</template>

<script>
import HeaderNaveTicket from '@/components/index/HeaderNaveTicket.vue'
import HeaderNaveTravel from '@/components/index/HeaderNaveTravel.vue'

export default {
  name: 'HeaderNav',
  components: {
    HeaderNaveTicket,
    HeaderNaveTravel
  },
  data() {
    return {
      showTicketMenu: false,
      showTravelMenu: false
    }
  },

}
</script>

<style scoped>
.main-nav {
  display: flex;
  align-items: center;
  height: 50px;
  background: #0066cc;
  padding: 0 20px;
  justify-content: center;
  position: relative;
  z-index: 100;
}
.nav-item {
  color: #fff;
  text-decoration: none;
  padding: 8px 15px;
  font-size: 14px;
  margin: 0 53px;
}
.nav-link {
  color: #fff;
  text-decoration: none;
}
.nav-item.active {
  background: #0055aa;
  border-radius: 4px;
}
.ticket-item {
  position: relative;
}
.travel-item {
  position: relative;
}
.ticket-dropdown {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.travel-dropdown {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
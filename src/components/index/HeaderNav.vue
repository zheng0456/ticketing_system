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
    <div 
      class="nav-item hotel-item" 
      @mouseenter="showHotelMenu = true"
      @mouseleave="showHotelMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>酒店服务</a>
      <transition name="fade">
        <HeaderNaveHotel v-show="showHotelMenu" class="hotel-dropdown" />
      </transition>
    </div>
    <div 
      class="nav-item walk-item" 
      @mouseenter="showWalkMenu = true"
      @mouseleave="showWalkMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>出行指南</a>
      <transition name="fade">
        <HeaderNaveWalk v-show="showWalkMenu" class="walk-dropdown" />
      </transition>
    </div>
    <div 
      class="nav-item news-item" 
      @mouseenter="showNewsMenu = true"
      @mouseleave="showNewsMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>信息查询</a>
      <transition name="fade">
        <HeaderNaveNews v-show="showNewsMenu" class="news-dropdown" />
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderNaveTicket from '@/components/index/HeaderNaveTicket.vue'
import HeaderNaveTravel from '@/components/index/HeaderNaveTravel.vue'
import HeaderNaveHotel from '@/components/index/HeaderNaveHotel.vue'
import HeaderNaveWalk from '@/components/index/HeaderNaveWalk.vue'
import HeaderNaveNews from '@/components/index/HeaderNaveNews.vue'

export default {
  name: 'HeaderNav',
  components: {
    HeaderNaveTicket,
    HeaderNaveTravel,
    HeaderNaveHotel,
    HeaderNaveWalk,
    HeaderNaveNews
  },
  data() {
    return {
      showTicketMenu: false,
      showTravelMenu: false,
      showHotelMenu: false,
      showWalkMenu: false,
      showNewsMenu: false
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
.hotel-item {
  position: relative;
}
.walk-item {
  position: relative;
}
.news-item {
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

.hotel-dropdown {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.walk-dropdown {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.news-dropdown {
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
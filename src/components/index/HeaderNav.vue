<template>
  <div class="main-nav">
    <router-link 
      to="/index" 
      class="nav-item" 
      :class="{ active: isHomeActive }"
      active-class="active"
    >首页</router-link>
    <div 
      class="nav-item ticket-item" 
      :class="{ active: isTicketActive }"
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
      :class="{ active: isTravelActive }"
      @mouseenter="showTravelMenu = true"
      @mouseleave="showTravelMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>景点预约</a>
      <transition name="fade">
        <HeaderNaveTravel v-show="showTravelMenu" class="travel-dropdown" />
      </transition>
    </div>
    <!-- <div 
      class="nav-item hotel-item" 
      :class="{ active: isHotelActive }"
      @mouseenter="showHotelMenu = true"
      @mouseleave="showHotelMenu = false"
    >
      <a href="#" class="nav-link" @click.prevent>酒店预约</a>
      <transition name="fade">
        <HeaderNaveHotel v-show="showHotelMenu" class="hotel-dropdown" />
      </transition>
    </div> -->
    <div 
      class="nav-item walk-item" 
      :class="{ active: isWalkActive }"
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
      :class="{ active: isNewsActive }"
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
// import HeaderNaveHotel from '@/components/index/HeaderNaveHotel.vue'
import HeaderNaveWalk from '@/components/index/HeaderNaveWalk.vue'
import HeaderNaveNews from '@/components/index/HeaderNaveNews.vue'

export default {
  name: 'HeaderNav',
  components: {
    HeaderNaveTicket,
    HeaderNaveTravel,
    // HeaderNaveHotel,
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
  computed: {
    currentPath() {
      return this.$route.path
    },
    isHomeActive() {
      return this.currentPath === '/index' || this.currentPath === '/'
    },
    isTicketActive() {
      const path = this.currentPath
      return path.startsWith('/ticket') || 
             path.startsWith('/order') || 
             path === '/service/change' || 
             path === '/service/endrose'
    },
    isTravelActive() {
      const path = this.currentPath
      return path.startsWith('/attraction') || 
             path.startsWith('/search') || 
             path.startsWith('/scenery') || 
             path === '/service/guide' || 
             path === '/service/transport' || 
             path === '/service/ticket' || 
             path === '/service/group'
    },
    isHotelActive() {
      const path = this.currentPath
      return path.startsWith('/hotel/') || 
             path.startsWith('/query/') || 
             path === '/service/cancel' || 
             path === '/service/modify' || 
             path === '/service/refund'
    },
    isWalkActive() {
      const path = this.currentPath
      return path.startsWith('/guide/') || 
             path.startsWith('/strategy') || 
             path === '/service/weather' || 
             path === '/service/map' || 
             path === '/service/emergency'
    },
    isNewsActive() {
      const path = this.currentPath
      return path.startsWith('/news/') || 
             path.startsWith('/notice/') || 
             path.startsWith('/help/')
    }
  }

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
  margin: 0 77px;
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
  position: absolute;
  top: 100%;
  left: 285px;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 8px;
}

.travel-dropdown {
  position: absolute;
  top: 100%;
  left: 71px;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 8px;
}

.hotel-dropdown {
  position: absolute;
  top: 100%;
  left: -15px;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 8px;
}

.walk-dropdown {
  position: absolute;
  top: 100%;
  left: -168px;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 8px;
}

.news-dropdown {
  position: absolute;
  top: 100%;
  left: -407px;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 8px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
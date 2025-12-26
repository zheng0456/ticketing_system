<template>
  <div class="ticket-form-container">
    <div class="carousel-background">
      <div class="carousel-slide" 
           v-for="(image, index) in carouselImages" 
           :key="index"
           :class="{ active: currentIndex === index }"
           :style="{ backgroundImage: `url(${image})` }">
      </div>
      <div class="carousel-indicators">
        <span v-for="(image, index) in carouselImages" 
              :key="index"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"></span>
      </div>
    </div>
    <div class="ticket-form">
      <div class="tab-nav">
        <button class="tab-btn" :class="{ active: tripType === 'single' }" @click="tripType = 'single'">单程</button>
        <button class="tab-btn" :class="{ active: tripType === 'round' }" @click="tripType = 'round'">往返</button>
      
      </div>
      <div class="form-group inline-group">
        <label>出发地</label>
        <TicketFromCity v-model="departureCity" />
      </div>
      <div class="form-group inline-group">
        <label>到达地</label>
        <TicketFromCity v-model="arrivalCity" placeholder="请输入到达地" />
      </div>
      <div class="form-group inline-group">
        <label>出发日期</label>
        <input type="date" v-model="departureDate" />
      </div>
      <transition name="slide">
        <div class="form-group inline-group" v-if="tripType === 'round'">
          <label>返程日期</label>
          <input type="date" v-model="returnDate" />
        </div>
      </transition>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="student" v-model="isStudent" />
        <label for="student">学生</label>
        <input type="checkbox" id="high-speed" v-model="isHighSpeed" />
        <label for="high-speed">高铁/动车</label>
      </div>
      <button class="query-btn" @click="handleQuery">查询</button>
      <div class="history-links">
        <a href="#">删除历史</a>
      </div>
    </div>
  </div>
</template>

<script>
import TicketFromCity from './TicketFromCity.vue'

export default {
  name: 'TicketForm',
  components: {
    TicketFromCity
  },
  data() {
    return {
      departureCity: '',
      arrivalCity: '',
      tripType: 'single', // 'single' 或 'round'
      departureDate: new Date().toISOString().split('T')[0],
      returnDate: new Date().toISOString().split('T')[0],
      isStudent: false,
      isHighSpeed: false,
      currentIndex: 0,
      carouselInterval: null,
      carouselImages: [
        require('@/assets/img/index1.jpg'),
        require('@/assets/img/index2.jpg'),
        require('@/assets/img/index3.jpg')
      ]
    }
  },
  mounted() {
    this.startCarousel()
  },
  beforeUnmount() {
    this.stopCarousel()
  },
  methods: {
    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length
      }, 4000)
    },
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
    },
    goToSlide(index) {
      this.currentIndex = index
      this.stopCarousel()
      this.startCarousel()
    },
    handleQuery() {
      // 构建查询参数
      const queryParams = {
        type: this.tripType,
        departureCity: this.departureCity,
        arrivalCity: this.arrivalCity,
        departureDate: this.departureDate,
        isStudent: this.isStudent,
        isHighSpeed: this.isHighSpeed
      }
      
      // 如果是往返，添加返程日期参数
      if (this.tripType === 'round') {
        queryParams.returnDate = this.returnDate
      }
      
      // 跳转到票务查询页面
      this.$router.push({
        path: '/ticket',
        query: queryParams
      })
    }
  }
}
</script>

<style scoped>
.ticket-form-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  background: #f5f5f5;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.carousel-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  gap: 8px;
}

.carousel-indicators span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.8);
}

.carousel-indicators span.active {
  background: #fff;
  width: 30px;
  border-radius: 5px;
}

.ticket-form {
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border: 1px solid #e1e1e1;
  margin: 40px 0 40px 254px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  flex-shrink: 0;
  backdrop-filter: blur(5px);
}
.tab-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff6600;
}
.tab-btn {
  padding: 8px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  margin-right: 15px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}
.tab-btn:hover {
  background: #f8f8f8;
}
.tab-btn.active {
  background: #ff6600;
  color: #fff;
  font-weight: bold;
}
.form-group {
  margin-bottom: 12px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.inline-group {
  display: flex;
  align-items: center;
}
.inline-group label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  min-width: 60px;
}
.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  height: 32px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}
.form-group input[type="text"]:focus,
.form-group input[type="date"]:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 3px rgba(255, 102, 0, 0.3);
}

/* 返程日期字段过渡效果 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.checkbox-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}
.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
  vertical-align: middle;
}
.checkbox-group label {
  display: inline;
  margin-right: 0;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.query-btn {
  width: 100%;
  padding: 12px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}
.query-btn:hover {
  background: #e55500;
}
.history-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.history-links a {
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s ease;
}
.history-links a:hover {
  color: #0052a3;
  text-decoration: underline;
}

</style>
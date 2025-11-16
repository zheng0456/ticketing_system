<template>
  <div class="city-selector">
    <div class="input-with-btn">
      <input 
        type="text" 
        :placeholder="placeholder" 
        v-model="selectedCity" 
        readonly 
        @click="toggleCityList"
      />
      <button class="select-btn" @click="toggleCityList">选择</button>
    </div>
    <div class="city-list" v-if="showCityList">
      <div class="city-list-header">
        <span>热门城市</span>
        <button class="close-btn" @click="showCityList = false">×</button>
      </div>
      <div class="city-grid">
        <div 
          v-for="city in cities" 
          :key="city" 
          class="city-item"
          @click="selectCity(city)"
        >
          {{ city }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketFromCity',
  props: {
    placeholder: {
      type: String,
      default: '请输入出发地'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCityList: false,
      cities: [
        '北京', '上海', '广州', '深圳', '杭州', '南京', '苏州', '成都',
        '武汉', '西安', '重庆', '天津', '青岛', '大连', '厦门', '宁波',
        '无锡', '长沙', '郑州', '佛山', '济南', '东莞', '福州', '合肥',
        '昆明', '哈尔滨', '长春', '石家庄', '常州', '嘉兴', '南通', '徐州',
        '太原', '烟台', '泉州', '贵阳', '南昌', '兰州', '海口', '西宁',
        '呼和浩特', '银川', '乌鲁木齐', '拉萨', '台北', '香港', '澳门'
      ]
    }
  },
  computed: {
    selectedCity: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  },
  methods: {
    toggleCityList() {
      this.showCityList = !this.showCityList;
    },
    selectCity(city) {
      this.selectedCity = city;
      this.showCityList = false;
    }
  }
}
</script>

<style scoped>
.city-selector {
  position: relative;
  flex: 1;
}
.input-with-btn {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}
.input-with-btn input[type="text"] {
  flex: 1;
  padding: 10px 8px;
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  height: 32px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  cursor: pointer;
}
.input-with-btn input[type="text"]:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 3px rgba(255, 102, 0, 0.3);
}
.select-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff6600;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease;
}
.select-btn:hover {
  background: #e55500;
}
.city-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 2px;
}
.city-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  background: #f8f8f8;
  font-weight: bold;
  font-size: 14px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  color: #666;
}
.city-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #eee;
  padding: 1px;
}
.city-item {
  background: white;
  padding: 10px 8px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.city-item:hover {
  background: #f0f8ff;
  color: #ff6600;
}
</style>
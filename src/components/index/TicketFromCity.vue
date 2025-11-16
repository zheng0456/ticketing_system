<template>
  <div class="city-selector">
    <div class="input-with-btn">
      <input 
        type="text" 
        :placeholder="placeholder" 
        v-model="selectedCity" 
        @focus="handleInputFocus"
      />
      <button class="select-btn" @click="toggleCityList"><el-icon><Location /></el-icon></button>
    </div>
    <div class="city-list" v-if="showCityList">
      <div class="city-list-header">
        <span>热门城市</span>
        <button class="close-btn" @click="showCityList = false">×</button>
      </div>
      <div class="letter-buttons">
        <button 
          v-for="letter in letters" 
          :key="letter" 
          class="letter-btn"
          :class="{ active: selectedLetter === letter }"
          @click="filterByLetter(letter)"
        >
          {{ letter }}
        </button>
        <button 
          class="letter-btn"
          :class="{ active: selectedLetter === 'all' }"
          @click="filterByLetter('all')"
        >
          全部
        </button>
      </div>
      <div class="city-grid">
        <div 
          v-for="city in filteredCities" 
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
      selectedLetter: 'all',
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      cities: [
        // 直辖市
        '北京', '上海', '天津', '重庆',
        // 省会城市
        '广州', '深圳', '杭州', '南京', '苏州', '成都', '武汉', '西安', '长沙', '郑州',
        '济南', '合肥', '福州', '南昌', '南宁', '昆明', '贵阳', '海口', '兰州', '西宁',
        '银川', '呼和浩特', '乌鲁木齐', '拉萨', '哈尔滨', '长春', '沈阳', '石家庄', '太原',
        // 主要地级市
        '大连', '青岛', '宁波', '厦门', '无锡', '佛山', '东莞', '烟台', '温州', '泉州',
        '南通', '徐州', '常州', '嘉兴', '台州', '绍兴', '金华', '惠州', '珠海', '中山',
        '江门', '汕头', '湛江', '肇庆', '茂名', '揭阳', '清远', '韶关', '阳江', '河源',
        '梅州', '潮州', '汕尾', '云浮', '保定', '唐山', '廊坊', '沧州', '秦皇岛', '邯郸',
        '邢台', '张家口', '承德', '衡水', '大同', '阳泉', '长治', '晋城', '朔州', '晋中',
        '运城', '忻州', '临汾', '吕梁', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔',
        '巴彦淖尔', '乌兰察布', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳',
        '盘锦', '铁岭', '朝阳', '葫芦岛', '吉林', '四平', '辽源', '通化', '白山', '松原',
        '白城', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江',
        '黑河', '绥化', '镇江', '扬州', '泰州', '盐城', '连云港', '淮安', '宿迁', '湖州',
        '衢州', '舟山', '丽水', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆',
        '黄山', '滁州', '阜阳', '宿州', '六安', '亳州', '池州', '宣城', '莆田', '三明',
        '漳州', '南平', '龙岩', '宁德', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州',
        '吉安', '宜春', '抚州', '上饶', '枣庄', '东营', '潍坊', '济宁', '泰安', '威海',
        '日照', '临沂', '德州', '聊城', '滨州', '菏泽', '开封', '洛阳', '平顶山', '安阳',
        '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳',
        '周口', '驻马店', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州',
        '黄冈', '咸宁', '随州', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界',
        '益阳', '郴州', '永州', '怀化', '娄底', '韶关', '珠海', '汕头', '佛山', '湛江',
        '肇庆', '江门', '茂名', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞',
        '中山', '潮州', '揭阳', '云浮', '柳州', '桂林', '梧州', '北海', '防城港', '钦州',
        '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左', '自贡', '攀枝花', '泸州',
        '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安',
        '达州', '雅安', '巴中', '资阳', '六盘水', '遵义', '安顺', '毕节', '铜仁', '曲靖',
        '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '宝鸡', '咸阳', '铜川', '渭南',
        '延安', '汉中', '榆林', '安康', '商洛', '嘉峪关', '金昌', '白银', '天水', '武威',
        '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南', '西宁', '海东', '海北', '黄南',
        '海南', '果洛', '玉树', '海西', '拉萨', '日喀则', '昌都', '林芝', '山南', '那曲',
        '阿里', '银川', '石嘴山', '吴忠', '固原', '中卫', '乌鲁木齐', '克拉玛依', '吐鲁番', '哈密',
        // 县级市和重要县城
        '昆山', '江阴', '张家港', '常熟', '太仓', '慈溪', '义乌', '余姚', '诸暨', '温岭',
        '瑞安', '乐清', '海宁', '桐乡', '富阳', '临安', '建德', '平湖', '海盐', '德清',
        '长兴', '安吉', '嘉善', '平湖', '海宁', '桐乡', '淳安', '象山', '宁海', '奉化',
        '新昌', '嵊州', '武义', '浦江', '磐安', '兰溪', '东阳', '永康', '龙游', '江山',
        '常山', '开化', '岱山', '嵊泗', '玉环', '三门', '天台', '仙居', '文成', '泰顺',
        '洞头', '苍南', '平阳', '永嘉', '乐清', '瑞安', '龙港', '青田', '缙云', '遂昌',
        '松阳', '云和', '龙泉', '庆元', '景宁', '仙居', '天台', '三门', '玉环', '温岭',
        '临海', '黄岩', '路桥', '椒江', '玉环', '三门', '天台', '仙居', '永嘉', '平阳',
        '苍南', '文成', '泰顺', '洞头', '龙港', '瑞安', '乐清', '海盐', '海宁', '桐乡',
        '嘉善', '平湖', '德清', '长兴', '安吉', '新昌', '嵊州', '诸暨', '上虞', '越城',
        '柯桥', '上虞', '嵊州', '新昌', '诸暨', '柯桥', '越城', '上虞', '嵊州', '新昌',
        // 特别行政区
        '香港', '澳门', '台北'
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
    },
    filteredCities() {
      if (this.selectedLetter === 'all') {
        return this.cities;
      }
      // 简单的拼音首字母匹配（这里使用简化的方法，实际项目中可能需要更完整的拼音库）
      const pinyinMap = {
        'A': ['鞍山', '安庆', '安顺', '安康', '阿拉善', '阿里', '阿勒泰'],
        'B': ['北京', '包头', '宝鸡', '蚌埠', '北海', '保山', '巴彦淖尔', '白银', '百色'],
        'C': ['重庆', '成都', '长春', '长沙', '常州', '沧州', '赤峰', '长治', '巢湖', '滁州'],
        'D': ['大连', '东莞', '大庆', '大同', '丹东', '德州', '东营', '达州', '大理', '丹东'],
        'E': ['鄂尔多斯', '恩施', '鄂州'],
        'F': ['佛山', '福州', '抚顺', '阜新', '抚州', '防城港', '阜阳'],
        'G': ['广州', '贵阳', '桂林', '赣州', '贵港', '广元', '广安', '果洛'],
        'H': ['杭州', '哈尔滨', '合肥', '海口', '呼和浩特', '惠州', '湖州', '邯郸', '菏泽', '淮南',
              '淮安', '黄冈', '黄石', '衡阳', '葫芦岛', '呼伦贝尔', '海东', '海北', '黄南', '海南'],
        'J': ['济南', '吉林', '佳木斯', '嘉兴', '焦作', '景德镇', '九江', '荆门', '荆州', '嘉峪关', '金昌'],
        'K': ['昆明', '开封'],
        'L': ['兰州', '洛阳', '柳州', '廊坊', '辽阳', '连云港', '临沂', '聊城', '漯河', '泸州', '乐山',
              '拉萨', '丽江', '临沧', '六盘水', '陇南', '吕梁'],
        'M': ['绵阳', '马鞍山', '牡丹江', '梅州', '茂名', '眉山'],
        'N': ['南京', '南宁', '宁波', '南昌', '南通', '南阳', '南平', '宁德', '那曲'],
        'P': ['盘锦', '萍乡', '平顶山', '濮阳', '普洱', '平凉'],
        'Q': ['青岛', '齐齐哈尔', '泉州', '衢州', '秦皇岛', '黔西南', '黔南', '黔东南', '庆阳', '清远'],
        'R': ['日喀则'],
        'S': ['上海', '深圳', '沈阳', '石家庄', '苏州', '汕头', '绍兴', '三亚', '商丘', '宿迁', '宿州',
              '遂宁', '上饶', '山南', '石嘴山', '随州', '邵阳', '四平', '松原', '双鸭山', '绥化'],
        'T': ['天津', '太原', '唐山', '泰安', '台州', '通辽', '铁岭', '天水', '铜川', '铜陵', '通化',
              '铜仁', '吐鲁番', '塔城'],
        'W': ['武汉', '乌鲁木齐', '无锡', '温州', '潍坊', '威海', '芜湖', '乌海', '吴忠', '渭南',
              '武威', '梧州', '文山', '五家渠'],
        'X': ['西安', '厦门', '西宁', '徐州', '湘潭', '襄阳', '新乡', '许昌', '咸阳', '咸宁', '孝感',
              '信阳', '新余', '忻州', '锡林郭勒', '兴安', '湘西', '西双版纳'],
        'Y': ['银川', '烟台', '宜昌', '盐城', '扬州', '阳江', '云浮', '玉林', '营口', '延边', '运城',
              '榆林', '玉溪', '鹰潭', '宜春', '伊犁', '玉树', '阿里'],
        'Z': ['郑州', '珠海', '中山', '淄博', '漳州', '张家口', '镇江', '舟山', '株洲', '湛江', '肇庆',
              '张掖', '昭通', '资阳', '遵义', '中卫']
      };
      
      const citiesForLetter = pinyinMap[this.selectedLetter] || [];
      return this.cities.filter(city => citiesForLetter.includes(city));
    }
  },
  methods: {
    toggleCityList() {
      this.showCityList = !this.showCityList;
    },
    selectCity(city) {
      this.selectedCity = city;
      this.showCityList = false;
    },
    handleInputFocus() {
      // 输入框获得焦点时，不显示城市列表，允许键盘输入
      this.showCityList = false;
    },
    filterByLetter(letter) {
      this.selectedLetter = letter;
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
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  height: 32px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}
.input-with-btn input[type="text"]:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 3px rgba(255, 102, 0, 0.3);
}
.select-btn {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: #666;
  border: none;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}
.select-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
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
  
  .letter-buttons {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 10px;
    border-bottom: 1px solid #eee;
    gap: 5px;
  }
  
  .letter-btn {
    padding: 4px 8px;
    font-size: 11px;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #666;
  }
  
  .letter-btn:hover {
    background: #f0f0f0;
    border-color: #999;
    color: #333;
  }
  
  .letter-btn.active {
    background: #ff6600;
    border-color: #ff6600;
    color: white;
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
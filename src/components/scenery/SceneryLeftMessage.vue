<template>
  <div class="app-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar-box">
        <nav>
          <div 
            v-for="item in navItems" 
            :key="item.region" 
            class="nav-group"
            @mouseenter="handleRegionHover(item.region)"
            @mouseleave="handleRegionLeave"
          >
            <h3 class="region-title">{{ item.region }}</h3>
            <ul class="city-list">
              <li v-for="city in item.cities" :key="city">{{ city }}</li>
            </ul>
            <!-- 横向展开的子区域 -->
            <SceneryMessage 
              v-if="item.region === '国内（含港澳台）' && expandedRegion === item.region" 
              :subRegions="item.subRegions"
            />
          </div>
        </nav>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <main class="main-content">
      <div class="hero-image">
        <img src="https://picsum.photos/id/1043/1200/600" alt="山水景观" />
      </div>
      <div class="card-slider">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-img-wrapper">
            <img :src="card.image" :alt="card.title" />
            <span class="card-label" v-if="card.label">{{ card.label }}</span>
            <div class="card-overlay-text">
              <p class="card-title">{{ card.title }}</p>
              <p class="card-author">{{ card.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 底部圆形图标按钮 -->
    <div class="bottom-icon">
      <button class="circle-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SceneryMessage from './SceneryMessage.vue';

// 导航栏数据
const navItems = ref([
  { 
    region: '国内（含港澳台）', 
    cities: ['北京', '上海', '西湖', '成都'],
    subRegions: [
      { name: '直辖市', cities: ['北京', '上海', '天津', '重庆'] },
      { name: '港澳台', cities: ['香港', '澳门', '台北', '日月潭', '阿里山国家风景区', '高雄', '台中', '垦丁', '台南', '宜兰', '花莲', '太鲁阁', '桃园', '新北', '台东', '九份', '屏东', '新竹', '嘉义市'] },
      { name: '海南', cities: ['三亚', '南山文化旅游区', '海口', '三亚亚龙湾旅游度假区', '海花岛', '陵水', '西沙群岛', '万宁', '海南热带雨林国家公园', '三沙', '文昌', '琼海', '霸王岭', '海口观澜湖旅游度假区', '东方', '保亭', '澄迈', '昌江'] },
      { name: '浙江', cities: ['西湖', '杭州', '普陀山', '乌镇', '横店影视城', '千岛湖', '雁荡山', '南浔古镇', '仙都景区', '宁波', '朱家尖', '湖州', '莫干山', '舟山', '台州', '绍兴', '西塘', '温州', '安吉', '嘉兴'] },
      { name: '广东', cities: ['广州', '广州长隆旅游度假区', '深圳', '珠海', '珠海长隆旅游度假区', '南澳岛', '潮汕地区', '汕头', '惠州', '丹霞山', '佛山', '赤坎广东华侨博物馆', '白云山', '双月湾', '海陵岛', '潮州', '清远', '湛江', '东莞', '横琴岛'] },
      { name: '江苏', cities: ['南京', '苏州', '周庄', '无锡', '扬州', '徐州', '同里', '灵岩景区', '常州', '南山竹海', '连云港', '盐城', '南通', '淮安', '天目湖', '镇江', '宜兴', '泰州', '汤山', '溧阳'] },
      { name: '四川', cities: ['成都', '九寨沟', '峨眉山', '乐山大佛', '都江堰', '青城山', '稻城亚丁', '黄龙', '四姑娘山', '阆中古城', '三星堆遗址', '西昌', '泸沽湖', '色达', '甘孜州'] },
      { name: '云南', cities: ['昆明', '丽江', '大理', '西双版纳', '香格里拉', '玉龙雪山', '洱海', '泸沽湖', '普者黑', '元阳梯田', '石林', '抚仙湖', '腾冲', '瑞丽', '文山普者黑'] },
      { name: '湖南', cities: ['长沙', '张家界', '凤凰古城', '岳阳楼', '韶山', '衡山', '岳麓山', '洞庭湖', '崀山', '桃花源', '天门山', '芙蓉镇', '张家界国家森林公园'] },
      { name: '湖北', cities: ['武汉', '宜昌三峡', '恩施大峡谷', '武当山', '神农架', '黄鹤楼', '赤壁古战场', '荆州古城', '襄阳古城', '九宫山'] },
      { name: '河南', cities: ['郑州', '洛阳龙门石窟', '少林寺', '开封清明上河园', '云台山', '嵩山', '殷墟', '白马寺', '龙潭大峡谷', '红旗渠'] },
      { name: '山东', cities: ['济南', '青岛', '泰山', '烟台蓬莱阁', '威海', '曲阜三孔', '日照', '崂山', '刘公岛', '趵突泉'] },
      { name: '河北', cities: ['石家庄', '承德避暑山庄', '张家口', '北戴河', '野三坡', '山海关', '西柏坡', '清东陵', '白洋淀', '金山岭长城'] },
      { name: '山西', cities: ['太原', '五台山', '平遥古城', '云冈石窟', '壶口瀑布', '乔家大院', '王家大院', '悬空寺', '应县木塔', '绵山'] },
      { name: '陕西', cities: ['西安', '兵马俑', '华清宫', '大雁塔', '华山', '延安', '黄帝陵', '法门寺', '太白山', '乾陵'] },
      { name: '安徽', cities: ['合肥', '黄山', '九华山', '宏村', '西递', '天柱山', '琅琊山', '三河古镇', '绩溪龙川', '齐云山'] },
      { name: '福建', cities: ['厦门', '福州', '武夷山', '土楼', '泉州', '湄洲岛', '太姥山', '东山岛', '南靖土楼', '泰宁大金湖'] },
      { name: '江西', cities: ['南昌', '庐山', '三清山', '龙虎山', '井冈山', '婺源', '景德镇', '滕王阁', '武功山', '明月山'] },
      { name: '贵州', cities: ['贵阳', '黄果树瀑布', '西江千户苗寨', '镇远古城', '荔波小七孔', '梵净山', '织金洞', '马岭河峡谷', '肇兴侗寨', '万峰林'] },
      { name: '广西', cities: ['南宁', '桂林山水', '阳朔西街', '北海银滩', '德天瀑布', '龙脊梯田', '涠洲岛', '黄姚古镇', '通灵大峡谷', '巴马长寿村'] },
      { name: '辽宁', cities: ['沈阳', '大连', '鞍山千山', '丹东鸭绿江', '锦州笔架山', '本溪水洞', '金石滩', '老虎滩海洋公园', '盘锦红海滩'] },
      { name: '吉林', cities: ['长春', '吉林雾凇', '长白山', '延边朝鲜族自治州', '松花湖', '净月潭', '通化龙湾群', '集安高句丽遗址'] },
      { name: '黑龙江', cities: ['哈尔滨', '雪乡', '亚布力滑雪场', '五大连池', '镜泊湖', '漠河北极村', '大兴安岭', '扎龙自然保护区'] },
      { name: '内蒙古', cities: ['呼和浩特', '呼伦贝尔草原', '鄂尔多斯响沙湾', '阿尔山', '满洲里', '锡林郭勒草原', '额济纳胡杨林', '成吉思汗陵'] },
      { name: '宁夏', cities: ['银川', '沙湖', '沙坡头', '西夏王陵', '水洞沟', '贺兰山岩画', '六盘山', '镇北堡西部影城'] },
      { name: '甘肃', cities: ['兰州', '敦煌莫高窟', '嘉峪关', '张掖丹霞', '鸣沙山月牙泉', '麦积山石窟', '崆峒山', '拉卜楞寺'] },
      { name: '青海', cities: ['西宁', '青海湖', '茶卡盐湖', '塔尔寺', '门源油菜花', '格尔木', '可可西里', '三江源'] },
      { name: '西藏', cities: ['拉萨', '布达拉宫', '纳木错', '林芝', '日喀则', '珠穆朗玛峰', '雅鲁藏布大峡谷', '羊卓雍错'] },
      { name: '新疆', cities: ['乌鲁木齐', '喀纳斯', '吐鲁番', '天池', '伊犁那拉提草原', '喀什', '赛里木湖', '巴音布鲁克草原', '火焰山', '魔鬼城'] }
    ]
  },
  { region: '亚洲', cities: ['新加坡', '京都', '普吉岛', '东京'] },
  { region: '欧洲', cities: ['佛罗伦萨', '巴黎', '巴塞罗那', '罗马'] },
  { region: '非洲', cities: ['舍夫沙万', '桑给巴尔岛', '撒哈拉沙漠', '马赛马拉国家...'] },
  { region: '北美洲', cities: ['洛杉矶', '拉斯维加斯', '纽约', '华特迪士尼世界度假区'] },
  { region: '南美洲', cities: ['伊瓜苏国家公园(阿根廷)', '火地岛国家公园', '复活节岛'] },
  { region: '大洋洲', cities: ['墨尔本', '悉尼', '奥克兰', '皇后镇'] },
]);

// 当前展开的区域
const expandedRegion = ref('');

// 鼠标悬停时展开区域
const handleRegionHover = (region) => {
  if (region === '国内（含港澳台）') {
    expandedRegion.value = region;
  }
};

// 鼠标离开时收起区域
const handleRegionLeave = () => {
  expandedRegion.value = '';
};
// 卡片数据
const cards = ref([
  {
    image: 'https://picsum.photos/id/1036/400/300',
    label: '',
    title: '巴厘岛 | 总有一个假日，要...',
    author: '筱莲',
  },
  {
    image: 'https://picsum.photos/id/1039/400/300',
    label: '',
    title: '手绘琅勃拉邦 | 来日方长，...',
    author: 'Rinko咩咩',
  },
  {
    image: 'https://picsum.photos/id/1041/400/300',
    label: '',
    title: '成都在做，幸福在右，人间...',
    author: '林深Live',
  },
]);
</script>

<style scoped>
/* 更新文件内容以修复可能的编码或格式问题 */
.app-container {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

/* 左侧导航样式 */
.sidebar {
  width: 280px;
  padding: 20px;
  background: #fff;
  height: 100%;
  box-sizing: border-box;
}

.sidebar-box {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.nav-group {
  margin-bottom: 24px;
  position: relative;
}

.region-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  text-align: left;
}

.city-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.city-list li {
  padding: 4px 0;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
  font-size: 14px;
  white-space: nowrap;
}

.city-list li:hover {
  color: #000;
}

/* 右侧内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
  background: #ffffff;
  box-sizing: border-box;
}

.hero-image img {
  width: 100%;
  height: 565px;
  border-radius: 8px;
}

.card-slider {
  display: flex;
  overflow-x: auto;
  gap: 35px;
  margin-top: 20px;
  padding-bottom: 60px;
}

.card {
  min-width: 370px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  background: #fff;
  transition: transform 0.2s;
}



.card:hover {
  transform: translateY(-2px);
}

.card-img-wrapper {
  position: relative;
}

.card-img-wrapper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-label {
  position: absolute;
  top: 10px;
  left: 0;
  background: #ff672b;
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 0 4px 4px 0;
}

.card-img-wrapper {
  position: relative;
  height: 200px;
}

.card-overlay-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-author {
  font-size: 14px;
  color: white;
  margin: 0;
  opacity: 0.9;
}

/* 底部圆形图标按钮样式 */
.bottom-icon {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
}

.circle-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.circle-button:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.circle-button svg {
  width: 20px;
  height: 20px;
}
</style>
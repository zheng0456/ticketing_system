<template>
  <div class="scenery-message-view">
    <!-- 引入北京景点组件 -->
    <BeijingScenery />
  </div>
</template>

<script>
// 导入BeijingScenery组件
import BeijingScenery from '../components/scenery/scenerymessages/BeijingScenery.vue'

export default {
  name: 'SceneryMessageView',
  components: {
    // 注册引入的组件
    BeijingScenery
  },
  data() {
    return {
      // 可以在这里添加页面级别的数据
    }
  },
  methods: {
    // 可以在这里添加页面级别的方法
  },
  mounted() {
    // 页面挂载后的逻辑
    console.log('SceneryMessageView mounted');
  }
}
</script>

<style scoped>
.scenery-message-view {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
}
</style>
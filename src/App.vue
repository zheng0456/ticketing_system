<template>
  <div>
    <UserLogin msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import UserLogin from './components/login.vue'

export default {
  name: 'App',
  components: {
    UserLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0; /* 修改为0以去除顶部空白 */
}
</style>

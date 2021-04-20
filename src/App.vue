<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import login from "./views/user/login";
export default {
  name: "App",
  components: {
    login,
  },
};
</script>

<style lang="less">
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
</style>

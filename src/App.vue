<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import login from "./views/login";
export default {
  name: "App",
  components: {
    login,
  },
};
</script>

<style lang="less">
</style>

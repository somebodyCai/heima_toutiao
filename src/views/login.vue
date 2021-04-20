<template>
  <div class="login">
    登录
    <button @click="login(user)">点击登录</button>
  </div>
</template>

<script>
import { userlogin } from "../apis/heimaApi";
export default {
  // mounted(){
  // }
  methods: {
    async login(user) {
      try {
        let res = await userlogin(user);
        console.log(res);
        if (res.data.message == "登录成功") {
          localStorage.setItem("haimatoken", res.data.data.token);
          this.$router.push("index");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // login() {
    //   userlogin()
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  data() {
    return {
      user: {
        username: "admin",
        password: "1234",
      },
    };
  },
};
</script>

<style lang="less" scoped>
</style>
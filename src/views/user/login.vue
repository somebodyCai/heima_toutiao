<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hm_input
          v-model="user.username"
          placeholder="请输入手机号"
          :rules="/^1[35789]\d{9}$/"
          :msg="'请输入11位手机号'"
        ></hm_input>
        <hm_input
          v-model="user.password"
          placeholder="请输入密码"
          :msg="'请输入3-12位的密码'"
          :rules="/^.{3,12}$/"
        ></hm_input>
      </div>
      <p class="tips">
        没有账号?
        <a href="#/register" class="">去注册</a>
      </p>
      <heima_btn @click="login" btn_sty="danger">登录</heima_btn>
    </div>
  </div>
</template>

<script>
import heima_btn from "@/components/button.vue";
import hm_input from "@/components/hm_input.vue";
import { userlogin } from "@/apis/user.js";
export default {
  // mounted(){
  // }
  methods: {
    // async login(user) {
    //   try {
    //     let res = await userlogin(user);
    //     console.log(res);
    //     if (res.data.message == "登录成功") {
    //       console.log(user);
    //       localStorage.setItem("haimatoken", res.data.data.token);
    //       // this.$router.push("index");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    login(e) {
      if (
        /^1[35789]\d{9}$|^admin$/.test(this.user.username) &&
        /^.{3,12}$/.test(this.user.password)
      ) {
        userlogin(this.user)
          .then((res) => {
            if (res.data.message == "登录成功") {
              this.$toast.success("登录成功");
              localStorage.setItem("haimatoken", res.data.data.token);
              this.$router.push("index");
            } else {
              this.$toast(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.fail("登录失败");
          });
      }
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    heima_btn,
    hm_input,
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>
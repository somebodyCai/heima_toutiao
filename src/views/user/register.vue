<template>
  <div class="register">
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
          v-model="user.nickname"
          placeholder="请输入昵称"
          :msg="'请输入3-12位的密码'"
          :rules="/^.{3,12}$/"
        ></hm_input>
        <hm_input
          v-model="user.password"
          placeholder="请输入密码"
          :msg="'请输入3-12位的密码'"
          :rules="/^.{3,12}$/"
        ></hm_input>
      </div>
      <p class="tips">
        已有账号?
        <a href="#/login" class="">去登录</a>
      </p>
      <heima_btn btn_sty="success" @click.prevent="register">注册</heima_btn>
    </div>
  </div>
</template>

<script>
import { userRegister } from "@/apis/user";
import heima_btn from "@/components/button.vue";
import hm_input from "@/components/hm_input.vue";
export default {
  data() {
    return {
      user: {
        username: "13877665544",
        password: "123456",
        nickname: "cai",
      },
    };
  },
  components: {
    heima_btn,
    hm_input,
  },
  methods: {
    register() {
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^.{3,12}$/.test(this.user.password) &&
        this.user.nickname.length > 0
      ) {
        // console.log(this.user);
        userRegister(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message == "注册成功") {
              this.$toast.success(res.data.message);
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
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
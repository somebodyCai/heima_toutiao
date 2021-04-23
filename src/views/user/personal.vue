<template>
  <div class="personal">
    <router-link :to="'/edit_profile/' + id">
      <div class="profile">
        <img :src="userInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userInfo.gender == 1,
                iconxingbienv: userInfo.gender == 0,
              }"
            ></span
            >{{ userInfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hm_cell title="我的关注" desc="关注的用户"></hm_cell>
    <hm_cell title="我的跟帖" desc="跟帖/回复"></hm_cell>
    <hm_cell title="我的关注" desc="文章/视频"></hm_cell>
    <hm_cell title="设置"></hm_cell>
    <hm_button btn_sty="danger" style="margin-top: 20px">退出</hm_button>
  </div>
</template>

<script>
import hm_cell from "@/components/hm_cell";
import hm_button from "@/components/button";
import { getUserInfo } from "@/apis/user.js";
import axios from "@/utils/myaxios.js";
export default {
  components: {
    hm_cell,
    hm_button,
  },
  data() {
    return {
      userInfo: {},
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    getUserInfo(this.id)
      .then((res) => {
        // console.log(res);
        this.userInfo = res.data.data;
        this.userInfo.head_img =
          axios.defaults.baseURL + res.data.data.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
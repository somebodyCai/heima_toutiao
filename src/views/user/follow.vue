<template>
  <div class="follw">
    <hm_head title="我的关注">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_head>
    <div class="list">
      <div class="box" v-for="(value, index) in followList" :key="value.id">
        <img :src="value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="unFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import hm_head from "@/components/hm_header";
import { getUserFollows, unFollowUser } from "@/apis/user.js";
import axios from "@/utils/myaxios";
export default {
  components: {
    hm_head,
  },
  async mounted() {
    let res = await getUserFollows();
    console.log(res);
    this.followList = res.data.data;
    this.followList.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
  },
  data() {
    return {
      followList: [],
    };
  },
  methods: {
    async unFollow(id, index) {
      let res = await unFollowUser(id);
      this.$toast(res.data.message);
      this.followList.splice(index, 1);
    },
  },
};
</script>


<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
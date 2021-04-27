<template>
  <div class="comment">
    <!-- 顶部评论区 -->
    <hm_head title="精彩评论页">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_head>

    <!-- 渲染评论数组 v-for commentList: 所有评论数组对象-->
    <div class="item" v-for="value in commentList" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span @click="replayComment(value)">回复</span>
      </div>

      <!-- 单个评论块 -->
      <hm_commentItem
        v-if="value.parent"
        :parentComment="value.parent"
        @replay="replayComment"
      ></hm_commentItem>

      <div class="text">{{ value.content }}</div>
    </div>

    <!-- 底部评论区 -->
    <hm_commemtFooter
      :post="post"
      @refresh="refresh"
      :articleDetail="articleDetail"
      @unpublish="unpublish"
    ></hm_commemtFooter>
  </div>
</template>

<script>
import hm_head from "@/components/hm_header";
import hm_commemtFooter from "../components/hm_commentFooter";
import { getArtComment, getArticleDetail } from "@/apis/post.js";
import axios from "@/utils/myaxios.js";
import hm_commentItem from "@/components/hm_commentItem";
export default {
  components: {
    hm_head,
    hm_commentItem,
    hm_commemtFooter,
  },
  async mounted() {
    this.init();
  },
  data() {
    return {
      commentList: [], //所有评论列表
      axios,
      post: {}, //当前文章详情数组
      articleDetail: {}, //评论业务的中间变量
    };
  },
  methods: {
    refresh() {
      this.init();
      //回到顶部
      window.scrollTo(0, 0);
    },
    async init() {
      // 获取 id
      let id = this.$route.params.id;
      // 发送获取文章评论数据 用于动态渲染页面结构
      let res = await getArtComment(id);
      this.commentList = res.data.data;

      //获取文章详情信息，将获取到的文章详情对象传值给子组件
      let res2 = await getArticleDetail(id);
      this.post = res2.data.data;
    },
    replayComment(value) {
      // console.log(11);
      this.articleDetail = value;
    },
    // 监听子组件的事件，将 articleDetail 设置为空 null
    unpublish() {
      this.articleDetail = null;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>
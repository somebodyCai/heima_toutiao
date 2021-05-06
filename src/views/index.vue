<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="jump">
        <van-icon name="manager-o" />
      </div>
    </div>

    <van-tabs v-model="active" sticky swipeable>
      <van-tab
        :title="value.name"
        v-for="(value, index) in cateList"
        :key="value.id"
      >
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="200"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <article-vue
              v-for="value in value.artList"
              :key="value.id"
              :post="value"
            >
            </article-vue>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getArticleList } from "@/apis/post";
import articleVue from "@/components/article.vue";
export default {
  data() {
    return {
      active: localStorage.getItem("heimatoken") ? 1 : 0,
      cateList: [],
      // articleCate: [],
    };
  },
  // 当页面加载时加载栏目导航数据 与 默认栏目 --头条--的数据
  async mounted() {
    // 绑定点击事件 跳转到栏目管理
    document.querySelector(".van-sticky").onclick = (e) => {
      console.log(e.target.className);
      if (e.target.className.indexOf("van-sticky") != -1) {
        this.$router.push({ name: "manager" });
      }
    };

    //
    this.cateList = JSON.parse(localStorage.getItem("cateList")) || [];

    if (
      this.cateList.length == 0 &&
      localStorage.getItem("notPutListL") == null
    ) {
      let res = await getCateList();
      this.cateList = res.data.data;
    } else {
      this.cateList.unshift(
        { id: 999, name: "头条", is_top: 1 },
        { id: 0, name: "关注", is_top: 1 }
      );
    }
    // console.log(res);
    // 1.1对所有文章列表数据进行改造，添加一个空数组在每个列表属性中
    // 1.2 给每个栏目文章添加默认每页篇数 pageSize:6 以及添加默认显示页数 pageIndex:1

    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        artList: [],
        pageIndex: 1, //设置请求获取的文章页码 默认获取 第一页
        pageSize: 6, //设置一页显示显示的文章数目
        finished: false, //
        loading: false, //设置上拉加载状态 默认为false
        isLoading: false, //设下拉加载状态 默认为 false
      };
    });
    this.getArtList();
  },
  // 监听栏目索引的变化，通过索引对应数组的索引获取到数组的 id 发送请求
  watch: {
    async active() {
      // 3.当数栏目对应文章详情的数组中无数组时才发送 axios 请求
      if (this.cateList[this.active].artList.length == 0) {
        this.getArtList();
      }
    },
  },
  components: {
    articleVue,
  },
  methods: {
    async getArtList() {
      // 2.将请求获取到的栏目文章详情添加的对应空白格数组中
      let id = this.cateList[this.active].id;
      // 发送请求，将响应获取到的数据存在 artArr 数组中
      let artArr = (
        await getArticleList({
          category: id, //栏目 id 参数
          pageIndex: this.cateList[this.active].pageIndex, //设置页码参数
          pageSize: this.cateList[this.active].pageSize, //设置一页显示的文章数目
        })
      ).data.data;
      // 将获取到的新闻数据追加到当前栏目的数组中
      this.cateList[this.active].artList.push(...artArr);
      // 重置上拉状态
      this.cateList[this.active].loading = false;
      // 重置下拉状态
      this.cateList[this.active].isLoading = false;
      // 判断是否上拉加载完所有数据
      if (artArr.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
    onLoad() {
      this.cateList[this.active].pageIndex++;
      // 上拉后页码 加1 重新发送请求
      this.getArtList();
    },
    onRefresh() {
      // 页码重置
      this.cateList[this.active].pageIndex = 1;
      // 清空原有栏目的新闻数据
      this.cateList[this.active].artList.length = 0;

      // 将有可能加载完成的数据状态 修改为 false
      this.cateList[this.active].finished = false;
      // 发送 axios 请求
      this.getArtList();
    },
    // 点击个人中心页面跳转
    jump() {
      // 判断是否有id值
      let id = localStorage.getItem("heimaUserId");
      // 当id 存在正常跳转
      if (id) {
        this.$router.push({ path: "/personal/" + id });
      } else {
        this.$toast("未登录，请先登录!");
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: red;
    height: 50px;
    color: #fff;
    .logo {
      span {
        font-size: 50px;
      }
    }
    .search {
      height: 40px;
      background-color: rgba(255, 255, 255, 0.377);
      flex: 1;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user {
      font-size: 18px;
    }
  }
}
/deep/ .van-sticky {
  padding-right: 44px;
  &::after {
    content: "+";
    display: block;
    width: 44px;
    height: 44px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 36px;
    font-size: 30px;
    background-color: #fff;
  }
}
</style>
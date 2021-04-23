<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" />
      </div>
    </div>

    <van-tabs v-model="active" sticky swipeable>
      <van-tab
        :title="value.name"
        v-for="(value, index) in cateList"
        :key="value.id"
      >
        <article-vue
          v-for="value in value.artList"
          :key="value.id"
          :post="value"
        ></article-vue>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getArticleList } from "@/apis/post";
import articleVue from "../components/article.vue";
export default {
  data() {
    return {
      active: localStorage.getItem("haimatoken") ? 1 : 0,
      cateList: [],
      // articleCate: [],
    };
  },
  async mounted() {
    let res = await getCateList();
    this.cateList = res.data.data;
    // console.log(res.data.data);

    // 1.对所有文章列表数据进行改造，添加一个空数组在每个列表属性中
    this.cateList = this.cateList.map((v) => {
      return { ...v, artList: [] };
    });

    this.getList();
  },
  watch: {
    async active() {
      // console.log(this.cateList[this.active].artList.length);
      // 3.当只有时第一次点击栏目时，才发送请求
      if (this.cateList[this.active].artList.length == 0) {
        this.getList();
      }
    },
  },
  components: {
    articleVue,
  },
  methods: {
    async getList() {
      // console.log(this.cateList[this.active]);
      let id = this.cateList[this.active].id;
      let art = await getArticleList(id);
      // 2.当改变索引获取文章列表时，将请求获取到的文章添加到该栏目的对应空数组中
      this.cateList[this.active].artList = art.data.data;

      // console.log(this.cateList);
      // console.log((await getArticleList(id)).data.data);
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
</style>
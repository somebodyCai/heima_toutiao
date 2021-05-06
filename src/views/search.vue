<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p v-for="value in keyList" :key="value">
        <span @click="searchByKey(value)" class="wfle">{{ value }}</span>
        <span @click="removeHistory(value)" class="wid50">X</span>
      </p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{ path: `/articleDetail/${value.id}` }"
        v-for="value in searchList"
        :key="value.id"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { searchArticle } from "@/apis/post.js";
export default {
  data() {
    return {
      userKey: "",
      searchList: [],
      keyList: [],
    };
  },
  methods: {
    async onSearch() {
      let res = await searchArticle(this.userKey);
      this.searchList = res.data.data;
      console.log(res);
      //   let arr = [];
      let index = this.keyList.indexOf(this.userKey);
      if (index != -1) {
        this.keyList.splice(index, 1);
      }
      this.keyList.unshift(this.userKey);
      localStorage.setItem("searchKey", JSON.stringify(this.keyList));
    },
    searchByKey(value) {
      this.userKey = value;
      this.onSearch();
    },
    removeHistory(value) {
      let index = this.keyList.indexOf(value);
      this.keyList.splice(index, 1);
      localStorage.setItem("searchKey", JSON.stringify(this.keyList));
    },
  },
  mounted() {
    this.keyList = JSON.parse(localStorage.getItem("searchKey")) || [];
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  p {
    background: #eee;
    margin-bottom: 3px;
    padding: 5px;
    display: flex;
    justify-content: space-between;

    .wid50 {
      width: 20px;
    }
    .wfle {
      flex: 1;
    }
  }

  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>
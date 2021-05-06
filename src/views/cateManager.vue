<template>
  <div class="manager">
    <hm_head title="栏目管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_head>
    <div class="bot">
      <div class="top">
        <h3>点击删除栏目</h3>
        <div class="list">
          <span
            v-for="value in cateList"
            :key="value.id"
            @click="removeCate(value)"
            >{{ value.name }}</span
          >
        </div>
      </div>
      <div class="bottom">
        <h3>点击添加栏目</h3>
        <div class="list">
          <span
            v-for="value in notPutListL"
            :key="value.id"
            @click="removeC(value)"
            >{{ value.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hm_head from "@/components/hm_header.vue";
import { getCateList } from "@/apis/category.js";
export default {
  components: {
    hm_head,
  },
  async mounted() {
    this.cateList = JSON.parse(localStorage.getItem("cateList")) || [];
    this.notPutListL = JSON.parse(localStorage.getItem("notPutListL")) || [];

    if (this.cateList.length == 0 && this.notPutListL.length == 0) {
      // console.log(666);
      let res = await getCateList();
      this.cateList = res.data.data;
      // 判断是否有登录，有则移除前两项，无则移除第一项
      if (localStorage.getItem("heimatoken")) {
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }

    // 页面加载就发送请求获取数据
  },
  data() {
    return {
      cateList: [], //已添加的栏目
      notPutListL: [], //未添加的栏目
    };
  },
  methods: {
    // 点击删除栏目，cateList 中移除该项， notPutListL 中添加该项
    removeCate(value) {
      this.notPutListL.push(value);
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });

      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("notPutListL", JSON.stringify(this.notPutListL));
    },

    // 点击添加栏目 ，与点击删除栏目相反
    removeC(value) {
      this.cateList.push(value);
      this.notPutListL = this.notPutListL.filter((v) => {
        return v.id != value.id;
      });
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("notPutListL", JSON.stringify(this.notPutListL));
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  height: 40px;
}
.manager {
  .bot {
    padding: 15px;
  }
  .top,
  .bottom {
    margin-bottom: 30px;
    h3 {
      font-weight: 700;
      line-height: 40px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 22%;
        border: 1px solid #ccc;
        padding: 10px;
        font-size: 18px;
        margin: 5px;
        text-align: center;
      }
    }
  }
}
</style>
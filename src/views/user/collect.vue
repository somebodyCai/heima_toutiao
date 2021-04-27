<template>
  <div class="collect">
    <hm_head title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </hm_head>

    <article-vue v-for="value in artList" :key="value.id" :post="value">
    </article-vue>
  </div>
</template>

<script>
import hm_head from "@/components/hm_header";
import articleVue from "@/components/article.vue";
import { getCollArtList } from "@/apis/post.js";
export default {
  components: {
    hm_head,
    articleVue,
  },
  async mounted() {
    let res = await getCollArtList();
    console.log(res);
    this.artList = res.data.data;
  },
  data() {
    return {
      artList: [],
    };
  },
};
</script>

<style>
</style>
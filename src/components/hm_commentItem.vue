<template>
  <div class="commentItem">
    <!-- 递归组件 -->
    <commentItem
      v-if="parentComment.parent"
      :parentComment="parentComment.parent"
      @replay="replayCom"
    ></commentItem>

    <div class="top">
      <div class="left">
        <span>{{ parentComment.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <!--  -->
      <span @click="replayCom(parentComment)">回复</span>
    </div>

    <div class="bottom">{{ parentComment.content }}</div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: {
    parentComment: {
      type: Object,
    },
  },
  methods: {
    replayCom(v) {
      //
      console.log(v);
      this.$emit("replay", v);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>
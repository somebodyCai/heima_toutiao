<template>
  <div class="hmcell">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ desc }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.hmcell {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .right {
    color: #999;
  }
}
</style>
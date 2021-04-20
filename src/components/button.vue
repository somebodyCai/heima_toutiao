<template>
  <div class="button" style="background:">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgc: "red",
    };
  },
};
</script>

<style lang="less" scoped>
.button {
  background-color: #fff;
  .icon {
  }
}
</style>
<template>
  <div
    class="btn"
    @click="handlerClick"
    :class="{
      success: btn_sty == 'success',
      danger: btn_sty == 'danger',
      primary: btn_sty == 'primary',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgc: "red",
    };
  },
  methods: {
    handlerClick(e) {
      this.$emit("click", e);
    },
  },
  props: {
    btn_sty: {
      type: String,
    },
  },
};
</script>


<style lang="less" scoped >
.btn {
  width: 314 * 100vw/360;
  height: 50px;
  background-color: grey;
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto;
}
.success {
  background-color: rgb(34, 168, 21);
  color: #fff;
}
.danger {
  background-color: rgb(223, 50, 50);
  color: #fff;
}

.primary {
  background-color: rgb(41, 97, 216);
  color: #fff;
}
</style>

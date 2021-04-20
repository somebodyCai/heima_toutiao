<template>
  <input
    type="text"
    class="hm_input"
    @input="changeValue"
    :[clpro]="{ success: flag, error: !flag }"
    @blur="loss"
  />
</template>

<script>
export default {
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
      default: "输入错误",
    },
  },
  methods: {
    changeValue(e) {
      this.clpro = "class";
      let value = e.target.value;
      if (this.rules.test(value)) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      this.$emit("input", value);
    },
    loss(e) {
      let value = e.target.value;
      if (!this.rules.test(value)) {
        // alert(this.msg);
        this.$toast(this.msg);
      }
    },
  },
  data() {
    return {
      flag: "",
      clpro: "none",
    };
  },
};
</script>

<style lang="less" scoped>
.hm_input {
  width: 314 /360vw * 100;
  height: 50px;
  line-height: 50px;
  outline: none;
  border: 0;
  border-bottom: 2px solid #ccc;
  font-size: 20px;
}

.success {
  border-bottom: 2px solid rgb(16, 185, 67);
}
.error {
  border-bottom: 2px solid rgb(194, 22, 22);
}
</style>
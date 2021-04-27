<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span
        class="comment"
        @click="$router.push({ path: '/comment/' + post.id })"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{ post.comment_length }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        @click="collectArt"
        :class="{ active: post.has_star }"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model="content"></textarea>
      <div>
        <span @click="publish">发 送</span>
        <span @click="closeComment">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { collectArticle, publishComment } from "@/apis/post";

export default {
  data() {
    return {
      isFocus: false,
      content: "",
    };
  },
  methods: {
    async collectArt() {
      let id = this.post.id;
      let res = await collectArticle(id);
      this.post.has_star = !this.post.has_star;
      this.$toast(res.data.message);
      // console.log(res);
    },
    //发表评论
    async publish() {
      console.log(33334);
      // 获取当前评论的文章ID
      let id = this.post.id;
      // 获取文章内容
      let data = {
        content: this.content,
      };
      //当点击的的是回复评论内容时，将获取到父组件传值过来的内容，有内容时，发送该评论的id
      if (this.articleDetail) {
        data.parent_id = this.articleDetail.id;
      }
      // console.log(this.content);
      let res = await publishComment(id, data);
      console.log(res.data);
      // 1提示
      this.$toast.success(res.data.message);
      // 2.清空内容
      this.content = "";
      // 3.关闭评论输入框
      this.isFocus = false;
      // 4.刷新页面 告诉父组件进行刷新
      this.$emit("refresh");
    },
    // 点击取消按钮 关闭评论文本框 ，发出事件(父组件监听到该事件后，将传值过来的评论文章对象改为空 null)
    closeComment() {
      this.isFocus = !this.isFocus;
      this.$emit("unpublish");
    },
  },
  mounted() {
    // console.log(5555);
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    articleDetail: {
      type: Object,
    },
  },
  watch: {
    articleDetail() {
      // console.log(this.articleDetail,'子组件接收的数据');
      // console.log(8588);
      if (this.articleDetail) {
        this.isFocus = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  box-shadow: 1px 1px 5px #000;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 1px 1px 5px #000;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}

.active {
  color: red;
}
</style>
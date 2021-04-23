<template>
  <div class="edit">
    <hm_head title="编辑个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </hm_head>
    <div class="img_edit">
      <img :src="userInfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- 昵称 -->
    <hm_cell
      title="昵称"
      :desc="userInfo.nickname"
      @click.native="showDialog"
    ></hm_cell>
    <van-dialog
      v-model="showNick"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" label="昵称" placeholder="请输入用户名" />
    </van-dialog>

    <!-- 密码 -->
    <hm_cell title="密码" desc="***" @click.native="showPd"></hm_cell>
    <!-- 密码弹出窗开始 -->
    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
      :beforeClose="beforeClose"
    >
      <van-field
        v-model.trim="oldPassword"
        label="原密码"
        placeholder="请输入原密码"
      />
      <van-field
        v-model.trim="newPassword"
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>
    <!-- 密码弹出窗结束 -->

    <!-- 性别 -->
    <hm_cell
      title="性别"
      :desc="userInfo.gender == 1 ? '男' : '女'"
      @click.native="showGd"
    ></hm_cell>

    <!-- actionSheet -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import hm_head from "@/components/hm_header";
import hm_cell from "@/components/hm_cell.vue";
import { uploadFile } from "@/apis/uploadFile.js";
import { getUserInfo, updateUserInfo } from "@/apis/user.js";
import axios from "@/utils/myaxios";
export default {
  data() {
    return {
      userInfo: {},
      showNick: false,
      nickname: "",
      showPassword: false,
      newPassword: "",
      oldPassword: "",
      showGender: false,
      gender: "",
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  components: {
    hm_head,
    hm_cell,
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file.file);
      console.log(this.$route.params.id, "这是id");
      let fd = new FormData();
      fd.append("file", file.file);
      uploadFile(fd)
        .then((res) => {
          console.log(res);
          if (res.data.message == "文件上传成功") {
            this.userInfo.head_img = axios.defaults.baseURL + res.data.data.url;
            console.log("上传成功");
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDialog() {
      this.showNick = !this.showNick;
      this.nickname = this.userInfo.nickname;
    },
    editNickname() {
      // console.log(6666);
      let id = this.$route.params.id;
      // console.log(id);
      updateUserInfo(id, { nickname: this.nickname })
        .then((res) => {
          console.log(res);
          this.userInfo.nickname = this.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPd() {
      this.showPassword = !this.showPassword;
      this.newPassword = this.oldPassword = "";
    },
    editPassword() {
      // console.log(555);
      let id = this.$route.params.id;
      if (this.oldPassword != this.userInfo.password) {
        this.$toast("原密码错误");
      } else {
        if (/^.{3,16}$/.test(this.newPassword)) {
          if (this.oldPassword == this.newPassword) {
            this.$toast("原密码不能与新密码一样");
          } else {
            updateUserInfo(id, { password: this.newPassword })
              .then((res) => {
                console.log(res);
                // this.userInfo.nickname = this.nickname;
                this.$toast(res.data.message);
                this.userInfo.password = this.newPassword;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          this.$toast("请输入3-16位的新密码");
        }
      }
    },
    beforeClose(action, done) {
      console.log(action);
      if (action == "confirm") {
        if (
          this.oldPassword != this.userInfo.password ||
          !/^.{3,16}$/.test(this.newPassword)
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    showGd() {
      this.showGender = !this.showGender;
    },
    onSelect(item) {
      // console.log(999);
      console.log(item.name);
      let id = this.$route.params.id;
      let gender = item.name == "男" ? "1" : "0";
      if (gender != this.userInfo.gender) {
        updateUserInfo(id, { gender })
          .then((res) => {
            console.log(res);
            this.$toast.success(res.data.message);
            this.userInfo.gender = gender;
          })
          .catch((err) => {
            console.log(err);
            this.$toast("更新失败");
          });
      }
    },
  },
  mounted() {
    getUserInfo(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.userInfo = res.data.data;
        this.userInfo.head_img =
          axios.defaults.baseURL + this.userInfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.img_edit {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  img {
    width: 90px;
    height: 90px;
  }
  /deep/ .van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/ .van-uploader__upload {
    width: 90px;
    height: 90px;
  }
}
</style>
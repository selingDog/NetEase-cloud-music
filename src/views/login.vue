<template>
  <div class="login text-center">
    <h1 class="Bootstrap heading">请先登录</h1>
    <div class="input-group mb-3">
      <input
        class="form-control"
        type="tel"
        name=""
        id=""
        v-model="phone"
        placeholder="请输入手机号"
      />
    </div>
    <div class="input-group mb-3">
      <input
        class="form-control"
        type="tel"
        name=""
        id=""
        v-model="captcha"
        placeholder="请输入验证码"
      />
      <button @click="sentCaptcha()" class="btn">获取验证码</button>
    </div>
    <button @keyup.enter="keydown" @click="login()" class="btn loginBtn">
      登录
    </button>
  </div>
</template>

<script>
import "jquery/dist/jquery.min";
import "bootstrap/dist/css/bootstrap.css";
import store from "@/store/index";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      password: "",
      captcha: "",
      //   timestamp: new Date().getTime()
      infoUser: {},
    };
  },
  methods: {
    async sentCaptcha() {
      this.$axios
        .get(this.$store.state.path + "/captcha/sent?phone=" + this.phone)
        .then((res) => {
          console.log(res);
        });
    },
    checkCaptcha() {},
    login() {
      //   console.log(this.phone + this.password);
      this.$axios
        .get(
          this.$store.state.path +
            "/login/cellphone?phone=" +
            this.phone +
            "&captcha=" +
            this.captcha
        )
        .then((res) => {
          // console.log(res.data);
          let infoUser = res.data;
          if (res.data.code === 200) {
            this.$store.state.isLogin = true;
            this.$store.state.token = infoUser.token;
            window.sessionStorage.setItem("token", infoUser.token);
            window.sessionStorage.setItem("userId", infoUser.account.id);
            this.$router.push("/infoUser");
          } else {
          }
        });
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        //需要执行的登录方法
        this.login();
      }
    },
  },
  mounted() {
    //绑定事件
    window.addEventListener("keydown", this.keyDown);
  },
  //销毁事件
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 300px;
  margin: 0 auto;
  h1 {
    margin: 80px auto;
    color: #999;
  }
  .input-group {
    margin: 40px auto;
  }
  .form-control {
    border-radius: 37.33px;
    box-shadow: none;
  }
  .form-control:focus {
    // border-color: transparent;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .btn {
    border-radius: 37.33px;
    color: #fff;
    background-color: #ff3a3a;
  }
  .loginBtn {
    width: 300px;
    margin: 25px auto;
  }
}
</style>
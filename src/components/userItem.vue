<template>
  <div class="userItem">
    <div class="header_user">
      <div class="avatar">
        <img :src="userProfile.avatarUrl" width="70" height="70" />
      </div>
      <div class="nickname">
        <div class="nickname_text">{{ userProfile.nickname }}</div>
      </div>
      <div class="follow">
        <div>
          <span>{{ userProfile.follows }}</span
          >关注
        </div>
        <div>
          <span>{{ userProfile.followeds }}</span
          >粉丝
        </div>
        <div>
          Lv.<span>{{ userItem.level }}</span>
        </div>
      </div>
      <div
        style="
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
        "
      >
        <div class="tags">
          <div class="tag">IP属地：{{ userItem.provinceName }}</div>
          <div class="tag">{{ userItem.constellation }}</div>
          <div class="tag">
            {{ userItem.provinceName }} {{ userItem.cityName }}
          </div>
        </div>
        <div class="desc">
          <div class="desc-text">{{ userProfile.signature }}</div>
        </div>
        <!-- <div class="buttons" v-if="!userProfile.userId == loginId">
          <div class="follow-btn">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.32324 1.22303C7.32324 0.854843 7.02477 0.556366 6.65658 0.556366C6.28839 0.556366 5.98991 0.854843 5.98991 1.22303V5.55637H1.65641C1.28822 5.55637 0.989746 5.85484 0.989746 6.22303C0.989746 6.59122 1.28822 6.8897 1.65641 6.8897H5.98991V11.223C5.98991 11.5912 6.28839 11.8897 6.65658 11.8897C7.02477 11.8897 7.32324 11.5912 7.32324 11.223V6.8897H11.6564C12.0246 6.8897 12.3231 6.59122 12.3231 6.22303C12.3231 5.85484 12.0246 5.55637 11.6564 5.55637H7.32324V1.22303Z"
                fill="white"
              ></path></svg
            >关注
          </div>
          <div class="chat-btn">聊天</div>
        </div> -->
      </div>
    </div>
    <div class="content_user">
      <div
        class="logOut"
        @click="logOut()"
        v-if="userProfile.userId == loginId"
      >
        退出登录
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.userItem {
  background-color: #f2f2f2;
  overflow-x: hidden;
  overflow-y: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  .header_user {
    width: 100%;
    background: -webkit-linear-gradient(
        top,
        rgba(132, 99, 72, 0.3),
        rgba(132, 99, 72, 0.015)
      ),
      #fff;
    background: linear-gradient(
        180deg,
        rgba(132, 99, 72, 0.3),
        rgba(132, 99, 72, 0.015)
      ),
      #fff;
    border-radius: 0 0 2.66666667vw 2.66666667vw;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 24vw;
    padding-bottom: 4.26666667vw;
    .avatar {
      width: 18.66666667vw;
      height: 18.66666667vw;
      border-radius: 50%;
      overflow: hidden;
      background-color: #f2f2f2;
      -webkit-filter: drop-shadow(0 0 3.2vw rgba(0, 0, 0, 0.1));
      filter: drop-shadow(0 0 3.2vw rgba(0, 0, 0, 0.1));
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .nickname {
      min-height: 6.93333333vw;
      margin: 20px 0;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      font-size: 5.33333333vw;
      line-height: 6.4vw;
      color: #000;
    }
    .follow {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 3.33333333vw;
      & > div {
        padding: 0 2.66666667vw;
        position: relative;
        font-style: normal;
        font-size: 3.46666667vw;
        line-height: 4.26666667vw;
        color: #888;
      }
      & > div:not(:last-of-type):after {
        content: "";
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 0;
        height: 2.66666667vw;
        width: 0.5px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .tags {
      margin-top: 3.66666667vw;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      min-height: 5.86666667vw;
      .tag {
        height: 5.86666667vw;
        padding: 1.06666667vw 1.6vw;
        background: hsla(0, 0%, 100%, 0.8);
        border: 0.33px solid rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        border-radius: 1.6vw;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 3.46666667vw;
      }
      & > div:not(:first-of-type) {
        margin-left: 1.6vw;
      }
    }
    .desc {
      margin-top: 3.6vw;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      max-width: 77.33333333vw;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      overflow: hidden;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      .desc-text {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-style: normal;
        font-weight: 400;
        font-size: 3.46666667vw;
        line-height: 4.26666667vw;
        color: #000;
        opacity: 0.4;
      }
    }
    .buttons {
      margin-top: 5.8vw;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      .follow-btn {
        background: #ff3a3a;
        font-style: normal;
        color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
      .chat-btn {
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        color: #000;
        color: #333;
        margin-left: 1.6vw;
      }
      & > div {
        width: 21.33333333vw;
        height: 8vw;
        border-radius: 4vw;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
  }
  .content_user {
    .logOut {
      position: fixed;
      bottom: 20.06666667vw;
      left: 50%;
      transform: translateX(-50%);
      font-style: normal;
      font-weight: 500;
      font-size: 3.73333333vw;
      color: #fff;
      padding: 2.26666667vw 6.06666667vw;
      background: #ff3a3a;
      box-shadow: 0 1px 8vw rgba(0, 0, 0, 0.1);
      border-radius: 27.2vw;
    }
  }
}
</style>
<script>
export default {
  name: "userItem",
  data() {
    return {
      loginId: "",
    };
  },
  props: {
    userItem: {
      type: Object,
      default: () => ({}),
    },
    userProfile: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    checkId() {
      this.loginId = sessionStorage.getItem("userId");
      //   console.log(this.loginId);
    },
    logOut() {
      sessionStorage.clear();
      location.reload();
    },
  },
  created() {
    this.checkId();
  },
};
</script>
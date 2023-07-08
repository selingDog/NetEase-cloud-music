<template>
  <div class="playListDetail">
    <section class="header">
      <router-link to="/"
        ><div class="return">
          <svg
            t="1687427830694"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4867"
            width="20"
            height="20"
          >
            <path
              d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z"
              p-id="4868"
              fill="#ffffff"
            ></path>
          </svg></div
      ></router-link>
      <div class="header_bg">
        <img
          :src="imgDetail.coverImgUrl ? imgDetail.coverImgUrl : ''"
          alt=""
          width="100%"
          height="100%"
        />
      </div>

      <div class="header_wrap">
        <div class="header_fl">
          <img-item :item="imgDetail" :showHighQuality="false" />
          <span class="icon" v-if="imgDetail.highQuality">精品歌单</span>
          <span class="icon" v-if="!imgDetail.highQuality">歌单</span>
        </div>
        <div class="header_fr">
          <h2 class="header_title">{{ imgDetail.name }}</h2>
          <div class="user">
            <a
              class="user_link"
              :href="`//music.163.com/m/user?id=${user.userId}`"
            >
              <div class="user_img">
                <img
                  class="u_img"
                  :src="`${user.avatarUrl ? user.avatarUrl : ''}`"
                />
                <span
                  class="u_icon"
                  v-if="user.userType === 200 || user.userType === 207"
                ></span>
              </div>
              {{ user.nickname }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <div class="playlist">
      <h3 class="title">歌曲列表</h3>
      <music-list
        :musicList="playList"
        @aaa="$emit('bbb', $event)"
        :showOrder="true"
      />
    </div>
    <div class="commentList">
      <h3 class="title">精彩评论</h3>
      <comment-list :commentList="commentList" />
    </div>
    <div class="collect" style="height: auto">
      <div class="collect_wrap">
        <div style="flex: 1 1 12px; position: relative">
          <span
            @click="collect()"
            style="
              display: block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              border-radius: 40px;
              font-size: 18px;
              text-align: center;
              background: rgb(255, 58, 58);
              color: rgb(255, 255, 255);
            "
            >收藏歌单</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import musicList from "@/components/musicList.vue";
import imgItem from "@/components/imgItem.vue";
import commentList from "@/components/commentList.vue";
import userItem from "@/components/userItem.vue";
export default {
  name: "playListDetail",
  data() {
    return {
      playList: [],
      imgDetail: {
        picUrl: "",
      },
      user: {},
      commentList: {},
    };
  },
  components: {
    musicList,
    imgItem,
    commentList,
    userItem,
  },
  methods: {
    getPlayListDetail() {
      // console.log(this.$route.query.id);
      // console.log(this.$route.query.item);
      this.$axios
        .get(
          this.$store.state.path +
            "/playlist/track/all?id=" +
            this.$route.query.id +
            "&limit=10&offset=1"
        )
        .then((res) => {
          // console.log(res.data.songs);
          this.playList = res.data.songs.map((item, index) => {
            item.song = {
              //歌曲别名
              alias: item.alia,
              //歌曲码率
              privilege: res.data.privileges[index],
              //歌手
              artists: item.ar,
              //专辑
              album: item.al,
            };
            return item;
          });
          // console.log(this.playList);
        });
    },

    getImg() {
      // console.log(this.$route.query.id);
      // console.log(this.$route.query.item);
      this.$axios
        .get(
          this.$store.state.path + "/playlist/detail?id=" + this.$route.query.id
        )
        .then((res) => {
          //   console.log(res.data);
          this.imgDetail = res.data.playlist;
          this.imgDetail.picUrl = res.data.playlist.coverImgUrl;
          //   console.log(typeof this.imgDetail.userId);
          this.$axios
            .get(
              this.$store.state.path +
                "/user/detail?uid=" +
                this.imgDetail.userId
            )
            .then((res) => {
              //   console.log(this.imgDetail.userId);
              this.user = res.data.profile;
              // console.log(this.user);
            });
        });
    },

    // getUser() {
    //   this.$axios.get(this.path + "/user/detail?uid=82179192").then((res) => {
    //     console.log(this.imgDetail.userId);
    //     this.user = res.data.profile;
    //     console.log(this.user);
    //   });
    // },

    getComment() {
      this.$axios
        .get(
          this.$store.state.path +
            "/comment/playlist?id=" +
            this.$route.query.id
        )
        .then((res) => {
          // console.log(res.data);
          this.commentList = res.data;
          // console.log(this.commentList);
        });
    },
    collect() {
      this.$axios
        .get(
          this.$store.state.path +
            "/playlist/subscribe?t=1&id=" +
            this.$route.query.id
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
  created() {
    this.getPlayListDetail();
    this.getImg();
    // this.getUser();
    this.getComment();
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}
.playListDetail {
  .header {
    position: relative;
    padding: 35px 10px 30px 15px;
    margin-top: -40px;
    overflow: hidden;
    .return {
      position: absolute;
      //   background-color: #fff;
      z-index: 10;
      top: 5px;
      left: 5px;
    }
    .header_bg {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      -webkit-filter: blur(20px);
      filter: blur(20px);
      -webkit-transform: scale(1.5);
      -ms-transform: scale(1.5);
      transform: scale(1.5);

      &::after {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        content: " ";
        background-color: rgba(0, 0, 0, 0.25);
      }
    }
    .header_wrap {
      display: flex;
      position: relative;
      z-index: 2;
      .header_fl {
        width: 126px;
        height: 126px;
        position: relative;
        background-color: #e2e2e3;
        .icon {
          position: absolute;
          z-index: 3;
          top: 10px;
          left: 0;
          padding: 0 8px;
          height: 17px;
          color: #fff;
          font-size: 9px;
          text-align: center;
          line-height: 17px;
          background-color: rgba(217, 48, 48, 0.8);
          border-top-right-radius: 17px;
          border-bottom-right-radius: 17px;
        }
      }
      .header_fr {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        width: 1%;
        margin-left: 16px;
        padding-top: 3px;
        .header_title {
          padding-top: 1px;
          font-size: 17px;
          line-height: 1.3;
          color: #fefefe;
          height: 44px;
          display: -webkit-box;
          -webkit-box-pack: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .user {
          display: block;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          color: hsla(0, 0%, 100%, 0.7);
          font-size: 17px;
          .user_link {
            color: hsla(0, 0%, 100%, 0.7);
            font-size: 14px;
            .user_img {
              display: inline-block;
              width: 30px;
              height: 30px;
              vertical-align: middle;
              margin-right: 5px;
              position: relative;
              .u_img {
                width: 100%;
                border-radius: 50%;
              }
              .u_icon {
                position: absolute;
                right: -5px;
                bottom: 0;
                width: 12px;
                height: 12px;
                background-image: url(../assets/usericn_2x.png);
                background-repeat: no-repeat;
                background-size: 75px auto;
                background-position: -40px 0;
              }
            }
          }
        }
      }
    }
  }
  .collect {
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    .collect_wrap {
      padding: 11px 30px;
    }
  }
}
</style>


<template>
  <div id="app">
    <nav-view v-if="$route.meta.keepAlive" />
    <router-view class="view" @bbb="playdata" />
    <!-- 底部播放 -->
    <div class="play" v-show="currentMusic && $store.state.isFooterMusic">
      <div class="playLeft" @click="toggleFullScreen(true)">
        <img :src="`${this.musicPicUrl}`" alt="" v-if="this.musicPicUrl" />
        <div class="name">
          <div class="playmusicname">{{ currentMusic.name }}</div>
          <div class="playname">
            <span v-for="(artist, i) in singername.artists" :key="i">
              {{ artist.name }}
              <i v-if="i !== singername.artists.length - 1"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="playRight">
        <!-- 播放 -->
        <svg t="1687431588163" class="icon" viewBox="0 0 1048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="8353" width="30" height="30" @click="play" v-if="isbtnShow">
          <path
            d="M359.966106 800.470016 816.001126 543.319962l35.088998-22.936986-35.725005-21.89097L359.509197 239.925043l0.380006 71.140045 0 442.83L359.966106 800.470016zM414.601114 335.592038 733.773107 521.152 414.601114 706.715034 414.601114 335.592zM524.2752 0.018022C241.516134 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.735027 36.439962 216.958976 98.182042 301.539021l38.667981-40.257024C97.458176 699.231027 67.143168 609.159987 67.143168 512.005018c0-252.46505 204.668006-457.132032 457.132032-457.132032 252.45399 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.668006 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189965-80.534016l-34.539008 42.797978c83.15095 58.344038 184.438989 92.594995 293.728973 92.594995 282.755994 0 511.984026-229.220966 511.984026-511.976038C1036.258202 229.245952 807.03017 0.018022 524.2752 0.018022z"
            p-id="8354"></path>
        </svg>
        <!-- 暂停 -->
        <svg t="1687430901232" class="icon" viewBox="0 0 1048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1479" width="30" height="30" @click="play" v-else>
          <path
            d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
            p-id="1480"></path>
        </svg>
        <!-- 列表 -->
        <svg t="1687431964007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="7575" width="30" height="30" @click="isPlayListShow">
          <path
            d="M469.333333 149.333333a21.333333 21.333333 0 0 1 21.333334-21.333333h469.333333a21.333333 21.333333 0 0 1 0 42.666667H490.666667a21.333333 21.333333 0 0 1-21.333334-21.333334z m490.666667 362.666667H64a21.333333 21.333333 0 0 0 0 42.666667h896a21.333333 21.333333 0 0 0 0-42.666667z m0 384H64a21.333333 21.333333 0 0 0 0 42.666667h896a21.333333 21.333333 0 0 0 0-42.666667zM42.666667 384c0-23.626667 12.22-46.34 33.526666-62.32C96 306.84 121.953333 298.666667 149.333333 298.666667c23.333333 0 45.666667 5.946667 64 16.893333V64a21.333333 21.333333 0 0 1 42.666667-1.113333c0.74 14.14 3.52 35.48 12.553333 56.78 5.833333 13.753333 13.546667 25.613333 22.36 34.42a107.46 107.46 0 0 1 20.493334 18.78c12.6 14.853333 22.373333 33.566667 29.04 55.626666a21.333333 21.333333 0 0 1-40.84 12.346667C294.666667 224.666667 287.513333 210.666667 278.846667 200.466667a64.193333 64.193333 0 0 0-13.3-12 21.133333 21.133333 0 0 1-2.96-2.366667q-3.38-3.233333-6.586667-6.813333V384c0 23.626667-12.22 46.34-33.526667 62.32C202.666667 461.16 176.713333 469.333333 149.333333 469.333333s-53.333333-8.173333-73.14-23.013333C54.886667 430.34 42.666667 407.626667 42.666667 384z m42.666666 0c0 23.126667 29.333333 42.666667 64 42.666667s64-19.54 64-42.666667-29.333333-42.666667-64-42.666667-64 19.54-64 42.666667z"
            fill="#2c2c2c" p-id="7576"></path>
        </svg>
      </div>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${muiscId}.mp3`" loop></audio>
      <transition name="moveY">
        <fullScreen v-if="isFullScreen" @toggleFullScreen="toggleFullScreen" :music="currentMusic" :play="play"
          :isbtnShow="this.isbtnShow" :currentTime="this.currentTime" :duration="duration">
        </fullScreen>
      </transition>
      <!-- 播放列表 -->
      <div class="playList" v-if="playListShow">
        <div class="bofang">播放记录</div>
        <playList></playList>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import fullScreen from "./components/fullScreen.vue";
import navView from "./components/navView.vue";
import playList from "@/components/playList.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentMusic: "",
      isFullScreen: false,
      singername: "", //歌手名字
      muiscId: "", //音乐id
      musicPicUrl: "",
      isbtnShow: true, //播放按钮的显示
      detailShow: false, //弹出层显示
      currentTime: 0, //当前播放时间
      interVal: 0, //控制定时器
      duration: 0, //歌曲总时长
      playListShow: false,
    };
  },
  components: {
    navView,
    fullScreen,
    watch,
    playList,
  },
  computed: {
    ...mapState(['playList','playListTndex'])
  },
  methods: {
    isPlayListShow() {
      this.playListShow = !this.playListShow
    },
    playdata(music) {
      this.currentMusic = music;
      this.singername = music.song;
      // console.log(this.currentMusic);
      this.muiscId = music.id;
      this.musicPicUrl = music.song.album.picUrl;
      this.play();
    },
    toggleFullScreen(val) {
      this.isFullScreen = val;
    },
    play() {
      if (this.$refs.audio.paused) {
        // this.$refs.audio.play();
        this.$nextTick(function () {
          this.$refs.audio.play();
        });
        this.isbtnShow = false;
        this.updateTime(); //调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.isbtnShow = true;
        clearInterval(this.interVal); //清除定时器
      }
    },
    updateDetailShow() {
      this.detailShow = !this.detailShow;
    },
    updateCurrentTime(value) {
      //接收当前播放时间
      this.currentTime = value;
      // console.log(this.currentTime);
    },
    updateTime() {
      //触发器，返回当前播放时间
      // this.duration = this.$refs.audio.duration
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
        if (isNaN(this.duration) || !this.duration) {
          this.updateDuration();
        }
      }, 100);
    },
    updateDuration() {
      this.duration = this.$refs.audio.duration;
      // console.log(this.duration);
    },
  },
  watch: {
    muiscId() {
      //监听id值是否发生变化
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //判断状态，改变图标
        this.isbtnShow = false;
      }
      // console.log(this.isbtnShow);
    },
  },
  mounted() {
    console.log(this.$refs);
    // this.updateTime();
    // this.updateDuration();
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  .view {
    margin-top: 40px;
    margin-bottom: 50px;
  }

  .play {
    width: 100%;
    height: 36px;
    position: fixed;
    bottom: 0;
    background-color: #fcfdff;
    z-index: 100;
    // border-top: 1px solid #999;
    display: flex;
    padding: 10px;
    justify-content: space-between;

    .playList {
      width: 100%;
      height: 50%;
      z-index: 101;
      background-color: #dfdddd;
      position: fixed;
      bottom: 57px;
      left: 0;
      overflow: scroll;

    }

    .playLeft {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        width: 160px;
        align-items: center;
        word-break: break-all;
        margin-left: 20px;

        .playmusicname {
          height: 21px;
          white-space: nowrap;
          overflow: hidden;
          font-size: 17px;
          font-weight: bold;
          color: #474751;
        }

        .playname {
          height: 16.4px;
          white-space: nowrap;
          overflow: hidden;
          font-size: 13px;
          color: #474751;
        }
      }
    }

    .playRight {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 15px;
    }
  }

  .moveY-enter-active,
  .moveY-leave-active {
    transition: all 0.3s linear;
  }

  .moveY-enter,
  .moveY-leave-to {
    transform: translateY(100%);
  }

  .moveY-enter-to,
  .moveY-leave {
    transform: translateY(0);
  }
}
</style>

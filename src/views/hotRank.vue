<template>
  <div class="hotRank">
    <!-- 头部标题 -->
    <div class="hotop">
      <div class="hotopct">
        <div class="hoticon"></div>
        <div class="hottime">更新时间： {{ hotTime }}</div>
      </div>
    </div>

    <music-list
      :showNum="true"
      @aaa="$emit('bbb', $event)"
      :musicList="showLists"
    />

    <div class="loading" ref="loading">
      {{ loadingText }}
    </div>
  </div>
</template>

<script>
import musicList from "../components/musicList.vue";

export default {
  name: "hotRank",
  data() {
    return {
      hotSongList: [],
      page: 1,
      isFinish: true,
      loadingText: "加载更多...",
      hotTime: "",
    };
  },
  components: {
    musicList,
  },
  methods: {
    getHotSong() {
      this.$axios
        .get(this.$store.state.path + "/playlist/detail?id=3778678")
        .then((res) => {
          // console.log(res.data.playlist.tracks);
          this.hotSongList = res.data.playlist.tracks.map((item, index) => {
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

          // console.log(this.hotSongList);
        });
    },

    getHotTime() {
      let aData = new Date();
      // console.log(aData) //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)

      this.hotTime =
        (aData.getMonth() + 1 < 9
          ? "0" + (aData.getMonth() + 1)
          : aData.getMonth() + 1) +
        "月" +
        (aData.getDate() < 9 ? "0" + aData.getDate() : aData.getDate()) +
        "日";
      // console.log(this.hotTime)
    },

    scrollBottomRefresh() {
      // console.log(this.$refs.loading.offsetTop);
      // console.log(this.$refs.loading.offsetHeight);
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (
        this.$refs.loading.offsetTop + this.$refs.loading.offsetHeight <=
        scrollTop + window.innerHeight + 5
      ) {
        if (this.page >= this.hotSongList.length / 20) {
          this.loadingText = "已经被榨干了，没数据了...";
          return;
        }
        if (this.isFinish) {
          this.isFinish = false;
          this.loadingText = "数据请求中...";

          setTimeout(() => {
            this.page++;
            this.isFinish = true;
            this.loadingText = "加载更多...";
          }, 1500);
        }
      }
    },
  },
  created() {
    this.getHotSong();
    this.getHotTime();
  },
  computed: {
    showLists() {
      let end = this.page * 20;
      return this.hotSongList.slice(0, end);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.scrollBottomRefresh);
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollBottomRefresh);
  },
};
</script>

<style lang="scss" scoped>
.hotRank {
  .hotop {
    position: relative;
    width: 100vw;
    height: calc(292 / 750 * 100vw);
    background: url(../assets/hot_music_bg_2x.jpg) no-repeat;
    background-size: contain;
    .hotopct {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;
      .hoticon {
        width: 142px;
        height: 67px;
        background: url(../assets/index_icon_2x.png) no-repeat;
        background-position: -24px -30px;
        background-size: 166px 97px;
      }
      .hottime {
        margin-top: 10px;
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        -webkit-transform: scale(0.91);
        -ms-transform: scale(0.91);
        transform: scale(0.91);
        -webkit-transform-origin: left top;
        -ms-transform-origin: left top;
        transform-origin: left top;
      }
    }
  }
  .loading {
    font-size: 14px;
    text-align: center;
    color: #888;
    padding: 10px 0;
  }
}
</style>
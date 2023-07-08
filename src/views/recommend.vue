<template>
  <div class="recommend">
    <div class="remd_tltle">
      <title-border>编辑推荐</title-border>
      <span class="change" @click="change()"
        >换一批
        <svg
          t="1687426479392"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3275"
          id="mx_n_1687426479393"
          width="20"
          height="20"
        >
          <path
            d="M508.66015625 821.90234375c-41.66015625 0-82.00195313-8.17382813-120.05859375-24.2578125-36.73828125-15.55664063-69.69726563-37.79296875-97.99804688-66.09375s-50.53710938-61.25976563-66.09374999-97.99804688c-16.08398438-38.05664063-24.2578125-78.3984375-24.2578125-120.05859374s8.17382813-82.00195313 24.2578125-120.05859375c15.55664063-36.73828125 37.79296875-69.69726563 66.09375-97.99804688s61.25976563-50.53710938 97.99804687-66.09375c38.05664063-16.08398438 78.3984375-24.2578125 120.05859375-24.2578125 66.18164063 0 129.28710938 20.65429688 182.4609375 59.765625 4.39453125 3.25195313 8.87695313 6.6796875 13.09570313 10.1953125 10.10742188 8.34960938 11.6015625 23.29101563 3.25195312 33.3984375s-23.29101563 11.6015625-33.3984375 3.25195313c-3.60351563-2.98828125-7.3828125-5.88867188-11.07421875-8.61328125-45-33.046875-98.34960938-50.53710938-154.3359375-50.53710938-143.87695313 0-260.94726563 117.0703125-260.94726563 260.94726563s117.0703125 260.94726563 260.94726563 260.94726562 260.94726563-117.0703125 260.94726563-260.94726563c0-13.09570313 10.63476563-23.73046875 23.73046874-23.73046874s23.73046875 10.63476563 23.73046875 23.73046875c0 41.66015625-8.17382813 82.00195313-24.2578125 120.05859374-15.55664063 36.73828125-37.79296875 69.69726563-66.09374999 97.99804688s-61.25976563 50.53710938-97.99804688 66.09375c-37.96875 16.08398438-78.3984375 24.2578125-120.05859375 24.2578125z"
            p-id="3276"
            fill="#8a8a8a"
          ></path>
          <path
            d="M581.609375 348.875c-10.72265625 0-20.390625-7.29492188-23.02734375-18.19335938-3.07617188-12.74414063 4.74609375-25.57617188 17.49023438-28.65234374l92.63671874-22.32421876-11.42578125-102.56835937c-1.49414063-13.0078125 7.91015625-24.78515625 20.91796875-26.19140625 13.0078125-1.49414063 24.78515625 7.91015625 26.19140625 20.91796875l13.7109375 123.3984375c1.31835938 11.86523438-6.41601563 22.93945313-18.01757812 25.6640625l-113.02734375 27.24609375c-1.7578125 0.43945313-3.60351563 0.703125-5.44921875 0.703125z"
            p-id="3277"
            fill="#8a8a8a"
          ></path>
        </svg>
      </span>
    </div>

    <div class="remd-lists">
      <div
        class="remd-list"
        v-for="item in recommendItems"
        :key="item.id"
        @click="goPlayList(item.id)"
      >
        <img-item :item="item" :showHighQuality="item.highQuality" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>

    <title-border>最新音乐</title-border>
    <div class="musicLists">
      <music-list @aaa="$emit('bbb', $event)" :musicList="newSongs" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  .remd_tltle {
    display: flex;
    justify-content: space-between;
    .change {
      color: #8a8a8a;
      font-size: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .remd-lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .remd-list {
      width: 33%;
      margin-bottom: 16px;
      name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0 6px;
        min-height: 30px;
        line-height: 1.2;
        font-size: 13px;
      }
    }
  }
}
</style>


<script>
import titleBorder from "../components/tilteBorder.vue";
import imgItem from "../components/imgItem.vue";
import musicList from "../components/musicList.vue";
export default {
  name: "recommend",
  data() {
    return {
      path: "https://apis.netstart.cn/music/",
      //推荐音乐
      recommendList: [],
      recommendItems: [],

      //新音乐
      newSongs: [],
    };
  },
  methods: {
    getRecommendList() {
      this.$axios.get(this.$store.state.path + "/personalized").then((res) => {
        // console.log(res.data.result);
        this.recommendList = res.data.result;
        this.recommendItems = this.recommendList.slice(6, 12);
      });
    },

    getNewsSongs() {
      this.$axios
        .get(this.$store.state.path + "/personalized/newsong")
        .then((res) => {
          // console.log(res.data.result);
          this.newSongs = res.data.result;
          // console.log(this.newSongs);
        });
    },

    goPlayList(id) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },

    /* 换一换*/
    change() {
      this.recommendItems = this.getRandomArrayElements(this.recommendList, 6);
    },
    /* 随机获取数组中的数据*/
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
  },
  created() {
    this.getRecommendList();
    this.getNewsSongs();
  },
  components: {
    titleBorder,
    imgItem,
    musicList,
  },
};
</script>
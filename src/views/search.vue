<template>
  <div>
    <div class="search">
      <div class="icon">
        <i class="searchicon"></i>
        <input
          type="text"
          placeholder="搜索歌曲、歌手"
          class="input"
          v-model="keywords"
          @keydown.enter="searchResult"
          @input="inputFn"
        />
        <figure class="closeicon" @click="toclose"></figure>
      </div>
      <div class="searchresult">
        <musicList
          :musicList="searchSongs"
          @aaa="$emit('bbb', $event)"
          v-if="isresult"
        ></musicList>
        <div class="loading" ref="loading" v-show="!show" v-if="!isShow">
          {{ loadingText }}
        </div>
      </div>
    </div>
    <div class="hot-search" v-if="isShow">
      <div class="title">热门搜索</div>
      <div class="wrapper">
        <div
          class="item"
          v-for="(item, index) in hots"
          :key="index"
          @click="tosearch(item.first)"
        >
          {{ item.first }}
        </div>
      </div>
    </div>
    <div class="search-list" v-if="!isShow" v-show="show">
      <div class="name">搜索"{{ keywords }}"</div>
      <div
        class="info"
        v-for="item in lists"
        :key="item.keyword"
        @click="tosearch(item.keyword)"
      >
        {{ item.keyword }}
      </div>
      <div>{{ info }}</div>
    </div>
    <!-- <searchhistory></searchhistory> -->
    <div class="searchhistory" v-if="isShow">
      <div class="title">搜索历史:</div>
      <ul>
        <li
          class="item"
          v-for="(item, index) in historyList"
          :key="index"
          @click="tosearch(item)"
        >
          {{ item }}
          <figure class="close-box" @click="del">
            <i class="close"></i>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import searchhistory from '@/components/searchhistory.vue';
import musicList from "@/components/musicList.vue";
export default {
  name: "search",
  // props:{
  //     keywords:{
  //         type:mobile,
  //         default:()=>{

  //         },
  //     },
  // },
  data() {
    return {
      keywords: "",
      searchSongs: [],
      hots: [],
      isShow: true,
      lists: [],
      info: "",
      isresult: true,
      show: true,
      historyList: [],
      loadingText: "加载更多...",
      page: 1,
      //请求是否结束
      isFinish: true,
      // keywordsList:[],
    };
  },

  //挂载前，把JSON规则的字符串转换成JSONObject
  // mounted(){
  //     if(JSON.parse(localStorage.getItem("historyList"))){
  //         this.historyList=JSON.parse(localStorage.getItem("historyList"));
  //     }
  // },
  created() {
    this.hotSearch();
    this.getSearch();
    // this.historyList=localStorage.getItem('keywords');
    // this.historyList=this.historyList.split(',');
  },
  components: {
    musicList,
    // searchhistory,
  },
  methods: {
    searchResult() {
      // let keywords=localStorage.getItem('keywords');
      console.log(this.keywords);
      this.$axios
        .get(
          "https://apis.netstart.cn/music/cloudsearch?keywords=" + this.keywords
        )
        .then((res) => {
          // console.log(res.data);
          // this.searchSongs=res.data.result
          // console.log(res.data.result.songs);
          if (res.data.result.songs) {
            this.searchSongs = res.data.result.songs.map((item) => {
              item.song = {
                //歌曲别名
                alias: item.alia,
                //歌曲码率
                privilege: item.privilege,
                //歌手
                artists: item.ar,
                //专辑
                album: item.al,
              };
              //把处理好的数据返回出去
              return item;
            });
            this.show = false;
            // localStorage.setItem("keywordsList",JSON.stringify(this.keywordsList));
            // this.keywords="";
          }
          this.history();
          // console.log(this.searchSongs);
        });
    },
    scrollBottomRefresh() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (
        this.$refs.loading.offsetTop + this.$refs.loading.offsetHeight <=
        scrollTop + window.innerHeight + 5
      ) {
        console.log("触底了！！");
        if (this.page >= this.searchSongs.length / 20) {
          this.loadingText = "已经到底啦！";
          return;
        }
        // 这里只是模拟后台请求，请求是异步的，是需要时间的，并且如果限定时间内，只能请求一次（之前的数据请求还没有完成）
        if (this.isFinish) {
          this.isFinish = false;
          this.loadingText = "数据请求中";
          setTimeout(() => {
            // this.isFinish=false;
            this.page++;
            this.isFinish = true;
            this.loadingText = "加载更多...";
          }, 1500);
        }
      }
    },
    history() {
      this.historyList.push(this.keywords.toString());
      this.historyList = Array.from(new Set(this.historyList));
      // this.historyList=this.unique(this.historyList);
    },
    hotSearch() {
      this.$axios
        .get("https://apis.netstart.cn/music/search/hot")
        .then((res) => {
          console.log(res.data);
          this.hots = res.data.result.hots;
        });
    },
    async getSearch() {
      await this.$axios
        .get(
          "https://apis.netstart.cn/music/search/suggest?keywords=" +
            this.keywords +
            "&type=mobile"
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.result) {
            this.lists = res.data.result.allMatch;
            this.info = "";
          } else {
            this.lists = [];
            this.info = "查无数据";
          }
        });
      // console.log(res.data);
    },
    tosearch(val) {
      this.keywords = val;
      this.searchResult(val);
    },
    toclose() {
      this.keywords = "";
      this.inputFn(this.keywords);
    },
    // addhistory(keywords){
    //     this.historyList=localStorage.getItem('keywords');
    // }
    async inputFn() {
      if (this.keywords.length === 0) {
        this.searchSongs = [];
        return;
      }
    },
    del(val) {
      const index = this.historyList.findIndex((item) => item === val);
      this.historyList.splice(index, 1);
      // this.historyList.item='';
    },
  },
  computed: {
    showLists() {
      let end = this.page * 20;
      return this.searchSongs.slice(0, end);
    },
  },
  //在页面渲染完毕后进行滚动事件监听
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.scrollBottomRefresh);
    });
  },
  destroyed() {
    //在组件销毁前，移除事件监听
    window.removeEventListener("scroll", this.scrollBottomRefresh);
  },

  watch: {
    keywords(keywords) {
      // if(keywords===""){
      //     this.result=false;
      // }
      if (keywords) {
        // this.searchResult(keywords);
        this.isShow = false;
        //   this.result=false;
        this.getSearch(keywords);
      } else {
        this.isShow = true;
        //   this.show=false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 15px;
  border-bottom: 1px solid #eee;
  .loading {
    text-align: center;
    color: #888;
    padding: 10px 0;
  }

  .icon {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 15px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    .searchicon {
      width: 13px;
      height: 13px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
    }
    .closeicon {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
      vertical-align: middle;
      position: absolute;
      right: 8px;
      top: 9px;
      line-height: 28px;
      text-align: center;
    }

    //display:flex;
    .input {
      border: 0;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      background: rgb(235 236 236);
      height: 30px;
      line-height: 18px;
      border-radius: 50px;
      padding-left: 10px;
    }
  }
}
.hot-search {
  padding: 15px 10px 0;
  .title {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  .wrapper {
    margin: 10px 0 7px;
    .item {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid #d3d4da;
      border-radius: 32px;
    }
  }
}
.search-list {
  .name {
    color: red;
    padding-left: 10px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
  }
  .info {
    line-height: 45px;
    height: 45px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
  }
}
.searchhistory {
  padding: 15px 10px 0;
  .title {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }
  .item {
    display: flex;
    height: 45px;
    align-items: center;
    margin-left: 25px;
    position: relative;
    .close-box {
      flex: 0 0 auto;
      width: 32px;
      height: 32px;
      line-height: 32px;
      position: absolute;
      right: 5px;
      .close {
        width: 12px;
        height: 12px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
        display: inline-block;
        vertical-align: middle;
        background-position: 0 0;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
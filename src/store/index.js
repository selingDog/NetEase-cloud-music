import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: "https://apis.netstart.cn/music",
    isLogin: false,
    isFooterMusic: false,
    token: "",
    playList: [],
    playListTndex: 0,//默认下标
  },
  getters: {
  },
  mutations: {
    updatePlayList(state, value) {
      state.playList.unshift(value)
      console.log(state.playList);
    },
    updatePlayListTndex(state, value) {
      state.playListTndex = value
      console.log(state.playListTndex);
    }
  },
  actions: {
  },
  modules: {
  },
})

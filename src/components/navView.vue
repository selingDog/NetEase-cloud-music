<template>
  <div class="navView">
    <router-link to="/"><span>推荐音乐</span></router-link>
    <router-link to="/hotRank"><span>热歌榜</span></router-link>
    <router-link to="/search"><span>搜索</span></router-link>
    <router-link to="/infoUser"><span>我的</span></router-link>
  </div>
</template>


<style lang="scss" scoped>
.navView {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background: #fff;

  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(247, 244, 244);
  box-sizing: border-box;
  a {
    flex: 1;
    text-align: center;
    font-size: 15px;
    text-decoration: none; /* 去除默认的下划线 */
    outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
    color: #000; /* 去除默认的颜色和点击后变化的颜色 */
    span {
      height: 40px;
      display: inline-block;
      padding: 0 5px;
      box-sizing: border-box;
    }

    &.router-link-exact-active {
      color: #dd001b;
      border-bottom: 1px solid #dd0018;
    }
  }
}
</style>
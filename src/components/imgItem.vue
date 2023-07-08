<template>
  <div class="imgItem">
    <img :src="item.picUrl" alt="" />
    <!-- 播放次数 -->
    <div class="playCount">{{ item.playCount | formatCount }}</div>

    <i class="remd_high" v-if="showHighQuality"></i>
  </div>
</template>
<script>
export default {
  name: "imgItem",
  props: {
    item: {
      type: Object,
      default: [],
    },
    showHighQuality: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    formatCount(val) {
      if (val < 10000) {
        return val;
      } else {
        return (val / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.imgItem {
  position: relative;
  img {
    width: 100%;
    display: block;
  }
  .playCount {
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 12px;
    color: #fff;

    &::before {
      content: "";
      width: 11px;
      height: 10px;
      display: inline-block;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
    }
  }
  .remd_high {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    width: 20px;
    height: 20px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjZTBhNjVhIiBkPSJNNjAgMEgwdjYwTDYwIDAiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMjQuODQxIDEyLjMybDMuNTQ0IDQuOTYyLTExLjEgMTEuMS00Ljg1My0zLjQ2NiAyLjI3OS0uMjQ4IDIuMDU0LS4yMjQtLjI5MS0yLjA0Ni0uOTM1LTYuNTg0IDYuNjkyLjk1IDIuMDEuMjg2LjI1NS0yLjAxLjM0Ny0yLjcxOW0tMS4zNDItNS4zMmwtLjk4NiA3Ljc4Ny05LjMyOC0xLjMyNSAxLjMwOSA5LjIyLTcuNDk0LjgxNiAxMC40OTkgNy41TDMxIDE3LjUgMjMuNTAxIDcuMDAxeiIvPjxwYXRoIGQ9Ik0xMi42MjUgMTEuMjVjLjc1OCAwIDEuMzc1LjYxNyAxLjM3NSAxLjM3NWExLjM3NiAxLjM3NiAwIDAgMS0yLjc1IDBjMC0uNzU4LjYxNy0xLjM3NSAxLjM3NS0xLjM3NW0wLTJhMy4zNzQgMy4zNzQgMCAxIDAtLjAwMSA2Ljc0OSAzLjM3NCAzLjM3NCAwIDAgMCAuMDAxLTYuNzQ5eiIvPjwvZz48L3N2Zz4=)
      0 no-repeat;
    background-size: contain;
  }
}
</style>
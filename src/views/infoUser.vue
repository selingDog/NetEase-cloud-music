<template>
  <div class="infoUser">
    <user-item :userItem="user" :userProfile="user.profile" />
  </div>
</template>

<script>
import userItem from "../components/userItem.vue";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "infoUser",
  data() {
    return {
      user: {
        cityName: "",
        provinceName: "",
        constellation: "",
      },
    };
  },
  components: {
    userItem,
  },
  methods: {
    getInfoUser() {
      this.$axios
        .get(
          this.$store.state.path +
            "/user/detail?uid=" +
            sessionStorage.getItem("userId")
        )
        .then((res) => {
          this.user = res.data;
          this.user.cityName = CodeToText[this.user.profile.city];
          this.user.provinceName = CodeToText[this.user.profile.province];
          if (this.user.profile.signature == "") {
            this.user.profile.signature = "这家伙很懒···";
          }
          let month = new Date(this.user.profile.birthday).getMonth() + 1;
          let date = new Date(this.user.profile.birthday).getDate();
          // console.log(month);
          // console.log(date);
          var constellation = [
            "魔羯座",
            "水瓶座",
            "双鱼座",
            "牡羊座",
            "金牛座",
            "双子座",
            "巨蟹座",
            "狮子座",
            "处女座",
            "天秤座",
            "天蝎座",
            "射手座",
          ];
          var partition = [22, 20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22]; // 两个星座分割日
          var index = month;
          // 所查询日期在分割日之前，索引-1，否则不变
          if (date < partition[month - 1]) {
            index = index - 1;
          }
          // 返回索引指向的星座string
          this.user.constellation = constellation[index];
          console.log(this.user);
        });
    },
  },
  created() {
    this.getInfoUser();
  },
};
</script>

<style>
</style>
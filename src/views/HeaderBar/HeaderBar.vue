<template> 
  <div class="container" >
    <!-- 导航菜单 -->
   <div class="nav">
      <span class="nav-bar">
        <div class="setStyle">
          <div class="item"><img src="" alt=""><span>APP下载</span></div>
          <div class="item"><img src="" alt=""><span>修改密码</span></div>
          <div class="item">
            <img src="" alt="">
            <span>政协提案录入开关</span> 
            <el-switch  v-model="value"  active-color="#49a0f9"  inactive-color="#ccc"></el-switch>
            </div>
        </div>
      </span>
      <span class="tool-bar">
        <div class="setStyle">
          <div class="item"><img src="" alt=""><span>{{username}}</span></div>
          <div class="item" @click="logout"><img src="" alt=""><span >退出登陆</span></div>
        </div>
      </span>
   </div>
  </div>
</template>

<script>
import mock from "@/mock/index";
import Cookies from "js-cookie"
export default {
  
  data() {
    return {
      username: "超级管理员",
      userAvatar: "",
      value: true
    };
  },
  methods: {
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    
    
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        sessionStorage.removeItem("user")
        Cookies.remove("token")
        this.$router.push("/login")
        this.$api.login.logout().then((res) => {
          }).catch(function(res) {
        })
      })
      .catch(() => {})
    }

  },
  mounted() {
    this.sysName = "I like Kitty";
    var user = sessionStorage.getItem("user");
    if (user) {
      this.userName = user;
      this.userAvatar = require("@/assets/user.png");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 300px;
  right: 0px;
  height: 60px;
  line-height: 60px;
  .nav{
    height: 100%;
    width: 100%;
    box-shadow: 0px 4px 4px 0px rgba(169, 169, 169, 0.25);
  }
  .collapse-switcher {
    width: 40px;
    float: left;
    cursor: pointer;
    border-color: rgba(111, 123, 131, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
    background: #ffff;
  }
  .nav-bar {
    margin-left: 50px;
    float: left;
  }
  .setStyle{
    display: flex;
    .item{
      border-left: 1px solid #d2d1d1;
      width: 180px;
      height: 100%;
      text-align: center;
      font-size: 16px;
      color: #212121;
      font-weight: normal;
    }
  }
  .tool-bar {
    float: right;
    .theme-picker {
      padding-right: 10px;
    }
    .lang-selector {
      padding-right: 10px;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }
    .user-info-dropdown {
      font-size: 20px;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
}
</style>
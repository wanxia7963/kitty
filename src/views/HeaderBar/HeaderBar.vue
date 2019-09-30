<template> 
  <div class="container" >
    
    <!-- 导航菜单 -->
    <span class="nav-bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" text-color="#fff"
          active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">首页</el-menu-item>
        <el-menu-item index="2">消息中心</el-menu-item>
        <el-menu-item index="3">订单管理</el-menu-item>
      </el-menu>
    </span>
    <span class="tool-bar">
      <!-- 主题切换 -->
      
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" trigger="hover">
        <span class="el-dropdown-link"><img :src="this.userAvatar" /> {{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
import mock from "@/mock/index.js";

export default {
  
  data() {
    return {
      isCollapse: false,
      username: "Louis",
      userAvatar: "",
      activeIndex: '1'
    };
  },
  methods: {
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 语言切换
    handleCommand(command) {
      let array = command.split(':')
      let lang = array[0] === '' ? 'zh_cn' : array[0]
      let label = array[1]
      document.getElementById("language").innerHTML = label
      this.$i18n.locale = lang
    },
    //折叠导航栏
    collapse: function() {
      this.$store.commit('collapse')
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        sessionStorage.removeItem("user");
        this.$router.push
        ("/login");
      })
      .catch(() => {});
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
  left: 200px;
  right: 0px;
  height: 60px;
  line-height: 60px;
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
    background: #504e6180;
  }
  .nav-bar {
    margin-left: auto;
    float: left;
    .el-menu {
      background: #504e6180;
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
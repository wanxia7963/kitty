<template>
    <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo menu-bar-width" >
        <img :src="this.logo" /> <div>{{isCollapse?'':sysName}}</div>
    </div>
    <!-- 导航菜单 -->
    <!-- <el-menu default-active="1-1" class="menu-bar-width" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">用户管理</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('dept')">机构管理</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('role')">角色管理</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('menu')">菜单管理</el-menu-item>
        <el-menu-item index="1-5" @click="$router.push('log')">日志管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统监控</span>
        </template>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->
    <!-- 导航菜单 -->
    <el-menu ref="navmenu" default-active="1" class="menu-bar-width" @open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="item in menuTree" :key="item.id" :menu="item"></menu-tree>
    </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
export default {
  data() {
    return {
      isCollapse: false,
      sysName: "",
      logo: "",
    };
  },
  components:{
    MenuTree
  },
  methods: {
    handleopen() {
      console.log('handleopen');
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect(a, b) {
      console.log('handleselect');
    },
    findMenuTree(){
      this.$api.menu.findMenuTree()
      .then((res)=>{
        this.$store.commit('setMenuTree',res.data)
      })
      .catch((err)=>{
        alert(err)
      })
    }
  },
  computed:{
    ...mapState({
      // appName: state => state.app.appName,
      menuTree: state => state.menu.menuTree
    })
  },
  mounted() {
    this.sysName = "I like Kitty";
    this.logo = require("@/assets/logo.png");

    this.findMenuTree();

  }
};
</script>

<style scoped lang="scss">
.menu-bar-container {
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #4b5f6e;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 22px;
      color: white;
      text-align: left;
    }
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>
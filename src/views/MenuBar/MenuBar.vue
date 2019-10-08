<template>
    <div ref="nav" class="menu-bar-container">
    <!-- logo -->
    <div class="logo menu-bar-width" >
         <div>西区政协提案在线系统</div>
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
    <el-menu ref="navmenu" default-active="1" text-color="#fff" active-text-color="#ffffff" class="menu-bar-width barcolor" @open="handleopen" @close="handleclose" @select="handleselect">
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
      winHeight:window.innerHeight,
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
    console.log(this)
    const that = this
     window.onresize = () => {
        return (() => {
        that.winHeight = window.innerHeight

      })()

      }
    this.$refs.nav.style.height=this.winHeight+'px'
    this.findMenuTree();

  },
  watch:{
    winHeight(val){
      this.winHeight =val
      this.$refs.nav.style.height=this.winHeight+'px'
  }
  }
};
</script>

<style scoped lang="scss">
.menu-bar-container {
  width: 300px;
  background: #353646;
  .el-menu {
    top: 60px;
    bottom: 0px;
    text-align: left;
    background-color: #21212c
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #353646;
    div {
      font-size: 22px;
      color: #49a0f9;
      text-align: center;
    }
  }
  .menu-bar-width {
    width: 300px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
 
}
</style>
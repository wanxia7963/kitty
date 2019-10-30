<template>
    <div ref="nav" class="menu-bar-container">
    <!-- logo -->
    <div class="logo menu-bar-width" >
         <div>西区政协提案在线系统</div>
    </div>

    <el-menu ref="navmenu" default-active="1" text-color="#fff" active-text-color="#ffffff" class="menu-bar-width barcolor" @open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="(item,index) in menu" :key="index" :menu="item"></menu-tree>
    </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuTree from "@/components/MenuTree"
export default {
  data() {
    return {
      winHeight:window.innerHeight,
    };
  },
  components:{
    MenuTree
  },
  methods: {
    handleopen() {
      console.log('handleopen')
    },
    handleclose() {
      console.log('handleclose')
    },
    handleselect(a, b) {
      console.log('handleselect')
    }
  },
  computed:{
    ...mapGetters(['menu'])
  },
  mounted() {
    console.log()
    const that = this
     window.onresize = () => {
        return (() => {
        that.winHeight = window.innerHeight
      })()
      }
    this.$refs.nav.style.height=this.winHeight+'px';

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
  min-height: 640px;
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

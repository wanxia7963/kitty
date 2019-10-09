<template>
	 <div class="container">
      <!-- 导航菜单栏 -->
       <nav-bar></nav-bar>
      <!-- 头部区域 -->
      <head-bar></head-bar>
      <!-- 主内容区域 -->
      <Main-content></Main-content>
  </div>
</template>

<script>
import HeadBar from "./HeaderBar/HeaderBar"
import NavBar from "./NavBar/NavBar"
import MainContent from "./MainContent/MainContent" 
export default {
  name: "Home",
  components:{
    HeadBar,
    NavBar,
    MainContent
  }
};
</script>

<style scoped lang="scss">
 .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #ffffff;
  }
</style>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-submenu__title:hover,.el-menu-item:focus, .el-menu-item:hover,.el-menu-item:active {
  background-color: #49a0f9 !important;
}
.el-submenu .el-menu-item{
  background-color: #353646
}
.el-menu-item.is-active{
  background: #49a0f9
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

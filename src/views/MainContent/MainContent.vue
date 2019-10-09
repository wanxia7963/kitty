<template>
  <div class="container" :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <bread-crumb></bread-crumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import breadCrumb from "@/components/BreadCrumb"
export default {
    name:'mains',
    components:{
        breadCrumb
    },
    data() {
        return {
        };
    },
    methods: {

    },
    mounted() {

    }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 64px;
  bottom: 0px;
  left: 300px;
  right: 0px;
  background: #f1f4f6;
  .breadcrumb {
    padding-left: 30px; 
  }
}
</style>
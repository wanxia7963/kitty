<template>
  <div class="site-wrapper site-page--not-found">
   <el-row :gutter="16">
    <el-col :span="9">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="代办事项 (0)" name="first">
          <ul>
            <li>暂无待办事项</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="带阅事项 (0)" name="second">
          <ul>
            <li>暂无待阅事项</li>
          </ul>               
        </el-tab-pane>
      </el-tabs>
    </el-col>

    <el-col :span="9"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><Calender></Calender></el-col>
    
  </el-row>
  <el-row :gutter="16">
    <el-col :span="18"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  </div>
</template>

<script>
import Calender from "@/components/Calendar";
  export default {
     data() {
      return {
        activeName: 'first'
      };
    },
    components:{
      Calender
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    padding: 32px; 
    .site-content__wrapper {
      padding: 0;
      margin: 0;
      background-color: #fff;
    }
    .el-row {
      margin-bottom: 20px;
      height: 306px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
</style>

<template>
  <div class="site-wrapper site-page--not-found">
   <el-row :gutter="24">
    <el-col :span="9">
      <div class="table">
        <el-tabs v-model="activeName1">
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
      </div>
    </el-col>

    <el-col :span="9">
      
      <div class="table">
        <el-tabs v-model="activeName2"  >
          <el-tab-pane label="已办事项 (0)" name="first">
            <ul>
              <li>暂无已办事项</li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="退回事项 (0)" name="second">
            <ul>
              <li>暂无退回事项</li>
            </ul>               
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="table">
        <Calender></Calender>
      </div>
    </el-col>
    
  </el-row>
  <el-row :gutter="24">
    <el-col :span="18" class="elcol1">
      <div class="table">
        <el-tabs v-model="activeName3"  >
          <el-tab-pane label="超时曝光台 (0)" name="first">
            <ul>
              <li>暂无超时事件</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      </el-col>
      <el-col :span="6" class="elcol1">
        <div class="table">
          <el-tabs v-model="activeName4">
            <el-tab-pane label="通知公告 (0)" name="first">
              <ul>
                <li>通知公告一</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import Calender from "@/components/Calendar";
  export default {
     data() {
      return {
        activeName1: 'first',
        activeName2:'first',
        activeName3:'first',
        activeName4:'first'
      };
    },
    components:{
      Calender
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    padding-left: 30px; 
    padding-right: 30px;
    padding-top: 10px;
    .site-content__wrapper {
      padding: 0;
      margin: 0;
      background-color: #fff;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      height: 306px;
    }
    .elcol1{
      height: 186px;
    }
    .table {
      background: #fff;
      height: 100%;
      border-radius: 10px;
      font-weight: 600;
      padding: 5px;
        li{
          text-align: left;
        }
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

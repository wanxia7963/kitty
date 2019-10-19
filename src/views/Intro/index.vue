<template>
  <div class="site-wrapper site-page--not-found">
   <el-row :gutter="24">
    <el-col :span="9">
        <tabs-card :tabsName="tabsName" ></tabs-card>
    </el-col>

    <el-col :span="9">
      <tabs-card :tabsName="tabsName1" ></tabs-card>
    </el-col>
    <el-col :span="6">
      <div class="table" style="padding: 5px 0">
        <Calender></Calender>
        <div class="calendarMenu">
          <div class="addressList">
            <img src="../../assets/addressList.png" alt="">
            <span>通讯录</span>
          </div>
          <div class="favorite">
            <img src="../../assets/favorite.png" alt="">
            <span>收藏夹</span>
          </div>
        </div>
      </div>
    </el-col>
    
  </el-row>
  <el-row :gutter="24">
    <el-col :span="18" class="elcol1">
      <div class="table" style="padding:5px 10px">
          <div class="card">
            <div class="card_title">
              <div class="item active">{{"超时曝光台【"+num+"】"}}</div>
            </div>
            <div class="tools">
              <el-button type="text">加载更多 <i class="el-icon-arrow-right"></i></el-button>
            </div>
          </div>
          <div class="card_content">
            <div>
              <ul class="card_ul">
                  <li>暂无超时事件</li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="elcol1">
        <div class="table" style="padding:5px 10px">
          <div class="card">
            <div class="card_title">
              <div class="item active">{{"通知公告【"+num+"】"}}</div>
            </div>
            <div class="tools">
               <el-button size="mini" >发布</el-button>
              <el-button type="text">加载更多 <i class="el-icon-arrow-right"></i></el-button>
            </div>
          </div>
          <div class="card_content">
            <div>
              <ul class="card_ul">
                  <li>暂无通知公告</li>
              </ul>
            </div>
          </div>
        </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import tabsCard from "@/components/TabsCard"
import Calender from "@/components/Calendar";
  export default {
     data() {
      return {
        activeName1: 'first',
        activeName2:'first',
        activeName3:'first',
        activeName4:'first',
        num:0,
        tabsName:[{
          name:'待办事项',
          isActive:true
        },{
          name:'待阅事项',
          isActive:false
        }],
        tabsName1:[{
          name:'已办事项',
          isActive:true
        },{
          name:'退回事项',
          isActive:false
        }]
      };
    },
    components:{
      Calender,
      tabsCard
    },
    methods:{
      tabsSwitch(index){
        this.tabsName.forEach(function (item) {
          item.isActive = false
        })
        this.tabsName[index].isActive = true
      }
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
      margin-bottom: 30px;
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
        li{
          text-align: left;
        }
        .card{
          display: flex;
          justify-content: space-between;
          .card_title{
            display: flex;
            justify-content: space-between;
            .item{
              // padding: 0 20px;
              height: 40px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              line-height: 40px;
              display: inline-block;
              list-style: none;
              font-size: 14px;
              font-weight: 500;
              color: #303133;
              cursor: pointer;
              position: relative;
            }
            .item.active{
              color: #409EFF;
            }
            .item:hover{
              color: #409EFF;
            }
          }
        }
        .card_content{
          // margin-top: 10px;
          .card_ul{
            padding-left: 15px;
            li{
                font-size: 14px;
                font-weight: normal;
                color: #2b2b38;
            }
          }
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
    .calendarMenu{
      display: flex;
      justify-content: space-around;
      height: 65px;
      .addressList,.favorite{
        display: flex;
        cursor: pointer;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width:30px;
          height: 30px;
          align-self: center;
        }
        span{
          font-size: 12px;
          letter-spacing: 1px;
        }
      }
    }
  }
</style>

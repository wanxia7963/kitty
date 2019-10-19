<template>
    <div class="table">
        <div class="card">
            <div class="card_title">
                <div class="item" v-for="(tab,index) in tabsName" :key="index" :class="{active:tab.isActive}"  @click="tabsSwitch(index)">{{tab.name +"【"+num+"】"}}</div>
            </div>
            <div class="tools">
                <el-input style="width:130px" suffix-icon="el-icon-search"  size="mini" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="card_content" :style="{height:height+'px'}">
            <div v-if="tabsName[0].isActive">
                <ul class="card_ul">
                    <li>暂无{{tabsName[0].name}}</li>
                </ul>
            </div>
            <div v-if="tabsName[1].isActive">
                <ul  class="card_ul">
                    <li>暂无{{tabsName[1].name}}</li>
                </ul>
            </div>
        </div>
        <div class="card_floot">
            <el-pagination
                small
                layout="prev, pager, next" 
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name:'',
    data() {
        return {
            num:0
        }
    },
    props:{
        tabsName:Array,
        dataList:Array,
        height:{
            type:Number,
            default:200
        }
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
<style lang="scss" scoped>
.table {
      background: #fff;
      height: 100%;
      border-radius: 10px;
      font-weight: 600;
      padding: 5px 10px;
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
              padding-right:20px;
              height: 40px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              line-height: 40px;
              display: inline-block;
              list-style: none;
              font-size: 14px;
              font-weight: 500;
              color: #303133;
              position: relative;
              cursor: pointer;
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
            .card_ul{
                padding-left: 15px;
                li{
                    font-size: 14px;
                    font-weight: normal;
                    color: #2b2b38;
                }
            }
        }
        .card_floot{
              margin-top: 20px;
          }
}
</style>
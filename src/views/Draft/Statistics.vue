<template>
  <div class="statisticsPage">
    <el-row :gutter="20">
      <el-col :span="12" class="card">
        <div class="item">
          <echart :randomId="situation" :xAxisData="sixAxisData" :title="sititle" :series="siseries"></echart>
        </div>
      </el-col>
      <el-col :span="12" class="card">
        <div class="item">
          <echart :randomId="category"  :xAxisData="caxAxisData" :title="caTitle" :series="caseries"></echart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="card">
        <div class="item">
          <echart :randomId="comparison" :xAxisData="sixAxisData" :title="coTitle" :series="coseries" :legend="colegend"></echart>
        </div>
      </el-col>
      <el-col :span="12" class="card" style="text-align:left">
        <div class="item">
          <span>数据统计</span>
          <div class="top">
            <div class="left">
              <p>共收到（件）：120</p>
              <p>共并案（件）：120</p>
              <p>共立案（件）：120</p>
              <p>没有并案（件）：120</p>
            </div>
            <div class="right">
              <p>委员提案（件）：120</p>
              <p>参加提案提出委员会（人数）：120</p>
              <p>民族党派提案（件）：120</p>
              <p>界别小组提案（件）：120</p>
            </div>
          </div>
          <div class="bottom">
            <p>在件提案中：</p>
            <div class="cow">
              <div  class="left">
                <p>民主党派（件）：120</p>
              </div>
              <div class="right">
                <p>界别小组（件）：120</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echart from '@/components/Echarts'
  export default {
    name:'statistics',
    data() {
      return {
        situation:'situation',
        category:'category',
        comparison:'comparison',
        sixAxisData:["正在办理","办理结果","办理完成","黄牌","红牌"],
        caxAxisData:["类别一","类别二","类别三","类别四","类别五"],
        sititle:'办理情况',
        caTitle:'类别统计',
        coTitle:'年度对比',
        colegend:{
          data:['今年','去年'],
          left:'right',
        },
        siseries:[{
                    name: 'situation',
                    type: 'bar',
                    barCategoryGap:'80%',
                    itemStyle:{
                        color:'#49a0f9'
                    },
                    data: [5, 20, 36, 10, 10]
                }],
        caseries:[{
                    name: 'category',
                    type: 'bar',
                    barCategoryGap:'80%',
                    itemStyle:{
                        color:'#49a0f9'
                    },
                    data: [5, 20, 36, 10, 10]
                }],
        coseries:[{
                    name: '今年',
                    type: 'bar',
                    barCategoryGap:'80%',
                    itemStyle:{
                        color:'#49a0f9'
                    },
                    data: [5, 20, 36, 10, 10]
                },{
                    name: '去年',
                    type: 'bar',
                    barCategoryGap:'80%',
                    itemStyle:{
                        color:'#fe5858'
                    },
                    data: [5, 20, 36, 10, 10]
                }]
      }
    },
    components:{
      echart
    }
  }
</script>
<style lang="scss" scoped>
.statisticsPage{
  padding: 30px;
  .card{
    height: 340px;
    padding: 10px 5px;
    .item{
      background: #ffffff;
      padding: 15px;
      height: 280px;
      border-radius: 15px;
    }
  }
  .top{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    margin-top: 20px;
    .cow{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
   .left,.right{
    width: 40%;
  }
}

</style>
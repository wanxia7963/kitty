<template>
  <div class="statisticsPage">
    <el-row :gutter="20">
      <el-col :span="12" class="card">
        <div class="item">
          <!-- <echart :randomId="situation" :xAxisData="sixAxisData" :title="sititle" :series="siseries"></echart> -->
          <div id="myChartCase" style="width: 100%;height:300px;"></div>
        </div>
      </el-col>
      <el-col :span="12" class="card">
        <div class="item">
          <!-- <echart :randomId="category" :xAxisData="caxAxisData" :title="caTitle" :series="caseries"></echart> -->
          <div id="myChartType" style="width: 100%;height:300px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="card">
        <div class="item">
          <!-- <echart :randomId="comparison" :xAxisData="sixAxisData" :title="coTitle" :series="coseries" :legend="colegend"></echart> -->
          <div id="myChartAnnual" style="width: 100%;height:300px;"></div>
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
              <div class="left"><p>民主党派（件）：120</p></div>
              <div class="right"><p>界别小组（件）：120</p></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echart from '@/components/Echarts';
export default {
  name: 'statistics',
  data() {
    return {
      //办理情况
      sititle: '办理情况',

      //类别统计
      caTitle: '类别统计',

      //年度对比
      coTitle: '年度对比',
      colegend: {
        data: ['今年', '去年'],
        left: 'right'
      }
    };
  },
  components: {
    echart
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      let myChartCase = this.$echarts.init(document.getElementById('myChartCase'));
      let myChartType = this.$echarts.init(document.getElementById('myChartType'));
      let myChartAnnual = this.$echarts.init(document.getElementById('myChartAnnual'));
      this.$api.statistics.getType().then(res => {
        console.log(res)
        myChartCase.setOption({
          title: { text: this.sititle },
          tooltip: {},
          grid:{
            show:false,
          },
          xAxis: {
            data: res.data.data.propHandlerType.status,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            name: '数量',
            axisTick: {
              show: false
            },
          },
          series: [
            {
              name: '数量',
              type: 'bar',
              barCategoryGap: '80%',
              itemStyle: {
                color: '#49a0f9'
              },
              data: res.data.data.propHandlerType.num
            }
          ]
        });

        myChartType.setOption({
          title: { text: this.caTitle },
          tooltip: {},
          grid:{
            show:false,
          },
          xAxis: {
            data: res.data.data.propType.typeName,
            axisTick: {
              show: false
            }
          },
          yAxis: {
            name: '个数',
            axisTick: {
              show: false
            },
          },
          series: [
            {
              name: '个数',
              type: 'bar',
              barCategoryGap: '80%',
              itemStyle: {
                color: '#49a0f9'
              },
              data: res.data.data.propType.num
            }
          ]
        });

        myChartAnnual.setOption({
          title: { text: this.coTitle },
          tooltip: {},
          grid:{
            show:false,
          },
          legend: this.colegend,
          xAxis: {
            data: res.data.data.propYearHandlerType.currentYear.status,
            axisTick: {
              show: false
            },
            type : 'category',
          },
          yAxis: {
            name: '个数',
            type:'value',
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '今年',
              type: 'bar',
              barCategoryGap: '80%',
              itemStyle: {
                color: '#49a0f9'
              },
              data: res.data.data.propYearHandlerType.currentYear.num
            },
            {
              name: '去年',
              type: 'bar',
              barCategoryGap: '80%',
              itemStyle: {
                color: '#fe5858'
              },
              data: res.data.data.propYearHandlerType.oldYear.num
            }
          ]
        });

      });
    }
  }
};
</script>
<style lang="scss" scoped>
.statisticsPage {
  padding: 30px;
  .card {
    height: 340px;
    padding: 10px 5px;
    .item {
      background: #ffffff;
      padding: 15px;
      height: 280px;
      border-radius: 15px;
    }
  }
  .top {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    margin-top: 20px;
    .cow {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .left,
  .right {
    width: 40%;
  }
}
</style>

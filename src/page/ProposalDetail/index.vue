<template>
  <el-scrollbar style="height: calc(100% - 35px)">
    <div class="DetailPage">
      <div class="detailInfo">
        <div>具体信息</div>
        <div>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple" style="border-top: 1px solid #ccc"> 提案标题：</div></el-col>
            <el-col :span="22"><div class="grid-content " style="border-top: 1px solid #ccc;border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">编号：</div></el-col>
            <el-col :span="10"><div class="grid-content "></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">当前状态：</div></el-col>
            <el-col :span="10"><div class="grid-content " style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">经办单位：</div></el-col>
            <el-col :span="10"><div class="grid-content"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">领衔领导</div></el-col>
            <el-col :span="10"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">负责人：</div></el-col>
            <el-col :span="10"><div class="grid-content"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">负责人手号码：</div></el-col>
            <el-col :span="10"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">开始日期：</div></el-col>
            <el-col :span="10"><div class="grid-content"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">截至日期</div></el-col>
            <el-col :span="10"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">附件</div></el-col>
            <el-col :span="10"><div class="grid-content"></div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">类型：</div></el-col>
            <el-col :span="10"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">内容</div></el-col>
            <el-col :span="22"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">指派建议：</div></el-col>
            <el-col :span="22"><div class="grid-content" style="border-right: 1px solid #ccc"></div></el-col>
          </el-row>
        </div>
      </div>
      <div class="flowList">
        <div>流程列表</div>
        <el-table :data="flowData" border style="width: 100%" max-height="300">
          <el-table-column prop="date" align="center" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="unit" align="center" label="经办单位" width="180">
          </el-table-column>
          <el-table-column prop="principal" align="center" label="经办人" width="180">
          </el-table-column>
          <el-table-column prop="content" label="办理内容">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                flowData:[
                    {
                        date:'2019-04-08',
                        unit:'政协办',
                        principal:'张三',
                        content:'审核通过'
                    },
                    {
                        date:'2019-04-20',
                        unit:'政协办',
                        principal:'李四',
                        content:'办理待审'
                    },
                    {
                        date:'2019-05-08',
                        unit:'政协办',
                        principal:'王五',
                        content:'办理结束'
                    }
                ]
            }
        },
        methods:{
            initProposal(){

            }
        },
        mounted(){
            // this.initProposal()
        }
    }
</script>

<style scoped lang="scss">
  .DetailPage{
    text-align: left;
    padding: 30px;
    .detailInfo{
      background: #fff;
      border-radius: 10px;
      padding: 10px 15px;
    }
    .flowList{
      margin-top: 30px;
      padding: 10px 15px;
      background: #fff;
      border-radius: 10px;
    }
    .el-row {
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple{
      background-color: #eff8ff;
    }
    .grid-content {
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      min-height: 36px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      color: #2b2b38;
      font-weight: bold;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }

</style>

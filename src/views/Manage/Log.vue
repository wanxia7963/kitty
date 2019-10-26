<template>
  <div class="sysLogPage">
    <div class="tableColor">
      <kt-table :height="650" :max-height="650" :columns="logColumns" :data="pageResult" :showOperation="showOperation"></kt-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import KtTable from "@/views/Core/KtTable"
    export default {
        components:{
            KtTable
        },
        data() {
            return {
                columns: [],//初始化表格表头
                logColumns:[],//表格表头数据
                pageResult:{},
                showOperation:false,
                totalPageSize:1,//数据总条数
                pageSize: 10,//每页显示数量
                pageNum: 1,//总页数
                currentPage:1//当前页
            }
        },
        methods:{
            initColumns() {
                this.columns = [
                    {prop:'index',label:'编号',width:60},
                    {prop:'user',label:'用户'},
                    {prop:'handleTarget',label:'操作目标'},
                    {prop:'handleContent',label:'操作内容'},
                    {prop:'date',label:'时间'},
                    {prop:'ip',label:'ip'}
                ]
                this.logColumns = JSON.parse(JSON.stringify(this.columns))
            },
            //分页 - 设置每页显示条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                var pageNum = this.pageNum
                var pageSize = this.pageSize
                this.getLogData(pageSize,pageNum)
            },
            //分页 - 上一页/下一页
            handleCurrentChange(val) {
                this.pageNum = val
                var pageNum = this.pageNum
                var pageSize = this.pageSize
                this.getLogData(pageSize,pageNum)
            },
            //获取系统日志信息
            getLogData(pageSize,pageNum){
                this.$api.common.getLogData(pageSize,pageNum)
                    .then((res)=>{
                        if(res.code == 200){
                            console.log(res)
                            this.pageResult = res.data.data
                            this.currentPage = res.data.currentPage
                            this.pageSize = res.data.pageSize
                            this.pageNum = re.data.pageNum
                        }
                    })
            }
        },
        mounted(){

            this.initColumns()
            // var pageSize = this.pageSize
            // var pageNum = this.pageNum
            // this.getLogData(pageSize,pageNum)初始化表格数据
        }
    }
</script>
<style lang="scss" scoped>
  .sysLogPage{
    padding: 30px;
    .tableColor{
      padding: 15px;
      border-radius:10px;
      height: 700px;
      background: #ffffff;
    }
    .pagination{
      padding: 15px 5px;
      text-align: right;
    }
  }
</style>

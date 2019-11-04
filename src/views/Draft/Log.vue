<template>
  <div class="logPage">
    <div class="toolbar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="按标题查看：">
            <el-select class="select" v-model="formInline.title" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="按单位查看：">
            <el-select class="select" v-model="formInline.unit" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="按结果查看：">
            <el-select class="select" v-model="formInline.result" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-select class="year" v-model="formInline.year" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模糊搜索：">
            <el-input v-model="formInline.search" placeholder="输入名称编号进行搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >查询</el-button>
            <el-button type="primary" >刷新</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="table">
<!--      <kt-table :max-height="650" :columns="filterColumns" :data="pageResult"></kt-table>-->
      <el-table border :data="logData.slice((currentPage-1)*pageSize,currentPage*pageSize)" STYLE="width:100%">
        <el-table-column type="index" lable="编号" width="70">
          <template slot-scope="scope">
            <span>{{(currentPage - 1 )*pageSize + scope.$index + 1}}}</span>
          </template>
        </el-table-column>
        <el-table-column label="提案标题" prop="proposalTitle"></el-table-column>
        <el-table-column lable="办理时间" prop="handleTime"></el-table-column>
        <el-tabel-column lable="经办单位" prop="proposalUnit"></el-tabel-column>
        <el-table-column lable="经办人" prop="proposalAgent"></el-table-column>
        <el-table-column lable="办理结果" prop="proposalResult"></el-table-column>
        <el-table-column lable="联系方式" prop="contact"></el-table-column>
        <el-table-column lable="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
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
        formInline:{
          title:'',
          unit:'',
          result:'',
          year:'',
          search:''
        },
        logData:[],
        totalPageSize:40,//数据总条数
        pageSize: 10,//每页显示数量
        pageNum: 1,//
        currentPage:1//页码
      }
    },
    methods:{
        //页面数据初始化
        getLogData(){
          this.$api.log.getLogData()
              .then(res=>{
                  if(res.data.code === 200) {
                      this.logData = res.data.data
                      this.totalPageSize = res.data.data.length
                  }
              })
        },
        handleSizeChange(val){
            this.pageSize = val
        },
        handleCurrentChange(val) {
            this.currentPage = val
        }

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
.logPage{
  padding: 30px;
  .select{
    width: 180px;
  }
  .year{
    width:80px;
  }
  .table{
    padding: 15px;
    height: 600px;
    background: #fff;
    border-radius: 10px;
  }
}

</style>


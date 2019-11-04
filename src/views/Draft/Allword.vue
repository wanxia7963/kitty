<template>
  <div class="logPage">
    <div class="toolbar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="按单位查看：">
            <el-select class="select" v-model="formInline.unit" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="按工作类型查看：">
            <el-select class="select" v-model="formInline.workType" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="按工作状态查看：">
            <el-select class="select" v-model="formInline.condition" placeholder="全部">
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
      <el-table :data="allWorkData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width:100%" max-height="650">
        <el-table-colum type="index" lable="编号" width="70">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-colum>
        <el-table-column lable="提案名称" prop="proposalName"></el-table-column>
        <el-table-column lable="提案类型" prop="proposalType"></el-table-column>
        <el-table-column lable="经办单位" prop="accomplishUnit"></el-table-column>
        <el-table-column lable="当前状态" prop="proposalStatus"></el-table-column>
        <el-table-column lable="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
        allWorkData:{},
        formInline:{
          title:'',
          unit:'',
          result:'',
          year:'',
          search:''
        },

        filterColumns:[],
        totalPageSize:40,//数据总条数
        pageSize: 10,//每页显示数量
        pageNum: 1,//
        currentPage:1//当前页

      }
    },
    methods:{
        //表格数据初始化
        getAllWorkData(){
            this.$api.allword.getAllWorkData()
                .then(res=>{
                    if(res.data.code === 200){
                        console.log(res.data.data);
                        this.allWorkData = res.data.data;
                        this.totalPageSize = res.data.data.length
                    }
                }).catch(err=>{
                    console.log(err);
            })
        }
        ,
        handleSizeChange(val){
          this.pageSize = val;
        },
        handleCurrentChange(val){
          this.currentPage = val;
        },
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
    border-radius:10px;
  }
}

</style>


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
      <kt-table :max-height="650" :columns="filterColumns" :data="pageResult"></kt-table>
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
        columns:[],
        pageResult:{},
        filterColumns:[]
      }
    },
    methods:{
       initColumns(){
        this.columns = [
          {prop:'id',label:'编号',minWidth:30},
          {prop:'name',label:'工作名称',minWidth:150},
          {prop:'type',label:'工作类型',minWidth:70},
          {prop:'unit',label:'经办单位',minWidth:70},
          {prop:'condition',label:'当前状态',minWidth:70}
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns))
      }
    },
    mounted(){
      this.initColumns()
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


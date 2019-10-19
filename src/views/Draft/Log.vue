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
          {prop:'title',label:'提案标题',minWidth:150},
          {prop:'time',label:'办理时间',minWidth:70},
          {prop:'unit',label:'经办单位',minWidth:70},
          {prop:'agent',label:'经办人',minWidth:70},
          {prop:'result',label:'办理结果',minWidth:70},
          {prop:'mobile',label:'联系方式',minWidth:70}
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
    border-radius: 10px;
  }
}

</style>


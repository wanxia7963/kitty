<template>
  <div class="page_container">
    <div class="toolBar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" >
        <el-form-item>
          <el-input v-model="filters.name" size="mini" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" >刷新</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-button class="addbtn" size="mini" icon="fa fa-hand-pointer-o" type="primary"  @click="handleAdd"> 新增</el-button>
    </div>
    <div class="tableColor">
      <kt-table :max-height="650" :columns="filterColumns" :data="pageResult"></kt-table>
    </div>


    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm"  label-width="82px"  ref="dataForm" :size="size"
        label-position="left">
        <el-form-item label="登录名:" prop="loginName">
          <el-input v-model="dataForm.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-input v-model="dataForm.sex" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="姓名：" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="department">
          <el-input v-model="dataForm.department" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-input v-model="dataForm.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门电话：" prop="phone">
          <el-input v-model="dataForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址：" prop="address">
          <el-input v-model="dataForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" >确认</el-button>
      </div>
    </el-dialog>
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
        size: 'small',
        filters:{
          name:''
        },
        columns: [],
        filterColumns:[],
        operation: false, // true:新增, false:编辑
			  dialogVisible: false, // 新增编辑界面是否显示
        pageResult:{},
        deptData: [],
        dataForm: {
          id: 0,
          loginName:'',
          name: '',
          password: '123456',
          sex:'',
          department: "",
          deptName: '',
          email: 'test@qq.com',
          mobile: '13889700023',
          position: "",
          phone:'',
          address:''
        },
      }
    },
    methods:{
      handleAdd(){
        this.dialogVisible = true
        this.operation = true
        this.dataForm = {
          id: 0,
          name: '',
          password: '',
          deptId: 1,
          deptName: '',
          email: 'test@qq.com',
          mobile: '13889700023',
          status: 1,
          userRoles: []
        }
      },
      initColumns(){
        this.columns = [
          {prop:'id',label:'编号',minWidth:30},
          {prop:'loginName',label:'登录名',minWidth:70},
          {prop:'sex',label:'性别',minWidth:30},
          {prop:'name',label:'姓名',minWidth:50},
          {prop:'department',label:'部门',minWidth:60},
          {prop:'position',label:'职位',minWidth:60},
          {prop:'mobile',label:'联系方式',minWidth:90},
          {prop:'phone',label:'部门电话',minWidth:90},
          {prop:'address',label:'通讯地址',minWidth:150},
          {prop:'email',label:'邮箱',minWidth:100}
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns))
      },//新增用户
        addUser(){

        }
    },
    mounted(){
      this.initColumns();
    }
  }
</script>
<style lang="scss" scoped>
.page_container {
  padding: 30px;
}
.addbtn{
    letter-spacing: 2px
  }
.tableColor{
  padding: 15px;
  height: 700px;
  background: #fff;
}
</style>

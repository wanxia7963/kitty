<template>
  <div class="deptPage">
    <div style="display:flex;justify-content: space-between;">
      <div class="toolBar" style="padding-top:10px;padding-left:15px;">
        <el-form :inline="true" :model="filters" size="mini" >
          <el-form-item>
            <el-input v-model="filters.name" suffix-icon="fa fa-search" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="serchDept">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" >刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="toolbar" style="padding-top:10px;padding-right:15px;">
        <!-- <el-button class="addbtn" size="mini" type="primary" @click="departmentDialog = true">+新增</el-button> -->
        <el-dropdown>
          <el-button class="addbtn" size="mini" type="primary" >新增</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-button type="text" @click="handleAdd(0)">新增分组</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="handleAdd(1)">新增部门</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="handleAdd(2)">新增股室</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- tree -->
    <div class="table" style="display:flex">
      <div style="width: 20%;height:600px;" >
        <el-scrollbar style="height:100%">
          <el-tree class="deptTree"  :data="tableTree" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
        </el-scrollbar>
      </div>
    <!-- table -->
      <div style="width: 80%" >
        <el-table border :data="tableData" height="600">
          <el-table-column type="index" label="编号" width="70">
            <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="部门">
          </el-table-column>
          <el-table-column prop="desc" label="说明">
          </el-table-column>
          <el-table-column prop="isAble" label="状态" >
            <template slot-scope="scope">
                <span>{{scope.row.isAble? "冻结" : "正常"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"  prop="type"   fixed="right"  header-align="center" align="center">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" v-if="scope.row.type == 1" @click="deleteGroup(scope.row.groupId)">删除 </el-button>
                <el-button size="mini" type="danger" v-if="!scope.row.isAble  && scope.row.type != 1 " @click="freeze(scope.row.roomId || scope.row.deptId, scope.row.type)">冻结</el-button>
                <el-button size="mini" v-if="scope.row.isAble" @click="unfreeze(scope.row.roomId || scope.row.deptId, scope.row.type)">解冻</el-button>
              </div>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
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
    <!-- 添加分组弹窗 -->
    <el-dialog :title="!groupForm.groupId ? '新增分组' : '修改分组'" :visible.sync="groupDialog" class="deptDialog" width="500px" >
      <el-form :model="groupForm" ref="groupForm" label-position="left">
        <el-form-item label="分组名称：" label-width="120">
          <el-input v-model="groupForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分组说明：" label-width="120">
          <el-input v-model="groupForm.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="groupDialog = false">取 消</el-button>
        <el-button type="primary" @click="groupAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加部门弹出 -->
    <el-dialog :title="!deptForm.deptId ? '新增部门' : '修改部门'" :visible.sync="departmentDialog" class="deptDialog" width="500px" >
      <el-form :model="deptForm" ref="deptForm" label-position="left">
        <el-form-item label="部门名称：" label-width="120">
          <el-input v-model="deptForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门说明：" label-width="120">
          <el-input v-model="deptForm.desc" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="属于分组：" label-width="120">
           <el-select v-model="deptForm.parentGroup" placeholder="请选择活动区域">
            <el-option label="添加组" value="zu"></el-option>
            <el-option label="添加部门" value="bumen"></el-option>
            <el-option label="添加股室" value="gushi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门电话：" label-width="120">
            <el-input v-model="deptForm.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="departmentDialog = false">取 消</el-button>
        <el-button type="primary" @click="deptAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加股室弹窗 -->
    <el-dialog :title="!bureauForm.roomId ? '新增股室' : '修改股室'" :visible.sync="bureauDialog" class="deptDialog" width="500px" >
      <el-form :model="bureauForm" ref="bureauForm" label-position="left">
        <el-form-item label="股室名称：" label-width="120">
          <el-input v-model="bureauForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="股室说明：" label-width="120">
          <el-input v-model="bureauForm.desc" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="上级部门：" label-width="120">
           <el-select v-model="bureauForm.parentDept" placeholder="请选择活动区域">
            <el-option label="添加组" value="zu"></el-option>
            <el-option label="添加部门" value="bumen"></el-option>
            <el-option label="添加股室" value="gushi"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bureauDialog = false">取 消</el-button>
        <el-button type="primary" @click="bureauAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { treeTableXcode } from '@/utils/tools'
  export default {
    data() {
      return {
        isEdit:false,
        filters:{//搜索表单对象
          name:''
        },
        tableTree:[//tree数据对象
          {
            name:'攀枝花市西区',
            type: 0,
            children:[]
          }
        ],
        tableData:[],//table数据对象
        defaultProps:{
          children: 'children',
           label: 'name'
        },
        departmentDialog:false,//是否显示部门弹窗
        groupDialog:false,//是否显示分组弹窗
        bureauDialog:false,//是否显示股室弹窗
        groupForm:{//分组表单对象
          groupId:0,
          name:'',
          desc:''
        },
        deptId:'',//id
        deptType:'',//类型
        isSelectTree:false,//是否点击左边tree
        deptForm:{//部门表单对象
          deptId:0,
          name:'',
          deptGroupId:0,
          phone:'',
          desc:''
        },
        bureauForm:{//股室表单对象
          roomId:0,
          name:'',
          roomDeptId:0,
          desc:''
        },
        totalPageSize:1,//数据总条数
        pageSize: 10,//每页显示数量
        pageNum: 1,//总页数
        currentPage:1//当前页
      }
    },
    methods:{
      //删除分组
      deleteGroup(id){
        this.$confirm('确认删除该分组吗?','提示',{})
        .then(()=>{
          this.$api.dept.deleteGroup(id)
          .then((res)=>{
            if(res.data.code === 200){
              this.$message({ message: '删除成功', type: 'success' })
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        })
      },
      //显示新增页面
      handleAdd(type){
        this.isEdit = false;
        if(type === 0){
          this.groupDialog = true;
          this.groupForm = {
            groupId: 0,
            name: '',
            desc:''
          }
        } else if( type === 1){
          this.departmentDialog = true;
          this.deptForm = {
            deptId:0,
            name:'',
            deptGroupId:0,
            phone:'',
            desc:''
          }
        } else {
          this.bureauDialog = true;
          this.bureauForm = {
            roomId:0,
            name:'',
            roomDeptId:0,
            desc:''
          }
        }
      },
      //编辑弹窗数据
      handleEdit(row){
        this.isEdit = true
        if(row.type === 1){
          this.groupDialog = true
          this.groupForm = {
            groupId: row.groupId,
            name: row.name,
            desc:row.desc
          }
        }
         if(row.type === 2){
           this.departmentDialog = true
            this.deptForm = {
            deptId:row.deptId,
            name:row.name,
            deptGroupId:row.deptGroupId,
            desc:row.desc
          }
        }
        if(row.type === 3 ){
           this.bureauDialog = true
           this.bureauForm = {
            roomId:row.roomId,
            name:row.name,
            roomDeptId:row.roomDeptId,
            desc:row.desc
          }
        }
      },
      //新增组
      groupAdd(){
        this.$refs['groupForm'].validate((valid)=>{
          if(valid) {
            this.$confirm('确认提交吗?','提示',{})
            .then(()=>{
              let params = Object.assign({},this.groupForm,);
              if(this.isEdit){
                this.$api.dept.editGroup(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res);
                    this.$message({ message: '操作成功', type: 'success' });
                    this.groupDialog = false;
                    this.$refs['groupForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              } else{
                this.$api.dept.groupAdd(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res);
                    this.$message({ message: '操作成功', type: 'success' });
                    this.groupDialog = false;
                    this.$refs['groupForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              }
            })
          }
        })
      },
      //新增部门
      deptAdd(){
        this.$refs['deptForm'].validate((valid)=>{
          if(valid) {
            this.$confirm('确认提交吗?','提示',{})
            .then(()=>{
              let params = Object.assign({},this.groupForm);
              if(this.isEdit){
                this.$api.dept.editDept(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res);
                    this.$message({ message: '操作成功', type: 'success' });
                    this.departmentDialog = false;
                    this.$refs['deptForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              }else {
                this.$api.dept.deptAdd(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res);
                    this.$message({ message: '操作成功', type: 'success' });
                    this.departmentDialog = false;
                    this.$refs['deptForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              }

            })
          }
        })
      },
      //新增股室
      bureauAdd(){
        this.$refs['bureauForm'].validate((valid)=>{
          if(valid) {
            this.$confirm('确认提交吗?','提示',{})
            .then(()=>{
              let params = Object.assign({},this.groupForm)
              if(this.isEdit){
                this.$api.dept.editBureau(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res)
                    this.$message({ message: '操作成功', type: 'success' })
                    this.groupDialog = false
                    this.$refs['bureauForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              }else {
                this.$api.dept.bureauAdd(params)
                .then((res)=>{
                  if(res.data.code === 200){
                    console.log(res)
                    this.$message({ message: '操作成功', type: 'success' })
                    this.groupDialog = false
                    this.$refs['bureauForm'].resetFields()
                  }else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                  }
                })
              }

            })
          }
        })
      },
      //冻结部门或者股室
      freeze(id,type) {
        let name = type == 2? "部门":"股室"
        this.$confirm('确认冻结该'+name+'吗?','提示',{})
        .then(()=>{
          this.$api.dept.freeze(id,dept)
          .then((res)=>{
            if(res.data.code === 200){
              console.log(res)
              this.$message({ message: '操作成功', type: 'success' })
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        })
      },
      //解冻
      unfreeze(id,type) {
        let name = type == 2? "部门":"股室"
         this.$confirm('确认解除该'+name+'的冻结吗?','提示',{})
        .then(()=>{
          this.$api.dept.unfreeze(id,type)
          .then((res)=>{
            if(res.data.code === 200){
              this.$message({ message: '操作成功', type: 'success' })
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        })
      },
      //按照部门名称搜索部门
      serchDept(){
        var name =this.filters.name
        if(name === ''){
          this.$alert('请输入你要搜索的名称',"提醒",{
            confirmButtonText: '确定'
          })
          return
        }
        this.$api.dept.serchDept(name)
        .then((res)=>{
          if(res.data.code === 200){
              this.tableData =  res.data.data.data
              this.totalPageSize = res.data.data.totalPageSize
              this.currentPage = res.data.data.currentPage
          }
        })
      },
      //分页 - 设置每页显示条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        var id = this.deptId
        var deptType =this.deptType
        var pageNum = this.pageNum
        var pageSize = this.pageSize
        if(this.isSelectTree){
          console.log(id+" "+deptType+" "+pageNum+" "+pageSize)
          this.getDeptById(id,deptType,pageNum,pageSize)
        } else {
          this.getdeptData(pageNum,pageSize)
        }
      },
      //分页 - 上一页/下一页
      handleCurrentChange(val) {
        this.pageNum = val
        var id = this.deptId
        var deptType =this.deptType
        var pageNum = this.pageNum
        var pageSize = this.pageSize
        if(this.isSelectTree){
          console.log(id+" "+deptType+" "+pageNum+" "+pageSize)
          this.getDeptById(id,deptType,pageNum,pageSize)
        } else {
          this.getdeptData(pageNum,pageSize)
        }

      },

      //左边部门树数据获取
      getDeptTreeData(){
        this.$api.dept.getDeptTree()
        .then((res)=>{
          if(res.data.code === 200){
            console.log("treedata",res.data)
            this.tableTree[0].children =  res.data.data
          }
        })
      },
      //获取部门-股室数据
      getdeptData(pageNum,pageSize){
         this.$api.dept.getDeptData(pageNum,pageSize)
        .then((res)=>{
         if(res.data.code === 200){
            this.tableData = res.data.data.data;
            this.totalPageSize = res.data.data.totalPageSize;
            this.currentPage = res.data.data.currentPage;
         }
        })
      },
      //通过部门-股室 类型和id查找数据
      getDeptById(id,type,pageNum,pageSize){
        this.$api.dept.getDeptById(id,type,pageNum,pageSize)
          .then((res)=>{
            if(res.data.code === 200){
              this.tableData =  res.data.data.data
              this.totalPageSize = res.data.data.totalPageSize
              this.currentPage = res.data.data.currentPage
            }
          })
      },
      //点击左边部门
      handleNodeClick(data){
        console.log(data.groupId || data.deptId)
        this.deptId = data.groupId || data.deptId
        this.deptType = data.type
        this.isSelectTree = true
        this.pageNum = 1
        this.pageSize = 10
        this.currentPage = 1
        var id = this.deptId
        var deptType =this.deptType
        if(deptType == 0){
          id = -1
        }
        var pageNum = this.pageNum
        var pageSize = this.pageSize
        if(deptType !== 3 ){
          //请求getDeptById方法
          this.getDeptById(id,deptType,pageNum,pageSize)
        }
      }
    },
    mounted(){
    this.getDeptTreeData();
    this.getdeptData(this.pageNum,this.pageSize);
    }
  }
</script>
<style lang="scss" scoped>
.deptPage{
  padding: 30px;
  .table{
    padding: 15px;
    border-radius:10px;
    height: 700px;
    background: #ffffff;
  }
  .addbtn{
    letter-spacing: 2px;
  }
  .deptTree{
    max-height: 600px;
    .el-tree-node__label{
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
  .deptDialog{
    .el-form{
      width: 400px;
      .el-select,.el-input{
        width: 270px;
      }

    }
  }
  .pagination{
    padding: 15px 5px;
    text-align: right;
  }
}
</style>

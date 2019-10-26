<template>
    <div class="rolePage">
        <div style="display:flex;justify-content: space-between;">
            <div class="toolBar" style="padding-top:10px;padding-left:15px;">
                <el-form :inline="true" :model="filters" size="mini" >
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="角色名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" >刷新</el-button>
                </el-form-item>
                </el-form>
            </div>
            <div class="toolbar" style="padding-top:10px;padding-right:15px;">
                <el-button class="addbtn" size="mini" type="primary" @click="handleAdd">新增</el-button>
            </div>
        </div>
        <div class="table">
            <el-table border :data="roleData" style="width: 100%"  height="600">
                <el-table-column type="index" label="编号" align="center" width="70">
                  <template slot-scope="scope">
                    <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="chName" label="角色名称" >
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色说明" >
                </el-table-column>
                <el-table-column prop="roleCreateTime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="245" fixed="right"  header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"  @click="deleteRole(scope.row.id)">删除</el-button>
                    <el-button size="small"  @click="openRolePermissions(scope.row)">权限设置</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="totalPageSize">
              </el-pagination>
          </div>
        </div>
<!--      角色修改添加弹窗-->
        <el-dialog :title="!roleForm.roleId? '新增角色' : '修改角色' " :visible.sync="dialogroleFrom">
            <el-form :model="roleForm" ref="roleForm" :rules="dataRule">
                <el-form-item label="角色名称" >
                    <el-input v-model="roleForm.chName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" >
                    <el-input v-model="roleForm.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogroleFrom = false">取 消</el-button>
                <el-button type="primary" @click="!roleForm.roleId? addRole : editRole ">确 定</el-button>
            </div>
        </el-dialog>
<!--      权限编辑弹窗-->
        <el-dialog title="权限设置" :visible.sync="dialogSetRole" class="setRole">
            <el-tabs type="border-card">
                <el-tab-pane label="菜单权限">
                    <el-tree
                        :data="roles"
                        show-checkbox
                        ref="roleTree">
                    </el-tree>
                </el-tab-pane>
                <el-tab-pane label="接口权限">
                    <el-tree
                        :data="roles"
                        show-checkbox
                        ref="roleTree">
                    </el-tree>
                </el-tab-pane>
            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSetRole = false">取 消</el-button>
                <el-button type="primary" @click="dialogSetRole = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filters: {
                name: ''
            },
            roleForm: {
                roleId: 0,
                chName: '',
                roleDesc: ''
            },
            dataRule: {
                name: [{required: true, message: '角色名称不能为空', trigger: 'blur'}]
            },
            roleData: [{
                roleId: 1,
                chName: '超级管理员',
                roleDesc: '初始化人物角色',
                roleCreateTime: '2019-10-18 10:23:33'
            }],
            dialogroleFrom: false,
            dialogSetRole: false,
            roles: [
                {
                    id: 1,
                    label: '首页',
                }, {
                    id: 2,
                    label: '提案建议',
                    children: [{
                        id: 5,
                        label: '提案建议统计'
                    }, {
                        id: 6,
                        label: '新建提案建议'
                    }, {
                        id: 7,
                        label: '全部工作'
                    },
                        {
                            id: 8,
                            label: '提案办理日志'
                        },
                        {
                            id: 9,
                            label: '警示牌日期设置'
                        },
                        {
                            id: 10,
                            label: '预警'
                        },
                        {
                            id: 11,
                            label: '黄牌'
                        },
                        {
                            id: 12,
                            label: '红牌'
                        }]
                }, {
                    id: 3,
                    label: '系统管理',
                    children: [{
                        id: 13,
                        label: '部门管理'
                    }, {
                        id: 14,
                        label: '用户管理'
                    }, {
                        id: 15,
                        label: '角色管理'
                    },
                        {
                            id: 16,
                            label: '政协提案录入开关'
                        }]
                }],
            roleId:'',
            menuIds:[],
            apiIds:[],
            totalPageSize:1,//数据总条数
            pageSize: 10,//每页显示数量
            pageNum: 1,//总页数
            currentPage:1//当前页
        }
    },
    methods: {
        //上一页 下一页 跳转
        handleCurrentChange(val){
            this.pageNum = val
            var pageNum = this.pageNum
            var pageSize = this.pageSize
            this.getRoleData(pageNum,pageSize)
        },
        //打开新增角色页面
        handleAdd() {
            this.dialogroleFrom = true;
            this.roleForm = {
                id: 0,
                name: '',
                desc: ''
            }
        },
        //打开编辑角色页面
        handleEdit(row) {
            this.dialogroleFrom = true;
            Object.assign(this.roleForm, row)
        },
        //获取菜单tree接口
        getMenu() {
            this.$api.role.getMenu()
                .then((res) => {
                    if (res.code === 200) {
                        console.log(res)
                    }
                })
        },
        //获取接口tree接口
        getApi() {
            this.$api.role.getApi()
                .then((res) => {
                    if (res.code === 200) {
                        console.log(res)
                    }
                })
        },
        //获取所有角色
        getRoleData(pageNum,pageSize) {
            this.$api.role.getRoleData(pageNum,pageSize)
                .then((res) => {
                    if (res.code === 200) {
                        this.pageSize = res.data.pageSize
                        this.totalPageSize = res.data.totalPageSize
                        this.currentPage = res.data.currentPage
                        this.roleData = res.data.data
                    }
                })
        },
        //新增角色
        addRole() {
            this.$refs['roleForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗', '提示', {})
                        .then(() => {
                            var params = this.roleForm;
                            this.$api.role.addRole(params)
                                .then((res) => {
                                    if (res.code === 200) {
                                        console.log(res)
                                        this.$message({message: '操作成功', type: 'success'})
                                        this.dialogroleFrom = false
                                    } else {
                                        this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                                    }
                                })
                        })
                }
            })

        },
        //编辑角色
        editRole() {
            this.$refs['roleForm'].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗', '提示', {})
                        .then(() => {
                            var params = this.roleForm;
                            this.$api.role.editRole(params)
                                .then((res) => {
                                    if (res.code === 200) {
                                        console.log(res);
                                        this.$message({message: '操作成功', type: 'success'});
                                        this.dialogroleFrom = false
                                    } else {
                                        this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                                    }
                                })
                        })
                }
            })
        },
        //删除角色
        deleteRole(id){
            this.confirm('确认删除当前角色吗?','提示',{type:'warning'})
                .then(()=>{
                    this.$api.role.deleteRole(id)
                        .then(res =>{
                            this.getRoleData();
                            this.$message({message:'删除成功',type:'success'})
                        })
                })
        },
        //打开权限设置弹窗
        openRolePermissions(row){
            this.dialogSetRole = true
            this.roleId = row.id
        },
        //角色权限赋予
        setRolePermissions(){
            this.confirm('确认赋予该角色相关权限？','提示',{})
                .then(()=>{
                  var params = Object.assign({},{})
                  this.$api.role.setRolePermissions(params)
                      .then((res)=>{
                          if(res.code === 200) {
                              console.log(res)
                              this.$message({message: '操作成功', type: 'success'});
                              this.dialogSetRole = false
                          } else {
                              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                          }
                      })
                })
        },
        serchRole(){
            var name =this.filters.name
            if(name === ''){
                this.$alert('请输入你要搜索的名称',"提醒",{
                    confirmButtonText: '确定'
                });
                return
            }
            this.$api.role.serchRole(name)
                .then((res)=>{
                    if(res.code === 200){
                        console.log(res)
                    }
                })
        }
    },
    mounted() {
        var pageNum = this.pageNum
        var pageSize = this.pageSize
        this.getRoleData(pageNum,pageSize)
        //数据初始化
        // this.getMenu()
        // this.getApi()
        // this.getRoleData()
    },
}
</script>
<style lang="scss" >
.rolePage{
    padding: 30px;

    .addbtn{letter-spacing: 1px;}
    .setRole{
        .el-dialog{
            width: 345px ;
        }
    }
    .table{
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

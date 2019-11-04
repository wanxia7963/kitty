<template>
  <div class="rolePage">
    <div style="display:flex;justify-content: space-between;">
      <div class="toolBar" style="padding-top:10px;padding-left:15px;">
        <el-form :inline="true" :model="filters" size="mini">
          <el-form-item><el-input v-model="filters.name" placeholder="角色名"></el-input></el-form-item>
          <el-form-item><el-button size="mini" type="primary" @click="serchuserAll">查询</el-button></el-form-item>
        </el-form>
      </div>
      <div class="toolbar" style="padding-top:10px;padding-right:15px;"><el-button class="addbtn" size="mini" type="primary" @click="handleAdd">新增</el-button></div>
    </div>
    <div class="table">
      <el-table border :data="roleData" style="width: 100%" height="600">
        <el-table-column type="index" label="编号" align="center" width="70">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色说明"></el-table-column>
        <el-table-column prop="roleCreateTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="245" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRole(scope.row.roleId)">删除</el-button>
            <el-button size="small" @click="openRolePermissions(scope.row)">权限设置</el-button>
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
          :total="totalPageSize"
        ></el-pagination>
      </div>
    </div>
    <!--      角色修改添加弹窗-->
    <el-dialog :title="!roleForm.roleId ? '新增角色' : '修改角色'" :visible.sync="dialogroleFrom">
      <el-form :model="roleForm" ref="roleForm" :rules="dataRule">
        <el-form-item label="角色名称"><el-input v-model="roleForm.chName" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="角色说明"><el-input v-model="roleForm.roleDesc" auto-complete="off"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogroleFrom = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!--      权限编辑弹窗-->
    <el-dialog title="权限设置" :visible.sync="dialogSetRole" class="setRole">
      <el-tabs type="border-card">
        <!--              <el-scrollbar style="height: 500px">-->
        <el-tab-pane label="菜单权限">
          <el-scrollbar style="height: 200px">
            <el-tree :data="menuRoles" show-checkbox :props="menuRolesprops" ref="menuRoleTree" node-key="menuId"></el-tree>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="数据权限">
          <el-scrollbar style="height: 200px"><el-tree :data="PermRoles" show-checkbox :props="PermRolesprops" ref="PermRoleTree" node-key="permissionId"></el-tree></el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="业务权限">
          <el-scrollbar style="height: 200px"><el-tree :data="businessRoles" show-checkbox :props="businessRolesprops" ref="businessRoleTree" node-key="permissionId"></el-tree></el-scrollbar>
        </el-tab-pane>
        <!--              </el-scrollbar>-->
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetRole = false">取 消</el-button>
        <el-button type="primary" @click="sumbetRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    return {
      filters: {
        name: ''
      },
      roleForm: {
        // roleId: 0,
        chName: '',
        roleDesc: ''
      },
      dataRule: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      roleData: [
        {
          roleId: 1,
          chName: '超级管理员',
          roleDesc: '初始化人物角色',
          roleCreateTime: '2019-10-18 10:23:33'
        }
      ],
      dialogroleFrom: false,
      dialogSetRole: false,
      menuRoles: [],
      PermRoles: [],
      businessRoles: [],
      flag: '',
      roleId: '',
      menuIds: [],
      apiIds: [],
      totalPageSize: 1, //数据总条数
      pageSize: 10, //每页显示数量
      pageNum: 1, //总页数
      currentPage: 1, //当前页,
      menuRolesprops: {
        children: 'children',
        label: 'name'
      },
      PermRolesprops: {
        children: 'children',
        label: 'permissionDesc'
      },
      businessRolesprops: {
        children: 'children',
        label: 'permissionDesc'
      }
    };
  },
  methods: {
    //设置权限
    sumbetRole(){
      console.log(this.roleId)
      console.log(this.$refs.menuRoleTree.getCheckedKeys())
      console.log(this.$refs.PermRoleTree.getCheckedKeys())
      console.log(this.$refs.businessRoleTree.getCheckedKeys())
      var menuIds = this.$refs.menuRoleTree.getCheckedKeys();
      var dataIds = this.$refs.PermRoleTree.getCheckedKeys();
      var busIds = this.$refs.businessRoleTree.getCheckedKeys();
      let params={
        roleId:this.roleId,
        menuIds:menuIds,
        dataIds:dataIds,
        busIds:busIds
      }
      // params.append('roleId', this.roleId);
      // params.append('menuIds', menuIds);
      // params.append('dataIds', dataIds);
      // params.append('busIds', busIds);

      this.$api.role.setRolePermissions(params).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({ message: res.data.message, type: 'success' });
          this.dialogroleFrom = false;
          this.getRoleData(this.pageNum, this.pageSize);
        } else {
          this.$message({ message: '操作失败, ' + res.data.message, type: 'error' });
        }
      });

      this.dialogSetRole = false;

    },
      //根据角色名查询角色
    serchuserAll() {
      var name = this.filters.name;
      console.log(name);
      if (name === '') {
        this.getRoleData(this.pageNum, this.pageSize);
      }
      this.$api.role.serchRole(name).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.roleData = res.data.data.data;
          this.totalPageSize = res.data.data.totalPageSize;
          this.currentPage = res.data.data.currentPage;
        }
      });
    },

    //上一页 下一页 跳转
    handleCurrentChange(val) {
      this.pageNum = val;
      var pageNum = this.pageNum;
      var pageSize = this.pageSize;
      this.getRoleData(pageNum, pageSize);
    },
    //打开新增角色页面
    handleAdd() {
      this.flag = true;
      this.dialogroleFrom = true;
    },
    //打开编辑角色页面
    handleEdit(row) {
      this.flag = false;
      this.dialogroleFrom = true;
      Object.assign(this.roleForm, row);
    },
    //获取菜单tree接口
    // getMenu() {
    //     this.$api.role.getMenu()
    //         .then((res) => {
    //             if (res.code === 200) {
    //                 console.log(res)
    //             }
    //         })
    // },
    //获取接口tree接口
    getApi() {
      this.$api.role.getApi().then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.menuRoles = res.data.data.menuPerm;
          this.PermRoles = res.data.data.dataPerm;
          this.businessRoles = res.data.data.businessPerm;
        }
      });
    },
    //获取所有角色
    getRoleData(pageNum, pageSize) {
      this.$api.role.getRoleData(pageNum, pageSize).then(res => {
        if (res.data.code === 200) {
          this.pageSize = res.data.data.pageSize;
          this.totalPageSize = res.data.data.totalPageSize;
          this.currentPage = res.data.data.currentPage;
          this.roleData = res.data.data.data;
        }
      });
    },
    //新增角色
    addRole() {
      console.log(this.flag == true);
      if (this.flag == true) {
        //新增
        var params = this.roleForm;
        console.log(this.roleForm);
        this.$api.role.addRole(params).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({ message: res.data.message, type: 'success' });
            this.dialogroleFrom = false;
            this.getRoleData(this.pageNum, this.pageSize);
          } else {
            this.$message({ message: '操作失败, ' + res.data.message, type: 'error' });
          }
        });
      } else if (this.flag == false) {
        //修改
        var params = {
          chName: this.roleForm.chName,
          roleId: this.roleForm.roleId,
          roleDesc: this.roleForm.roleDesc
        };
        console.log(this.roleForm);
        this.$api.role.editRole(params).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({ message: res.data.message, type: 'success' });
            this.dialogroleFrom = false;
            this.getRoleData(this.pageNum, this.pageSize);
          } else {
            this.$message({ message: '操作失败, ' + res.data.message, type: 'error' });
          }
        });
      }
    },
    //删除角色
    deleteRole(id) {
      this.$api.role.deleteRole(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message({ message: res.data.message, type: 'success' });
          this.getRoleData(this.pageNum, this.pageSize);
          this.$message({ message: '删除成功', type: 'success' });
        }else{
          this.$message({ message: '操作失败, ' + res.data.message, type: 'error' });
        }
      });
    },
    //打开权限设置弹窗
    openRolePermissions(row) {
      this.dialogSetRole = true;
      this.roleId = row.roleId;
    }
  },
  mounted() {
    var pageNum = this.pageNum;
    var pageSize = this.pageSize;
    this.getRoleData(pageNum, pageSize);
    //数据初始化
    // this.getMenu()
    this.getApi();
    // this.getRoleData()
  }
};
</script>
<style lang="scss">
.rolePage {
  padding: 30px;

  .addbtn {
    letter-spacing: 1px;
  }
  .setRole {
    .el-dialog {
      width: 345px;
    }
  }
  .table {
    padding: 15px;
    border-radius: 10px;
    height: 700px;
    background: #ffffff;
  }
  .pagination {
    padding: 15px 5px;
    text-align: right;
  }
}
</style>

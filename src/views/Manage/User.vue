<template>
  <div class="page_container">
    <div class="toolBar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" size="mini">
        <el-form-item><el-input v-model="filters.name" placeholder="请输入用户名称"></el-input></el-form-item>
        <el-form-item><el-button type="primary" @click="serchuserAll">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;"><el-button class="addbtn" size="mini" type="primary" @click="handleAdd">新增</el-button></div>
    <div class="tableColor">
      <!-- <kt-table :max-height="650" :columns="filterColumns" :data="pageResult"></kt-table> -->
      <el-table border :data="tableData" height="600">
        <el-table-column type="index" label="编号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userAccount" label="登录名" align="center" width="100"></el-table-column>
        <el-table-column prop="userGender" label="性别" align="center" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.userGender == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userRealName" label="姓名" align="center" width="80"></el-table-column>
        <el-table-column prop="sysDepartment.name" label="部门" align="center" width="120"></el-table-column>
        <el-table-column prop="sysDeptRoom.name" label="股市" align="center" width="120"></el-table-column>
        <el-table-column prop="userPosition" label="职位" align="center" width="78">
          <template slot-scope="scope">
            <span>{{ scope.row.userPosition == 1 ? '部门领导' : '部门员工' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userTelephone" label="联系方式" align="center" width="120"></el-table-column>

        <el-table-column prop="userAddress" label="通讯地址" align="center" width="200"></el-table-column>
        <el-table-column prop="userEmail" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="userIsAble" label="状态" align="center" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.userIsAble == true ? '正常' : '冻结' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="操作" align="center"  header-align="center" width="290">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleEditqx(scope.row)">权限</el-button>
              <el-button size="mini" @click="handleEditydbm(scope.row)">移动</el-button>
              <el-button size="mini" @click="unfreeze(scope.row)">{{ scope.row.userIsAble == true ? '冻结' : '解冻' }}</el-button>
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
          :total="totalPageSize"
        ></el-pagination>
      </div>
    </div>
    <!--编辑模态框 -->
    <el-dialog :title="operation ? '新增' : '编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="150px" ref="dataForm" label-position="left">
        <el-form-item label="登录名:" prop="userAccount" v-if="flag"><el-input v-model="dataForm.userAccount" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="姓名：" prop="userRealName"><el-input v-model="dataForm.userRealName" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="性别：" prop="userGender" style="text-align: left;">
          <!-- <el-input v-model="dataForm.userGender" auto-complete="off"></el-input> -->
          <el-radio v-model="dataForm.userGender" label="1">男</el-radio>
          <el-radio v-model="dataForm.userGender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="部门：" prop="sysDepartmentId" v-if="flag">
          <el-cascader
            style="width: 563px;"
            v-model="dataForm.sysDepartmentId"
            :options="options"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否为部门领导：" prop="userPosition" style="text-align: left;">
          <!-- <el-input v-model="dataForm.userPosition" auto-complete="off"></el-input> -->
          <el-radio v-model="dataForm.userPosition" label="1">是</el-radio>
          <el-radio v-model="dataForm.userPosition" label="0">不是</el-radio>
        </el-form-item>
        <el-form-item label="联系方式：" prop="userTelephone"><el-input v-model="dataForm.userTelephone" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="通讯地址：" prop="userAddress"><el-input v-model="dataForm.userAddress" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="邮箱：" prop="userEmail"><el-input v-model="dataForm.userEmail" auto-complete="off"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="groupAdd">确认</el-button>
      </div>
    </el-dialog>


    <!--权限模态框 -->
    <el-dialog :title="'权限修改'" width="40%" :visible.sync="dialogVisibleqx" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="150px" ref="dataForm" label-position="left">
        <el-form-item label="邮箱：" prop="userEmail">
          <el-input v-model="dataForm.userEmail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisibleqx = false">取消</el-button>
        <el-button type="primary" @click="groupAdd">确认</el-button>
      </div>
    </el-dialog>

    <!--移动部门模态框-->
    <el-dialog :title="'移动部门'" width="40%" :visible.sync="dialogVisibleydbm" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="150px" ref="dataForm" label-position="left">
        <el-form-item label="部门：" prop="sysDepartmentId" v-if="flag">
          <el-cascader
            style="width: 563px;"
            v-model="dataForm.sysDepartmentId"
            :options="options"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisibleydbm = false">取消</el-button>
        <el-button type="primary" @click="groupMoveDept">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      filters: {
        name: ''
      },
      flag: true,
      tableData: [], //table数据对象
      totalPageSize: 1, //数据总条数
      pageSize: 10, //每页显示数量
      pageNum: 1, //总页数
      currentPage: 1, //当前页
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      dialogVisibleqx:false,
      dialogVisibleydbm:false,
      dataForm: {
        userId: '',
        userAccount: '',
        userRealName: '',
        userGender: '',
        sysDepartmentId: [],
        userPosition: '',
        userTelephone: '',
        userAddress: '',
        userEmail: ''
      }
    };
  },
  methods: {
    // <!-- 冻结 -->
    unfreeze(row){
      console.log(row)

      if(row.userIsAble==true){
        var dafaFormfreeze={
          userId:row.userId,
          isAble:'false'
        }
        let params = Object.assign({}, dafaFormfreeze);
        this.$api.user.UserUpdate(params).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.getAllUsers(this.pageNum, this.pageSize);
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.dialogVisibleydbm=false;
          } else {
            this.$message.error(res.data.message);
          }
        });
        console.log("需要冻结")
        // row.userIsAble=false;
      }else{
        var dafaFormfreeze={
          userId:row.userId,
          isAble:'true'
        }
        let params = Object.assign({}, dafaFormfreeze);
        this.$api.user.UserUpdate(params).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.getAllUsers(this.pageNum, this.pageSize);
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.dialogVisibleydbm=false;
          } else {
            this.$message.error(res.data.message);
          }
        });
        console.log("需要解冻")
        // row.userIsAble=true;
      }
    },
    handleEdit(row) {
      this.flag = false;
      this.operation = false; // true:新增, false:编辑
      this.dialogVisible = true;
      console.log(row);
      this.dataForm.userId = row.userId;
      this.dataForm.userRealName = row.userRealName;
      this.dataForm.userGender = row.userGender + '';
      this.dataForm.userPosition = row.userPosition+'';
      this.dataForm.userTelephone = row.userTelephone;
      this.dataForm.userAddress = row.userAddress;
      this.dataForm.userEmail = row.userEmail;
    },
    handleEditydbm(row){
      this.dialogVisibleydbm=true;
      this.dataForm.userId=row.userId;
      this.dataForm.sysDepartmentId=[row.sysDepartment.deptId,row.sysDeptRoom.id]
      console.log(this.dataForm)
    },
    handleEditqx(row){
      this.dialogVisibleqx=true;
    },
    handleChange(value) {
      console.log(value);
    },
    groupMoveDept(){
      console.log(this.dataForm)
      let params = Object.assign({}, this.dataForm);
      this.$api.user.UserUpdate(params).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          this.getAllUsers(this.pageNum, this.pageSize);
          this.dialogVisibleydbm=false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    groupAdd() {
      console.log(this.flag);
      console.log(this.dataForm);
      let params = Object.assign({}, this.dataForm);
      if (this.flag == false) {
        //编辑
        this.$api.user.UserUpdate(params).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getAllUsers(this.pageNum, this.pageSize);
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        //新增
        this.$api.user.UserAdd(params).then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.getAllUsers(this.pageNum, this.pageSize);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }

    },
    handleAdd() {
      (this.operation = true), // true:新增, false:编辑
        (this.dialogVisible = true); // 新增编辑界面是否显示
      this.flag = true;
      console.log(this.dataForm);
      this.dataForm = {
        userAccount: '',
        userRealName: '',
        userGender: '',
        sysDepartmentId: [],
        userPosition: '',
        userTelephone: '',
        userAddress: '',
        userEmail: ''
      };
    },
    //分页 - 设置每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      var id = this.deptId;
      var deptType = this.deptType;
      var pageNum = this.pageNum;
      var pageSize = this.pageSize;
      if (this.isSelectTree) {
        console.log(id + ' ' + deptType + ' ' + pageNum + ' ' + pageSize);
        this.getDeptById(id, deptType, pageNum, pageSize);
      } else {
        this.getAllUsers(pageNum, pageSize);
      }
    },
    //分页 - 上一页/下一页
    handleCurrentChange(val) {
      this.pageNum = val;
      var id = this.deptId;
      var deptType = this.deptType;
      var pageNum = this.pageNum;
      var pageSize = this.pageSize;
      if (this.isSelectTree) {
        console.log(id + ' ' + deptType + ' ' + pageNum + ' ' + pageSize);
        this.getDeptById(id, deptType, pageNum, pageSize);
      } else {
        this.getAllUsers(pageNum, pageSize);
      }
    },
    //获取部门-股室数据
    getAllUsers(pageNum, pageSize) {
      this.$api.user.getAllUser(pageNum, pageSize).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
          this.totalPageSize = res.data.data.totalPageSize;
          this.currentPage = res.data.data.currentPage;
        }
      });
      this.$api.dept.getAllDept().then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.options = res.data.data;
        }
      });
    },
    serchuserAll() {
      var name = this.filters.name;
      console.log(name);
      if (name === '') {
        this.getAllUsers(this.pageNum, this.pageSize);
      }
      this.$api.user.serchUserAll(name).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.tableData = res.data.data.data;
          this.totalPageSize = res.data.data.totalPageSize;
          this.currentPage = res.data.data.currentPage;
        }
      });
    },
    //通过部门-股室 类型和id查找数据
    getUserById(id, type, pageNum, pageSize) {
      this.$api.dept.getDeptById(id, type, pageNum, pageSize).then(res => {
        // if(res.code == 200){
        //   this.tableData =  res.data.data
        //   this.totalPageSize = res.data.totalPageSize
        //   this.currentPage = res.data.currentPage
        // }
      });
    }
  },
  mounted() {
    this.getAllUsers(this.pageNum, this.pageSize);
  }
};
</script>
<style lang="scss" scoped>
.page_container {
  padding: 30px;
}
.addbtn {
  letter-spacing: 2px;
}
.tableColor {
  padding: 15px;
  height: 700px;
  background: #fff;
}
</style>

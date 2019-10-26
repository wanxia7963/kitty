<template>
    <div class="sortPage">
      <div style="display:flex;justify-content: flex-end;">
        <div class="toolbar" style="padding-top:10px;padding-right:15px;">
          <el-button class="addbtn" size="mini" type="primary" @click="handleAdd">新增</el-button>
        </div>
      </div>
      <div class="table">
        <el-table border :data="sortData" style="width: 100%">
          <el-table-column align="center" label="编号" width="70" >
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column  prop="sortName" label="类型名称">
          </el-table-column>
          <el-table-column  prop="groupLeader" label="组长">
          </el-table-column>
          <el-table-column  label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" >禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增分类" :visible.sync="dialogFormSort">
        <el-form :model="sortForm">
          <el-form-item label="活动名称" >
            <el-input v-model="sortForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" >
            <el-select v-model="sortForm.leader" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormSort = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormSort = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
      return{
          sortData:[{
              id:1,
              sortName:'经济建设与发展',
              groupLeader:'经济建设与发展组长'
          }],
          sortForm:{
              id :'',
              name:'',
              leader:''
          },
          dialogFormSort:false
      }
  },
    methods:{
        //打开新增弹窗
        handleAdd(){
            this.dialogFormSort = true;
            this.sortForm = {
                id :'',
                name: '',
                leader: ''
            }
        },
        //打开编辑弹窗
        handleEdit(row){
            this.dialogFormSort = true;
            this.sortForm = {
                id :row.id,
                name: row.name,
                leader: row.leader
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.sortPage{
  padding:30px;
  .table{
    padding: 15px;
    border-radius:10px;
    height: 700px;
    background: #ffffff;
  }
}
</style>

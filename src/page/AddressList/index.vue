<template>
  <div class="addressPage">
    <div style="display:flex">
      <div class="toolBar" style="float:left;padding-top:10px;padding-left:15px;">
        <el-form :inline="true" :model="filters" >
          <el-form-item>
            <el-input v-model="filters.name" size="mini" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table" style="display:flex">
        <div style="width: 20%;height:600px;" >
          <el-scrollbar style="height:100%">
            <el-tree class="deptTree"  :data="tableTree" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
          </el-scrollbar>
        </div>
      <!-- table -->
        <div style="width: 80%" >
          <el-table border :data="tableData" height="600">
            <el-table-column type="index" align="center" label="编号" width="70">
              <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="职员名称">
            </el-table-column>
            <el-table-column prop="desc" label="部门">
            </el-table-column>
            <el-table-column prop="isAble" label="股室" >
            </el-table-column> 
            <el-table-column prop="phone" label="手机号" >
            </el-table-column> 
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="totalPageSize">
            </el-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
              filters:{
                  name:''
              },
              totalPageSize:50,//总条数
              pageSize:10,//每页显示多少
              currentPage:1,//当前页
              tableTree:[//tree数据对象
                {
                    name:'部门结构',
                    type: 0,
                    children:[]
                }
              ],//部门tree数据
              tableData:[{
                 name:'1',
                desc:'1',
                isAble:'aa',
                phonr:'123'
              }],//表格数据
              defaultProps:{
               children: 'children',
               label: 'name'
              },
          }
      },
      methods: {
            handleSizeChange(val){},
            handleCurrentChange(val){},
            //部门tree
            handleNodeClick(){},
            getDeptTreeData(){
                this.$api.dept.getDeptTree()
                .then((res)=>{
                if(res.code == 200){
                    console.log("treedata",res.data)
                    this.tableTree[0].children =  res.data
                }
                })
            }
          },
          mounted() {
              this.getDeptTreeData();
          }, 
  }
</script>
<style lang="scss" scoped>
.addressPage{
  padding: 30px;
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
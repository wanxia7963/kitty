<template>
  <div class="deptPage">
    <div style="display:flex;justify-content: space-between;">
      <div class="toolBar" style="padding-top:10px;padding-left:15px;">
        <el-form :inline="true" :model="filters" size="mini" >
          <el-form-item>
            <el-input v-model="filters.name" placeholder="用户名"></el-input>
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
        <!-- <el-button class="addbtn" size="mini" type="primary" @click="departmentDialog = true">+新增</el-button> -->
        <el-dropdown>
          <el-button class="addbtn" size="mini" type="primary" >新增</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-button type="text" @click="departmentDialog = true">新增分组</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="departmentDialog = true">新增部门</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="departmentDialog = true">新增股室</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    
    <div class="table" style="display:flex">
      <div style="width: 20%" >
        <el-tree :data="tableTree" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      </div>
      <el-table border :data="tableData" style="width: 80%"  max-height="450">
        <el-table-column prop="id" label="编号" width="55">
        </el-table-column>
        <el-table-column prop="name" label="部门" width="300">
          <template slot-scope="scope">
            <div @click="treeClick(scope.row,scope.$index)" style="cursor: pointer;">
              <template v-if="scope.row.children && scope.row.children.length > 0">
                <i class="el-icon-arrow-down" :style="'margin-left:'+(scope.row.level-1)*2+'em;'" v-if="scope.row.open"></i>
                <i class="el-icon-arrow-right" :style="'margin-left:'+(scope.row.level-1)*2+'em;'" v-else></i>
                <span >{{ scope.row.name }}</span>
              </template>
              <span v-else :style="'margin-left:'+(scope.row.level-1)*2+'em;'">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="部门电话" width="180">
        </el-table-column> 
        <el-table-column prop="desc" label="部门说明">
        </el-table-column>
        <el-table-column label="操作"  prop="type"  width="285" fixed="right"  header-align="center" align="center">
          <template slot-scope="scope">
            <div >
              <el-button size="mini" >编辑</el-button>
              <el-button size="mini" v-if="scope.row.type == 2">移动</el-button>
              <el-button size="mini" type="danger" v-if="scope.row.type == 1">删除 </el-button>
              <el-button size="mini" type="danger" v-else>禁用</el-button>
            </div>
          </template>
          </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加分组" :visible.sync="departmentDialog" class="deptDialog" width="500px" >
      <el-form :model="deptForm" label-position="left">
        <el-form-item label="部门名称" label-width="120">
          <el-input v-model="deptForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门说明" label-width="120">
          <el-input v-model="deptForm.desc" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="添加类别" label-width="120">
           <el-select v-model="deptForm.type" placeholder="请选择活动区域">
            <el-option label="添加组" value="zu"></el-option>
            <el-option label="添加部门" value="bumen"></el-option>
            <el-option label="添加股室" value="gushi"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="departmentDialog = false">取 消</el-button>
        <el-button type="primary" @click="departmentDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { treeTableXcode } from '@/utils/tools'
  export default {
    data() {
      return {
        filters:{
          name:''
        },
        tableTree:[
          {
            name:'攀枝花市西区',
            children:[]
          }
        ],
        tableData:[],
        defaultProps:{
          children: 'children',
           label: 'name'
        },
        departmentDialog:false,
        deptForm:{
          name:'',
          desc:'',
          type:''
        }
      }
    },
    methods:{
      menuADd(item){
        if(item){
          return item.length > 0?"0":"1";
        }
        return "1"
      },
      treeClick(item,index){
        if(item.open){
					this.collapse(item,index);
				}else{
					this.expand(item,index);
				}
      },
      expand(item,index) {
        if(!item.children){
					return index;
				}
				//展开
				for(var i=0;item.children && i<item.children.length;i++){
					var child = item.children[i];
					this.tableData.splice(++index,0,child);
					if(child.children && child.children.length > 0 && child.open){
						index = this.expand(child,index);
					}
				}
				item.open = true;
				return index;
      },
      collapse(item,index) {
        if(!item.children){
					return index;
				}
				//收缩
				item.open = false;
				var len = 0;
				for(var i=index+1;i<this.tableData.length;i++){
          var xcode = this.tableData[i].xcode;
					if(xcode.startsWith(item.xcode+"-")){
						len ++;
					}else{
						break;
					}
				}
				this.tableData.splice(index+1,len);
      },
      getDeptData(){
        this.$api.dept.getDept()
        .then((res)=>{
          window.console.log("data",res.data)
          this.tableTree[0].children =  res.data
        })
      },
      handleNodeClick(data){
        console.log(data.groupId || data.deptId)
        var id = data.groupId || data.deptId
        var type = data.type
        console.log("部门类型",type)
        if(type == 1|| type == 2){
          //请求getDeptById方法
          this.$api.dept.getDeptById(id,type)
          .then((res)=>{
            console.log(res)
          })
        }
        
      }
    },
    mounted(){
    this.getDeptData()
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
  .deptDialog{
    .el-form{
      width: 350px;
      .el-select,.el-input{
        width: 270px;
      }

    }
  }
}
</style>
<template>
  <div class="deptPage">
    <div style="display:flex;justify-content: space-between;">
      <div class="toolBar" style="padding-top:10px;padding-left:15px;">
        <el-form :inline="true" :model="filters" >
          <el-form-item>
            <el-input v-model="filters.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" >刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="toolbar" style="padding-top:10px;padding-right:15px;">
        <el-button class="addbtn" size="small" type="primary">+新增</el-button>
      </div>
    </div>
    
    <div class="table">
      <el-table border :data="tableData" style="width: 100%"  max-height="450">
        <el-table-column prop="id" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="300">
          <template slot-scope="scope">
            <div @click="treeClick(scope.row,scope.$index)" style="cursor: pointer;">
              <template v-if="scope.row.children && scope.row.children.length > 0">
                <i class="el-icon-arrow-down" :style="'margin-left:'+(scope.row.level-1)*2+'em;'" v-if="scope.row.open"></i>
                <i class="el-icon-arrow-right" :style="'margin-left:'+(scope.row.level-1)*2+'em;'" v-else></i>
                <span >{{ scope.row.department }}</span>
              </template>
              <span v-else :style="'margin-left:'+(scope.row.level-1)*2+'em;'">{{ scope.row.department }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="部门电话" width="180">
        </el-table-column>
        <el-table-column prop="desc" label="部门说明">
        </el-table-column>
        <el-table-column label="操作" width="185" fixed="right"  header-align="center" align="center">
              <el-button size="small" >编辑</el-button>
              <el-button size="small" type="danger" >删除</el-button>
          </el-table-column>
      </el-table>
    </div>
    
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
        tableData:[{
          id:"1",
          department: '攀枝花市西区',
          phone: '58746661',
          level: 1,
          desc:'民主法治，社会治理，民生保障',
          children:[{
            id:"11",
            department: '区委部门',
            phone: '58746661',
            level: 2,
            desc:'民主法治，社会治理，民生保障',
            children:[{
              id:"111",
              department: '西区区委',
              phone: '58746661',
              level: 3,
              desc:'民主法治，社会治理，民生保障',
            },{
              id:"112",
              desc:'民主法治，社会治理，民生保障',
              department: '区委宣传部',
              level: 3,
              phone: '58746661',
            },{
              id:"113",
              desc:'民主法治，社会治理，民生保障',
              department: '西区区纪委',
              level: 3,
              phone: '58746661',
            }]
          },{
            id:"12",
            desc:'民主法治，社会治理，民生保障',
            department: '人大政府办',
            level: 2,
            phone: '58746661',
          },{
            id:"13",
            desc:'民主法治，社会治理，民生保障',
            department: '法检两院',
            level: 2,
            phone: '58746661',
          },{
            id:"14",
            desc:'民主法治，社会治理，民生保障',
            department: '群团组织',
            level: 2,
            phone: '58746661',
          }]
        },{
          id:"2",
            desc:'民主法治，社会治理，民生保障',
            department: '其他组织',
            level: 1,
            phone: '58746661',
            children:[{
              id:"21",
              desc:'民主法治，社会治理，民生保障',
              department: '格里坪镇人民政府',
              level: 2,
              phone: '58746661',
            },
            {
              id:"22",
              desc:'民主法治，社会治理，民生保障',
              department: '摩梭河街道办事处',
              level: 2,
              phone: '58746661',
            },
            {
              id:"23",
              desc:'民主法治，社会治理，民生保障',
              department: '大宝鼎街道办事处',
              level: 2,
              phone: '58746661',
            },
            {
              id:"24",
              desc:'民主法治，社会治理，民生保障',
              department: '河门口街道办事处',
              level: 2,
              phone: '58746661',
            },
            {
              id:"25",
              desc:'民主法治，社会治理，民生保障',
              department: '清香坪街道办事处',
              level: 2,
              phone: '58746661',
            }]
        }]
      }
    },
    methods:{
      menuADd(){},
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
      }
    },
    mounted(){
     this.tableData = treeTableXcode(this.tableData)
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
}
</style>
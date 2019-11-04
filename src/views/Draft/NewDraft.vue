<template>
  <div class="newDraftPage">
    <div style="padding:10px;background:#fff;border-radius:10px">
        <!-- <el-form ref="form" :model="draftForm" label-width="80px" >
          <el-form-item label="案由：" prop="brief">
            <el-input v-model="draftForm.brief"></el-input>
          </el-form-item>
           <el-form-item label="分类选择" prop="type">
            <el-select v-model="draftForm.type" placeholder="请选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="ueditor"  label="文章内容" prop="articleContent">
           <UE :id="id" :config="config"  ref="ue"></UE>
          </el-form-item>
        </el-form> -->
        <div class="row" style="border-top:1px solid  #ccc">
          <div class="lable">案由：</div>
          <div class="content">
            <el-input v-model="draftForm.brief"></el-input>
          </div>
        </div>
        <div class="row">
          <div class="lable">分类选择：</div>
          <div class="content">
            <el-select v-model="draftForm.type" placeholder="请选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="lable">文章内容：</div>
          <div class="content">
             <UE :id="id" :config="config"  ref="ue"></UE>
             <div class="upload">
               <div></div>
               <div>上传附件</div>
             </div>
          </div>
        </div>

    </div>
    <div style="padding:10px;background:#fff;border-radius:10px;margin-top:15px;">
      <kt-table :height="90" :columns="filterColumns" :data="pageResult"></kt-table>
    </div>
    <div class="commit_btn">
      <el-button type="primary"  @click="addCheckerDialog = true">增加复议人</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="danger">关闭</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="addCheckerDialog" width="40%">
      <div style="width: 180px;margin-bottom: 5px;">
        <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="serChecker"> </el-input>
      </div>
      <div class="checker">
        <el-table :data="CheckerData" border style="width: 100%">
          <el-table-column prop="name" align="center" label="姓名" >
          </el-table-column>
          <el-table-column prop="address" align="center" label="通讯地址" >
          </el-table-column>
          <el-table-column prop="phone" align="center" label="联系电话">
          </el-table-column>
          <el-table-column  align="center" label="操作" >
            <template  slot-scope="scope">
              <el-button type="text" icon="el-icon-circle-plus-outline">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 5px"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size='pageSize'
          layout="prev, pager, next"
          :total="total">
        </el-pagination>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCheckerDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCheckerDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import KtTable from "@/views/Core/KtTable"
  import UE from '@/components/Ueditor'
  export default {
    components:{
      UE,
      KtTable
    },
    data() {
      return {
        serChecker:'',//筛选复议人
        columns:[],
        pageResult:{},
        filterColumns:[],
        draftForm:{
          brief:'',
          type:'',
          articleContent:''
        },
        config: {//eu配置项
          initialFrameWidth: null,
          initialFrameHeight: 300
        },
        id: 'container',// 不同编辑器必须不同的id
        addCheckerDialog:false,//添加复议人弹窗
        CheckerData:[
            {
                id: 1,
                name:'张三',
                address:'xxxx',
                phone:'15123420202'
            },
            {
                id: 2,
                name:'李四',
                address:'zzzz',
                phone:'15123420202'
            },
            {
                id: 3,
                name:'王五',
                address:'aaaa',
                phone:'15123420202'
            },
            {
                id: 4,
                name:'马六',
                address:'ssss',
                phone:'15123420202'
            }
        ],//复议人数据
        currentPage: 1,// 当前页数
        pageSize:4,// 每页条数
        total:20, // 总条目数
      }
    },
    methods:{
      getEdiotrContent () {
        let content = this.$refs.ue.getUEContent() // 调用子组件方法
        this.draftForm.articleContent = content
      },
     initColumns(){
        this.columns = [
          {prop:'name',label:'姓名',minWidth:70},
          {prop:'title',label:'通讯地址',minWidth:80},
          {prop:'time',label:'联系电话',minWidth:80}
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns))
      },
      //增加复议人数据初始化
      getChecker(){

      },
      addChecker(){

      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          console.log(val)
          console.log(`当前页: ${val}`);
          this.hotcourse = res.data.slice((val-1)*this.pageSize,val*this.pageSize)
      },
    },
    mounted(){
      this.initColumns()
    }
  }
</script>
<style lang="scss">
.newDraftPage{
  padding:30px;
  .row{
    display: flex;
    border-bottom:1px solid #ccc;
    border-left: 1px solid  #ccc;
    border-right: 1px solid  #ccc;
    .lable{
      width: 6%;
      text-align: left;
      border-right: 1px solid  #ccc;
      padding: 5px
    }
    .content{
      width: 94%;
      text-align: left;
     padding: 5px 0;
    }
    .upload{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      border-top: 1px solid #ccc;
    }
  }
}
.edui-default .edui-editor,.edui-default .edui-editor-bottomContainer td{
  border:none !important;
}
.commit_btn{
  margin-top: 25px;
  .el-button{
    margin-left: 40px;
  }
}
  .checker{
    .el-table td, .el-table th {
      padding: 2px 0;
    }
  }
</style>

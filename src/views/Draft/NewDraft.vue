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
    <div>

    </div>
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
        columns:[],
        pageResult:{},
        filterColumns:[],
        draftForm:{
          brief:'',
          type:'',
          articleContent:''
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 300
        },
        id: 'container',// 不同编辑器必须不同的id
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
      }
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
</style>
<template>
  <el-scrollbar style="height: calc(100% - 35px)">
    <div class="mergePage">
        <div class="proposalList">
          <div class="titleTool">
            <div>提案待合并列表</div>
            <div  style="padding-right: 15px;"><el-button type="primary">完成</el-button></div>
          </div>
          <div class="listContent" >
            <div class="listInfo"   v-for="(list,index) in mergedata" :key="list.id">
              <div class="infoLeft">
                <div class="leftContent">
                  <div style="display: flex;flex-direction: row;justify-content: space-between">
                    <div>提案标题：<span>{{list.title}}</span></div>
                    <div>提案分类：<span>{{list.typeName}}</span></div>
                  </div>
                  <div style="margin-top: 20px">提案内容：<span>{{list.tiancontent}}</span></div>
                </div>
                <div class="leftOther">
                  <div>提案人：<span>{{list.tianren}}</span></div>
                  <div><el-button type="text" @click="toPrco(list.id)">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns" >
                  <el-button size="small" type="info" @click="leaveMerge(index,list)">移出合并</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="proposalList">
        <div class="titleTool">
          <div>审核通过列表</div>
          <div  style="padding-right: 15px;"><el-button type="primary" @click="toNumberProposal">提交</el-button></div>
        </div>
        <div class="listContent">
          <div class="proType"  v-for="(item,indexi) in data" :key="item.name" >
            <div>
              {{item.name}}
            </div>
            <div class="listInfo"  :ref="'list'+list.id" v-for="(list,index) in item.list" :key="list.id">
              <div class="infoLeft">
                <div class="leftContent">
                  <div style="display: flex;flex-direction: row;justify-content: space-between">
                    <div>提案标题：<span>{{list.title}}</span></div>
                    <div>提案分类：<span>{{list.typeName}}</span></div>
                  </div>
                  <div style="margin-top: 20px">提案内容：<span>{{list.tiancontent}}</span></div>
                </div>
                <div class="leftOther">
                  <div>提案人：<span>{{list.tianren}}</span></div>
                  <div><el-button type="text" @click="toPrco(list.id)">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns" >
                  <el-button size="small" type="primary" @click="editProposal(list)">编辑提案</el-button>
                  <el-button size="small" type="success" @click="addMerge(indexi,index,list)">添加到合并</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="编辑" :visible.sync="dialogMerge" width="50%" top="5vh">
        <div>
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
                <el-option label="经济建设与发展" value="经济建设与发展"></el-option>
                <el-option label="科教文卫" value="科教文卫"></el-option>
                <el-option label="民主法治，社会治理，民生保障" value="民主法治，社会治理，民生保障"></el-option>
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
        <div>
          <el-table border :data="proposalData" style="width: 100%;margin-top: 8px"  height="145">
            <el-table-column prop="name" label="姓名" >
            </el-table-column>
            <el-table-column prop="address" label="通讯地址" >
            </el-table-column>
            <el-table-column  prop="phone" label="联系电话">
            </el-table-column>
          </el-table>
        </div>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogMerge = false">取 消</el-button>
          <el-button type="primary" @click="dialogMerge = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
    import UE from '@/components/Ueditor'
    export default {
        components:{
            UE
        },
        name: "index",
        data(){
            return {
                data:[
                    {
                        type:1,
                        list:[{
                            id: 1,
                            title:'测试一',
                            typeName:'经济建设与发展',
                            tianren:'张三',
                            tiancontent:'测试1xxxxxxxxxxxxxxx',
                            ishebing:false
                        },
                            {
                                id: 2,
                                title:'测试2',
                                typeName:'经济建设与发展',
                                tianren:'张三',
                                tiancontent:'测试2xxxxxxxxxxxxxxx',
                                ishebing:false
                            },
                            {
                                id: 3,
                                title:'测试3',
                                typeName:'经济建设与发展',
                                tianren:'张三',
                                tiancontent:'测试3xxxxxxxxxxxxxxx',
                                ishebing:false
                            }],
                        name:'经济建设与发展'
                    },
                    {
                        type:2,
                        list:[{
                            id: 7,
                            title:'测试7',
                            typeName:'科教文卫',
                            tianren:'李四',
                            tiancontent:'测试xxxxxxxxxxxxxxx',
                            ishebing:false
                        },
                            {
                                id: 8,
                                title:'测试8',
                                typeName:'科教文卫',
                                tianren:'李四',
                                tiancontent:'测试xxxxxxxxxxxxxxx',
                                ishebing:false
                            },
                            {
                                id: 9,
                                title:'测试9',
                                typeName:'科教文卫',
                                tianren:'李四',
                                tiancontent:'测试xxxxxxxxxxxxxxx',
                                ishebing:false
                            }],
                        name:'科教文卫'
                    },
                    {
                        type:3,
                        list:[{
                            id: 4,
                            title:'测试4',
                            typeName:'民主法治，社会治理，民生保障',
                            tianren:'王五',
                            tiancontent:'测试xxxxxxxxxxxxxxx',
                            ishebing:false
                        },
                            {
                                id: 5,
                                title:'测试5',
                                typeName:'民主法治，社会治理，民生保障',
                                tianren:'王五',
                                tiancontent:'测试xxxxxxxxxxxxxxx',
                                ishebing:false
                            },
                            {
                                id: 6,
                                title:'测试6',
                                typeName:'民主法治，社会治理，民生保障',
                                tianren:'王五',
                                tiancontent:'测试xxxxxxxxxxxxxxx',
                                ishebing:false
                            }],
                        name:'民主法治，社会治理，民生保障'
                    }],
                mergedata:[],
                dialogMerge:false,
                draftForm:{
                    brief:'',
                    type:'',
                    articleContent:''
                },
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 300,
                    enableAutoSave: false,
                },
                id: 'container',
                proposalData:[{
                    name:'张三',
                    address:'重庆市沙坪坝区大学城东路21号',
                    phone:'15123410878'
                },{
                    name:'李四',
                    address:'重庆市沙坪坝区大学城东路21号',
                    phone:'15123410778'
                },{
                    name:'李四',
                    address:'重庆市沙坪坝区大学城东路21号',
                    phone:'15123410778'
                }]
            }
        },
        methods:{
            //编辑提案
            editProposal(list){
                this.dialogMerge = true;
                this.draftForm = {
                    brief: list.title,
                    type: list.typeName
                }
                console.log(this.$refs)
                console.log(list.tiancontent)
                this.$refs['ue'].setContent(list.tiancontent)
            },
            //获取uedit content
            getEdiotrContent () {
                let content = this.$refs['ue'].getUEContent() // 调用子组件方法
                this.draftForm.articleContent = content
            },
            //添加到合并区域
            addMerge(indexi,index,list){
                this.data[indexi].list.splice(index,1)
                this.mergedata.push(list)
                console.log(this.mergedata)
            },
            //跳转到提案内容详情页面
            toPrco(id){
                this.$router.push('/proposalContent')
            },
            //合并完成，前往提案标号页面
            toNumberProposal(){
                this.$router.push('/proposalNumber')

            },
            //移除合并区域提案
            leaveMerge(index,list){
                this.mergedata.splice(index,1)
                this.data.forEach((c)=>{
                    if(c.name === list.typeName) {
                        c.list.push(list)
                    }
                })

            }
        }
    }
</script>

<style scoped lang="scss">
.mergePage{
  padding: 30px;
  .proposalList{
    text-align: left;
    border-radius: 10px;
    background: #ffffff;
    padding:15px 10px;
    margin-bottom: 30px;
    .titleTool{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .listContent{
      .proType{
        background: lightyellow;
        padding: 10px 20px;
        margin-bottom: 15px;
      }
      .listInfo{
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        .infoLeft{
          width: 85%;
          border:1px solid #ccc;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .leftContent{
            display: flex;
            flex-direction: column;
            text-align: left;
            padding: 20px 10px; ;
          }
          .leftOther{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            line-height: 40px;
            border-top: 1px solid #ccc;
            padding: 0 10px;
          }
        }
        .infoRight{
          width:15%;
          border-bottom: 1px solid #ccc;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          .btns{
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .el-button--small{
              margin-top: 15px;
              display: block;
            }
          }
        }
      }
    }
  }
  .row{
    display: flex;
    border-bottom:1px solid #ccc;
    border-left: 1px solid  #ccc;
    border-right: 1px solid  #ccc;
    .lable{
      width: 8%;
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
</style>

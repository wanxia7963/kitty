<template>
    <div class="proposalListPage">
      <div class="proposalList">
        <div class="titleTool">
          <div>待办提案列表</div>
          <div style="padding-right: 15px;"><el-button type="primary" @click="toMergeProposal">提案合并</el-button></div>
        </div>
        <div class="listContent">
            <div class="listInfo">
              <div class="infoLeft">
                <div class="leftContent">
                  <div style="display: flex;flex-direction: row;justify-content: space-between">
                    <div>提案标题：<span>提案标题内容</span></div>
                    <div>提案分类：<span>民主法制，社会治理，民生保障</span></div>
                  </div>
                  <div style="margin-top: 20px">提案内容：<span>提案内容XXXXXXXXXXXXXXXXXXXXXX</span></div>
                </div>
                <div class="leftOther">
                  <div>提案人：<span>张三</span></div>
                  <div><el-button type="text" @click="toPrco">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns">
                  <el-button size="small" type="primary" @click="editProposal()">编辑</el-button>
                  <el-button size="small" type="success">成功按钮</el-button>
<!--                  <el-button size="small" type="info">信息按钮</el-button>-->
<!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
            <div class="listInfo">
            <div class="infoLeft">
              <div class="leftContent">
                <div>
                  <div>提案标题：<span>提案标题内容</span></div>
                  <div>提案分类：<span>民主法制，社会治理，民生保障</span></div>
                </div>
                <div>提案内容：<span>提案内容XXXXXXXXXXXXXXXXXXXXXX</span></div>
              </div>
              <div class="leftOther">
                <div>提案人：<span>张三</span></div>
                <div><el-button type="text">点击查看详情>></el-button></div>
              </div>
            </div>
            <div class="infoRight">
              <div class="btns">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="success">提交</el-button>
                <el-button size="small" type="danger">退回</el-button>
                <el-button size="small" type="primary">转交</el-button>
                <el-button size="small" type="primary">交办</el-button>
                <el-button size="small" type="primary">指派</el-button>
                <el-button size="small" type="primary">签收</el-button>
                <el-button size="small" type="primary">汇报进度</el-button>

                <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
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
                draftForm:{
                    brief:'',
                    type:'',
                    articleContent:''
                },
                dialogMerge:false,
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
                }],
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 300,
                    enableAutoSave: false,
                },
                id: 'listUE',
            }
        },
        methods:{
            //编辑提案
            editProposal(){
                this.dialogMerge = true;
                this.draftForm = {
                    brief: '提案标题',
                    type: '经济建设与发展'
                }
                var content = '提案内容xxxxxxxx'
                console.log(this)
                // this.$refs.ue.setContent(content)
            },
            //输出内容
            getEdiotrContent () {
                let content = this.$refs.ue.getUEContent() // 调用子组件方法
                this.draftForm.articleContent = content
            },
            //前往提案内容详情页面
            toPrco(){
                this.$router.push('/proposalContent')
            },
            toMergeProposal(){
                this.$router.push('/mergeProposal')
            }
        }
    }
</script>

<style lang="scss" scoped>
  .proposalListPage{
    padding:30px;
    .proposalList{
      text-align: left;
      border-radius: 10px;
      background: #ffffff;
      padding:15px 10px;
      .titleTool{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .listContent{

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

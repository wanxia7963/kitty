<template>
    <div class="proposalListPage">
      <div class="proposalList">
        <div class="titleTool">
          <div>待办提案列表</div>
          <div style="padding-right: 15px;"><el-button type="primary" @click="toMergeProposal">合并提案</el-button></div>
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
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                draftForm:{
                    brief:'',
                    type:'',
                    articleContent:''
                },
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
                this.$refs.ue.setContent(content)
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
  }
</style>

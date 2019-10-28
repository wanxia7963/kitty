<template>
    <div class="mergePage">
      <div class="proposalList">
        <div class="titleTool">
          <div>提案待合并列表</div>
          <div  style="padding-right: 15px;"><el-button type="primary">完成</el-button></div>
        </div>
        <div class="listContent">

        </div>
      </div>
      <div class="proposalList">
        <div class="titleTool">
          <div>审核通过列表</div>
          <div  style="padding-right: 15px;"><el-button type="primary">提交</el-button></div>
        </div>
        <div class="listContent">
          <div class="proType">
            <div>
              民主法制，社会治理，民生保障
            </div>
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
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
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
                  <div><el-button type="text">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns">
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
          </div>
          <div class="proType">
            <div>
              民主法制，社会治理，民生保障
            </div>
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
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
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
                  <div><el-button type="text">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns">
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
          </div>
          <div class="proType">
            <div>
              民主法制，社会治理，民生保障
            </div>
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
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
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
                  <div><el-button type="text">点击查看详情>></el-button></div>
                </div>
              </div>
              <div class="infoRight">
                <div class="btns">
                  <el-button size="small" type="primary">编辑提案</el-button>
                  <el-button size="small" type="success">添加到待合并区</el-button>
                  <!--                  <el-button size="small" type="info">信息按钮</el-button>-->
                  <!--                  <el-button size="small" type="danger">危险按钮</el-button>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
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
}
</style>

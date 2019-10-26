<template>
  <div class="setDatePage">
    <div class="background">
      <div class="formContent">
        <el-form ref="form" label-position="right" :model="form" label-width="100px" size="mini">
          <el-form-item label="预警：">
            <el-input v-model="form.wariningData" placeholder="请输入预警天数"></el-input>
          </el-form-item>
          <el-form-item label="黄牌：">
            <el-input v-model="form.yellowDate" placeholder="请输入预警天数"></el-input>
          </el-form-item>
          <el-form-item label="红牌：">
            <el-input v-model="form.redDate" placeholder="请输入预警天数"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示：">
            <p style="text-align:left">"_"代表提前，"+"代表延后</p>
          </el-form-item>
          <el-form-item class="submitBtn">
            <el-button>取消</el-button>
            <el-button type="primary"  style="margin-left:50px">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form:{
          wariningData:'',
          yellowDate:'',
          redDate:''
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
.setDatePage{
  padding:30px;
  .background{
    background: #fff;
    height: 700px;
    border-radius: 15px;
  }
  .formContent{
    width: 500px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 150px
  }
  .submitBtn{
    margin-top: 20px
  }
}
</style>
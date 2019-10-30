<template>
    <div class="loginPage">
<!--        <img src="/img/bg/登录背景.png" class="backgroudImg">-->
        <div class="loginTitle">
            <p>提案在线系统</p>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户登陆</span>
            </div>
            <el-form label-width="80px" ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input
                            type="text"
                            class="userInput"
                            prefix-icon="el-icon-my-username"
                            auto-complete="off"
                            placeholder="请输入登陆ID"
                            v-model="loginForm.account">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            class="passInput"
                            prefix-icon="el-icon-my-password"
                            auto-complete="off"
                            placeholder="请输入密码"
                            v-model="loginForm.password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="rember">
                        <div>
                            <el-checkbox v-model="checked" checked>记住密码</el-checkbox>
                            <a style="margin-left: 20px">忘记密码？</a>
                        </div>
                        <div>
                            <a style="margin-right: 20px">APP下载</a>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               class="login-submit loginbtn"
                               @click.native.prevent="handleLogin">登陆
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    account: '',
                    password: ''
                },
                rules:{
                    account: [{required: true, message: '请输入你的账户', trigger: 'blur'}],
                    password: [{required: true, message: '请输入你的密码', trigger: 'blur'}]
                },
                checked:true
            }
        },methods:{
            handleLogin(){

              this.$refs.loginForm.validate(valid=>{
                  if(valid){
                      const loading = this.$loading({
                          lock: true,
                          text: '登陆中',
                          spinner: 'el-icon-loading',
                          background: 'rgba(0, 0, 0, 0.7)'
                      });
                      console.log(this)
                      this.$store.dispatch("loginByUsername",this.loginForm)
                          .then(()=>{
                              console.log(1)
                              this.$router.push({path:'/index'})
                              loading.close()
                          }).catch(()=>{
                              console.log(2)
                              loading.close()
                      })
                  }
              })
            }

        }
    }
</script>

<style lang="scss">
.loginPage{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url("../../assets/bg/登录背景.png") 0 bottom repeat-x;
  .loginTitle p{
    color: #49a0f9;
    font-size: 40px;
    letter-spacing: 7px;
  }
}

.el-card__header {
  border-bottom: none;
}
.el-card__body{
  padding: 20px 40px 0;
}


.clearfix {
  text-align: center;
  span {
    letter-spacing: 6px;
    font-size: 26px;
    color: #49a0f9;
  }
}

.el-card {
  width: 610px;
  height: 423px;
  margin: 0 auto;
  background: url("../../assets/bg/登录背景框.png") 0 bottom repeat-x;
  border: none;
}

.userInput .el-input__inner,.passInput .el-input__inner {
  height: 55px;
  border: 3px solid #1f70ac;
  background-color: rgba(255, 255, 255, 0.1);
  padding-left: 55px !important;
  color: #cccccc;
  font-size: 18px;
}
.userInput .el-input__inner:focus,.userInput .el-input__inner:hover,.passInput .el-input__inner:focus,.passInput .el-input__inner:hover{
  border-color: #1f70ac;
}

.userInput .el-input__inner::placeholder,.passInput .el-input__inner::placeholder{
  font-size: 18px;
  color: #cccccc;
  letter-spacing: 5px;
}

.loginbtn {
  width: 100%;
  height: 55px;
  background-color: #49a0f9;
  font-size: 26px;
  letter-spacing: 6px;
}

.el-icon-my-username{
  background: url(../../assets/icons/用户名.png) center no-repeat;
  background-size: cover;
  width: 22px;
  height: 24px;
}
.el-icon-my-password{
  background: url(../../assets/icons/密码.png) center no-repeat;
  background-size: cover;
  width: 22px;
  height: 24px;
}
.el-input__prefix{
  left: 20px;
  top: 15px;
}
.rember {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .el-checkbox{
    font-size: 18px;
    color: white;
    .el-checkbox__label{
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
  .el-checkbox__input.is-checked + .el-checkbox__label{
    color: #49a0f9;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    color: #49a0f9;
    background-color:#49a0f9;
  }
  a{
    font-size: 18px;
    color: white;
    letter-spacing: 2px;
  }
}

</style>

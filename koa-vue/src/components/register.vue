<template>
  <div>
    <div class="login-other">
      <el-form class="loginContainer" >
        <h3 class="loginTitle">花驿小栈</h3>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            size="normal"
            type="text"
            v-model="username"
            auto-complete="off"
            placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input
            prefix-icon="el-icon-lock"
            size="normal"
            type="password1"
            v-model="password1"
            auto-complete="off"
            placeholder="请输入密码">
            </el-input>
        </el-form-item>
         <el-form-item prop="password2">
          <el-input
            prefix-icon="el-icon-lock"
            size="normal"
            type="password2"
            v-model="password2"
            auto-complete="off"
            placeholder="请再次输入密码">
            </el-input>
        </el-form-item>
        <el-button size="normal" type="primary" style="width: 100%" @click="checkLogin()">注册</el-button>
        <a @click="denglu" id="zhuce">返回登录</a>
      </el-form>
    </div>
  </div>
</template>

<script>
import lcookie from "../util/cookie";
export default {
  name: "LoginMain",
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      salt:'d9b1d7db4cd6e70935368a1efb10e377',//加密盐值，可以改
      checked: true,
    };
  },
  methods: {
    checkLogin: function () {
      let username = this.username
      let password1 = this.password1
      let password2 = this.password2
      console.log(username==="");
      //给密码加密，跨域访问后端拿数据
      if(username===""||password1===""||password2===""){
        alert("信息不完整")
      }else{
        if(password1===password2){
          let password =this.$md5(this.$md5(this.password1)+this.salt)
          console.log(password);
          this.$axios.post("/apis/creatUserOK",{
            userid:0,
            username: username,
            password:password,
            phone: username,
            salt:this.salt,
            roleid:3
            }).then((response) => {
              if(response.data.success){
                alert("用户注册成功")
              }
            });
        }else{
          alert("密码不一致，请重新输入")
        }
      }
      
      
    },
    denglu: function () {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.login-other {
  z-index: 1;
  margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
  position: absolute;
}

.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fefefe;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #707070;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}
#zhuce:hover {
  color: red;
}
#zhuce {
  color: rgb(177, 144, 171);
}
</style>
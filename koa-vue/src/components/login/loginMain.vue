<template>
  <div>
    <div class="login-other">
            <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
                <h3 class="loginTitle">花驿小栈</h3>
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" size="normal" type="text" v-model="loginForm.username"
                              auto-complete="off"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" size="normal" type="password" v-model="loginForm.password"
                              auto-complete="off"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-checkbox size="normal" class="loginRemember" v-model="checked">记住密码</el-checkbox>
                <el-button size="normal" type="primary" style="width: 100%;" @click="checkLogin">登录</el-button>
                <a @click="zhuce" id="zhuce">无账号，点击注册</a>
            </el-form>
        </div>
    <!-- 账号密码错误提示 -->
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
        <template slot="extra">
          <el-button type="primary" size="medium">返回</el-button>
        </template>
      </el-result>
    </el-col>
   
  </div>
</template>

<script>
import lcookie from "../../util/cookie";
export default {
  name: "LoginMain",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
       checked: true,
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" },],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    checkLogin: function () {
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      if (username == "" || this.password == "") {
        alert("用户名或密码不能为空");
      } else {
        this.$axios
          .post("/apis/loginGetToken", {
            phone: username,
            password: password,
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
            if (res.success) {
              // 以json格式传给setCookie方法存入信息,方法里面会循环遍历该json以单个数据存储的方式，多次存入cookie中
              // 注：cookie不支持直接以json的方式存入
              let loginInfo = {
                LoginName:"cc",
                token: res.data.token,
                username:username,
                admin:"admin",
                userid:res.data.userid
              };
              // 调用setCookie方法，同时传递需要存储的数据，保存天数
              lcookie.setCookie(loginInfo, 7);
              console.log(lcookie.getCookie('userid'));
              console.log("登录正确");
              location.href = "/";
            } else {
              alert("密码或账号错误");
            }
          });
      }
    },
    zhuce:function(){
      this.$router.push({name:'register'})
    }
   
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
#zhuce:hover{
  color: red;
}
#zhuce{
  color: rgb(177, 144, 171);
}
</style>
<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
      <h2>花驿小栈后台管理</h2>
      </div>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 左侧路由跳转 -->
      <el-aside width="200px">
        <nav-main :userMain="userMain" :roleMain="roleMain" :GoodsList="GoodsList" :EchartsUser="EchartsUser"/>
      </el-aside>
      <!-- 右侧主页显示 -->
      <el-main>
        <keep-alive>
          <component :is="iscom"></component>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import FirstMain from "./First/FirstMain.vue";
import NavMain from "./First/navMain.vue";
import UserMain from "./First/UserMain2.vue";
import RoleMain from "./First/RoleMain.vue";
import GoodsList from "./First/GoodsList.vue";
import EchartsUser from "./First/Echarts_User.vue";


export default {
  name: "HelloWorld",
  components: {
    FirstMain,
    NavMain,
    UserMain,
    RoleMain,
    GoodsList,
    EchartsUser
  },
  data() {
    return {
      iscom: "FirstMain",
      chzf: false,
    };
  },
  methods: {
    userMain: function () {
      //路由跳转首页
      this.iscom = "UserMain";
    },
    roleMain: function () {
      this.iscom = "RoleMain";
    },
    GoodsList: function () {
      this.iscom = "GoodsList";
    },
    EchartsUser:function(){
      this.iscom = "EchartsUser"
    }
    
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545d64;
  color: #333;
  text-align: center;
  /* line-height: 100%; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-main{
  /* background-color: aqua; */
  height: 800px;
}
</style>


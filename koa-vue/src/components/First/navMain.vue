<!-- <template>
  <div>
    <div class="div-nav">
      <ul class="nav">
        <li @click="userMain()">用户管理</li>
        <li @click="roleMain()">角色管理</li>
        <li @click="GoodsList()">商品管理</li>
        <li @click="logout()">退出登录</li>
        <li></li>
      </ul>
    </div>
  </div>
</template> -->
<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="1-1" @click="EchartsUser()">用户图表</el-menu-item>
            <el-menu-item index="1-2"  @click="userMain()">用户管理</el-menu-item>
            <el-menu-item index="1-3" @click="roleMain()">角色管理</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="GoodsList()">商品管理</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">商家管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title" @click="logout()">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import lcookie from "../../util/cookie";

export default {
  name: "navMain",
  props: ["userMain", "roleMain", "GoodsList","EchartsUser"],
  methods: {
    logout: function () {
      lcookie.clearCookie("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.nav {
  list-style: none;
  width: auto;
  line-height: 50px;
}
.nav li {
  color: aliceblue;
  padding-top: 10px;
}

/*伪类选择器：必须按顺序写（lvha）
link    1、默认连接状态（未访问）
visited 2、已访问状态
hover   3、鼠标悬浮状态
active  4、鼠标摁上状态(激活选定状态)
*/

.nav li:hover {
  background-color: #4e575e;
}
</style>
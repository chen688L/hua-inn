<template>
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
</template>

<script>
import lcookie from "../../util/cookie";

export default {
  name:'navMain',
  props:['userMain','roleMain','GoodsList'],
  methods: {
    logout: function () {
      lcookie.clearCookie("token");
      this.$router.push({name:'login'})
    },
  },
};
</script>

<style>
*{
    margin: 0;
    padding: 0;
}

.nav{
    list-style: none;
    width: auto;
    line-height: 50px;
}
.nav li{
    color: aliceblue;
    padding-top: 10px;
}

/*伪类选择器：必须按顺序写（lvha）
link    1、默认连接状态（未访问）
visited 2、已访问状态
hover   3、鼠标悬浮状态
active  4、鼠标摁上状态(激活选定状态)
*/
  
.nav li:hover{

    background-color: #4E575E;
}
</style>
<template>
  <div>
    <el-container>
      <el-aside width="400px">
        <el-avatar
          :size="100"
          :src="circleUrl"
          align="center"
        ></el-avatar>
        Cycle

      </el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span @click="checkOrder">查看我的订单</span>
            <el-button @click="offOrder" style="float: right; padding: 3px 0" type="text">关闭我的订单</el-button>
          </div>
          <div class="text item" v-show="showOder">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                prop="title"
                label="商品"
                width="180">
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="address"
                label="填写地址">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="填写的手机">
              </el-table-column>
          </el-table>
          </div>
          <div class="text item">
            <p>{{ "圣诞节倒计时分享一些节日魔法，包括鲜花、礼物等等"  }}</p>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      circleUrl:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      tableData:[],
      showOder:false
    }
  },
  methods:{
    checkOrder: function () {
      this.$axios.post("/apis/getOrdersListByID",{
        userid:this.cookie.getCookie('userid')
      }).then((response) => {
        let orders = response.data.data.orders;
        console.log(typeof roles); //JSON.parse(JSON.stringify(object对象类型1))对象不能直接赋值
        this.tableData = orders;
        console.log(this.tableData);
        this.showOder = true
      });
  },
  offOrder:function(){
    this.showOder = false
  }
}
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  p{
    font-family: "Helvetica Neue";
  }
</style>
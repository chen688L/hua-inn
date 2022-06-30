<template>
  <div id="GoodsList">
    <!-- 搜索栏 -->
    <div id="seacher_goods">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        size="small"
        style="width: 350px"
        clearable
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="checkGoods"
        size="mini"
        >搜索</el-button
      >
    </div>
    <!-- 数据表格 -->
    <div>
   <el-table
    :data="tableData"
    style="width: 80%;margin: auto;padding-top: 30px;padding-left: 200px"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
    <el-table-column prop="user1.username" label="商家" sortable width="180"></el-table-column>
    <el-table-column prop="title" label="商品" sortable width="180"></el-table-column>
    <el-table-column prop="stole" label="数量" sortable width="180"></el-table-column>
    <el-table-column prop="price" label="价格" sortable width="180"></el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tableData: [],
        input:''
    };
  },
  created(){
      this.$axios.get("/apis/getUserNum",{
      }).then((response) => {
        this.goodsnum = response.data.data.goodsnum;
    });
  },
  methods: {
    formatter(row, column) {
        return row.address;
      },
    checkGoods(){
        this.$axios.post("/apis/getGoodsList").then((response) => {
          let goods = response.data.data.goods;
          this.tableData = goods
          console.log(this.tableData[0].title);
        });
    }
  },
};
</script>

<style>
#GoodsList {
  background-color: white;
  height: 100%;
}
#seacher_goods {
  padding-top: 20px;
}
</style>
<!-- <template>
  <div id="fenlei">
  
    <table id="fenlei_tab">
      <tr>
        <th>编号</th>
        <th>名称</th>
        <th>单价</th>
        <th>库存量</th>
        <th>购买</th>
        <th>金额</th>
        <th>详情</th>
      </tr>
      <tr v-for="(item, index) in cards" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.title }}</td>
        <td>￥{{ item.price }}</td>
        <td>{{ item.stole }}</td>
        <td>
          <el-button  @click="min(index)" type="primary" icon="el-icon-minus"></el-button>
          <input type="text" v-model="item.order" style="width:30px" height="30px" disabled/>
          <el-button  @click="add(index)" type="primary" icon="el-icon-plus"></el-button>
        </td>
        <td>￥{{ item.total }}</td>
        <td><el-button type="info"  @click="good(index)" plain>详 情</el-button></td>
      </tr>
      <tr class="end">
        <td colspan="4">总额</td>
        <td colspan="3">￥{{ mytotal }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name:'fenlei',
  props:['cards','add','min','good'],
  data(){
    return{
      mt:0.0
    }
  },
  computed:{    //computed计算属性可以用来绑定动态变量，而且它可以实时刷新，并且也可以在watch中监控
    mytotal: function () {
      let mt = 0.0;
      let total = 0;
      for (let i = 0; i < this.cards.length; i++) {
        total = this.cards[i].order*this.cards[i].price;
        mt += total;
      }
      return mt;
    }
  },
  
};
</script>

<style>
#fenlei_tab{
  width:100%;
  text-align: center;
  border-spacing: 30px 30px;/**设置行间距 */
}
#fenlei{
  height: 500px;
}

</style> -->
<template>
  <div>
    <el-row>
      <el-col
        :span="5"
         v-for="(item, index) in cards" 
         :key="index"
         :offset="index > 0 ? 1 : 0"
      >
        <el-card :body-style="{ padding: '45px'}" >
          <img
            :src="item.img"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.price }}元</time>
            </div>
            <el-button type="info"  @click="good(index)" plain>详 情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "fenlei",
  props: ["cards",  "good"],
  data() {
    return {
      mt: 0.0,
    };
  },
};
</script>

<style>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 300px;
    height: 300px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
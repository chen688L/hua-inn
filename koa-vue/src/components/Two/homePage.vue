<template>
  <div id="homePage">
    <!-- 轮播图 -->
    <div id="homePage_carousel">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imgs" :key="item.img">
          <img :src="item.img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 卡片列表图 -->
    <div id="card">
      <h1>our christmas collection</h1>
      <table>
        <tr v-for="(item,index) in cards" :key="index">
          <td v-show="index==1">
            <h2 title="点击进入详情页面" @click="good(index)">{{item.title}}</h2>
            <p>{{item.desc}}</p>
          </td>
          <td><img :src="item.card" /></td>
          <td v-show="index==0||index==2">
            <h2 title="点击进入详情页面" @click="good(index)">{{item.title}}</h2>
            <p>{{item.desc}}</p>
          </td>
         
        </tr>
      </table>
    
    </div>
  </div>
</template>

<script>
export default {
  name:'homePage',
  props:["good"],
  data(){
    return{
      imgs:[
        {img:require('../../assets/img/t1.png')},
        {img:require('../../assets/img/t2.png')},
        {img:require('../../assets/img/t5.png')},
        {img:require('../../assets/img/t4.png')},
        // {img:require('../../assets/img/t5.png')},

      ],
      cards:[]
    }
  },
  creaded(){
  },
  beforeMount(){
    this.$axios.post("/apis/getGoods",{
        newsTypeId:1,
        newsNum:3
    }).then((response) => {
      console.log(response.data.data.goods+"123");
      let goods = response.data.data.goods;//获取到user的数据
      // this.myUsers = users;//赋值给前端使用
      // this.usernum = this.myUsers.length
      console.log(goods[0].img);
      this.cards = [
        {card:goods[0].img,desc:goods[0].desc,title:goods[0].title},
        {card:goods[1].img,desc:goods[1].desc,title:goods[1].title},
        {card:goods[2].img,desc:goods[2].desc,title:goods[2].title},
        // {card:require(".../../../static/img/tu16.png")}
      ]
    });
  },
  methods:{

  }
};
</script>

<style>
#homePage{
  width: 60%;
  margin: 0 auto;
}
#homePage_carousel {
  margin-top: 5px;
  height: 250px;
}

#homePage_carousel img{
  width: 1300px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#card{
  margin-top: 100px;
  text-align: center;
}
#card h1{
  font-weight: 100;
  margin-bottom: 20px;
}
#card img{
  width: 300px;
  height: 280px;
  /* margin: 30px; */
  /* margin-left: 100px; */
}
#card h2,p{
  margin: 20px 20px;
}
#card h2:hover{
  color: rgb(241, 78, 146);
}
</style>
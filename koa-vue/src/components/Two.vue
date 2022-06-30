<template>
  <div id="Two">
     <div class="header_search">
      <!-- <img id="seacher_img" src="../assets/logo2.png" /> -->
      <!-- <img id="seacher_img2" src="../assets/logo4.png" /> -->
      <!-- <input class="searchgoods" v-model="searchgoods" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
       
    </div>
  
    <!-- 导航栏 -->
    <div class="header">
      <ul class="headul">
        <li><a @click="firstPage">首页</a></li>
        <li>|</li>
        <li><a @click="fenlei">分类</a></li>
        <!-- <li>|</li>
        <li><a @click="place">广场</a></li> -->
        <!-- <li>|</li> -->
        <!-- <li><a @click="cart">结算</a></li> -->
        <li>|</li>
        <li><a @click="userCenter">个人中心</a></li>
        <li><a class="el-icon-user" @click="logout()">{{returnLogin}}</a>
        </li>
      </ul>
    </div>
        <hr>
    <!-- 内容显示区 -->
    <div id="Two_Center">
      <keep-alive>
        <component :is="Twocom" :cards="cards" :add="add" :min="min" :good="good" :index="myindex" :return_Pro="return_Pro" :cart_cards="cart_cards"></component>
      </keep-alive> 
    </div>
    <div align="center">
        <el-button @click="submit_goods" v-show="jiesuan" type="primary" plain>确认结算</el-button>
    </div>
     
    <el-alert v-show="msg_c"  :title="msg"  type="warning"  center show-icon> </el-alert>
    <div class="deta_footer">
            <h1>proflowers</h1>
            <p>
              帮助&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              花卉指南&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              站点地图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              道德劳动标准&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              客户服务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              会员计划
            </p>
            <p>我们24小时为您服务&nbsp;&nbsp;&nbsp; 088-580-2913</p>
        </div>
  </div>
</template>

<script>
import HomePage from "./Two/homePage.vue";
import UserCenter from "./Two/userCenter.vue";
import CartP from "./Two/cart.vue";
import FenLei from "./Two/fenlei.vue";
import PlaceP from "./Two/place.vue";
import ProDetailed from "./Two/ProDetailed.vue";
import lcookie from "../util/cookie";


export default {
  name: "Two",
  components: {
    HomePage,//首页
    UserCenter,//用户中心
    CartP,//结算页
    FenLei,//分类
    PlaceP,//广场
    ProDetailed,//商品详情页
  },
  data() {
    return {
      fit:"123",
      address: "",
      Twocom: "HomePage",
      searchgoods:"",
      cards:[],//分类的数据，传过去
      cart_cards:[],//提交订单中的列表
      msg:"", //结算按钮错误信息提醒
      msg_c:false,  //结算按钮错误显示
      jiesuan:false,//结算按钮
      returnLogin:"退出登录", //退出登录提示
      url: '../../../static/img/用户1.png', //用户小图标
      myindex:'',//用来帮助详情页，记录是那个商品
    };
  },
  created() {
    this.$axios.post("/apis/getGoods",{
        newsTypeId:1,
        newsNum:5
    }).then((response) => {
      console.log(response.data.data.goods+"123");
      let goods = response.data.data.goods;
      this.cards = goods
      for(let i=0;i<this.cards.length;i++){   
        this.cards[i].total=0
        this.cards[i].num=0
      }
      console.log(typeof("total:"+this.cards[0].total));
      console.log("cards:"+this.cards[0].num);

    });
  },
  

  methods: {
    logout: function () { //退出登录
      lcookie.clearCookie("token");
      this.$router.push({name:'login'})
    },
    // 跳转的操作
    firstPage:function(){
      this.Twocom = "HomePage"
      this.jiesuan=false
      
      console.log(this.cookie.getCookie('userid'));
    },
    fenlei:function(){
      this.Twocom = "FenLei"
      this.jiesuan=true
    },
    place:function(){
      this.Twocom = "PlaceP"
      this.jiesuan=false
    },
    cart:function(){
      this.jiesuan=false
      this.Twocom = "CartP"
    },
    userCenter:function(){
      this.jiesuan=false
      this.Twocom = "UserCenter"
    },
    add:function(i){    //加入商品
      if(this.cards[i].order>=this.cards[i].stole){
        this.msg_c = true
        this.msg = "抱歉亲，库存到达最大值，如需要请等待库存添加"
      }else{
        this.cards[i].order++;
        console.log(this.cards[i].order);
        this.test(i)
      }
    },
    min:function(i){    //减去商品
      if( this.cards[i].order <=0){
      }else{
        this.msg_c = false
        this.cards[i].order--;
        this.test(i)
      } 
    },
    test:function(i){    //商品的增减后单种类型花的总金额
      for(let i=0;i<this.cards.length;i++){
        this.cards[i].total = this.cards[i].price * this.cards[i].order
      }
    },
    good:function(i){//去到商品详情页面
      this.jiesuan = false  //隐藏结算按钮
      this.myindex = i
      this.Twocom = 'ProDetailed'
    },
    return_Pro:function(){  //从商品详情返回商品列表
      this.fenlei()
    },
    submit_goods:function(){  //提交订单
      console.log(this.cards[0].order);
      this.jiesuan=false
      this.Twocom = 'CartP'
      
    },
  },
};
</script>


<style>
#Two{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.kongge{
  height: 130px;
}
#Two_Center {
  margin: 0 auto;
  width: 100%;
}
.header_search{
  margin: 0 auto;
  width: 100%;
}
.searchgoods{
  width: 300px;
  height: 35px;
}
hr{
  border: 0;
  border-bottom:3px solid black
}
.header {
  /* position: fixed; */
  display: block;
  top: 0;
  width: 60%;
  margin: 0 auto;
  /* height: 100px; */
}
.headul {
  line-height: 100px;
  /* background: white; */
  margin-left: 250px;
  
}
.headul li {
  display: inline;
  text-align: center;
  margin-left: 20px;
}
.headul li a {
  padding: 11px 20px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
}
.headul li a:hover {
  color: rgb(241, 78, 146);
}
#seacher_img{
  vertical-align: middle;/*使得文字和图片居中*/
  height: 120px;
  width: 200px;
}
#seacher_img2{
  vertical-align: middle;/*使得文字和图片居中*/
  height: 120px;
  width: 300px;
}
.header_search input{
  /* margin-left: 290px; */
  /* border-color: aqua; */
  display: inline-block;
}
.Two_s_log:hover{
  color: rgb(241, 78, 146);
}
.deta_footer{
  background-color:#F4D9CD;
  width: 100%;
  height: 230px;
  float: left;
  text-align: center;
  padding-top: 50px;
  margin-top: 30px;
}
.deta_footer p{
  padding-top: 30px;
}
</style>
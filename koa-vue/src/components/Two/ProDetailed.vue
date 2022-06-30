<template>
  <div>
    <div class="deta_head">正是这个季节&amp;今年比以往任何时候都要忙。可能会出现运输延误，因此我们建议您尽早寄送礼物。</div>
    <div class="deta_left">
      <el-image style="width: 494px; height: 494px" :src="good.img"></el-image>
    </div>
    <div class="deta_right">
    <ul>
      <li>花店送货上门</li>
      <li><p>{{ good.title }}</p></li>
       <li>售价：{{ good.price }}</li>
      <li>{{ good.desc }}</li>
      <li>
        库存量： {{ good.stole }}&nbsp;&nbsp;
      </li>
      <li><el-button @click="add(index)" type="info" style="width: 293px" round>添加购买</el-button></li>
      <li><a @click="return_Pro()">返回商品列表</a></li>
    </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ProDetailed",
  props: ["cards", "index", "add","return_Pro"],
  computed:{
    good:function(){
    console.log(this.index)
    return this.cards[this.index]
    }
  },
  
};
</script>

<style>
.deta_left{
  float: left;
  width: 25%;
  margin-left: 320px;
  margin-top: 13px;
}
.deta_right{
  float: right;
  margin-right: 100px;
  width: 30%;
}

.deta_right ul{
  list-style: none;
}
.deta_right ul li p{
  font-size: 20.25px;
}
.deta_right ul li{
  padding-top: 20px;
}
.deta_head{
  width: 100%;
  height: 50px;
  background-color: #C8AB8E;
  text-align: center;
  padding-top: 20px;
}
.deta_right ul li a:hover{
  color: rgb(241, 78, 146);
}

</style>
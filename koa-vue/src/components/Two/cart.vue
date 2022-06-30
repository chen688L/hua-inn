<template>
  <div id="cart">
    <h2>{{ mess }}</h2>
    <div class="cart_tab">
    <el-table :data="ck" stripe  style="width: 50%">
    <el-table-column prop="id"  label="编号"  width="180"> </el-table-column>
    <el-table-column prop="title" label="商品"  width="180"></el-table-column>
    <el-table-column prop="price" label="单价"  width="180"></el-table-column>
    <el-table-column prop="order" label="数量"  width="180"></el-table-column>   
    <el-table-column prop="total" label="金额"  width="180"></el-table-column>
  </el-table>
  </div>
    <h3>总金额为：{{ mytotal }}，请支付！</h3>
    <el-button @click="zf()" type="primary" style="width: 293px" round>确认支付</el-button>
    <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="收件人" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">支 付</el-button>
      </div>
</el-dialog>
 
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      mess: "你选择了如下商品",
      adderss:"",
      dialogFormVisible:false,
      formLabelWidth:"150px",
      form: {
          name: '',
          address: '',
          phone: '',
        },
    };
  },
  props: ["cards","add","min"],
  computed: {
    ck: function () {
      let cx = [];
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].order > 0) {
          cx.push(this.cards[i]);
        }
      }
      return cx;
    },
    mytotal: function () {
      let mt = 0.0;
      let total = 0;
      for (let i = 0; i < this.cards.length; i++) {
        total = this.cards[i].order*this.cards[i].price;
        mt += total;
      }
      return mt;
    },
  },
  methods:{
    zf:function(){
    this.dialogFormVisible = true
    },
    sub:function(){
      console.log(this.form);
      let good = ""
      let address = this.form.address
      let phone = this.form.phone
      let userid = this.form.name
      let company = "2"
      if(userid!=""&&phone!=""&&address!=""&&this.ck.length>0){
        for(let i = 0; i<this.ck.length;i++){
          let reid = this.ck[i].id
          let title = this.ck[i].title
          let num = this.ck[i].order
          let price = this.ck[i].price
          let stole = this.ck[i].stole
          this.$axios.post("/apis/addOrdersList",{
            reid:reid,
            title: title, 
            num: num,
            price:price,
            address:address,
            stole:stole,
            phone: phone,
            name:userid,
            userid: this.cookie.getCookie('userid'),
            company:company,
          }).then((response) => {
            console.log("成功");
            alert("购买成功")
          });
        }
      }
      this.dialogFormVisible = false
      
    },
  
  }
};
</script>

<style>
#cart h2,h3 {
  text-align: center;
  padding: 20px 0px;
}
#cart{
  /* width: 100%; */
  height: 500px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
}
.cart_tab{
  width: 100%;
  margin-left: 500px;
}
</style>
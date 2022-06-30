<template>
  <div class="userMain">
    <!-- 搜索栏 -->
    <div id="seacher">
      姓名：
      <el-input placeholder="请输入内容" v-model="inputUsername" size="small" style="width: 200px" clearable></el-input>
      手机：
      <el-input placeholder="请输入内容" v-model="inputPhone" size="small" style="width: 200px" clearable></el-input>
      角色：
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.rolename">
        </el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search"  @click="checkUser_fen()" size="small">搜索</el-button>
      <el-button type="primary" size="small" @click="showAddUser()">添加用户</el-button>
    </div>
    <!-- 数据表格 -->
    <table class="userTable">
      <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>手机</th>
        <th>角色</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in myUsers" :key="index" >
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.role.rolename}}</td>
        <td>
          <button id="edit" @click="editUser(item)">编辑</button>
          <button id="delete" @click="RemoveUser(item)">移除</button>
        </td>
      </tr>
    </table>
    <!-- total:总条数  page-size:一页的条数 current-page当前所在页数  current-change:改变页数时触发-->
    <el-pagination @current-change="handleCurrentChange"
     layout="prev, pager, next" :total="usernum" :page-size="pageSize" :current-page="currentPage">
    </el-pagination>


    <!-- 编辑修改数据表格 -->
    <!-- center仅影响标题和底部区域 -->
    <el-dialog :visible.sync="showdialog" center>
      <div slot="title" class="dialog-title">
        <span class="title-text">{{addUsername}}</span>
      </div>

      <el-form>

        <el-form-item v-show="isupdata" label="编号：" :label-width="formLabelWidth">
          <el-input v-model="edit_id" disabled></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="edit_username"></el-input>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input v-model="edit_phone"></el-input>
        </el-form-item>
       <el-form-item v-show="isadd" label="密码：" :label-width="formLabelWidth">
      <el-input v-model="edit_password" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择角色">
            <el-option label="管理员" :value="1"></el-option>
            <el-option label="商家" :value="2"></el-option>
            <el-option label="普通用户" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-show="isadd" type="primary" @click="addUser()">添 加</el-button>
        <el-button v-show="isupdata" type="primary" @click="updataUser()">修 改</el-button>

      </span>
    </el-dialog>

      <!-- 提示弹出层不规则问题 -->
    <el-dialog id="mypoint" title="提示" :visible.sync="pointDialog" width="30%" center>
      <span>输入的用户信息不能为空，请补充完整！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pointDialog = false">关 闭</el-button>
      </span>
    </el-dialog>


  <!-- 提示弹出层不规则问题 -->
    <el-dialog id="mypoint" title="提示" :visible.sync="data_succ" width="30%" center>
      <!-- 数据操作成功提示 -->
      <span>{{data_succ_msg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="data_succ = false">关 闭</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name:'UserMain',
  data(){
    return{
      myUsers:[],//记录获取到的用户数据
      inputUsername:'',//记录查询栏的姓名输入
      inputPhone:'',//记录查询栏的手机输入
      options:[],//记录获取到的roles数据
      value:'',//记录查询栏的选择角色
      usernum:0,//记录一共有多少个用户
      addUsername:'',
      showdialog:false,//编辑和新增弹出框的显示和隐藏
      pointDialog:false,//提示弹出框问题的显示隐藏
      isadd:false,
      isupdata:false,
      formLabelWidth:"100px",//弹出框的label宽度
      
      edit_id:'',//放入弹出框的数据显示
      edit_username:'',
      edit_phone:'',
      edit_password:'',

      data_succ:false,//控制数据操作成功的提示
      data_succ_msg:'',
      salt:'d9b1d7db4cd6e70935368a1efb10e377',//加密盐值，可以改


      currentPage:1,   //当前显示页数
      pageSize:5, //单页条数
      total:0, //总条数
      
    }
  },
  beforeCreate(){
    //钩子函数，模板渲染成html前调用
    this.$store.dispatch('getRolelist')
  },
  created(){
    // console.log("调用vuex"+this.$store.state.rolelist);
    this.options = this.$store.state.rolelist
    
  },

  methods:{
    checkUser_fen: function () {
      this.$axios.post("/apis/searchUserByInfo",{
          username: this.inputUsername,
          phone: this.inputPhone,
          roleid:this.value,
          currentPage: this.currentPage, //页码
          pageSize: this.pageSize,//页大小
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.success) {
          let users = res.data.users;//获取到user的数据
          this.myUsers = users;//赋值给前端使用
          console.log(res.data.users.length);
          if(res.data.data<=0){
            this.myUsers.id = "查询为空"
          }
          
          console.log("z"+res.data.users.length);
          // this.usernum = res.data.users.length
        }else{
        }
      });
      this.$axios.get("/apis/getUserNum",{
        }).then((response) => {
          this.usernum = response.data.data.usersnum;
          console.log(this.usernum);
        });
    },


    //弹出框的取消操作
    cancel:function(){
      this.edit_phone = ""
      this.edit_username = ""
      this.edit_password = ""
      this.value = ""
      this.showdialog = false
    },

    //修改用户数据的弹出框
    editUser:function(item){
      console.log(item);
      this.isadd = false
      this.isupdata = true
      this.addUsername = "修改用户信息"
      // this.edit = [{id:item.id,username:item.username,phone:item.phone}]
      this.edit_phone = item.phone
      this.edit_username = item.username
      this.edit_id = item.id //修改数据时要用到，根据id来修改
      this.value = item.roleid
      console.log(this.value);
      console.log("item.id:"+item.id);
      this.showdialog = true;
      this.pointDialog = false;
      
    },
    //删除用户操作
    RemoveUser:function(item){
      var r = confirm("你确定要删除 "+item.username+" 用户吗？")
      console.log("RemoveUserRemoveUser");
      if(r==true&&item.id!=''){
        let userid = item.id
        this.$axios.post("/apis/deleteUserOK",{
              userid:userid,
          }).then((response) => {
              //响应后
            this.showdialog = false 
            this.edit_phone = ""
            this.edit_username = ""
            this.edit_password = ""
            this.value = ""  
            });
      }else{
        this.edit_username=""
      }
    },
    //显示添加用户的弹框
    showAddUser:function(){
      this.isadd = true
      this.isupdata = false
      this.addUsername = "新增用户"
      this.showdialog = true;
      this.pointDialog = false;
    },
    // 提示添加用户有误
    showPoint:function(){
      this.pointDialog = true;
    },
    //添加用户
    addUser:function(){
      //在方法赋值全局变量，方便使用
      let phone = this.edit_phone
      let username = this.edit_username
      let value = this.value
      let password1 = this.edit_password
      // let userid = this.usernum+1
      //验证
      console.log(phone+username+value);
      console.log("目前的用户数量："+this.usernum);

      //判断用户输入信息是否完整，不完整给出提示框
      if(typeof(phone)!="undefined" && typeof(username)!="undefined" && value!="" && typeof(password1)!="undefined"){
        if(phone!="" && username!="" && password1!=""){
          //给密码加密，跨域访问后端拿数据
          let password =this.$md5(this.$md5(this.edit_password)+this.salt)
          
          this.$axios.post("/apis/creatUserOK",{
            userid:0,
            username: username,
            password:password,
            phone: phone,
            salt:this.salt,
            roleid:value
            }).then((response) => {
              if(response.data.success){
                this.data_succ = true
                this.data_succ_msg = "数据添加成功"
                this.checkUser_fen()
              }
              //响应后
              console.log("添加1条数据");
              this.edit_phone = ""
              this.edit_username = ""
              this.edit_password = ""
              this.value = ""     
              this.showdialog = false 
              });
        }else{
          this.showPoint()
        }
      }else{
        this.showPoint()
      }
    },
    //修改用户
    updataUser:function(){
      //在方法赋值全局变量，方便使用
      let phone = this.edit_phone
      let username = this.edit_username
      let value = this.value
      let userid = this.edit_id
      console.log(this.id+userid);

      if(typeof(phone)!="undefined" && typeof(username)!="undefined" && value!=""){
        if(phone!="" && username!=""){
          this.$axios.post("/apis/updateUserOK",{
            userid:userid,
            username: username,
            phone: phone,
            roleid:value
            }).then((response) => {
              if(response.data.success){
                this.data_succ = true
                this.data_succ_msg = "数据修改成功"
              }
              //响应后
              this.showdialog = false
              console.log("修改成功");
              this.edit_phone = ""
              this.edit_username = ""
              this.edit_password = ""
              this.value = ""     
            });
        }else{
          this.showPoint()
        }
      }else{
        this.showPoint()
      }
    },
     //当前页变化
    handleCurrentChange(val){
       this.currentPage=val;
       console.log(this.currentPage);
       this.checkUser_fen()
    },

    
  }
}
</script>

<style>
.userMain {
  background-color: white; /* 设置背景颜色为白色*/
  height: 750px;
}
.userTable {
  width: 700px; /* 设置表格宽度*/
  margin: auto; /* 设置居中*/
  margin-top: 10px; /* 设置上边距*/
  font-size: 13px; /* 设置字体大小*/
  color: #333333; /* 设置颜色*/
}
.userTable th {
  padding: 8px;
  line-height: 50px;
}

.userTable td {
  width: 150px;
  border-width: 1px 0px 0px 0px;
  border-color: #ebebeb;
  padding: 10px;
  border-style: solid;
  line-height: 50px;
}
#edit {
  background-color: white;
}
#delete {
  background-color: #ff5e6d;
}
#edit,
#delete {
  width: 50px;
  height: 23px;
  border-radius: 5px;
  font-size: 10px;
}
#edit:active,
#delete:active {
  background-color: rgb(224, 233, 233);
}
/* .dialog-title{
  height: 100px;
} */
#seacher {
  padding-top: 10px;
}
</style>
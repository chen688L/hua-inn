  <template>
  <div class="roleMain">
    <!-- 搜索栏 -->
    <div id="seacher">
      <el-input placeholder="请输入角色名称" v-model="input" size="small" style="width: 200px" clearable></el-input>
      <el-button type="primary" icon="el-icon-search"  @click="checkRole()" size="mini">搜 索</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline"  @click="addRole()" size="mini">新 增</el-button>
    </div>
    <!-- 数据表格 -->
    <div class="Main-Center">
      <table class="roleTable">
        <tr>
          <th>编号</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in myRoles" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.rolename }}</td>
          <td>
            <button id="edit" @click="editUser(item)">编辑</button>
            <button id="delete" @click="RemoveUser(item)">移除</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- 编辑修改数据表格 -->
    <el-dialog :visible.sync="showdialog">
      <div slot="title" class="dialog-title">
        <span class="title-text">数据详情</span>
      </div>
      <el-form>
        <el-form-item v-show="addr" label="编号" :label-width="formLabelWidth">
          <el-input v-model="edit_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="edit_rolename"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdialog = false">取 消</el-button>
        <el-button v-show="addr" type="primary" @click="updata_Role()">修 改</el-button>
        <el-button v-show="addr==false" type="primary" @click="add_Role()">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>


  <script>
export default {
  name: "roleMain",
  data() {
    return {
      input: "",
      myRoles: [],
      showdialog: false,
      edit_id: '',
      edit_rolename:'',
      formLabelWidth: "120px",
      addr:true //控制弹出框id的显示
    };
  },

  created: function () {
    //钩子函数，模板渲染成html前调用
    // console.log(this.$store.state.roles);
    // this.$store.dispatch('fetchUsers')
    // this.myUsers = this.$store.state.roles; //调用vuex存储数据，调用数据使用
  },
  methods: {
    checkRole: function () {
      if (this.input == "") {
        console.log("输入查询条件为空");
        this.$axios.get("/apis/roles").then((response) => {
          console.log(response);
          let roles = response.data.data.roles;
          console.log(typeof roles); //JSON.parse(JSON.stringify(object对象类型1))对象不能直接赋值
          this.myRoles = roles;
          console.log(this.myRoles);
        });
      } else {
        this.myRoles = [];
        let name = this.input
        this.$axios.post("/apis/rolesByname",{
          name:name
        }).then((response) => {
          console.log(response);
          let roles = response.data.data.roles;
          this.myRoles = [roles];
        });
      }
    },
    editUser: function (item) {
      // console.log(item);
      this.addr = true
      this.showdialog = true;
      this.edit_id = item.id;
      this.edit_rolename = item.rolename
      console.log(this.edit);
    },
    RemoveUser:function(item){
      this.edit_id = item.id;
      this.$axios.post("/apis/deleteRole",{
          id:this.edit_id
        }).then((response) => {
          console.log(response);
          this.checkRole()
        });
    },
    addRole:function(){
      this.addr = false
      this.showdialog = true;
      this.edit_rolename = ""

    },
    updata_Role:function(){
      if(this.edit_rolename==""){
        console.log("名字为空");
      }else{
        this.$axios.post("/apis/updateRole",{
          id:this.edit_id,
          name:this.edit_rolename
        }).then((response) => {
          console.log(response);
          this.showdialog = false;
          this.checkRole()
        });
      }
    },
    add_Role:function(){
      if(this.edit_rolename==""){
        console.log("名字为空");
      }else{
        this.$axios.post("/apis/creatRoleOK",{
          rolename:this.edit_rolename
        }).then((response) => {
          console.log(response);
          this.showdialog = false;
          this.checkRole()
        });
      }
    }
  },
};
</script>

<style scoped>
.roleMain {
  background-color: white; /* 设置背景颜色为白色*/
  height: 100%;
}
.roleTable {
  width: 700px; /* 设置表格宽度*/
  margin: auto; /* 设置居中*/
  margin-top: 10px; /* 设置上边距*/
  font-size: 13px; /* 设置字体大小*/
  color: #333333; /* 设置颜色*/
}
.roleTable th {
  padding: 8px;
  line-height: 50px;
}

.roleTable td {
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
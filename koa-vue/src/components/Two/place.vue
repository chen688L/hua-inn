<template>
  <div class="demo-image">
    <el-row>
      <el-col :span="6" v-for="(o, index) in 16" :key="o" :offset="index > 0 ? 1 : 1" style="margin-bottom:30px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../static/img/用户1.png" class="image">
          <div style="padding: 25px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</div>


</template>

<script>
  export default {
    data() {
      return {
       currentDate: new Date()
      }
    }
  }
</script>

<style>
 .time {
    font-size: 13px;
    color: #999;
  }

  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 350px;
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
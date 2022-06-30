<template>
  <div>
    <h1>登录成功</h1>
    
  </div>
</template>

<script>

export default {
  name:'FirstMain',
  methods: {
  },
  created(){
    //钩子函数，模板渲染成html前调用
    this.$store.dispatch('getRolelist')
    console.log("调用vuex"+this.$store.state.rolelist);
   
  },
  
};
</script>

<style>
</style>
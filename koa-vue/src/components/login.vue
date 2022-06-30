<template>
  <div>
    <back-ground></back-ground>
    <login-main></login-main>
    
  </div>
</template>

<script>
import LoginMain from './login/loginMain.vue'
import BackGround from './login/background.vue'

export default {
  name:'login',
  components: {
    // HelloWorld
    LoginMain,
    BackGround
  }
}
</script>

<style>


</style>
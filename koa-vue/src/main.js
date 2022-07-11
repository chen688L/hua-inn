// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import cookie from './util/cookie'
import store from './store/index'
import mutations from './store/mutations'
import VueParticles from 'vue-particles'
import md5 from 'js-md5';


// 在main.js中引入echarts，并挂载到原型上
import  * as  echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

Vue.prototype.$axios=axios //注意：挂载上去的名字不能等同于axios，使用$axio即可
Vue.prototype.cookie=cookie
Vue.prototype.$store=store
Vue.prototype.$mutations=mutations
Vue.prototype.$md5 = md5

Vue.use(ElementUI)

Vue.use(VueParticles)//登录特效动画

const whiteList = ['/login','/error','/register']//白名单
/*
to：进入到哪个路由去
from：从哪个路由离开
next：路由的控制参数，常用的有next(true)和next(false)
*/
router.beforeEach((to, from, next) => {
  /*
  1、判断访问是否正确，若正确往下执行
  2、判断cookie中是否有name变量，说明登录成功，通过name判断是管理员还是，若有往下执行
  3、跳转到要访问的页面
  */
  if(to.matched.length === 0){// to.matched.length代表是否匹配到当前要跳转的路由
      return {
        path:'/error'
      }
  }
  if(whiteList.indexOf(to.path) === 0) {
    //白名单里面的 放行，进入下一个路由
    next()
  }else if(cookie.getCookie('token')){//判断是否登录，获得token customer
    if(to.path == '/'||to.path == '/customer'){
        next()
    }else{
      next()
    }
  }else{
    if(to.path == '/login'||to.path == '/register'){
      next()
    }else{
        next('/login')//进入指定的组件的钩子函数
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

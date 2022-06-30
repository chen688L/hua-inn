import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import login from '@/components/login'
import err from '@/components/404'
import Two from '@/components/Two'
import register from '@/components/register'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'First',
    component: First
  },
  {
    path: '/customer',
    name: 'Two',
    component: Two
  },
  {
    path: '/error',
    name: 'err',
    component: err
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
 
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


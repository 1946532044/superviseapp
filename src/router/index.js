import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../pages/Index'
import Goods from '../pages/index/Goods'

Vue.use(VueRouter)



const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [

    {
      path:'/',
      name: 'goods',
      component:Goods
    },
    {
      path:'/comment',
      name: 'Comment',
      component:()=>import ('../pages/index/Comment')
    },
    {
      path:'/shop',
      name: 'Shop',
      component:()=>import ('../pages/index/Shop')
    }
   
  
  ]
})

export default router

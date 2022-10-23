import Vue from "vue";
import VueRouter from "vue-router";

import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Login from '@/views/Login.vue'


// 解决vue-router在3.0版本以上重复点菜单报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: Main,
        redirect:'/home',
        children:[
            {   // 首页
                name:'home',
                path: 'home',
                component: Home
            },
            {   //用户管理
                name:'user',
                path: 'user',
                component: User
            },
            {   // 商品管理
                name:'mall',
                path:'mall',
                component:Mall
            },
            {   // 页面1
                name:'page1',
                path:'page1',
                component:PageOne
            },
            {   // 页面2
                name:'page2',
                path:'page2',
                component:PageTwo
            },

        ]
    },
    {name:'login',path:'/login',component:Login}

]
const router = new VueRouter({
    routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    const token = Vue.prototype.$cookie.get('token')
    // 没登陆且跳转的不是登陆页
    if(!token&&to.name !=='login'){
        Vue.prototype.$message.error('请登陆!')
        next('/login')
    // 已登陆且跳转的是登陆页
    }else if(token&&to.name=='login'){
        next({name:'home'})
    // 没登陆且跳转的是登陆页，已登陆跳转的不是登陆页
    }else{
        next()
    }
    
})
export default router

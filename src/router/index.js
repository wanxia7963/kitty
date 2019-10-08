import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Intro from '@/views/SysMng/Intro'
import User from '@/views/SysMng/User'
import Dept from '@/views/SysMng/Dept'
import Role from '@/views/SysMng/Role'
import Menu from '@/views/SysMng/Menu'
import Log from '@/views/SysMng/Log'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        { path: '', component: Intro, name: '系统介绍' },
        { path: '/user', component: User, name: '用户管理' },
        { path: '/dept', component: Dept, name: '机构管理' },
        { path: '/role', component: Role, name: '角色管理' },
        { path: '/menu', component: Menu, name: '菜单管理' },
        { path: '/log', component: Log, name: '日志管理' }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/404',
      name:'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let user = sessionStorage.getItem('user')
  if(to.path == '/login'){
    if(user){
      next({path:'/'})
    } else {
      next()
    }
  } else {
    if(!user) {
      next({path:'/login'})
    } else {
      next()
    }
  }

})



export default router


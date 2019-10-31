import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/page/Login'
import NotFound from '@/views/Error/404'
import Intro from '@/views/Intro'
import api from '@/http/api'
import store from '@/store'
import AddressList from '@/page/AddressList'
import ProposalList from '@/page/ProposalList'
import ProposalContent from '@/page/ProposalContent'
import MergeProposal from '@/page/MergeProposal'
import ProposalDetail from '@/page/ProposalDetail'
import { isURL } from '@/utils/validate'
import { getToken } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Home,
      name:'首页',
      redirect:'/index',
      children:[
        { path: 'index', component: Intro },
        { path:'addressList',component: AddressList, name:'通讯录'},
        { path:'proposalList',component: ProposalList, name:'提案列表'},
        { path:'proposalContent',component: ProposalContent, name:'提案内容详情'},
        { path:'mergeProposal',component: MergeProposal, name:'提案内容详情'},
        { path:'proposalDetail',component: ProposalDetail, name:'提案内容详情'},
      ]
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/error/404',
      name:'NotFound',
      component: NotFound
    }
  ]
})
const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.

  var token = getToken()
  console.log("getToken",token)
  if(token) {
    if(to.path === '/login'){
      console.log(1)
      next({path:'/index'})
    } else {
      console.log(2)
      addDynamicMenuAndRoutes()
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log(3)
      next()
    } else {
      console.log(4)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
  // if(to.path === '/login'){
  //   if(token){
  //     next()
  //   } else {
  //     next()
  //   }
  // } else {
  //   if(!token) {
  //     next({path:'/login'})
  //   } else {
  //
  //     next()
  //   }
  // }

})
/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes() {

  api.menu.findMenuTree()
  .then( (res) => {
    // 添加动态路由

    let dynamicRoutes = addDynamicRoutes(res.data.data)
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes);
    // 保存加载状态

    // 保存菜单树
    store.commit('SET_MENU', res.data.data)
  })
  .catch(function(res) {
    alert(res);
  });
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = menuList[i].url
        route['name'] = menuList[i].name
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = array[0].substring(0,1).toUpperCase()+array[0].substring(1) + '/' + array[1].substring(0,1).toUpperCase()+array[1]  .substring(1)
          console.log('路由地址',url)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
 }

export default router


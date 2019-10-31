import { setToken, removeToken } from '@/utils/auth';
import { login,getMenu,logout } from '@/http/moudules/user'
import qs from 'qs'
const user = {
  state:{
    userInfo:'',
    roles:[],
    menu:[],
    token:'',
    isMenu:false
  },
  mutations: {
    SET_TOKEN: (state,token) =>{
      setToken(token);
      state.token = token;
      window.sessionStorage.setItem('token',token)
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      window.sessionStorage.setItem('menu',menu)
      // setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
    SET_IS_MENU:(state,isMenu)=> {
      state.isMenu = isMenu
    }
  },
  actions: {
    loginByUsername({commit},loginForm) {
      return new Promise(((resolve, reject) => {
        let userInfo =  qs.stringify({username:loginForm.account, password:loginForm.password})
        login(userInfo)
          .then(res=>{
            console.log("登陆")
            const data = res.data.data;
            console.log(data)
            commit('SET_TOKEN',data.token);
            resolve();
          }).catch(error=>{
          reject(error)
        })
      }))
    },
    FedLogOut({commit}){
      return new Promise(resolve => {
        console.log("token过期")
        commit('SET_TOKEN','')
        commit('SET_MENU',[])
        commit('SET_IS_MENU',false)
        removeToken()
        resolve()
      })
    },
    logOut({commit}){
      return new Promise((resolve, reject) => {
        logout().then(()=>{
          console.log("退出")
          commit('SET_TOKEN','')
          commit('SET_MENU',[])
          commit('SET_IS_MENU',false)
          removeToken()
          resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    },
    getMenu({commit},menu) {
      return new Promise(resolve => {
        commit('SET_MENU', menu)
        resolve(menu)
      })
    }
  }
};


export default user

import { setToken, removeToken } from '@/utils/auth';
import { login,getMenu,logout } from '@/http/moudules/user'
import qs from 'qs'
const user = {
  state:{
    userInfo:'',
    roles:[],
    menu:[],
    token:''
  },
  mutations: {
    SET_TOKEN: (state,token) =>{
      setToken(token);
      state.token = token;
      window.sessionStorage.setItem('token',token)
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      // setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
  },
  actions: {
    loginByUsername({commit},loginForm) {
      return new Promise(((resolve, reject) => {
        let userInfo =  qs.stringify({username:loginForm.account, password:loginForm.password})
        login(userInfo)
          .then(res=>{
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
        commit('SET_TOKEN','')
        commit('SET_MENU',[])
        removeToken()
        resolve()
      })
    },
    logOut({commit}){
      return new Promise((resolve, reject) => {
        logout().then(()=>{
          commit('SET_TOKEN','')
          commit('SET_MENU',[])
          removeToken()
          resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    }
  }
};


export default user

import Vue from 'vue'
import vuex from 'vuex'
import AppStore from './modules/AppStore';

Vue.use(vuex);


import menu from './modules/menu'

const store = new vuex.Store({
   modules:{
       app:AppStore,
       menu: menu
   }
})

export default store
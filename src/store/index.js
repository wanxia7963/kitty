import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);


import menu from './modules/menu'
import app from './modules/Application.js';

const store = new vuex.Store({
   modules:{
       app:app,
       menu: menu
   }
})

export default store
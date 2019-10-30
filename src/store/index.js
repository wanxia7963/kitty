import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);


import menu from './modules/menu'
import app from './modules/Application.js';
import user from './modules/user'
import getters from './getters'

const store = new vuex.Store({
   modules:{
     user
   },
  getters
});

export default store

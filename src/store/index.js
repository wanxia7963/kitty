import Vue from 'vue'
import vuex from 'vuex'
import AppStore from './modules/AppStore';

Vue.use(vuex);

const store = new vuex.Store({
   modules:{
       app:AppStore
   }
})

export default store
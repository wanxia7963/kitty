export default {
    state:{
        
        menuRouteLoaded:false 
    },
    getters:{
        
    },
    mutations:{
        menuRouteLoaded(state, menuRouteLoaded){  // 改变菜单和路由的加载状态
            state.menuRouteLoaded = menuRouteLoaded;
        }
    },
    actions:{

    }
}
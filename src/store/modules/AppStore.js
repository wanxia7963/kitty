export default{
    state:{
        appName:'i like Kitty',
        collapse:false
    },
    getters:{
        collapse(state){
            return collapse;
        }
    },
    mutationsL:{
        collapse(state){
            state.collapse = !state.collapse
        }
    },
    actions:{

    }
}
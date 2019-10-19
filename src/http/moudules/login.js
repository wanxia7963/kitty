import axios from '../axios'
//登录
export const login = data => {
    return axios({
        url: '/apis/login/form',
        // url: '/login',
        method: 'post',
        data
    })
}
// 登出
export const logout = () => {
    return axios({
        url: '/apis/login/out',
        // url: '/logout',
        method: 'get'
    })
}
import axios from '../axios'
//登录

// 登出
export const logout = () => {
    return axios({
        url: '/apis/login/out',
        // url: '/logout',
        method: 'get'
    })
}

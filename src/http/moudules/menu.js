import axios from '../axios'



export const getMenu = data => {
    return axios({
        url: '/menu',
        method: 'post',
        data
    })
}
/* 
 * 菜单管理模块
 */
//查询菜单
export const findMenuTree = () => {
    return axios({
        // url: '/menu/findTree',
        url: '/apis/user/menu/r',
        method: 'get'
    })
}
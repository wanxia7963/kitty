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

export const findMenuTree = () => {
    return axios({
        url: '/menu/findTree',
        method: 'get'
    })
}
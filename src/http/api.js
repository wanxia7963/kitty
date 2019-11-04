// import axios from './axios'

// export const login = () => {
//     return axios({
//         url:'/login',
//         method:'get'
//     })
// }

// export const getUser = () => {
//     return axios({
//         url:'/user',
//         method:'get'
//     })
// }

// export const getMenu = () => {
//     return axios({
//         url:'/menu',
//         method:'Post',
//         data
//     })
// }

// export default {
//     login,
//     getUser,
//     getMenu
// }

import axios from './axios'

/*
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as menu from './moudules/menu.js'
import * as dept from './moudules/dept.js'
import * as role from './moudules/role.js'
import * as proposal from './moudules/proposal.js'
import * as common from './moudules/common.js'
import * as statistics from './moudules/statistics.js'

// 默认全部导出
export default {
    login,
    user,
    menu,
    dept,
    proposal,
    role,
    common,
    statistics
}

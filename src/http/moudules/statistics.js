import axios from '../axios'
//获取提案建议统计接口
export const getType = () => {
    return axios({
        url: '/apis/user/prop/index/r',
        method: 'get'
    })
}

import axios from '../axios'

export const getContType = () => {
    return axios({
        // url: '/apis/login/form',
        url: '/apis/user/prop/type/num/r',
        method: 'get'
    })
}
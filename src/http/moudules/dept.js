import axios from '../axios'

export const getDept = () => {
    return axios({
        // url: '/apis/login/form',
        url: '/apis/admin/dept/tree/r',
        method: 'get'
    })
}

export const getDeptById = (id,type) =>{
    return axios({
        url:'/apis/user/organization/c?id='+id+'&&type='+type,
        method:'get',
    })
}
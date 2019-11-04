import axios from '../axios'


//登陆
export const login = data => {
  return axios({
    url: '/apis/login/form',
    // url: '/login',
    method: 'post',
    data
  })
}

export const getUser = () => {
    return axios({
        url: '/user',
        method: 'get'
    })
}
export const logout = () => {
  return axios({
    url: '/apis/login/out',
    // url: '/logout',
    method: 'get'
  })
}

export const getAllUser = (pageNum,pageSize) => {
  return axios({
    url: '/apis/admin/user/r?pageNum='+pageNum+'&&pageSize='+pageSize,
    method: 'get'
  })
}
export const serchUserAll = (name) => {
  return axios({
    url: '/apis/admin/user/like/r?name='+name,
    method: 'get'
  })
}
//新增用户接口
export const UserAdd = data =>{
    return axios({
        url:"/apis/admin/user/c",
        method:'post',
        data
    })
}
//修改用户接口
export const UserUpdate = data =>{
    return axios({
        url:"/apis/admin/user/u",
        method:'post',
        data
    })
}
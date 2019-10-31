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

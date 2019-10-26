import axios from '../axios'
//公共apis

//获取系统日志
export const getLogData = (pageSize,pageNum) => {
  return axios({
    url: '/apis/menu',
    method: 'get'
  })
};

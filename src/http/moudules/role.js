import axios from '../axios'


//获取菜单树
export const getMenu = () => {
    return axios({
        url: '/menu',
        method: 'get'
    })
};
//获取接口tree
export const getApi = ()=>{
    return axios({
        url: '/menu',
        method: 'get'
    })
};
//获取所有角色data
export const getRoleData = (pageNum,pageSize)=>{
  return axios({
    url:'/apis/admin/role/r?pageNum='+pageNum+'&&pageSize='+pageSize,
    method:'get'
  })
};
//编辑角色信息
export const editRole = data =>{
  return axios({
    url:'',
    method:'post',
    data
  })
};
//添加角色
export const addRole = data=>{
  return axios({
    url:'',
    method:'post',
    data
  })
};
//删除角色
export const deleteRole =(id)=>{
  return axios({
    url:'',
    method:'get'
  })
};
//根据名称搜索角色
export const serchRole = (name)=>{
  return axios({
    url:'',
    method:'get'
  })
};
//赋予角色权限接口
export const setRolePermissions = data=>{
  return axios({
    url:'',
    method:'post',
    data
  })
};

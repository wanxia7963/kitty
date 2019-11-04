import axios from '../axios'

//获取组 - 部门 -股室 -tree数据
export const getDeptTree = () => {
    return axios({
        // url: '/apis/login/form',
        url: '/apis/admin/dept/tree/r',
        method: 'get'
    })
}
//获取所有部门数据
export const getDeptData = (pageNum,pageSize) => {
    return axios({
        // url: '/apis/login/form',
        url: '/apis/admin/dept/r?pageNum='+pageNum+'&&pageSize='+pageSize,
        method: 'get'
    })
}

//通过组id - 部门 id 获取部门 - 股室 数据
export const getDeptById = (id,type,pageNum,pageSize) =>{
    return axios({
        url:'/apis/user/organization/c?id='+id+'&&type='+type+'&&pageNum='+pageNum+'&&pageSize='+pageSize,
        method:'get',
    })
}


//根据名称搜索部门
export const serchDept = (name) => {
    return axios({
        // url: '/apis/login/form',
        url: '/apis/admin/dept/like/r?name='+name,
        method: 'get'
    })
}

//通过类型与id冻结部门或者股室
export const freeze = (id,type)=>{
    return axios({
        url:'/apis/',
        method: 'get'
    })
}
//通过类型与id解冻相关部门或者股室
export const unfreeze = (id,type)=>{
    return axios({
        url: 'apis/',
        method:'get'
    })
}
//通过组id删除组
export const deleteGroup = (id) =>{
    return axios({
        url: '/apis/admin/dept/d?id='+id,
        method: 'get'
    })
}
//新增分组接口
export const groupAdd = data =>{
    return axios({
        url:"/apis/admin/dept/c1",
        method:'post',
        data
    })
}

//新增部门接口
export const deptAdd = data =>{
    return axios({
        url:"/apis/admin/dept/c2",
        method:'post',
        data
    })
}

//新增部门接口
export const bureauAdd = data =>{
    return axios({
        url:"/apis/admin/dept/c3",
        method:'post',
        data
    })
}
//编辑部门信息
export const editGroup = data =>{
    return axios({
        url:'/apis/admin/dept/u1',
        method:'post',
        data
    })
}

export const editDept = data =>{
    return axios({
        url:'/apis/admin/dept/u2',
        method:'post',
        data
    })
}

export const editBureau = data =>{
    return axios({
        url:'/apis/admin/dept/u3',
        method:'post',
        data
    })
}
//获取所有部门列表
export const getAllDept = () => {
  return axios({
    url: '/apis/admin/dept/room/r',
    method: 'get'
  })
}
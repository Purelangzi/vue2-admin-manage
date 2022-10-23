import http from "@/utils/request";

// 请求首页数据
export const getData = () =>{
    // 返回一个promisse对象
    return http.get('/home/getData')
}


// 获取用户列表数据
export const getUser = (params) =>{
    // 返回用户列表
    return http.get('/user/getUser',params)
}
// 增加用户列表数据
export const addUser = (data) =>{
    
    return http.post('/user/add',data)
}
// 编辑用户列表数据
export const editUser = (data) =>{
    
    return http.post('/user/edit',data)
}
// 删除用户列表数据
export const delUser = (data) =>{
    
    return http.post('/user/del',data)
}
// 用户权限数据
export const getMenu = (data) =>{
    
    return http.post('/permission/getMenu',data)
}
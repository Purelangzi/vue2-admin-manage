import Mock from 'mockjs'
import homeApi from '@/mocks/mockServeData/home'
import user from '@/mocks/mockServeData/user'
import permission from '@/mocks/mockServeData/permission'

// 定义mock请求拦截 
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

// 用户列表数据
Mock.mock('/api/user/add','post', user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/\/api\/user\/getUser/,user.getUserList)
Mock.mock(/\/api\/permission\/getMenu/, 'post',permission.getMenu)

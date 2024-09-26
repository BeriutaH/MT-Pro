// 统一管理项目用户相关的接口
import type { ApiResponse, LoginFrom } from '@/api/user/type'
import requestWrapper from '@/utils/request'
// 统一管理接口
const BaseURL = '/api'
export const API_PATHS = {
  LOGIN: BaseURL + '/login',
  USERS: BaseURL + '/users',
  USER_INFO: BaseURL + '/user/info'
}
// 用户登录
export const reqLogin = (data: LoginFrom): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: API_PATHS.LOGIN,
    method: 'POST',
    data
  })
}

// // 获取用户信息
// export const getUserInfo() {
//   try {
//     // 从 localStorage 获取 token
//     const authToken = localStorage.getItem('authToken')
//     console.log('获取的token: ', authToken)
//     if (!authToken) {
//       console.log('用户未登录')
//       return
//     }
//     // 设置请求头
//     requestWrapper.defaults.headers.common['Authorization'] = authToken
//
//     // 请求用户信息
//     const response = await request.get(API_PATHS   USERS)
//     return response.data
//   } catch (error) {
//     // 清除 token 并抛出错误
//     localStorage.removeItem('authToken')
//     console.log('获取用户信息失败:', error)
//
//   }
// }

// 获取指定用户信息的头像，名称
export const reqUserInfo = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: API_PATHS.USER_INFO,
    method: 'GET'
  })
}

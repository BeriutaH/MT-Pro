// 统一管理项目用户相关的接口
import type { ApiResponse, LoginFrom } from '@/api/user/type'
import requestWrapper from '@/utils/request'
// 统一管理接口
const BaseURL = '/api'
export const API_PATHS = {
  LOGIN: BaseURL + '/login',
  USER_INFO: BaseURL + '/users'
}
// 用户登录
export const reqLogin = (data: LoginFrom): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: API_PATHS.LOGIN,
    method: 'POST',
    data
  })
}

// 获取用户信息
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
//     request.defaults.headers.common['Authorization'] = authToken
//
//     // 请求用户信息
//     const response = await request.get(API_PATHS.USER_INFO)
//     return response.data
//   } catch (error) {
//     // 清除 token 并抛出错误
//     localStorage.removeItem('authToken')
//     console.log('获取用户信息失败:', error)
//
//   }
// }

// 统一管理项目用户相关的接口
import type { ApiResponse, LoginFrom } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'

export const API_PATHS = {
  LOGIN: ApiSetting.UserBaseURL + '/login',
  USER_INFO: ApiSetting.UserBaseURL + '/info',
  LOGOUT: ApiSetting.UserBaseURL + '/logout'
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

// 用户退出
export const reqLogout = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: API_PATHS.LOGOUT,
    method: 'POST'
  })
}

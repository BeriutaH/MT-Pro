// 用户管理模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { UserObj } from '@/api/acl/users/type'
export const reqUsersInfo = (page: number, limit: number): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.UsersInfoUrl}${page}/${limit}`,
    method: 'GET'
  })
}

// 添加/修改用户
export const reqUsersAddOrEdit = (data: UserObj): Promise<ApiResponse> => {
  let url = ApiSetting.UsersAddUrl
  let method = 'POST'
  if (data.id) {
    url = ApiSetting.UsersEditUrl
    method = 'PUT'
  }
  return requestWrapper<ApiResponse>({
    url: url,
    method: method,
    data: data,
  })
}

// 删除用户
export const reqDelUser = (userId:number|string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.UsersDelUrl}/${userId}`,
    method: 'DELETE'
  })
}

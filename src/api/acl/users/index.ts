// 用户管理模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { UserObj, UserToRole } from '@/api/acl/users/type'
export const reqUsersInfo = (
  page: number,
  limit: number,
  username: string
): Promise<ApiResponse> => {
  let url = `${ApiSetting.UsersInfoUrl}${page}/${limit}`
  if (username) {
    url = `${ApiSetting.UsersInfoUrl}${page}/${limit}?username=${username}`
  }
  return requestWrapper<ApiResponse>({
    url: url,
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
    data: data
  })
}

// 删除用户
export const reqDelUser = (userId: number | string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.UsersDelUrl}/${userId}`,
    method: 'DELETE'
  })
}

// 批量删除用户
export const reqBatchDelUser = (userIdList: number[]): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.UsersBatchDelUrl,
    method: 'DELETE',
    data: userIdList
  })
}

// 根据用户获取已有的角色
export const reqRoleByUserId = (userId: number | string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.RoleByUserIdUrl}/${userId}`,
    method: 'GET'
  })
}

// 根据用户分配角色
export const reqUserToRoles = (data: UserToRole): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.RoleToUserUrl,
    method: 'POST',
    data: data
  })
}

// 角色模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { Role } from '@/api/acl/users/type'

// 获取全部的角色
export const reqRoles = (page: number, limit: number, username:string): Promise<ApiResponse> => {
  let url = `${ApiSetting.RoleInfoUrl}${page}/${limit}`
  if (username) {
    url = `${ApiSetting.RoleInfoUrl}${page}/${limit}?roleName=${username}`
  }
  return requestWrapper<ApiResponse>({
    url: url,
    method: 'GET'
  })
}

// 添加/修改角色
export const reqRoleAddOrEdit = (data: Role): Promise<ApiResponse> => {
  let url = ApiSetting.RoleCreatUrl
  let method = 'POST'
  if (data.id) {
    url = ApiSetting.RoleEditUrl
    method = 'PUT'
  }
  return requestWrapper<ApiResponse>({
    url: url,
    method: method,
    data: data,
  })
}

// 删除角色
export const reqDelRole = (ruleId:number|string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.RoleDelUrl}/${ruleId}`,
    method: 'DELETE'
  })
}

// 批量删除角色
export const reqBatchDelRole = (idList:number|string[]): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.RoleBatchDelUrl,
    method: 'DELETE',
    data:idList
  })
}


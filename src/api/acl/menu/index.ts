// 权限菜单模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { AssignPermission, PermissionObj } from '@/api/acl/menu/type'

// 获取所有的权限菜单
export const reqPermissions = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.PermissionUrl,
    method: 'GET'
  })
}

// 根据角色id获取权限菜单
export const reqPermissionsByRoleId = (roleId: number | string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PermissionByRoleUrl}/${roleId}`,
    method: 'GET'
  })
}

// 根据角色id删除权限菜单
export const reqDelPermissionsById = (prId: number | string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PermissionDelUrl}/${prId}`,
    method: 'DELETE'
  })
}

// 新增/修改权限
export const reqAssignPermissionsByRoleId = (permission: PermissionObj): Promise<ApiResponse> => {
  let url = ApiSetting.PermissionAddUrl
  let method = 'POST'
  if (permission.id) {
    url = ApiSetting.PermissionEditUrl
    method = 'PUT'
  }
  console.log(permission)
  return requestWrapper<ApiResponse>({
    url: url,
    method: method,
    data: permission
  })
}

// 根据角色id分配权限菜单
export const reqAddPermissions = (roleId: number, permissions: number[]): Promise<ApiResponse> => {
  const info: AssignPermission = {
    permissionIdList: permissions,
    roleId: roleId
  }
  console.log(info)
  return requestWrapper<ApiResponse>({
    url: ApiSetting.AssignPermissionByRoleUrl,
    method: 'POST',
    data: info
  })
}

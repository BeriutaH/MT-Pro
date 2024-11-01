// 权限菜单模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { AssignPermission } from '@/api/acl/menu/type'
import type { UnwrapRef } from 'vue'
import type { Role } from '@/api/acl/users/type'

// 获取所有的权限菜单
export const reqPermissions = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.PermissionUrl,
    method: 'GET'
  })
}

// 根据角色id获取权限菜单
export const reqPermissionsByRoleId = (roleId:number|string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PermissionByRoleUrl}/${roleId}`,
    method: 'GET'
  })
}

// 根据角色id分配权限菜单
export const reqAssignPermissionsByRoleId = (roleId: number, permissions: number[]): Promise<ApiResponse> => {
  const info:AssignPermission = {
    permissionIdList:permissions,
    roleId:roleId
  }
  console.log(info)
  return requestWrapper<ApiResponse>({
    url: ApiSetting.AssignPermissionByRoleUrl,
    method: 'POST',
    data: info
  })
}
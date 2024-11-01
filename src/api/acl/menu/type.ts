export interface PermissionObj {
  id?: number | string
  createTime?: string
  updateTime?: string
  pid?: number
  name: string
  code?: string
  toCode?: string
  type?: number
  status?: any
  level?: number
  children?: PermissionObj[]
  select?: boolean
}

// 分配权限的请求类型
export interface AssignPermission {
  permissionIdList: number[]
  roleId: number
}

export interface UserObj {
  id?:number | string
  name: string
  password: string
  phone: string
  roleName: string
  username: string
}

export interface Role {
  id: number
  roleName: string
  remark: any
}

export interface UserToRole {
  roleIdList: number[]
  userId: number | string
}
// 用户相关的数据类型
export interface ApiResponse {
  code: number
  message: string
  data: any // data 是一个动态键的对象
  ok:boolean
}

export interface LoginFrom {
  username: string
  password: string
}

// 定义用户信息类型
export interface UserInfo {
  username: string | null
  avatar: string | null
}

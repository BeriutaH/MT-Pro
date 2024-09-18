// 用户相关的数据类型
export interface ApiResponse {
  code: number
  message: string
  data: {
    token?: any
  }
}

export interface LoginFrom {
  username: string
  password: string
}

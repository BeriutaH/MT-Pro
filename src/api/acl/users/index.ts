// 用户管理模块
import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
export const reqUsersInfo = (page: number, limit: number): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.UsersInfoUrl}${page}/${limit}`,
    method: 'GET'
  })
}
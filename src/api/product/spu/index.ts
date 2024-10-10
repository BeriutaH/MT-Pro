import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'

export const reqSPU = (page: number, limit: number, id: number | string): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SPUBaseUrl}${page}/${limit}?category3Id=${id}`,
    method: 'GET'
  })
}

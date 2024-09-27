// 品牌管理模块的接口
import requestWrapper from '@/utils/request'
import type { ApiResponse } from '@/api/user/type'
import ApiSetting from '@/api'
// 品牌管理模块接口地址
enum API{
  // 获取已有品牌接口
  TRADEMARK_URL='/baseTrademark/'
}

/*
* 获取已有品牌的接口方法
* page:获取第几页，默认第一页
* limit:一页多少条数据
*/
export const reqHasTrademark = (page:number, limit:number): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.ProductBaseURL}${API.TRADEMARK_URL}${page}/${limit}`,
    method: 'GET'
  })
}
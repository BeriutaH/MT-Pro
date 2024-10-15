// 品牌管理模块的接口
import requestWrapper from '@/utils/request'
import type { ApiResponse } from '@/api/user/type'
import ApiSetting from '@/api'
import type { Trademark } from '@/api/product/trademark/type'
// 品牌管理模块接口地址
enum API {
  // 添加品牌
  ADD_TRADEMARK_URL = '/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL = '/update',
  // 删除品牌
  REMOVE_TRADEMARK_URL = '/remove',
  // 获取品牌列表
  LIST_TRADEMARK_URL = '/getTrademarkList'
}

/*
 * 获取已有品牌的接口方法
 * page:获取第几页，默认第一页
 * limit:一页多少条数据
 */
export const reqHasTrademark = (page: number, limit: number): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.TrademarkBaseURL}${page}/${limit}`,
    method: 'GET'
  })
}

// 添加/更新品牌
export const reqOperateTrademark = (trademarkData: Trademark): Promise<ApiResponse> => {
  let url = `${ApiSetting.TrademarkBaseURL}${API.ADD_TRADEMARK_URL}`
  let method = 'POST'
  // 判断是否有id,如果有就是更新
  if (trademarkData.id) {
    url = `${ApiSetting.TrademarkBaseURL}${API.UPDATE_TRADEMARK_URL}`
    method = 'PUT'
  }
  return requestWrapper<ApiResponse>({
    url: url,
    method: method,
    data: trademarkData
  })
}

// 删除品牌
export const reqDelTrademark = (id: number): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.TrademarkBaseURL}${API.REMOVE_TRADEMARK_URL}/${id}`,
    method: 'DELETE'
  })
}

// 文件上传
export const reqUpload = (data: any): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.UploadURL,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取品牌种类
export const reqTrademarkList = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.TrademarkBaseURL}${API.LIST_TRADEMARK_URL}`,
    method: 'GET'
  })
}

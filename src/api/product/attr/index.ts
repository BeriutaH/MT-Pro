// 属性相关API请求接口
import requestWrapper from '@/utils/request'
import type { ApiResponse } from '@/api/user/type'
import type { AttrObj, ID } from '@/stores/modules/category/type'
import ApiSetting from '@/api'

// 获取一级属性
export const reqP1 = (): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PropertyBaseURL}1`,
    method: 'GET'
  })
}
// 获取二级属性
export const reqP2 = (id1: ID): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PropertyBaseURL}2/${id1}`,
    method: 'GET'
  })
}
// 获取三级属性
export const reqP3 = (id2: ID): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PropertyBaseURL}3/${id2}`,
    method: 'GET'
  })
}
// 获取商品基础属性
export const reqAttrInfoList = (id1: ID, id2: ID, id3: ID): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.AttrBaseURL}/${id1}/${id2}/${id3}`,
    method: 'GET'
  })
}

// 新增或修改已有属性
export const addOrUpdateAttr = (attrData:AttrObj): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: ApiSetting.PropertyAddPreEditURL,
    method: 'POST',
    data:attrData
  })
}

// 删除属性
export const delAttr = (attrId:number|string): Promise<ApiResponse> => {
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.PropertyDelURL}/${attrId}`,
    method: 'DELETE'
  })
}

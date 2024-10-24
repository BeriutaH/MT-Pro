import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { SkuObj } from '@/api/product/sku/type'
import axios from 'axios'

// 根据SPU id 添加SKU数据
export const reqSKUAdd = (skuInfo: SkuObj): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: ApiSetting.SKUAddUrl,
    method: 'POST',
    data: skuInfo
  })
}
// 根据SPU id 查询SKU数据
export const reqSKUInfo = (spuId: number | string | undefined): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SKUInfoUrl}/${spuId}`,
    method: 'GET'
  })
}

// 查询所有SKU数据
export const reqSKUAllInfo = (page: number, limit: number): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SKUAllInfoUrl}/${page}/${limit}`,
    method: 'GET'
  })
}

// sku上架 、 下架
export const reqSKUUpOrDown = (isSale:number, skuId:number|string): Promise<ApiResponse> => {
  const url = isSale === 1 ? `${ApiSetting.SKUUpUrl}/${skuId}` : `${ApiSetting.SKUDownUrl}/${skuId}`
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: url,
    method: 'GET'
  })
}

// 根据sku获取商品详情，这个换请求方式
export const reqSKUData = (skuId: number | string) => {
  return requestWrapper<ApiResponse>({
    url:`${ApiSetting.SKUDataUrl}/${skuId}`,
    method: 'GET'
  })
}
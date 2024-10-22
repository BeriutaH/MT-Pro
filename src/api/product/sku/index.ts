import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { SkuObj } from '@/api/product/sku/type'

// 根据SPU id 添加SKU数据
export const reqSKUAdd = (skuInfo:SkuObj): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: ApiSetting.SKUAddUrl,
    method: 'POST',
    data:skuInfo
  })
}
// 根据SPU id 查询SKU数据
export const reqSKUInfo = (spuId: number | string | undefined): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SKUInfoUrl}/${spuId}`,
    method: 'GET',
  })
}

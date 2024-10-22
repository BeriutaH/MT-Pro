import type { ApiResponse } from '@/api/user/type'
import requestWrapper from '@/utils/request'
import ApiSetting from '@/api'
import type { SpuObj } from '@/api/product/spu/type'

// 获取SPU数据
export const reqSPU = (page: number, limit: number, id: number | string): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SPUBaseUrl}${page}/${limit}?category3Id=${id}`,
    method: 'GET'
  })
}

// 根据SPU id获取SPU下全部售卖的image图片
export const reqSPUImage = (spuId: number | string): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SPUImageUrl}/${spuId}`,
    method: 'GET'
  })
}

// SPU销售属性列表
export const reqSPUSale = (spuId: number | string): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SPUSaleUrl}/${spuId}`,
    method: 'GET'
  })
}

// 获取整个项目的SPU销售属性【颜色，版本，尺码】
export const reqSPUSaleAll = (): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: ApiSetting.SPUAllSaleUrl,
    method: 'GET'
  })
}

// 添加、更新SPU接口
export const reqAddOrUpdateSPU = (data: SpuObj): Promise<ApiResponse> => {
  // 根据id判断是修改还是添加
  let url = ApiSetting.SPUAddUrl
  if (data.id) {
    url = ApiSetting.SPUEditUrl
  }
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: url,
    method: 'POST',
    data: data
  })
}

// 删除SPU
export const reqDeleteSPU = (spuId:number|string): Promise<ApiResponse> => {
  // 获取三级id
  return requestWrapper<ApiResponse>({
    url: `${ApiSetting.SPURemoveUrl}/${spuId}`,
    method: 'DELETE',
  })
}

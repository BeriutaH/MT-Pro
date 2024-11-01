import type { RouteRecordRaw } from 'vue-router'
import type { AttrObj, CategoryObj } from '@/stores/modules/category/type'
// 定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRouters: RouteRecordRaw[]
  username: null
  avatar: null
  roles:string[]
}
// 定义属性小仓库state类型
export interface CategoryState {
  p1Arr: CategoryObj[]
  p1Id: number | string
  p3Arr: CategoryObj[]
  p2Arr: CategoryObj[]
  p2Id: number | string
  p3Id: number | string
  attrInfo: AttrObj[]
}

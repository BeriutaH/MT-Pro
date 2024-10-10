export interface CategoryObj {
  id: number
  name: string
}
// 属性值对象
export interface AttrValueObj {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

// 属性对象
export interface AttrObj {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueObj[]
}

export type ID = number | string

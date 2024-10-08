export interface CategoryObj {
  id: number
  name: string
}
export interface AttrValueObj {
  id: number
  valueName: string
  attrId: number
}

export interface AttrObj {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValueObj[]
}

export type ID = number | string

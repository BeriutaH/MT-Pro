// 销售属性对象类型
export interface SaleAttr {
  id?: number
  createTime?: any
  updateTime?: any
  spuId?: number|string
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValue[]
  flag?: boolean  // 标记
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: any
  updateTime?: any
  spuId?: number
  baseSaleAttrId: number |string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: any
}

// SPU Image类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}

// 整个项目的销售属性
export interface Sale {
  id: number
  name: string
}

// SPU数据类型
export interface SpuObj {
  id?: number | string // SPU的ID
  createTime?: string
  updateTime?: string
  spuName: string
  description: string // SPU的描述
  category3Id: number | string // 三级分类的ID
  tmId: number | string // 品牌的ID
  spuSaleAttrList: any
  spuImageList?: null | SpuImage[]
  spuPosterList: null | SaleAttr[]
}

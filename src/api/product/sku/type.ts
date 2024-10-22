// SKU类型
export interface SkuObj {
  category3Id: number | string
  price: number | string
  skuAttrValueList: SkuAttrValueList[]
  skuDefaultImg: string
  skuDesc: string
  skuName: string
  skuSaleAttrValueList: SkuSaleAttrValueList[]
  spuId: number | string
  tmId: number | string
  weight: string
}

export interface SkuAttrValueList {
  attrId: number | string
  valueId: number | string
}

export interface SkuSaleAttrValueList {
  saleAttrId: number | string
  saleAttrValueId: number | string
}



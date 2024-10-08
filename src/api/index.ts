// 统一管理接口
const BaseURL = '/admin'
// 商城相关请求
const ProductBaseURL = BaseURL + '/product'
export default {
  // 用户相关请求
  UserBaseURL: BaseURL + '/acl/index',
  // 品牌
  TrademarkBaseURL: ProductBaseURL + '/baseTrademark/',
  // 文件
  UploadURL: ProductBaseURL + '/fileUpload',
  // 属性
  PropertyBaseURL: ProductBaseURL + '/getCategory',
  // 商品基础属性
  AttrBaseURL: ProductBaseURL + '/attrInfoList'
}

// 统一管理接口
const BaseURL = '/admin'
// 商城相关请求
const ProductBaseURL = BaseURL + '/product'
// 用户相关url
const UsersBase = BaseURL + '/acl/user'
// 角色
const RoleBase = BaseURL + '/acl/role'
const PermissionBase = BaseURL + '/acl/permission'
export default {
  // 用户相关请求
  UserBaseURL: BaseURL + '/acl/index',
  // 品牌
  TrademarkBaseURL: ProductBaseURL + '/baseTrademark',
  // 文件
  UploadURL: ProductBaseURL + '/fileUpload',

  /***********************************商品属性****************************************/
  // 属性
  PropertyBaseURL: ProductBaseURL + '/getCategory',
  // 增加或修改属性
  PropertyAddPreEditURL: ProductBaseURL + '/saveAttrInfo',
  // 属性删除
  PropertyDelURL: ProductBaseURL + '/deleteAttr',
  // 商品基础属性
  AttrBaseURL: ProductBaseURL + '/attrInfoList',

  /**************************************SPU*************************************/
  // 获取SPU信息
  SPUBaseUrl: ProductBaseURL + '/',
  // 获取SPU图片信息
  SPUImageUrl: ProductBaseURL + '/spuImageList',
  // 获取SPU销售属性列表
  SPUSaleUrl: ProductBaseURL + '/spuSaleAttrList',
  // 获取整个项目的SPU销售属性【颜色，版本，尺码】
  SPUAllSaleUrl: ProductBaseURL + '/baseSaleAttrList',
  // 添加SPU
  SPUAddUrl: ProductBaseURL + '/saveSpuInfo',
  // 修改SPU
  SPUEditUrl: ProductBaseURL + '/updateSpuInfo',
  // 删除SPU
  SPURemoveUrl: ProductBaseURL + '/deleteSpu',

  /**************************************SKU*************************************/
  // 添加SKU信息
  SKUAddUrl: ProductBaseURL + '/saveSkuInfo',
  SKUInfoUrl: ProductBaseURL + '/findBySpuId',
  SKUAllInfoUrl: ProductBaseURL + '/list',
  SKUUpUrl: ProductBaseURL + '/onSale',
  SKUDownUrl: ProductBaseURL + '/cancelSale',
  SKUDataUrl: ProductBaseURL + '/getSkuById',
  SKUDelUrl: ProductBaseURL + '/deleteSku',
  /**************************************用户管理*************************************/
  UsersInfoUrl: UsersBase + '/',
  UsersAddUrl: UsersBase + '/save',
  UsersEditUrl: UsersBase + '/update',
  UsersDelUrl: UsersBase + '/remove',
  UsersBatchDelUrl: UsersBase + '/batchRemove',
  RoleByUserIdUrl: UsersBase + '/toAssign',
  RoleToUserUrl: UsersBase + '/doAssignRole',
  /**************************************角色管理*************************************/
  RoleInfoUrl: RoleBase + '/',
  RoleCreatUrl: RoleBase + '/save',
  RoleEditUrl: RoleBase + '/update',
  RoleDelUrl: RoleBase + '/remove',
  RoleBatchDelUrl: RoleBase + '/batchRemove',
  /**************************************权限管理*************************************/
  PermissionUrl: PermissionBase + '/',
  PermissionByRoleUrl: PermissionBase + '/toAssign',
  AssignPermissionByRoleUrl: PermissionBase + '/doAssignAcl',
  PermissionAddUrl: PermissionBase + '/save',
  PermissionEditUrl: PermissionBase + '/update',
  PermissionDelUrl: PermissionBase + '/remove'
}

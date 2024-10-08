// 如果您正在使用CDN引入，请删除下面一行。
// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象,不指定key，默认变量名字为key
const allGlobalComponent: { [key: string]: any } = { SvgIcon, Category }

// 对外暴露插件对象
export default {
  // 必须为install方法
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus提供图标注册为全局组件,key组件名字，component组件对象
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}

// 小仓库各种首页的小组件相关配置仓库
// 其中涉及到因为需要祖孙组件通信，所以数据放在这里
import { defineStore } from 'pinia'
const useSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      shrinkIcon: false, // 用于控制菜单折叠还是收起
      refresh: false // 用于控制刷新效果
    }
  }
})
export default useSettingStore

// 小仓库各种首页的小组件相关配置仓库
// 其中涉及到因为需要祖孙组件通信，所以数据放在这里
import { defineStore } from 'pinia'
const userSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      shrinkIcon: false
    }
  }
})
export default userSettingStore

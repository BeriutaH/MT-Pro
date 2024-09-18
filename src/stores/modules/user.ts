// 用户相关的小仓库
import { defineStore } from 'pinia'
import type { LoginFrom } from '@/api/user/type'
import { reqLogin } from '@/api/user'
import type { ApiResponse } from '@/api/user/type'

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: () => {
    return {
      token: localStorage.getItem('TOKEN')  // 用户唯一标识
    }
  },
  // 处理异步跟逻辑的地方
  actions: {
    // async 会返回函数执行的结果
    async userLogin(data:LoginFrom) {
      console.log("触发小仓库登录方法", data)
      const result = await reqLogin(data)
      console.log(result)
      const resp = result.data as ApiResponse // 确保类型为 ApiResponse
      // 返回200，存储token
      // 失败401，登录失败错误信息
      console.log(resp)
      if (resp.code == 200) {
        this.token = resp.data.token
        // 本地存储持久化
        localStorage.setItem("TOKEN", resp.data.token)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.message))
      }
    }
  },
  // 处理计算属性
  getters: {}
})

// 对外暴露获取小仓库的方法
export default useUserStore

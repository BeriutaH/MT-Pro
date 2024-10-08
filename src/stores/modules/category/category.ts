// 属性相关小仓库
import { defineStore } from 'pinia'
// 引入分类接口请求
import { reqAttrInfoList, reqP1, reqP2, reqP3 } from '@/api/product/attr'
import type { ApiResponse } from '@/api/user/type'
import type { CategoryState } from '@/stores/modules/types/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      p1Arr: [],
      p2Arr: [],
      p3Arr: [],
      p1Id: '', // 记录一级分类的id
      p3Id: '',
      p2Id: '',
      attrInfo: []
    }
  },
  actions: {
    // 获取一级分类
    async getP1() {
      // 发送请求
      const result: ApiResponse = await reqP1()
      if (result.code == 200) {
        this.p1Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getP2() {
      // 发送请求
      const result: ApiResponse = await reqP2(this.p1Id)
      if (result.code == 200) {
        this.p2Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getP3() {
      // 发送请求
      const result: ApiResponse = await reqP3(this.p2Id)
      if (result.code == 200) {
        this.p3Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async clearStore() {
      // 清空仓库的数据
      // const propertiesToClear: (keyof CategoryState)[] = ['p1Arr', 'p2Arr', 'p3Arr', 'p1Id', 'p2Id', 'p3Id', 'attrInfo'];
      //
      // propertiesToClear.forEach(prop => {
      //   this.CategoryState[prop] = Array.isArray(this.CategoryState[prop]) ? [] : '';
      // })
      this.p1Arr = []
      this.p2Arr = []
      this.p3Arr = []
      this.p1Id = ''
      this.p3Id = ''
      this.p2Id = ''
      this.attrInfo = []
    }

  },
  getters: {}
})

export default useCategoryStore

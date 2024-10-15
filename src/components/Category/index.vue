<template>
  <el-card>
    <el-form :inline="true" class="category_form" :disabled="scene != 1">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.p1Id" @change="handlerP2">
          <!--
            label 为展示的数据
            value 为select下拉菜单收集的数据
          -->
          <el-option
            v-for="(p1, index) in categoryStore.p1Arr"
            :key="p1.id"
            :label="p1.name"
            :value="p1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.p2Id" @change="handlerP3">
          <el-option
            v-for="(p2, index) in categoryStore.p2Arr"
            :key="p2.id"
            :label="p2.name"
            :value="p2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.p3Id">
          <el-option
            v-for="(p3, index) in categoryStore.p3Arr"
            :key="p3.id"
            :label="p3.name"
            :value="p3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/modules/category/category'
// 引入生命周期函数，组件一加载就去请求数据
import { onMounted } from 'vue'
// 接收父组件传递过来的scene
defineProps(['scene'])

const categoryStore = useCategoryStore()
onMounted(() => {
  // 组件一开始加载时，先清空小仓库的数据, 内置方法$reset
  categoryStore.$reset()
  // 获取一级分类数据
  categoryStore.getP1()
})
const handlerP2 = () => {
  // 清除2级跟三级
  categoryStore.p2Id = ''
  categoryStore.p3Id = ''
  categoryStore.p3Arr = []
  // 获取二级分类数据
  categoryStore.getP2()
}

const handlerP3 = () => {
  // 获取三级分类数据
  categoryStore.p3Id = ''
  categoryStore.getP3()
}
</script>

<style scoped lang="scss">
.category_form .el-input,
.category_form .el-select {
  width: 220px; /* 使用标准的 CSS 属性设置宽度 */
}
</style>

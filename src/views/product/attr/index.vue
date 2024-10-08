<template>
  <div>
    <!-- 三级分类组件 -->
    <Category />
    <!--  这里面的两个div，是二选一的情况  -->
    <el-card style="margin: 10px 0">
      <div>
        <el-button
          class="custom_button"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.p3Id"
        >添加属性</el-button
        >
        <el-table style="margin: 10px 0" :data="attrList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, index }">
              <el-tag v-for="(item, index) in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170px">
            <!-- row 已有的属性对象 -->
            <template v-slot="{ row, $index }">
              <el-button
                class="edit_btn"
                type="primary"
                size="small"
                icon="Edit"
              >
                修改
              </el-button>
              <el-button
                class="delete_btn"
                type="primary"
                size="small"
                icon="Delete"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>

      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/modules/category/category'
import { ref, watch } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import type { AttrObj } from '@/stores/modules/category/type'

const categoryStore = useCategoryStore()
const attrList = ref<AttrObj[]>([])
// 监听仓库三级分类ID的变化，并发送请求
watch(
  () => categoryStore.p3Id,
  async () => {
    if (!categoryStore.p3Id){
      // 分类3为空时，要把下面显示的数据清空
      attrList.value = []
      return
    }
    const { p1Id, p2Id, p3Id } = categoryStore
    const result = await reqAttrInfoList(p1Id, p2Id, p3Id)
    if (result.code == 200) {
      // 声明 result.data 的类型
      attrList.value = result.data
      console.log(attrList)
      console.log(1111)
    }
  }
)
</script>

<style scoped lang="scss"></style>

<template>
  <!-- 商品品类，公司 -->
  <div>
    <!-- 三级分类组件 scene 需要把父组件的值绑定 -->
    <Category :scene="scene" />
    <!-- 卡片 -->
    <el-card style="margin: 10px 0">
      <!-- v-if 或 v-show 都可以实现显示与隐藏 -->
      <div v-show="scene == 1">
        <el-button class="custom_button" type="primary" size="default" icon="Plus" @click="getSPU"
          >添加SPU</el-button
        >

        <!-- 表格 -->
        <el-table style="margin: 10px 0" :data="spuArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="160px"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作" width="400px">
            <!-- row即为已有的SPU对象 -->
            <template v-slot="{ row, $index }">
              <el-button class="custom_button" type="primary" size="small" icon="Plus"
                >添加SKU</el-button
              >
              <el-button type="primary" size="small" icon="View"> 查看SKU </el-button>
              <el-button class="edit_btn" type="primary" size="small" icon="Edit"> 修改 </el-button>
              <!-- 泡泡按钮 confirm确定时相应的事件  -->
              <el-popconfirm :title="`你确定要删除${row.attrName}`" @confirm="delAttrInfo(row.id)">
                <template #reference>
                  <el-button class="delete_btn" type="primary" size="small" icon="Delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @change="getSPU"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 10]"
          :disabled="false"
          :background="false"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        />
      </div>
      <SKUForm v-show="scene == 0"/>
      <SPUForm v-show="scene == 2" @changeScene="changeScene" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { reqSPU } from '@/api/product/spu'
import useCategoryStore from '@/stores/modules/category/category'
import SKUForm from '@/views/product/spu/SKUForm.vue'
import SPUForm from '@/views/product/spu/SPUForm.vue'
import type { SpuObj } from '@/stores/modules/spu/type'

const scene = ref(2) // 1:显示SPU，2：添加或修改SPU，0：添加SKU
// 当前页码
const pageNo = ref(1)
// 每一页展示多少条数据
const limit = ref(10)
// 分页数据的总数
const total = ref(0)
// 获取的分页数据
const spuArr = ref<SpuObj[]>([])
const categoryStore = useCategoryStore()

// 获取SPU信息
const getSPU = async () => {
  const result = await reqSPU(pageNo.value, limit.value, categoryStore.p3Id)
  console.log(result)
  if (result.code == 200) {
    total.value = result.data.total
    spuArr.value = result.data.records
  }
}

// 添加SPU
const addSPU = async () => {
  console.log('添加SPU')
}

// 子组件SPUForm绑定自定义事件：目前是让子组件通知父组件切换场景为1
const changeScene = (num:number)=>{
  scene.value = num
}
watch(
  () => categoryStore.p3Id,
  () => {
    if (!categoryStore.p3Id) return
    getSPU()
  }
)
</script>

<style scoped lang="scss"></style>

<template>
  <!-- 商品品类，公司 -->
  <div>
    <!-- 三级分类组件 scene 需要把父组件的值绑定 -->
    <Category :scene="scene" />
    <!-- 卡片 -->
    <el-card style="margin: 10px 0">
      <!-- v-if 或 v-show 都可以实现显示与隐藏 -->
      <div v-show="scene == 1">
        <el-button class="custom_button" type="primary" size="default" icon="Plus" @click="addSPU"
          >添加SPU</el-button>

        <!-- 表格 -->
        <el-table style="margin: 10px 0" :data="spuArr" :height="tableHeight">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="160px"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作" width="330px">
            <!-- row即为已有的SPU对象 -->
            <template v-slot="{ row, $index }">
              <el-button
                class="edit_btn"
                type="primary"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <!-- 泡泡按钮 confirm确定时相应的事件  -->
              <el-popconfirm :title="`你确定要删除${row.spuName}`" @confirm="delAttrInfo(row.id)">
                <template #reference>
                  <el-button
                    class="delete_btn"
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
              <el-button
                class="custom_button"
                type="primary"
                size="small"
                icon="Plus"
                @click="addSku(row)"
                >添加SKU</el-button
              >
              <el-button type="primary" size="small" icon="View" @click="findSku(row)">
                查看SKU
              </el-button>
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
      <!-- 子组件暴露方法给父组件 ref，父组件触发 -->
      <SPUForm ref="spu" v-show="scene == 2" @changeScene="changeScene" />
      <SKUForm ref="sku" v-show="scene == 0" @changeScene="changeScene" />
      <!-- 表格展示已有的sku数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table :data="skuList">
          <el-table-column label="sku名字" prop="skuName"></el-table-column>
          <el-table-column label="sku价格" prop="price"></el-table-column>
          <el-table-column label="sku重量" prop="weight"></el-table-column>
          <el-table-column label="sku图片">
            <template #="{ row, index }">
              <el-image class="custom_image" :src="row.skuDefaultImg"></el-image>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { reqDeleteSPU, reqSPU, reqSPUImage, reqSPUSale, reqSPUSaleAll } from '@/api/product/spu'
import useCategoryStore from '@/stores/modules/category/category'
import SKUForm from '@/views/product/spu/SKUForm.vue'
import SPUForm from '@/views/product/spu/SPUForm.vue'
import type { SpuObj } from '@/api/product/spu/type'
import { reqSKUInfo } from '@/api/product/sku'
import { ElMessage } from 'element-plus'
const scene = ref(1) // 1:显示SPU，2：添加或修改SPU，0：添加SKU
// 当前页码
const pageNo = ref(1)
// 每一页展示多少条数据
const limit = ref(10)
// 分页数据的总数
const total = ref(0)
// 获取的分页数据
const spuArr = ref<SpuObj[]>([])
const categoryStore = useCategoryStore()

const spu = ref()
const sku = ref()
const skuList = ref([])
const show = ref(false) // 对话框是否显示
const paginationHeight = ref(320)

// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})

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
  changeScene(2)
  // 调用子组件的方法
  await spu.value.initSpuAdd(categoryStore.p3Id)
}

// 删除SPU
const delAttrInfo = async (spuId: number | string) => {
  const delResult = await reqDeleteSPU(spuId)
  if (delResult.code == 200) {
    ElMessage.success('删除SPU成功')
  } else {
    ElMessage.error(delResult.data)
  }
  // 查询数据
  await getSPU()
}

// 子组件SPUForm绑定自定义事件：目前是让子组件通知父组件对应的数据切换场景
const changeScene = (num: number, page = 0) => {
  scene.value = num
  if (num == 1) {
    // page为0时，则默认第一页，为1，则在当前页
    if (!page) {
      pageNo.value = 1
    }
    getSPU()
  }
}

// 添加SKU
const addSku = async (row: SpuObj) => {
  changeScene(0)
  // 组建传递到子组件的格式
  const SpuInfo = {
    spuObj: row,
    p1Id: categoryStore.p1Id,
    p2Id: categoryStore.p2Id,
    p3Id: categoryStore.p3Id
  }
  // 调用子组件的功能
  await sku.value.initSkuAdd(SpuInfo)
}

// 查看sku
const findSku = async (spu: SpuObj) => {
  //   获取SPU ID，发送请求
  const skuListResult = await reqSKUInfo(spu.id)
  if (skuListResult.code == 200) {
    skuList.value = skuListResult.data
  } else {
    ElMessage.error(skuListResult.message)
  }
  show.value = true
}
// 获取品牌数据
const updateSpu = async (row: SpuObj) => {
  changeScene(2)
  // 调用子组件的方法
  await spu.value.initSpuHas(row)
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

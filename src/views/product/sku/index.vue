<template>
  <div>
    <el-card>
      <el-table :data="allSkuList" :height="tableHeight">
        <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          prop="skuName"
          width="280px"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          prop="skuDesc"
          width="380px"
        ></el-table-column>
        <el-table-column label="默认图片">
          <template #="{ row, index }">
            <el-image :src="row.skuDefaultImg" class="custom_image"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" prop="weight"></el-table-column>
        <el-table-column label="价格(元)" prop="price"></el-table-column>
        <el-table-column label="操作" fixed="right" width="230px" align="center">
          <!-- row即为已有的SPU对象 -->
          <template v-slot="{ row, $index }">
            <el-tooltip class="item" effect="dark" :content="row.isSale == 1 ? '下架' : '上架'" placement="top">
            <el-button
              :class="row.isSale == 1 ? 'down_bt' : 'custom_button'"
              type="primary"
              size="small"
              :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
              @click="operateSku(row)"
            ></el-button>
            </el-tooltip>
            <el-button
              class="cancel_btn"
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="getSkuById(row)"
            ></el-button>
            <el-button
              class="edit_btn"
              type="primary"
              size="small"
              icon="Edit"
              @click="updateSku()"
            ></el-button>
            <!-- 泡泡按钮 confirm确定时相应的事件  -->
            <el-popconfirm :title="`你确定要删除${row.spuName}`" @confirm="delAttrInfo(row.id)">
              <template #reference>
                <el-button class="delete_btn" type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <!-- 分页器 -->
        <el-pagination
          @change="getSKU"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 10]"
          :disabled="false"
          :background="false"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          class="pagination"
        />
      </div>
      <!--  抽屉组件展示商品详情 -->
      <el-drawer
        v-model="drawer"
        title="商品详情"
      >
        <template #default>
          <div>
            <el-row>
              <el-col :span="6">名称</el-col>
              <el-col :span="18">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">描述</el-col>
              <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">价格</el-col>
              <el-col :span="18">{{ skuInfo.price }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">平台属性</el-col>
              <el-col :span="18">
                <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">销售属性</el-col>
              <el-col :span="18">
                <el-tag v-for="i in skuInfo.skuSaleAttrValueList" :key="i.id">{{i.saleAttrValueName}}</el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">商品图片</el-col>
              <el-col :span="18">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                    <el-image :src="item.imgUrl"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-drawer>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { reqSKUAllInfo, reqSKUData, reqSKUUpOrDown } from '@/api/product/sku'
import { ElMessage } from 'element-plus'

const allSkuList = ref([])
const pageNo = ref(1)
const limit = ref(10)
const total = ref()
const drawer = ref(false)  // 控制抽屉是否出现
const skuInfo = ref({
  // "id": '',
  // "spuId": '',
  // "price": '',
  // "skuName": '',
  // "skuDesc": '',
  // "weight": '',
  // "tmId": '',
  // "category3Id": '',
  // "skuDefaultImg": '',
  // "isSale": '',
  // "skuImageList": [],
  // "skuAttrValueList": [],
  // "skuSaleAttrValueList": []
  "id": 12,
  "spuId": 3,
  "price": 9197,
  "skuName": "Apple iPhone 12 (A2404) 128GB 黑色 支持移动联通电信5G 双卡双待手机",
  "skuDesc": "Apple iPhone 12 (A2404) 128GB 黑色 支持移动联通电信5G 双卡双待手机",
  "weight": "1.00",
  "tmId": 2,
  "category3Id": 61,
  "skuDefaultImg": "http://39.98.123.211/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg",
  "isSale": 1,
  "createTime": "2021-12-10 09:31:42",
  "skuImageList": [
  {
    "id": 54,
    "skuId": 12,
    "imgName": "2689bc534d570eaf.jpg",
    "imgUrl": "http://39.98.123.211/group1/M00/00/02/rBHu8l-rgfWAO2oYAAEw9kY2VKk982.jpg",
    "spuImgId": 13,
    "isDefault": "0"
  },
  {
    "id": 55,
    "skuId": 12,
    "imgName": "7ae59d1d962f0965.jpg",
    "imgUrl": "http://39.98.123.211/group1/M00/00/02/rBHu8l-rgfWAFeQLAAEt9MLZnho584.jpg",
    "spuImgId": 16,
    "isDefault": "0"
  },
  {
    "id": 56,
    "skuId": 12,
    "imgName": "f73bfe30f5ec641a.jpg",
    "imgUrl": "http://39.98.123.211/group1/M00/00/02/rBHu8l-rgfWABhwlAAEjBwwVkrI735.jpg",
    "spuImgId": 18,
    "isDefault": "0"
  },
  {
    "id": 57,
    "skuId": 12,
    "imgName": "7155bba4c363065f.jpg",
    "imgUrl": "http://39.98.123.211/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg",
    "spuImgId": 12,
    "isDefault": "1"
  }
],
  "skuAttrValueList": [
  {
    "id": 45,
    "attrId": 106,
    "valueId": 175,
    "skuId": 12,
    "attrName": "手机一级",
    "valueName": "苹果手机"
  },
  {
    "id": 46,
    "attrId": 107,
    "valueId": 179,
    "skuId": 12,
    "attrName": "二级手机",
    "valueName": "苹果"
  },
  {
    "id": 47,
    "attrId": 23,
    "valueId": 14,
    "skuId": 12,
    "attrName": "运行内存",
    "valueName": "4G"
  },
  {
    "id": 48,
    "attrId": 24,
    "valueId": 82,
    "skuId": 12,
    "attrName": "机身内存",
    "valueName": "128G"
  }
],
  "skuSaleAttrValueList": [
  {
    "id": 23,
    "skuId": 12,
    "spuId": 3,
    "saleAttrValueId": 9,
    "saleAttrId": 1,
    "saleAttrName": "颜色",
    "saleAttrValueName": "黑色"
  },
  {
    "id": 24,
    "skuId": 12,
    "spuId": 3,
    "saleAttrValueId": 14,
    "saleAttrId": 2,
    "saleAttrName": "版本",
    "saleAttrValueName": "128G"
  }
]
})
const getSKU = async () => {
  // 在组件挂载后进行请求
  const result = await reqSKUAllInfo(pageNo.value, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    allSkuList.value = result.data.records
  }
}

const getSkuById = async (sku:any) => {
  console.log("获取数据")
  const result = await reqSKUData(sku.id as number)
  if (result.code == 200) {
    skuInfo.value = result.data
  } else {
    ElMessage.success('没获取到数据')
  }
  drawer.value = true
  console.log(skuInfo.value)
}

// 上架下架
const operateSku = async (sku:any) => {
  const isSale = sku.isSale === 1?0:1
  const result = await reqSKUUpOrDown(isSale, sku.id)
  const action = isSale === 1 ? '上架' : '下架'
  if (result.code === 200) {
    ElMessage.success(`${action}成功`)
    await getSKU()
  } else {
    ElMessage.error(`${action}失败`)
  }
}

// 更新sku
const updateSku = () => {
  ElMessage.success('程序员在努力更新中....')
}

onMounted(async () => {
  await getSKU()
})
const paginationHeight = ref(180)

// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})
</script>

<style scoped lang="scss">
.pagination {
  height: 50px; /* 设置分页组件的高度 */
}
.down_bt {
  background-color: #71C2C2;
  color: white;
  border: 2px solid #71C2C2; // 使用 SCSS 变量
}

.down_bt:hover {
  background-color: $light-green-color;
  border: 2px solid $light-green-color;
}

</style>

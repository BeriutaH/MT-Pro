<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入SKU名称" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量(克)" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="请输入SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="(item, index) in spuProductInfo" :key="item.id" :label="item.attrName">
          <el-select class="input_an_select" v-model="item.attrIdAndAttrValueId">
            <el-option
              :value="`${item.id}:${attr.id}`"
              v-for="(attr, index) in item.attrValueList"
              :key="attr.id"
              :label="attr.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="(item, index) in spuSaleInfo"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select class="input_an_select" v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleValue.id}`"
              v-for="(saleValue, index) in item.spuSaleAttrValueList"
              :key="saleValue.id"
              :label="saleValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table :data="spuImgInfo">
        <el-table-column type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <el-image class="custom_image" :src="row.imgUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <template v-if="row.imgUrl === skuParams.skuDefaultImg">
              <el-button size="small" style="background-color: #f4b8e4; color: white"
                >默认图片</el-button
              >
            </template>
            <template v-else>
              <el-button
                style="background-color: #48a7a7; color: white"
                size="small"
                @click="handler(row)"
                >设置默认</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <div class="button_container">
        <el-button class="cancel_btn" type="primary" size="default" @click="cancel">取消</el-button>
        <el-button class="custom_button" type="primary" size="default" @click="addSku"
          >确认</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import { reqSPUImage, reqSPUSale } from '@/api/product/spu'
import { reqSKUAdd, reqSKUInfo } from '@/api/product/sku'
import type { SkuObj } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

const $emit = defineEmits(['changeScene'])
const initialSkuParams = {
  category3Id: '',
  price: '',
  skuAttrValueList: [],
  skuDefaultImg: '',
  skuDesc: '',
  skuName: '',
  skuSaleAttrValueList: [],
  spuId: '',
  tmId: '',
  weight: ''
}
const skuParams = reactive<SkuObj>(JSON.parse(JSON.stringify(initialSkuParams)))

// 取消返回
const cancel = () => {
  $emit('changeScene', 1)
}

// SPU的销售属性
const spuSaleInfo = ref([])
// SPU的平台属性
const spuProductInfo = ref([])
// 照片墙
const spuImgInfo = ref([])

// 添加sku
const addSku = async () => {
  // 拼凑参数
  skuParams.skuAttrValueList = spuProductInfo.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndAttrValueId) {
      let [attrId, valueId] = next.attrIdAndAttrValueId.split(':')
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = spuSaleInfo.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
  }, [])
  console.log('skuParams', skuParams)
  const SKUResult = await reqSKUAdd(skuParams)
  if (SKUResult.code == 200) {
    $emit('changeScene', 1)
    ElMessage.success('添加SKU成功')
  } else {
    ElMessage.error(SKUResult.message)
  }
}
const handler = (row: any) => {
  // 选中就设置图片
  skuParams.skuDefaultImg = row.imgUrl
}

const initSkuAdd = async (spuInfo: any) => {
  /*
   * 发送三个请求
   * 1. 获取三个属性ID对应的数据
   * 2. 获取照片墙
   * 3. 获取平台属性
   * 4. 获取销售属性
   * */
  // 清空数据
  Object.assign(skuParams, JSON.parse(JSON.stringify(initialSkuParams)))
  const spuId = spuInfo.spuObj.id
  skuParams.category3Id = spuInfo.p3Id
  skuParams.spuId = spuId
  skuParams.tmId = spuInfo.spuObj.tmId
  console.log('SKU操作', spuInfo)
  const SPUSaleResult = await reqSPUSale(spuId)
  if (SPUSaleResult.code == 200) {
    spuSaleInfo.value = SPUSaleResult.data
  }
  console.log('SPUSaleResult', SPUSaleResult)
  const AttrInfoResult = await reqAttrInfoList(spuInfo.p1Id, spuInfo.p2Id, spuInfo.p3Id)
  if (AttrInfoResult.code == 200) {
    spuProductInfo.value = AttrInfoResult.data
  }
  console.log('AttrInfoResult', AttrInfoResult)
  const SPUImgResult = await reqSPUImage(spuId)
  if (SPUImgResult.code == 200) {
    spuImgInfo.value = SPUImgResult.data
  }
  console.log('SPUImgResult', SPUImgResult)
}

// 对外暴露方法，父组件可以调用
defineExpose({ initSkuAdd })
</script>

<style scoped lang="scss">
.el-input {
  width: 200px;
}

.input_an_select {
  width: 200px;
}
.button_container {
  display: flex;
  width: 100%;
  justify-content: end; // 将弹性盒子中的子元素沿主轴（水平轴）对齐到容器的右边
}
</style>

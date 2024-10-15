<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="SpuParams.spuName"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SpuParams.tmId" placeholder="请选择SPU品牌">
          <el-option
            v-for="(item, index) in trademarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU描述"
          v-model="SpuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <!-- v-model:fileList==>展示默认图片 -->
        <el-upload
          class="avatar-uploader"
          v-model:file-list="spuImageList"
          :action="`${apiUrl}/admin/product/fileUpload`"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
        </el-dialog>
      </el-form-item>
      <!--  display: inline-flex 用于使元素在同一行排列，类似于 inline 布局，但提供了 flex 的灵活性 -->
      <el-form-item label="SPU销售属性">
        <div style="display: inline-flex">
          <!-- 展示销售属性的下拉菜单 -->
          <el-select class="select_spu" v-model="saleAttrIdAndName" :placeholder="unSelectSaleAttr.length == 0?'':`还有${unSelectSaleAttr.length}个未选择`">
            <el-option  :value="`${item.id}:${item.name}`" v-for="(item, $index) in unSelectSaleAttr" :label="item.name" :key="item.id"></el-option>
          </el-select>
          <el-button
            :disabled="!saleAttrIdAndName"
            class="custom_button"
            type="primary"
            size="small"
            icon="Plus"
            style="margin-top: 5px"
            @click="addSaleAttr"
            >添加销售属性</el-button
          >
        </div>
        <!-- table展示销售属性与属性值的地方 -->
        <el-table border style="margin: 10px 0" :data="saleList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="销售属性名字" width="180px" prop="saleAttrName"></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{row, $index}">
              <el-tag closable @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin: 0px 10px" v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id">
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input @blur="toLook(row)" v-if="row.flag" v-model="row.saleAttrValueName" size="small" style="width: 100px"></el-input>
              <el-button
                v-else
                class="custom_button"
                type="primary"
                size="small"
                icon="Plus"
                style="margin: 0px 10px"
                @click="saleAdd(row)"
              >
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template #="{row, $index}">
              <el-button class="delete_btn" type="primary" size="small" icon="Delete" @click="saleList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div style="display: flex; justify-content: flex-end">
        <el-button class="cancel_btn" type="primary" size="default" @click="cancel">返回</el-button>
        <el-button :disabled="saleList.length<=0" class="custom_button" type="primary" size="default" @click="save">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
/* 商品的出厂以及销售商信息 */
import type { Sale, SaleAttr, SaleAttrValue, SpuImage, SpuObj } from '@/api/product/spu/type'
import type { Trademark } from '@/api/product/trademark/type'
import { computed, ref } from 'vue'
import { reqTrademarkList } from '@/api/product/trademark'
import { reqAddOrUpdateSPU, reqSPUImage, reqSPUSale, reqSPUSaleAll } from '@/api/product/spu'
// 上传文件，返回文件数据的类型
import { ElMessage, type UploadProps } from 'element-plus'

const apiUrl = import.meta.env.VITE_SERVE

const $emit = defineEmits(['changeScene'])
// 收集还未选择的销售属性的 ID:销售属性名字
const saleAttrIdAndName = ref('')
// 控制对话框的显示
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
// 品牌列表
const trademarkList = ref<Trademark[]>([])
// SPU图片
interface ImageItem {
  name: string
  url: string
}
const spuImageList = ref<ImageItem[]>([])
// 销售属性
const saleList = ref<SaleAttr[]>([])
// 所有的销售属性
const saleAllList = ref<Sale[]>([])

// 点击取消按钮：通知父组件切换场景为1，展示已有的SPU数据
const cancel = () => {
  $emit('changeScene', 1)
}
// 存储已有的SPU对象
const SpuParams = ref<SpuObj>({
  category3Id: '',
  description: '',
  spuName: '',
  spuPosterList: [],
  spuSaleAttrList: [],
  tmId: ''
})

// 上传图片之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 规定只允许JPG，JPEG，GIF图片类型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif']
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('图片类型只接受: JPG，JPEG，GIF')
    return false
  } else if (rawFile.size / 1024 / 1024 >= 4) {
    // 规定图片大小在4M以内
    ElMessage.error('图片大小超过4MB')
    return false
  }
  return true
}
// 获取信息共用的接口数据
const getAllInfo = async () => {
  /*
  * 获取所有的销售数据
  * 获取所有的品牌数据
  * */
  const trademarkResult = await reqTrademarkList()
  if (trademarkResult.code == 200) {
    trademarkList.value = trademarkResult.data
  }
  console.log('trademarkListResult', trademarkResult)
  const spuSaleResult = await reqSPUSaleAll()
  if (spuSaleResult.code == 200) {
    saleAllList.value = spuSaleResult.data
  }
  console.log('saleAllListResult', spuSaleResult)
}
// 子组件渲染时需要执行的行为
const initSpuHas = async (spu: SpuObj) => {
  SpuParams.value = spu
  // 发送四个请求
  console.log('spu', spu)
  const spuId = spu.id ? spu.id : ''
  await getAllInfo()
  const result2 = await reqSPUImage(spuId)
  if (result2.code == 200) {
    // 将里面的键换成组件使用的键
    spuImageList.value = (result2.data as SpuImage[]).map((item: SpuImage) => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
  }
  console.log('spuImageListResult', result2)
  const result3 = await reqSPUSale(spuId)
  if (result3.code == 200) {
    saleList.value = result3.data
  }
  console.log('saleListResult', result3)
  console.log(SpuParams)
}

const initSpuAdd = async (p3Id:number|string) => {
  // 清空数据
  Object.assign(SpuParams.value,{
    id:'',
    category3Id: '',
    description: '',
    spuName: '',
    spuPosterList: [],
    spuSaleAttrList: [],
    tmId: ''
  })
  // 清空销售属性跟照片墙以及属性值
  spuImageList.value = []
  saleList.value = []
  saleAttrIdAndName.value = ''
  await getAllInfo()
  SpuParams.value.category3Id = p3Id
  console.log('添加SPU')
}
// 照片墙预览
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  console.log(file.url)
  dialogVisible.value = true
}

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  // 返回未选择的属性
  return saleAllList.value.filter(item => {
    // every 方法遍历 saleList.value 过滤出 saleList 中不包含的属性
    return saleList.value.every(item1 => {
      // 如果当前 item1.saleAttrName 在 saleAllList 中不存在，则返回 true
      return item.name != item1.saleAttrName
    })
  })
})



// 添加销售属性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  let newSaleAttr:SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList:[]
  }
  // 追加到数组当中
  saleList.value.push(newSaleAttr)
  console.log('saleList', saleList)
  // 清空收集的数据
  saleAttrIdAndName.value = ''

}

// 添加销售属性
const saleAdd = (sale:SaleAttr) => {
  sale.flag = true
}

// 失去焦点触发
const toLook = (row:any) => {
  // row.saleAttrValueName 不能为空，也不能重复
  if (!row.saleAttrValueName.trim() || row.spuSaleAttrValueList.some(item => item.saleAttrValueName === row.saleAttrValueName)) {
    row.saleAttrValueName = ''
    return ElMessage.error('销售属性值不能为空或重名')
  }
  console.log(row)
  // 整理成服务器需要的属性值形式, v-model收集的值放在了saleAttrValueName字段里了
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId:row.baseSaleAttrId,
    saleAttrValueName: row.saleAttrValueName
  }
  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
  // 清空input里面的值
  row.saleAttrValueName = ''
}

// 确认按钮的回调函数
const save = async () => {
  /*
  * 整理SpuParams参数
  * 1.照片墙的数据
  * 2.发送请求，添加SPU或修改SPU
  * 返回结果校验
  * */
  console.log(spuImageList)
  SpuParams.value.spuImageList = spuImageList.value.map((item:any)=>{
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  // 整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleList.value
  const result = await reqAddOrUpdateSPU(SpuParams.value)
  if (result.code == 200) {
    ElMessage.success(SpuParams.value.id?'编辑成功':'添加成功')
    // 切换场景,编辑就在当前页，添加就回到第一个
    $emit('changeScene', 1, SpuParams.value.id?1:0)
  } else {
    ElMessage.error(SpuParams.value.id?'编辑失败':'添加失败')
  }
}

// 对外暴露方法，父组件可以调用
defineExpose({ initSpuHas, initSpuAdd })
</script>

<style scoped lang="scss">
.select_spu {
  flex: 1;
  margin-right: 10px;
}
.el-select {
  width: 200px;
}
.button_container {
  position: absolute; /* 绝对定位 */
  bottom: 0; /* 距离底部的距离 */
  right: 10px; /* 距离右侧的距离 */
}
</style>

<template>
  <div>
    <!-- 三级分类组件 scene 需要把父组件的值绑定-->
    <Category :scene="scene" />
    <!--  这里面的两个div，是二选一的情况  -->
    <el-card style="margin: 10px 0" class="card_container">
      <div v-show="scene==1">
        <el-button
          class="custom_button"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.p3Id"
          @click="changeScene(0)"
        >添加属性</el-button>
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
                @click="changeScene(0)"
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
      <div v-show="scene==0">
        <!-- 添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="custom_button"
          type="primary"
          size="small"
          icon="Plus"
          :disabled="!attrParams.attrName.trim()"
          @click="addAttrValue"
        >添加属性</el-button>
        <el-button
          type="primary"
          size="small"
        >取消</el-button>
        <el-table style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性名称">
          <!-- 添加插槽 -->
            <template #="{ row, $index }">
              <el-input :ref="(vc:any)=>inputAttrs[$index]=vc" placeholder="请输入属性值名称" v-if="row.flag" @blur="toSelect(row, $index )" v-model="row.valueName"></el-input>
              <div v-else @click="toSelect(row, $index )">{{row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性操作" width="180px">
            <template #="{ row, $index }">
              <el-button
                class="delete_btn"
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index,1)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="button_container">
          <el-button
            class="custom_button"
            type="primary"
            size="small"
            @click="attrSave"
          >提交</el-button>
          <el-button
            type="primary"
            size="small"
            @click="changeScene(1)"
          >返回</el-button>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/modules/category/category'
import { nextTick, reactive, ref, watch } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import { addOrUpdateAttr } from '@/api/product/attr'
import type { AttrObj, AttrValueObj } from '@/stores/modules/category/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
const attrList = ref<AttrObj[]>([])
// 收集新增的属性数据
const attrParams = reactive<AttrObj>({
    attrName: '',  // 新增属性名
    categoryId: '',  // 三级分类的ID
    categoryLevel: 3, //  某一个三级分类
    attrValueList: [] //  新增属性值数组
})

const clearAttr = ()=>{
  Object.assign(attrParams, {
    attrName: '',
    categoryId: '',
    categoryLevel: 3, // 如果需要保持为 3
    attrValueList: []
  })
}
// ref 用于跟踪多个输入框
const inputAttrs = ref<any>({})

// 属性值失去焦点变为查看模式
const toSelect = (row:AttrValueObj, $index:number)=>{
  // 非法情况，不能为空
  if (row.valueName.trim() == '') {
    // 删除属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  // 非法情况不能重名，将现在的列表的当前属性信息剔除，跟剩余的做比较
  const repeat = attrParams.attrValueList.some((item, index) => {
    return index !== $index && item.valueName === row.valueName.trim();
  })
  if (repeat) {
    ElMessage.error('属性值不能重复')
    return
  }
  row.flag = !row.flag
  // 响应式数据发生变化，获取更新后的DOM或者（组件实例）
  nextTick(()=>{
    inputAttrs.value[$index]?.focus()  // 聚焦
  })
}
// 定义card组件内容切换变量
const scene = ref<number>(1) // 1：显示table，0：显示添加与修改属性结构
const changeScene = (v:number)=>{
  scene.value = v
  if (v == 1 && categoryStore.p3Id) {
    // 重新将三级数据请求一遍
    getAttrInfo()
  }
  // 将三级分类ID添加上
  attrParams.categoryId = categoryStore.p3Id
  console.log(scene)
  clearAttr()
}

// 添加属性值回调
const addAttrValue = ()=>{
  // 检查是否有空的属性值
  const hasEmptyValue = attrParams.attrValueList.some(item => item.valueName.trim() === '');

  if (hasEmptyValue) {
    ElMessage.error('存在空的属性值，请先填写完整');
    return; // 阻止添加新的属性值
  }
  attrParams.attrValueList.push({valueName:'', flag:true})
  nextTick(()=>{
    inputAttrs.value[attrParams.attrValueList.length-1].focus()  // 最后一个自动聚焦
  })
}

// 保存回调
const attrSave = async ()=>{
  // 校验名字必须要有，并且属性值必须不为0
  if (attrParams.attrName.trim() == ''){
    return ElMessage.error('属性名不能为空')
  }
  if (attrParams.attrValueList.length == 0) {
    return ElMessage.error('至少要有一个属性值')
  }
  // 发送请求，将收集的数据发送过去
  console.log(attrParams)
  const result = await addOrUpdateAttr(attrParams)
  // 添加成功后，将数据清空
  if (result.code == 200) {
    clearAttr()
    ElMessage.success(attrParams.id?'修改属性成功':'添加属性成功')
  } else {
    return ElMessage.error(result.message)
  }
  console.log(result)
}

// 获取全部三级的属性值
const getAttrInfo = async () => {
  const { p1Id, p2Id, p3Id } = categoryStore
  const result = await reqAttrInfoList(p1Id, p2Id, p3Id)
  if (result.code == 200) {
    // 声明 result.data 的类型
    attrList.value = result.data
    console.log(attrList)
  }
}

// 监听仓库三级分类ID的变化，并发送请求
watch(
  () => categoryStore.p3Id,
  async () => {
    if (!categoryStore.p3Id){
      // 分类3为空时，要把下面显示的数据清空
      attrList.value = []
      return
    }
    await getAttrInfo()
  }
)
</script>

<style scoped lang="scss">
.card_container {
  position: relative; /* 确保子元素相对于 el-card 定位 */
  padding: 20px; /* 可根据需要调整内边距 */
}

.button_container {
  position: absolute; /* 绝对定位 */
  bottom: 20px;      /* 距离底部的距离 */
  right: 40px;       /* 距离右侧的距离 */
}
</style>

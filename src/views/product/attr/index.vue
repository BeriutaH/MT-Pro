<template>
  <div>
    <!-- 三级分类组件 scene 需要把父组件的值绑定-->
    <Category :scene="scene" />
    <!--  这里面的两个div，是二选一的情况  -->
    <el-card style="margin: 10px 0" class="card_container">
      <div v-show="scene == 1">
        <el-button
          class="custom_button"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.p3Id"
          @click="addAttr(0)"
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
                @click="updateAttr(row)"
              ></el-button>
              <!-- 泡泡按钮 confirm确定时相应的事件  -->
              <el-popconfirm :title="`你确定要删除${row.attrName}`" @confirm="delAttrInfo(row.id)">
                <template #reference>
                  <el-button
                    class="delete_btn"
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 0">
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
          >添加属性</el-button
        >
        <!--        <el-button type="primary" size="small">取消</el-button>-->
        <el-table style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <!-- 添加插槽 -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputAttrs[$index] = vc)"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toSelect(row, $index)"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toSelect(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="180px">
            <template #="{ row, $index }">
              <el-button
                class="delete_btn"
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="button_container">
          <el-button class="custom_button" type="primary" size="small" @click="attrSave"
            >确认</el-button
          >
          <el-button class="bt_single" size="small" @click="changeScene(1)"
            >取消</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/modules/category/category'
import { nextTick, reactive, ref, watch } from 'vue'
import { delAttr, reqAttrInfoList } from '@/api/product/attr'
import { addOrUpdateAttr } from '@/api/product/attr'
import type { AttrObj, AttrValueObj } from '@/stores/modules/category/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
const attrList = ref<AttrObj[]>([])
// 收集新增的属性数据
const attrParams = reactive<AttrObj>({
  attrName: '', // 新增属性名
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, //  某一个三级分类
  attrValueList: [] //  新增属性值数组
})

const clearAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    categoryLevel: 3, // 如果需要保持为 3
    attrValueList: []
  })
}
// ref 用于跟踪多个输入框
const inputAttrs = ref<any>({})

// 属性值失去焦点变为查看模式
const toSelect = (row: AttrValueObj, $index: number) => {
  // 非法情况，不能为空
  if (row.valueName.trim() == '') {
    // 删除属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    return ElMessage.error('属性值不能为空')
  }
  // 非法情况，不能重名，将现在的列表的当前属性信息剔除，跟剩余的做比较
  const repeat = attrParams.attrValueList.some((item, index) => {
    return index !== $index && item.valueName === row.valueName.trim()
  })
  if (repeat) {
    return ElMessage.error('属性值不能重复')
  }
  row.flag = !row.flag
  // 响应式数据发生变化，获取更新后的DOM或者（组件实例）
  nextTick(() => {
    inputAttrs.value[$index]?.focus() // 聚焦
  })
}

// 校验属性名
const checkAttr = () => {
  if (attrParams.attrName.trim() == '') {
    return ElMessage.error('属性名不能为空')
  }
}
// 定义card组件内容切换变量
const scene = ref<number>(1) // 1：显示table，0：显示添加与修改属性结构
const changeScene = (v: number) => {
  scene.value = v
  if (v == 1 && categoryStore.p3Id) {
    // 重新将三级数据请求一遍
    getAttrInfo()
  }
}

// 点击添加属性的回调
const addAttr = (v: number) => {
  changeScene(v)
  // 先清空
  clearAttr()
  // 将三级分类ID添加上
  attrParams.categoryId = categoryStore.p3Id
}

// 修改属性
const updateAttr = (row: AttrObj) => {
  changeScene(0)
  // // 浅拷贝，会直接把对象地址给一份，直接操作原始数据
  // Object.assign(attrParams, row)
  // 深拷贝，不会操作原数据
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 添加属性值回调
const addAttrValue = () => {
  // 检查是否有空的属性值
  const hasEmptyValue = attrParams.attrValueList.some((item) => item.valueName.trim() === '')

  if (hasEmptyValue) {
    // 阻止添加新的属性值
    return ElMessage.error('存在空的属性值，请先填写完整')
  }
  attrParams.attrValueList.push({ valueName: '', flag: true })
  nextTick(() => {
    inputAttrs.value[attrParams.attrValueList.length - 1].focus() // 最后一个自动聚焦
  })
}

// 保存回调
const attrSave = async () => {
  checkAttr()
  // 校验名字必须要有，并且属性值必须不为0
  if (attrParams.attrValueList.length == 0) {
    return
  }
  // 发送请求，将收集的数据发送过去
  console.log('attrParams:', attrParams)
  const result = await addOrUpdateAttr(attrParams)
  // 添加成功后，将数据清空
  if (result.code == 200) {
    // 判断如果是修改，直接返回，如果是添加，则清除数据
    if (attrParams.id) {
      changeScene(1)
    } else {
      // 将除了属性id的数据清除
      clearAttr()
    }
    ElMessage.success(attrParams.id ? '修改属性成功' : '添加属性成功')
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
    console.log('获取的信息', attrList)
  }
}

const delAttrInfo = async (id: number | string) => {
  const result = await delAttr(id)
  if (result.code == 200) {
    // 重新更新一下数据
    await getAttrInfo()
    ElMessage.success('删除成功')
  }
}

// 监听仓库三级分类ID的变化，并发送请求
watch(
  () => categoryStore.p3Id,
  async () => {
    if (!categoryStore.p3Id) {
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
  bottom: 20px; /* 距离底部的距离 */
  right: 40px; /* 距离右侧的距离 */
}
</style>

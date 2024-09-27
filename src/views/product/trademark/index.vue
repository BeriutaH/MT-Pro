<template>
  <el-card>
    <!-- 卡片上方的按钮 -->
<!--    <el-button style="background-color: #f4b8e4; color: white;border: 2px solid #f4b8e4" type="primary" size="default" icon="Plus">添加品牌</el-button>-->
    <el-button class="custom_button"  type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!--
    表格组件 table
      ---border：可以设置表格纵向是否有边框
      table-column
      ---1abel：某一个列表
      ---width：设置这列宽度
      ---align：设置这一列对齐方式
    -->
    <el-table style="margin: 10px 0" :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <!-- table-column:默认展示数据用的是div，prop=""，可以用插槽 -->
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 插槽 -->
        <template v-slot="{row}">
           <img :src="row.logoUrl" alt="图片无法加载" style="width: 50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template v-slot="{row}" >
          <el-button type="primary" size="small" icon="Edit">修改</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!--
      pagination
        v-model:current-page：设置分页器当前页码
        v-model:page-size：设置每一个展示数据条数
        page-sizes：用于设置下拉菜单数据
        background：设置分页器按钮的背景颜色
        layout：可以设置分页器六个子组件布局调整
      -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3,5,7,10]"
      :disabled="false"
      :background="false"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
// 当前页码
let pageNo = ref(1)
// 每一页展示多少条数据
let limit = ref(3)
// 存储品牌数据的总数
let total = ref(0)
// 存储品牌数据
let trademarkArr = ref([])

// 获取已有品牌的接口封装为一个函数：在任何情况下想获取数据，只需调用
const getHasTrademark = async ()=>{
  const result = await reqHasTrademark(pageNo.value, limit.value)
  console.log(result)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 组件挂在完毕钩子触发一次请求
onMounted(()=>{
  getHasTrademark()
})
</script>

<style scoped lang="scss">

.custom_button {
  background-color: $pink-color;
  color: white;
  border: 2px solid $pink-color; // 使用 SCSS 变量

  //&:hover {
  //  background-color: $pink2-color; // 可选：鼠标悬停时稍微变暗
  //}
}
</style>

<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select>
          <el-option label="华为"></el-option>
          <el-option label="OPPO"></el-option>
          <el-option label="小米"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload list-type="picture-card" class="avatar-uploader" >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!--  display: inline-flex 用于使元素在同一行排列，类似于 inline 布局，但提供了 flex 的灵活性 -->
      <el-form-item label="SPU销售属性">
        <div style="display: inline-flex">
          <!-- 展示销售属性的下拉菜单 -->
          <el-select class="select_spu">
            <el-option label="华为"></el-option>
            <el-option label="OPPO"></el-option>
            <el-option label="小米"></el-option>
          </el-select>
          <el-button class="custom_button" type="primary" size="small" icon="Plus" style="margin-top: 5px;"
            >添加销售属性</el-button
          >
        </div>
        <!-- table展示销售属性与属性值的地方 -->
        <el-table border style="margin: 10px 0">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="销售属性名字" width="180px"></el-table-column>
          <el-table-column label="销售属性值"></el-table-column>
          <el-table-column label="操作" width="180px"></el-table-column>
        </el-table>
      </el-form-item>
      <div style="display: flex; justify-content: flex-end">
        <el-button class="cancel_btn" type="primary" size="default" @click="cancel">返回</el-button>
        <el-button class="custom_button" type="primary" size="default">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])

// 点击取消按钮：通知父组件切换场景为1，展示已有的SPU数据
const cancel = ()=>{
  $emit('changeScene', 1)
}
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

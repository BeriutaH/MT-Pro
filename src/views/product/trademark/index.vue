<template>
  <div>
    <el-card>
      <!-- 卡片上方的按钮 -->
      <!--    <el-button style="background-color: #f4b8e4; color: white;border: 2px solid #f4b8e4" types="primary" size="default" icon="Plus">添加品牌</el-button>-->
      <el-button
        class="custom_button"
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
        >添加品牌</el-button
      >
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
          <template v-slot="{ row }">
            <img :src="row.logoUrl" alt="图片无法加载" style="width: 40px; height: 30px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template v-slot="{ row }">
            <el-button
              class="edit_btn"
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
              >修改</el-button
            >
            <el-button
              class="delete_btn"
              type="primary"
              size="small"
              icon="Delete"
              @click="removeTrademark(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--
      pagination 分页组件
        v-model:current-page：设置分页器当前页码
        v-model:page-size：设置每一个展示数据条数
        page-sizes：用于设置下拉菜单数据
        background：设置分页器按钮的背景颜色
        layout：可以设置分页器六个子组件布局调整
        @change:就包含了size-change和current-change这两个功能
           @size-change="getHasTrademark"
           @current-change="getHasTrademark"
      -->
      <el-pagination
        @change="getHasTrademark"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 10]"
        :disabled="false"
        :background="false"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
    <!-- 对话框: 点击添加品牌与修改已有品牌的业务时使用结构 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="500"
    >
      <el-form style="width: 80%; margin: 0 auto" label-width="80px">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
          <span
            v-if="!trademarkParams.tmName"
            style="color: #999; font-size: 12px; display: inline-block"
            >（品牌名称长度应在2到20个字符之间）</span
          >
        </el-form-item>
        <el-form-item label="LOGO" prop="logoUrl">
          <!-- upload组件属性：
            action图片上传路径书写/api，代理服务器不发送这次post请求
            auto-upload：取消自动上传
            on-change：文件选择时触发
            on-success：返回的文件数据  :on-success="handleAvatarSuccess"
          -->
          <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/admin/product/fileUpload`"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            <div v-if="!trademarkParams.logoUrl" class="upload-tips image_setting">
              只允许JPG，JPEG，GIF图片类型，大小不超过4MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽:footer -->
      <template #footer>
        <el-button class="cancel_btn" type="primary" size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="certain">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqDelTrademark,
  reqHasTrademark,
  reqOperateTrademark,
  reqUpload
} from '@/api/product/trademark'
import type { Trademark } from '@/api/product/trademark/type'
import { ElMessage, type UploadRawFile } from 'element-plus'
// 上传文件，返回文件数据的类型
import type { UploadProps } from 'element-plus'
// 当前页码
let pageNo = ref(1)
// 每一页展示多少条数据
let limit = ref(10)
// 存储品牌数据的总数
let total = ref(0)
// 存储品牌数据
let trademarkArr = ref([])
// 控制对话框显示与隐藏
let dialogFormVisible = ref(false)
// 收集品牌名称跟logo
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: ''
})

// 关闭对话框
const dialogFormVisibleOperate = () => {
  dialogFormVisible.value = false
}
// 文件数据的暂存
const fileToUpload = ref<UploadRawFile | null>(null) // 初始化为 null
const apiUrl = import.meta.env.VITE_SERVE
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
  // 通过校验，使用 FileReader 读取文件并显示预览
  const reader = new FileReader()
  reader.readAsDataURL(rawFile) // 读取文件
  reader.onload = () => {
    trademarkParams.logoUrl = reader.result as string // 显示预览
    fileToUpload.value = rawFile
  }
  return false
}
// 上传图片之后，返回的文件数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

// 获取已有品牌的接口封装为一个函数：在任何情况下想获取数据，只需调用
const getHasTrademark = async (page = 1) => {
  const result = await reqHasTrademark(pageNo.value, limit.value)
  console.log(result)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 组件挂在完毕钩子触发一次请求
onMounted(() => {
  getHasTrademark()
})

// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true
  Object.assign(trademarkParams, {
    tmName: '',
    logoUrl: '',
    id: ''
  })
}

// 修改品牌
const updateTrademark = (row: Trademark) => {
  dialogFormVisible.value = true
  // 将已有的信息显示在窗口中
  // 使用 Object.assign 更新对象的属性，保持响应式
  Object.assign(trademarkParams, row)
}

// 删除品牌
const removeTrademark = async (id: number) => {
  const result = await reqDelTrademark(id)
  if (result.code == 200) {
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data
    })
  }
  await getHasTrademark()
}

// 关闭对话框
const cancel = () => {
  dialogFormVisibleOperate()
}

// 提交品牌信息
const certain = async () => {
  // 校验规则先通过
  const tmName = trademarkParams.tmName
  if (!tmName || tmName.length < 2 || tmName.length > 20) {
    ElMessage.warning('品牌名称长度应在2到20个字符之间')
    return
  }
  if (!fileToUpload.value) {
    if (!trademarkParams.logoUrl) {
      // 如果有id，则是修改，判断是否有url，如果有，则忽略，如果没有，则必须上传文件
      ElMessage.warning('请先选择文件')
      return
    }
  } else {
    const formData = new FormData()
    formData.append('file', fileToUpload.value)
    // 添加文件到 FormData
    const fileResult = await reqUpload(formData)
    if (fileResult.code == 200) {
      trademarkParams.logoUrl = fileResult.data
    } else {
      // 弹出提示信息
      ElMessage({
        type: 'error',
        message: '上传图片失败'
      })
      return
    }
    console.log('上传文件', fileResult)
  }
  // 关闭对话框
  dialogFormVisibleOperate()
  const result = await reqOperateTrademark(trademarkParams)
  console.log('创建后的数据', result)
  if (result.code == 200) {
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    })
    await getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 弹出提示信息
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    })
  }
}
</script>

<style lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.image_setting {
  margin-top: 5px;
  color: #999;
  font-size: 10px;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

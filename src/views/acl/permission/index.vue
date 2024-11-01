<template>
  <div>
    <el-card>
      <el-table
        :data="permissionData"
        :height="tableHeight"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :default-expand-all="true"
        :header-cell-style="{ background: '#f2f2f2', color: '#333', height: '50px' }"
      >
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip />
        <el-table-column prop="name" label="操作" width="240px" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              :disabled="row.level == 4"
              v-if="row.level !== 4"
              class="custom_button"
              @click="addPer(row)"
            >
              {{ row.level == 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <!-- 添加一个占位符 -->
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              class="custom_button"
              style="visibility: hidden"
            >是占位符</el-button>

            <el-button
              type="primary"
              size="small"
              icon="Edit"
              class="edit_btn"
              v-show="row.level !== 1"
              @click="editPermission(row)"
            ></el-button>
            <el-popconfirm :title="`你确定要删除: ${row.name}`" @confirm="delUser(row.id)">
              <template #reference>
                <el-button
                  v-show="row.level !== 1"
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
    </el-card>
    <!-- 添加/更新权限菜单 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="permissionParams.id ? '修改权限菜单' : '添加权限菜单'"
      width="500"
    >
      <el-form :model="permissionParams" label-width="80px" label-position="left">
        <el-form-item label="菜单名称">
          <el-input v-model="permissionParams.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="permissionParams.code" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="bt_single" @click="dialogFormVisible = false">取消</el-button>
          <el-button class="custom_button" type="primary" @click="savePr">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { PermissionObj } from '@/api/acl/menu/type'
import { reqAssignPermissionsByRoleId, reqPermissions } from '@/api/acl/menu'
import { ElMessage } from 'element-plus'

const permissionData = ref<PermissionObj[]>([])
const paginationHeight = ref<number>(160)
const dialogFormVisible = ref<boolean>(false)
const initialPerParams = {
  id: '',
  updateTime: '',
  name: '',
  code: '',
  level: 0,
  pid: 0,
}
const permissionParams = reactive<PermissionObj>(JSON.parse(JSON.stringify(initialPerParams)))

// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})
const getPermission = async () => {
  const result = await reqPermissions()
  if (result.code == 200) {
    permissionData.value = result.data
  }
}

const editPermission = (per:PermissionObj) => {
  Object.assign(permissionParams, per)
  dialogFormVisible.value = true
}

// 提交
const savePr = async () => {
  dialogFormVisible.value = false
  const result = await reqAssignPermissionsByRoleId(permissionParams)
  if (result.code == 200) {
    ElMessage.success(permissionParams.id?'修改权限菜单成功':'添加权限菜单成功')
    await getPermission()
  } else {
    ElMessage.error(permissionParams.id?'修改权限菜单失败':'添加权限菜单失败')
  }
}

const addPer = (per:PermissionObj) => {
  Object.assign(permissionParams, JSON.parse(JSON.stringify(initialPerParams)))
  permissionParams.level = per.level as number + 1
  permissionParams.pid = per.id as number
  dialogFormVisible.value = true
}
onMounted(() => {
  getPermission()
})
</script>

<style scoped lang="scss"></style>

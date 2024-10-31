<template>
  <div>
    <el-card>
      <el-form class="form">
        <el-form-item label="角色名: ">
          <el-input placeholder="请输入角色名称" style="width: 200px; margin-right: 20px;" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!keyWord" class="bt_single" @click="selectRole">搜索</el-button>
          <el-button class="bt_single" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button class="custom_button" type="primary" @click="addRole">添加角色</el-button>
      <!--  @selection-change:  当选择项发生变化时会触发该事件  -->
      <el-table @selection-change="selectChange" :height="tableHeight" style="margin: 10px 0" :data="roleList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="240px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="210px" fixed="right" align="center">
          <template #default="{row}">
            <el-button type="primary" size="small" icon="Avatar" class="cancel_btn" @click="setPermission(row)">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" class="edit_btn" @click="updateRole(row)"></el-button>
            <el-popconfirm :title="`你确定要删除: ${row.roleName}`" @confirm="delRole(row.id)">
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
      <!-- 分页器 -->
      <el-pagination
        @change="getRoles"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 10]"
        :disabled="false"
        :background="false"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="form.id?'修改角色':'添加角色'" width="500">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="bt_single" @click="dialogFormVisible = false">取消</el-button>
          <el-button class="custom_button" type="primary" @click="saveRole">提交</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { Role } from '@/api/acl/users/type'
import { reqDelRole, reqRoleAddOrEdit, reqRoles } from '@/api/acl/role'
import useSettingStore from '@/stores/modules/setting'
import { ElMessage } from 'element-plus'
const keyWord = ref('')
const roleList = ref<Role[]>([])
const pageNo = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)
const settingStore = useSettingStore()
const dialogFormVisible = ref(false)

const form = reactive<Role>({
  id: '',
  roleName: ''
})


const paginationHeight = ref<number>(320)
// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})
const getRoles = async () => {
  const result = await reqRoles(pageNo.value, limit.value, keyWord.value)
  if (result.code == 200) {
    total.value = result.data.total
    roleList.value = result.data.records
  }
}
const addRole = async () => {
  form.id = ''
  form.roleName = ''
  editDia(true)
}

const editDia = (flag:boolean) => {
  dialogFormVisible.value = flag
}

const saveRole = async () => {
  editDia(false)
  const result = await reqRoleAddOrEdit(form)
  if (result.code == 200) {
    ElMessage.success(form.id?'修改成功':'创建成功')
    await getRoles()
  } else {
    ElMessage.error(form.id?'修改失败':'创建失败')
  }
}

const selectRole = async () => {
  await getRoles()
}

const reset = () => {
  // 对应的路由组件重新加载
  settingStore.refresh = !settingStore.refresh
}
const setPermission = (role:Role) => {
  console.log('设置权限')
}

const updateRole = (role:Role) => {
  form.id = role.id?.toString() ?? ""
  form.roleName = role.roleName
  dialogFormVisible.value = true
}
const selectChange = () => {
  
}

const delRole = async (roleId:number|string) => {
  const result = await reqDelRole(roleId)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    await getRoles()
  } else {
    ElMessage.error('删除失败')
  }
}
onMounted(() => {
  getRoles()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
}
.el-form-item {
  margin: 0;
}

</style>

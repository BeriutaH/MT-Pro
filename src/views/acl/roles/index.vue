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
    <el-dialog v-model="dialogFormVisible" :title="roleParams.id?'修改角色':'添加角色'" width="500">
      <el-form :model="roleParams">
        <el-form-item label="角色名称">
          <el-input v-model="roleParams.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="bt_single" @click="dialogFormVisible = false">取消</el-button>
          <el-button class="custom_button" type="primary" @click="saveRole">提交</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 抽屉：显示分配角色权限 -->
    <el-drawer v-model="drawerPermission" :size="300">
      <template #header>
        <h4 class="drawer_title">分配角色权限</h4>
      </template>
      <template #default>
        <el-form>
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            :data="permissionAllList"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="permissionIdList"
            :props="defaultProps"
          />
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button class="bt_single" @click="cancelPermission">取消</el-button>
          <el-button type="primary" class="custom_button" @click="savePermission">提交</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import type { Role } from '@/api/acl/users/type'
import { reqDelRole, reqRoleAddOrEdit, reqRoles } from '@/api/acl/role'
import useSettingStore from '@/stores/modules/setting'
import { ElMessage, ElTree } from 'element-plus'
import type { PermissionObj } from '@/api/acl/menu/type'
import { reqAssignPermissionsByRoleId, reqPermissions, reqPermissionsByRoleId } from '@/api/acl/menu'
import useUserStore from '@/stores/modules/users/user'


const keyWord = ref('')
const roleList = ref<Role[]>([])
const permissionAllList = ref<PermissionObj[]>([])
const permissionIdList = ref<number[]>([])
const pageNo = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)
const settingStore = useSettingStore()
const userStore = useUserStore()
const dialogFormVisible = ref(false)
const drawerPermission = ref(false)
// tree的标签
const treeRef = ref()
const defaultProps = {
  children: 'children',
  label: 'name',
}
const roleParams = reactive<Role>({
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
  roleParams.id = ''
  roleParams.roleName = ''
  editDia(true)
}

const editDia = (flag:boolean) => {
  dialogFormVisible.value = flag
}

const editDrawer = (flag:boolean) => {
  drawerPermission.value = flag
}

const saveRole = async () => {
  editDrawer(false)
  const result = await reqRoleAddOrEdit(roleParams)
  if (result.code == 200) {
    ElMessage.success(roleParams.id?'修改成功':'创建成功')
    await getRoles()
  } else {
    ElMessage.error(roleParams.id?'修改失败':'创建失败')
  }
}

const selectRole = async () => {
  await getRoles()
}

const reset = () => {
  // 对应的路由组件重新加载
  settingStore.refresh = !settingStore.refresh
}

// 获取当前角色的权限
const setPermission = async (role:Role) => {
  roleParams.id = role.id
  roleParams.roleName = role.roleName
  editDrawer(true)
  const result = await reqPermissionsByRoleId(role.id as number)
  if (result.code == 200) {
    permissionIdList.value = collectSelectedIds(result.data)
    console.log(permissionIdList.value)
    // 等待 DOM 更新
    await nextTick(() => {
      if (treeRef.value){
        treeRef.value.setCheckedKeys(permissionIdList.value)
      }
    })
  } else {
    ElMessage.error('未获取到信息')
  }
}


const getPer = async () => {
  const result = await reqPermissions()
  if (result.code == 200) {
    permissionAllList.value = result.data
  }
}

const updateRole = (role:Role) => {
  roleParams.id = role.id?.toString() ?? ""
  roleParams.roleName = role.roleName
  dialogFormVisible.value = true
}

// 提交分配的权限
const savePermission = async () => {
  editDrawer(false)
  const checkedKeys = treeRef.value.getCheckedKeys()
  // 半选中状态通常出现在父节点有子节点被选中而子节点有部分未选中的情况下
  const halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
  const result = await reqAssignPermissionsByRoleId(roleParams.id as number ,checkedKeys.concat(halfCheckedKeys))
  if (result.code == 200) {
    ElMessage.success('分配权限成功')
    if (userStore.roles.includes(roleParams.roleName)) {
      // 页面刷新,避免权限修改后，当前用户的权限还是历史权限
      window.location.reload()
    }
  } else {
    ElMessage.error('分配权限失败')
  }
}

const cancelPermission = () => {
  
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

// 递归获取最底层的选中的id
const collectSelectedIds = (nodes: PermissionObj[]): number[] => {
  const selectedIds: number[] = []
  nodes.forEach(node => {
    // 仅当节点 select 为 true 且没有子节点时才收集 id
    if (node.select && (!node.children || node.children.length === 0)) {
      selectedIds.push(node.id);
    }
    // 如果有子节点，继续递归遍历
    if (node.children && node.children.length > 0) {
      selectedIds.push(...collectSelectedIds(node.children));
    }
  })
  return selectedIds
}

onMounted(() => {
  getRoles()
  getPer()
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

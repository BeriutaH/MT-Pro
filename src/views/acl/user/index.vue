<template>
  <div>
    <el-card>
      <el-form class="form">
        <el-form-item label="用户名: ">
          <el-input placeholder="请你输入用户名" style="width: 200px; margin-right: 20px;" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!keyWord" class="bt_single" @click="selectName">搜索</el-button>
          <el-button class="bt_single" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button class="custom_button" type="primary" @click="addUser">添加用户</el-button>
      <el-button :disabled="!usersList.length" class="delete_btn" type="primary" @click="batchRemove">批量删除</el-button>
      <!--  @selection-change:  当选择项发生变化时会触发该事件  -->
      <el-table @selection-change="selectChange" :height="tableHeight" style="margin: 10px 0" :data="usersList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column label="用户名称" prop="name" width="140px"></el-table-column>
        <el-table-column label="用户昵称" prop="username" width="140px"></el-table-column>
        <el-table-column label="用户职位" prop="roleName" width="440px">
          <template #default="{row}">
            <div>
              <el-tag
                v-for="role in splitRoles(row.roleName)"
                :key="role"
                type="primary"
                style="margin-right: 4px"
              >
                {{ role }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="210px" fixed="right" align="center">
          <template #default="{row}">
            <el-button type="primary" size="small" icon="Avatar" class="cancel_btn" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" class="edit_btn" @click="updateUser(row)"></el-button>
            <el-popconfirm :title="`你确定要删除: ${row.name}`" @confirm="delUser(row.id)">
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
        @change="getUsers"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 10]"
        :disabled="false"
        :background="false"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
    <!-- 抽屉：完成添加用户跟修改用户 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4 class="drawer_title">{{ userParams.id?'编辑用户':'添加用户' }}</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户名" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input placeholder="请输入用户昵称" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" v-if="!userParams.id">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button class="bt_single" @click="cancelUser">取消</el-button>
          <el-button type="primary" class="custom_button" @click="saveUser">提交</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉：显示分配用户角色 -->
    <el-drawer v-model="drawerRole">
      <template #header>
        <h4 class="drawer_title">分配用户角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户昵称">
            <el-input placeholder="请输入用户昵称" v-model="userParams.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="role in allRole" :key="role.id" :label="role.roleName" :value="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button class="bt_single" @click="cancelUserToRole">取消</el-button>
          <el-button type="primary" class="custom_button" @click="saveUserToRole">提交</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  reqBatchDelUser,
  reqDelUser,
  reqRoleByUserId,
  reqUsersAddOrEdit,
  reqUsersInfo,
  reqUserToRoles
} from '@/api/acl/users'
import type { Role, UserObj, UserToRole } from '@/api/acl/users/type'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/modules/users/user'
import useSettingStore from '@/stores/modules/setting'

const useStore = useUserStore()
const settingStore = useSettingStore()
const drawer = ref<boolean>(false)
const drawerRole = ref<boolean>(false)  // 控制角色分配的抽屉
const checkAll = ref<boolean>(false)  // 是否全选
const isIndeterminate = ref<boolean>(true)  // 是否全选
const pageNo = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)
const paginationHeight = ref<number>(320)
const usersList = ref<UserObj[]>([])
const allRole = ref<Role[]>([])
const userRole = ref<Role[]>([])
const keyWord = ref('')  // 收集用户的输入的查询名称信息
const initialUserParams = {
  id:'',
  name: '',
  password: '',
  phone: '',
  roleName: '',
  username: ''
}
const initialRoleAndUser = {
  roleIdList:[],
  userId:''
}
const userIdList = ref<UserObj[]>([])
const oldName = ref<string>('')
const roleAndUser = reactive<UserToRole>(JSON.parse(JSON.stringify(initialRoleAndUser)))
const userParams = reactive<UserObj>(JSON.parse(JSON.stringify(initialUserParams)))
// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})

// 切割角色
const splitRoles = (roleName:string) => {
  return roleName ? roleName.split(",") : []
}

// 全选框
const handleCheckAllChange = (val:boolean) => {
  userRole.value = val?allRole.value:[]
  isIndeterminate.value = false
}

// 底部复选框change事件
const handleCheckedCitiesChange = (value:Role[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length

}

// 根据名称查询用户
const selectName = async () => {
  await getUsers()
}

// 选中用户表格复选框触发
const selectChange = (val:UserObj[]) => {
  userIdList.value = val
}

// 批量删除用户
const batchRemove = async () => {
  const idList = userIdList.value
    .map(user => user.id)
    .filter((id): id is number => id !== undefined)
  const result = await reqBatchDelUser(idList)
  if (result.code == 200) {
    ElMessage.success('批量删除用户成功')
  } else {
    ElMessage.error('批量删除用户失败')
  }
  await getUsers()
}

// 重置
const reset = () => {
  // 对应的路由组件重新加载
  settingStore.refresh = !settingStore.refresh
}

const getUsers = async () => {
  const result = await reqUsersInfo(pageNo.value, limit.value, keyWord.value)
  if (result.code == 200) {
    total.value = result.data.total
    usersList.value = result.data.records
  }
}
const setDrawer = (n=1) => {
  drawer.value = n === 1;
}

const setDrawerRole = (n=1) => {
  drawerRole.value = n === 1;
}

// 分配角色
const setRole = async (user:UserObj) => {
  setDrawerRole()
  Object.assign(userParams, user)
  const userId = user.id as number
  const result = await reqRoleByUserId(userId)
  if (result.code == 200) {
    userRole.value = result.data.assignRoles
    allRole.value = result.data.allRolesList
  }
  roleAndUser.userId = userId
}



// 取消分配角色
const cancelUserToRole = () => {
  setDrawerRole(0)
}
// 确定分配角色
const saveUserToRole = async () => {
  roleAndUser.roleIdList = userRole.value
    .map(role => role.id)
    .filter((id): id is number => id !== undefined)
  console.log('roleAndUser发送数据:', roleAndUser)
  const result = await reqUserToRoles(roleAndUser)
  if (result.code == 200) {
    ElMessage.success('分配角色成功')
    setDrawerRole(0)
    await getUsers()
  } else {
    ElMessage.error('分配角色失败')
  }
}
// 添加用户
const addUser = () => {
  setDrawer()
  Object.assign(userParams, JSON.parse(JSON.stringify(initialUserParams)))
}

// 更新用户
const updateUser = async (row:UserObj) => {
  oldName.value = row.username
  Object.assign(userParams, row)
  setDrawer()
  console.log(row)
}
// 取消用户
const cancelUser = () => {
  setDrawer(0)
}

// 提交用户
const saveUser = async () => {
  setDrawer(0)
  const result = await reqUsersAddOrEdit(userParams)
  if (result.code == 200) {
    ElMessage.success(userParams.id ? '编辑用户成功' : '添加用户成功')
    await getUsers()
    // 校验是否修改的当前账号，如果是，则重新刷新浏览器
    if (oldName.value == useStore.username){
      // 浏览器自动刷新一次,避免修改了当前本身的账号信息
      window.location.reload()
    }
  } else {
    ElMessage.error(userParams.id ? '编辑用户失败' : '添加用户失败')
  }
  oldName.value = ''
}

// 删除用户
const delUser = async (userId: number | string) => {
  const result = await reqDelUser(userId)
  if (result.code == 200) {
    ElMessage.success('删除用户成功')
    await getUsers()
  } else {
    ElMessage.error('删除用户失败')
  }
}

onMounted(() => {
  getUsers()
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
.el-input {
  width: 200px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.drawer_title {
  text-align: center;
  margin: 0; /* 去除默认的外边距 */
  width: 100%; /* 使标题居中对齐 */
}
</style>

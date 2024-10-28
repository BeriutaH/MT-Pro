<template>
  <div>
    <el-card>
      <el-form class="form">
        <el-form-item label="用户名: ">
          <el-input placeholder="请你输入用户名" style="width: 200px; margin-right: 20px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="bt_single">搜索</el-button>
          <el-button class="bt_single">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button class="custom_button" type="primary" @click="addUser">添加用户</el-button>
      <el-button class="delete_btn" type="primary">批量删除</el-button>
      <el-table :height="tableHeight" style="margin: 10px 0" :data="usersList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column label="用户名" prop="username" width="120px"></el-table-column>
        <el-table-column label="用户名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="用户职位" prop="roleName" width="550px">
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
        <el-table-column label="操作" width="210px">
          <template #default="{row}">
            <el-button type="primary" size="small" icon="Avatar" class="cancel_btn">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" class="edit_btn" @click="updateUser(row)"></el-button>
            <el-button type="primary" size="small" icon="Delete" class="delete_btn"></el-button>
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
        <h4 class="drawer_title">{{ drawerTitle }}</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button type="primary" class="cancel_btn" @click="cancelUser">取消</el-button>
          <el-button type="primary" class="custom_button" @click="saveUser">提交</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { reqUsersInfo } from '@/api/acl/users'

const drawer = ref(false)
const pageNo = ref(1)
const limit = ref(10)
const total = ref(0)
const paginationHeight = ref(310)
const usersList = ref([])
const drawerTitle = ref('添加用户')
// 计算 tableHeight，动态返回
const tableHeight = computed(() => {
  return `calc(100vh - ${paginationHeight.value}px)`
})

// 切割角色
const splitRoles = (roleName:string) => {
  return roleName ? roleName.split(",") : []
}
const getUsers = async () => {
  console.log('getUsers')
  const result = await reqUsersInfo(pageNo.value, limit.value)
  console.log(result)
  if (result.code == 200) {
    total.value = result.data.total
    usersList.value = result.data.records
  }
}
const setDrawer = (n=1) => {
  drawer.value = n === 1;
}

const setTitle = (title:string) => {
  drawerTitle.value = title
}
// 添加用户
const addUser = () => {
  setTitle('添加用户')
  setDrawer()
  console.log(drawer.value)
}

// 更新用户
const updateUser = async (row:any) => {
  setTitle('修改用户')
  setDrawer()
  console.log(row)
}
// 取消用户
const cancelUser = () => {
  setDrawer(0)
}

// 提交用户
const saveUser = () => {
  setDrawer(0)
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
.bt_single:hover{
  color: $medium-color;
  border-color: $medium-color;
  background-color: $btn-hover-color;
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

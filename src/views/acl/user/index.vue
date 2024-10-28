<template>
  <div>
    <el-card>
      <el-form class="form">
        <el-form-item label="用户名: ">
          <el-input placeholder="请你输入用户名" style="width: 200px; margin-right: 20px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button class="custom_button" type="primary">添加用户</el-button>
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
          <template #default="{row, $index}">
            <el-button type="primary" size="small" icon="Avatar" class="cancel_btn">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" class="edit_btn"></el-button>
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
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { reqUsersInfo } from '@/api/acl/users'


const pageNo = ref(1)
const limit = ref(10)
const total = ref(0)
const paginationHeight = ref(310)
const usersList = ref([])
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
</style>

export const routers = [
  {
    path: '/',
    redirect: '/login',
    name: 'root',
    meta: {
      title: '根路由',
      hidden: true // 是否要隐藏
    }
  },
  {
    path: '/menu',
    name: 'home',
    component: () => import('@/layouts/index.vue'),
    meta: { title: '首页', hidden: false, icon: 'HomeFilled' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '数据大屏', hidden: false, icon: 'Platform' }
  },
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layouts/index.vue'), // 一级路由组件
    meta: { title: '权限管理', hidden: false, icon: 'Management' },
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: { title: '用户管理', hidden: false, icon: 'User' }
      },
      {
        path: '/acl/roles',
        name: 'Roles',
        component: () => import('@/views/acl/roles/index.vue'),
        meta: { title: '角色管理', hidden: false, icon: 'Connection' }
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: { title: '菜单管理', hidden: false, icon: 'Tickets' }
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layouts/index.vue'), // 一级路由组件
    meta: { title: '商品管理', hidden: false, icon: 'Shop' },
    children: [
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: { title: '属性管理', hidden: false, icon: 'CreditCard' }
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: { title: 'SKU管理', hidden: false, icon: 'Coin' }
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: { title: 'SPU管理', hidden: false, icon: 'Calendar' }
      },
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: { title: '品牌管理', hidden: false, icon: 'TakeawayBox' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/not_found/index.vue'),
    meta: { title: '404', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: { title: '其他', hidden: true }
  }
]

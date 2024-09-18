export const routers = [
  {
    path: '/',
    redirect: '/login',
    name: 'root'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/not_found/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]

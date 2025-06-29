import { verifyToken } from '@/composables/usePromise'
import axios from 'axios'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// TODO: Разбить роуты на модули
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('@/views/EntrancePage.vue'),
  },

  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/views/FinancePage.vue'),
    meta: { requireAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requireAuth) return next()
  const token = localStorage.getItem('accessToken')
  if (!token) return next({ path: '/entrance' })
  try {
    await verifyToken(token)
    return next()
  } catch {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return next({ path: '/entrance' })
  }
})

// router.beforeEach((to, from, next) => {
//   if (!to.meta.requireAuth) {
//     return next()
//   }

//   const token = localStorage.getItem('accessToken')
//   if (token) {
//     return next()
//   } else {
//     return next({ name: 'Entrance' })
//   }
// })

export default router

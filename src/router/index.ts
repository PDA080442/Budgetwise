import { verifyToken } from '@/composables/verification.request'
import axios from 'axios'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import AuthRoutes from './auth'

const routes: RouteRecordRaw[] = [
  ...AuthRoutes,
  {
    path: '/',
    name: 'Home',
    component: () => HomePage,
  },
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/views/FinancePage.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/ContactPage.vue'),
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('@/views/FaqPage.vue'),
  },
  {
    path: '/accountsettings',
    name: 'AccountSettings',
    component: () => import('@/views/SettingsAuth/AccountSettingsPage.vue'),
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
  if (!axios.defaults.headers.common['Authorization']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  try {
    await verifyToken()
    return next()
  } catch {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    delete axios.defaults.headers.common['Authorization']
    return next({ path: '/entrance' })
  }
})

export default router

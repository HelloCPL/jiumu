import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from './routes'
import { afterEach } from '@/hooks/use-router-after-each'
import { beforeEach } from '@/hooks/use-router-before-each'
const { VITE_PUBLIC_PATH } = import.meta.env

const router: Router = createRouter({
  history: createWebHistory(VITE_PUBLIC_PATH),
  routes
})

beforeEach(router)
afterEach(router)

export default router

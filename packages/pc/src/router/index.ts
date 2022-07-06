import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from './routes'
import { afterEach } from '@/hooks/use-router-after-each'
import { beforeEach } from '@/hooks/use-router-before-each'
const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

beforeEach(router)
afterEach(router)

export default router

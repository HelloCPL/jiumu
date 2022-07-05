import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from './routes'
import { afterEach } from '@/hooks/use-router-after-each'
const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  next()
})

afterEach(router)

export default router

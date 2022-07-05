import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from './routes'

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  next()
})

export default router

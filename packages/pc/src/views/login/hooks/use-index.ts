/**
 * 登录首页处理逻辑
 */

import { LoginShow } from './type'
import { ref, Ref } from 'vue'
import gsap from 'gsap'

interface UseIndex {
  loginShow: Ref<LoginShow>
  registerShow: Ref<LoginShow>
  toggleShow: () => void
}

export const useIndex = (): UseIndex => {
  const loginShow = ref<LoginShow>({
    show: true,
    top: 0,
    opacity: 1
  })

  const registerShow = ref<LoginShow>({
    show: false,
    top: 100,
    opacity: 0.3
  })

  let lock = false

  // 切换登录或注册页面
  const toggleShow = () => {
    if (lock) return
    lock = true
    if (loginShow.value.show) {
      registerShow.value.show = true
      gsap.to(loginShow.value, {
        top: -100,
        opacity: 0.3,
        duration: 0.8,
        onComplete: () => {
          lock = false
          loginShow.value = {
            show: false,
            top: -100,
            opacity: 0.3
          }
        }
      })
      gsap.to(registerShow.value, {
        top: 0,
        opacity: 1,
        duration: 0.8,
        onComplete: () => {
          registerShow.value = {
            show: true,
            top: 0,
            opacity: 1
          }
        }
      })
    } else {
      loginShow.value.show = true
      gsap.to(loginShow.value, {
        top: 0,
        opacity: 1,
        duration: 0.8,
        onComplete: () => {
          lock = false
          loginShow.value = {
            show: true,
            top: 0,
            opacity: 1
          }
        }
      })
      gsap.to(registerShow.value, {
        top: 100,
        opacity: 0.3,
        duration: 0.8,
        onComplete: () => {
          registerShow.value = {
            show: false,
            top: 100,
            opacity: 0.3
          }
        }
      })
    }
  }

  return {
    loginShow,
    registerShow,
    toggleShow
  }
}

/**
 * @describe: 页面常用方法
 * @author: cpl
 * @create: 2022-10-23 02:24:37
 */

import { useUserStore, useThemeStore } from '@/store'

/*
 * 查找是否code权限 多个用逗号隔开
 */
export const checkPermissionByCode = (code?: string): boolean => {
  if (!code) return true
  const userStore = useUserStore()
  const codes = code.split(',')
  let flag = false
  codes.find((val) => {
    flag = _findPermissions(val, userStore.permissions)
    return flag
  })
  return flag
}
function _findPermissions(val: string, arr: DataPermission[]): boolean {
  let flag = false
  arr.find((item) => {
    if (item.code === val) {
      flag = true
      return flag
    }
  })
  return flag
}

interface ParamsTarget extends ObjectAny {
  id: string
}
/*
 * 合并数组 去除id相同项
 * origin 源数组
 * origin 目标数组
 */
export const mergeArray = <T extends ParamsTarget[]>(origin: T, target: T): T => {
  const _find = (id: string) => {
    let flag = false
    origin.find((item) => {
      if (item.id === id) {
        flag = true
      }
      return flag
    })
    return flag
  }
  if (Array.isArray(target)) {
    target.forEach((item) => {
      const flag = _find(item.id)
      if (!flag) origin.push(item)
    })
  }
  return origin
}

/*
 * 获取序号
 */
export const getIndex = (index: number, pageNo?: number, pageSize?: number) => {
  if (index === -1) return ''
  let total = index + 1
  if (pageNo && pageSize) total += (pageNo - 1) * pageSize
  return total
}

/*
 * 按比例获取 px 大小
 */
export const getPx = (size: number): number => {
  const themeStore = useThemeStore()
  return (size * themeStore.fontSize) / 14
}

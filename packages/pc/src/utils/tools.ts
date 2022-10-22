/**
 * @describe: 页面常用方法
 * @author: cpl
 * @create: 2022-10-23 02:24:37
 */

import { useUserStore } from '@/store'

// 查找是否code权限 多个用逗号隔开
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

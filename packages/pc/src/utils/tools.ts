/**
 * @describe: 页面常用方法
 * @author: cpl
 * @create: 2022-10-23 02:24:37
 */

import { useThemeStore } from '@/store'

interface ParamsTarget extends ObjectAny {
  id: string
}
/**
 * 合并数组 去除id相同项
 * @param origin 源数组
 * @param origin 目标数组（即要被添加的数组）
 */
export const mergeArray = <T extends ParamsTarget[]>(origin: T, target: T): T => {
  const findOne = (id: string, arr: T) => arr.find((item) => item.id === id)
  if (Array.isArray(target)) {
    target.forEach((item) => {
      const flag = findOne(item.id, origin)
      if (!flag) {
        origin.push(item)
      }
    })
  }
  return origin
}

/**
 * 获取序号
 * @param index 当前索引
 * @param pageNo 当前页码
 * @param pageSize 每页条数
 */
export const getIndex = (index: number, pageNo?: number, pageSize?: number) => {
  if (index === -1) return ''
  let total = index + 1
  if (pageNo && pageSize) total += (pageNo - 1) * pageSize
  return total
}

/**
 * 按比例获取 px 大小
 * @param size 当前值
 */
export function getPx(size: number): number
export function getPx(size: string): string
export function getPx(size: number | string): number | string {
  const themeStore = useThemeStore()
  if (typeof size === 'number') {
    return (size * themeStore.fontSize) / 14
  }
  const reg = /^(\d+)(px|rem|em)$/
  const m = size.match(reg)
  if (m && m.length === 3) {
    const num = Number(m[1])
    if (num > 0) {
      return (num * themeStore.fontSize) / 14 + m[2]
    }
  }
  return size
}

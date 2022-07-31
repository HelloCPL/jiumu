/**
 * 角色 权限 菜单 标签 用户 等关联处理方法
 * 特殊方法使用下划线开头
 */
import { Ref } from 'vue'

// 新增
export const _push = <T extends ObjectAny>(target: Ref<T[]>, origin: Ref<T[]>, info: T): void => {
  const flag = target.value.find((item) => item.id === info.id)
  if (!flag) {
    target.value.push(info)
    _relevance(target, origin)
  }
}

// 删除
export const _pop = <T extends ObjectAny>(target: Ref<T[]>, origin: Ref<T[]>, info: T): void => {
  let i = -1
  target.value.find((item, index) => {
    if (item.id === info.id) {
      i = index
      return true
    }
  })
  if (i !== -1) {
    target.value.splice(i, 1)
    _relevance(target, origin)
  }
}

// 查找某个
export const _find = <T extends any[]>(target: Ref<T>, id: string): boolean => {
  let flag = false
  target.value.find((item) => {
    if (item.id === id) {
      flag = true
      return flag
    }
  })
  return flag
}

// 关联
export const _relevance = <T extends any[]>(target: Ref<T>, origin: Ref<T>): void => {
  origin.value.forEach((item) => {
    item._checked = _find(target, item.id)
  })
}

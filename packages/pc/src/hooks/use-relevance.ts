/**
 * 角色 权限 菜单 标签 用户 等关联处理方法
 * 特殊方法使用下划线开头
 */
import { Ref } from 'vue'

/**
 * 新增一个关联数据
 * @param target 目标数组（已关联的数据列表）
 * @param origin 原始数组（所有的数据）
 * @param info 添加关联后的数据
 */
export const pushRelevance = <T extends ObjectAny>(target: Ref<T[]>, origin: Ref<T[]>, info: T): void => {
  const flag = target.value.find((item) => item.id === info.id)
  if (!flag) {
    target.value.push(info)
    relevanceData(target, origin)
  }
}

/**
 * 删除一个关联的数据
 * @param target 目标数组（已关联的数据列表）
 * @param origin 原始数组（所有的数据）
 * @param info 删除取消关联的数据
 */
export const popRelevance = <T extends ObjectAny>(target: Ref<T[]>, origin: Ref<T[]>, info: T): void => {
  let i = -1
  target.value.find((item, index) => {
    if (item.id === info.id) {
      i = index
      return true
    }
  })
  if (i !== -1) {
    target.value.splice(i, 1)
    relevanceData(target, origin)
  }
}

/**
 * 查看是否关联某个数据
 * @param target 目标数组（已关联的数据列表）
 * @param id 待查找的数据id
 */
export const findRevelance = <T extends any[]>(target: Ref<T>, id: string): boolean => {
  let flag = false
  target.value.find((item) => {
    if (item.id === id) {
      flag = true
      return flag
    }
  })
  return flag
}

/**
 * 根据目标数据（已关联的数据列表）给原始数据（所有的数据）进行关联
 * @param target 目标数组（已关联的数据列表）
 * @param origin 原始数组（所有的数据）
 */
export const relevanceData = <T extends any[]>(target: Ref<T>, origin: Ref<T>): void => {
  origin.value.forEach((item) => {
    item._checked = findRevelance(target, item.id)
  })
}

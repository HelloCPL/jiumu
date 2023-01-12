/**
 * @author chen
 * @description 菜单相关接口
 * @update 2022-07-10 13:04:18
 */

import { post } from '@/utils/api-methods'

// 添加菜单
export const addMenu = async (params: ParamsMenuAdd): Promise<DataOptions<string>> => {
  return await post('/pc/menu/add', params).catch((err) => err)
}

// 修改菜单
export const updateMenu = async (params: ParamsMenuAdd): Promise<DataOptions<null>> => {
  return await post('/pc/menu/update', params).catch((err) => err)
}

// 删除一个角色
export const deleteMenu = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/menu/delete', { id }).catch((err) => err)
}

// 获取一个菜单
export const getMenuOne = async (id: string, isloading?: boolean): Promise<DataOptions<DataMenuInfo>> => {
  return await post('/pc/menu/get/one', { id }, { isloading }).catch((err) => err)
}

// 获取我的所有菜单（树级结构）
export const getMenuAllSelf = async (isTree: string = '1'): Promise<DataOptions<DataMenu[]>> => {
  return await post('/pc/menu/get/all/self', { isTree, pageSize: 1000 }).catch((err) => err)
}

// 获取所有菜单（树级结构）
export const getMenuByParentCode = async (
  params: ParamsMenuByParentCode = {},
  isloading = false
): Promise<DataOptions<DataMenu[]>> => {
  return await post('/pc/menu/get/byparentcode', params, { isloading }).catch((err) => err)
}

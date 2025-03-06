/**
 * @author chen
 * @description 角色相关接口
 * @update 2022-07-10 13:04:18
 */

import { post } from '@/utils/api-methods'

/**
 * 添加角色
 */
export const addRole = async (params: ParamsRoleAdd): Promise<DataOptions<string>> => {
  return await post('/pc/role/add', params).catch((err) => err)
}

/**
 * 修改角色
 */
export const updateRole = async (params: ParamsRoleAdd): Promise<DataOptions<null>> => {
  return await post('/pc/role/update', params).catch((err) => err)
}

/**
 * 删除一个角色
 */
export const deleteRole = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/role/delete', { id }).catch((err) => err)
}

/**
 * 获取一个角色
 * @param isloading 是否显示加载中
 */
export const getRoleOne = async (id: string, isloading?: boolean): Promise<DataOptions<DataRole>> => {
  return await post('/pc/role/get/one', { id }, { isloading }).catch((err) => err)
}

/**
 * 获取我的所有角色列表
 */
export const getRoleListAllSelf = async (): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/role/get/list/self', { pageSize: 1000 }).catch((err) => err)
}

/**
 * 获取所有角色列表
 */
export const getRoleList = async (params: ParamsRoleList = {}): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/role/get/list', params).catch((err) => err)
}

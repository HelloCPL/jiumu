/**
 * @describe: 权限相关接口
 * @author: cpl
 * @create: 2022-07-06 11:48:27
 */
import { get, post, postForm } from '@/utils/api-methods'
import { getFileParams } from '../file'

/**
 * 添加权限
 */
export const addPermission = async (params: ParamsPermissionAdd): Promise<DataOptions<string>> => {
  return await post('/pc/permission/add', params).catch((err) => err)
}

/**
 * 修改权限
 */
export const updatePermission = async (params: ParamsPermissionAdd): Promise<DataOptions<null>> => {
  return await post('/pc/permission/update', params).catch((err) => err)
}

/**
 * 删除一个权限
 */
export const deletePermission = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/permission/delete', { id }).catch((err) => err)
}

/**
 * 获取一个权限
 * @param isloading 是否显示加载中
 */
export const getPermissionOne = async (
  id: string,
  isloading?: boolean
): Promise<DataOptions<DataPermission>> => {
  return await post('/pc/permission/get/one', { id }, { isloading }).catch((err) => err)
}

/**
 * 获取我的权限列表
 */
export const getPermissionListAllSelf = async (): Promise<DataOptions<DataPermission[]>> => {
  return await get('/pc/permission/get/all/self', { pageSize: 1000 }).catch((err) => err)
}

/**
 * 获取所有权限列表
 */
export const getPermissionList = async (
  params: ParamsPermissionList = {}
): Promise<DataOptions<DataPermission[]>> => {
  return await post('/pc/permission/get/list', params).catch((err) => err)
}

/**
 * 导出选中的权限
 */
export const exportPermissionApi = async (ids: string): Promise<null> => {
  return await get('/pc/permission/export', { ids })
}

/**
 * 导入权限
 */
export const importPermissionApi = async (
  file: FormData,
  params: ParamsFileOther = {}
): Promise<DataOptions<number>> => {
  const query = getFileParams(params)
  return await postForm(`/pc/permission/import${query}`, file).catch((err) => err)
}

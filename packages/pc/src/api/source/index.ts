/**
 * @description 资源相关接口
 * @author cpl
 * @create 2023-02-22 17:10:42
 */

import { post } from '@/utils/api-methods'

/**
 * 新增一个资源
*/
export const addSource = async (params: ParamsSourceAdd): Promise<DataOptions<string>> => {
  return await post('/pc/source/add', params).catch((err) => err)
}

/**
 * 修改一个资源
*/
export const updateSource = async (params: ParamsSourceAdd): Promise<DataOptions<null>> => {
  return await post('/pc/source/update', params).catch((err) => err)
}

/**
 * 删除一个资源
*/
export const deleteSource = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/source/delete', { id }).catch((err) => err)
}

/**
 * 获取一个资源
*/
export const getSourceOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataSourceInfo>> => {
  return await post('/pc/source/get/one', params, { isloading }).catch((err) => err)
}

/**
 * 获取我的资源列表
*/
export const getSourceListSelf = async (
  params: ParamsSourceListSelf = {}
): Promise<DataOptions<DataSource[]>> => {
  return await post('/pc/source/get/list/self', params).catch((err) => err)
}

/**
 * 获取指定用户公开的资源列表
*/
export const getSourceListByUserId = async (
  params: ParamsSourceListByUserId
): Promise<DataOptions<DataSource[]>> => {
  return await post('/pc/source/get/list/byuserid', params).catch((err) => err)
}

/**
 * 获取所有用户公开的资源文章列表
*/
export const getSourceList = async (params: ParamsSourceList = {}): Promise<DataOptions<DataSource[]>> => {
  return await post('/pc/source/get/list', params).catch((err) => err)
}

/**
 * 新增一个资源的外部资源信息
*/
export const addSourceLink = async (params: ParamsSourceLinkAdd): Promise<DataOptions<string>> => {
  return await post('/pc/source-link/add', params).catch((err) => err)
}

/**
 * 修改一个资源的外部资源信息
*/
export const updateSourceLink = async (params: ParamsSourceLinkAdd): Promise<DataOptions<null>> => {
  return await post('/pc/source-link/update', params).catch((err) => err)
}

/**
 * 删除一个资源的外部资源信息
*/
export const deleteSourceLink = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/source-link/delete', { id }).catch((err) => err)
}

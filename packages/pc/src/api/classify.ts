/**
 * @describe: 自定义标签相关接口
 * @author: cpl
 * @create: 2022-10-13 17:46:17
 */

import { get, post } from '@/utils/api-methods'

// 获取我的自定义标签类型列表
export const getTagCustomListTypeSelf = async (): Promise<DataOptions<DataTagCustomType[]>> => {
  return await get('/pc/tag/custom/get/list/type/self').catch((err) => err)
}

// 获取我的自定义标签列表
export const getTagCustomListSelf = async (
  params: ParamsTagCustomListSelf = {}
): Promise<DataOptions<DataTagCustom[]>> => {
  return await get('/pc/tag/custom/get/list/self', params).catch((err) => err)
}

// 获取所有自定义标签列表
export const getTagCustomList = async (
  params: ParamsTagCustomList = {}
): Promise<DataOptions<DataTagCustom[]>> => {
  return await get('/pc/tag/custom/get/list', params).catch((err) => err)
}

// 添加自定义标签
export const addTagCustom = async (params: ParamsTagCustomAdd): Promise<DataOptions<null>> => {
  return await post('/pc/tag/custom/add', params).catch((err) => err)
}

// 修改自定义标签
export const updateTagCustom = async (params: ParamsTagCustomAdd): Promise<DataOptions<null>> => {
  return await post('/pc/tag/custom/update', params).catch((err) => err)
}
// 删除某个自定义标签
export const deleteTagCustom = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/tag/custom/delete', { id }).catch((err) => err)
}

// 获取我的一个自定义标签
export const getTagCustomByIdsSelf = async (
  ids: string,
  isloading?: boolean
): Promise<DataOptions<DataTagCustom[]>> => {
  return await post('/pc/tag/custom/get/byids/self', { ids }, { isloading }).catch((err) => err)
}

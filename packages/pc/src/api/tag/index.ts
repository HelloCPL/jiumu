/**
 * @author chen
 * @description 标签相关接口
 * @update 2022-07-10 13:04:18
 */

import { get, post, postForm } from '@/utils/api-methods'
import { getFileParams } from '../file'

/**
 * 添加标签
 */
export const addTag = async (params: ParamsTagAdd): Promise<DataOptions<string>> => {
  return await post('/pc/tag/add', params).catch((err) => err)
}

/**
 * 修改标签
 */
export const updateTag = async (params: ParamsTagAdd): Promise<DataOptions<null>> => {
  return await post('/pc/tag/update', params).catch((err) => err)
}

/**
 * 删除一个标签
 */
export const deleteTag = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/tag/delete', { id }).catch((err) => err)
}

/**
 * 获取一个标签
 */
export const getTagOne = async (code: string, isloading?: boolean): Promise<DataOptions<DataTagInfo>> => {
  return await post('/pc/tag/get/bycode', { code }, { isloading }).catch((err) => err)
}

/**
 * 获取所有标签（树级结构）
 */
export const getTagByParentCode = async (
  parentCode: string = '',
  userId?: string
): Promise<DataOptions<DataTag[]>> => {
  return await post('/pc/tag/get/byparentcode', { parentCode, userId }).catch((err) => err)
}

/**
 * 导出选中的标签
 */
export const exportTagApi = async (ids: string): Promise<null> => {
  return await get('/pc/tag/export', { ids })
}

/**
 * 导入标签
 */
export const importTagApi = async (
  file: FormData,
  params: ParamsFileOther = {}
): Promise<DataOptions<number>> => {
  const query = getFileParams(params)
  return await postForm(`/pc/tag/import${query}`, file).catch((err) => err)
}

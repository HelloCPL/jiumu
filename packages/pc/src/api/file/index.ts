/**
 * 文件上传接口
 */

import { postForm, post, get } from '@/utils/api-methods'
import { isPlainObject } from 'lodash-es'

// 上传文件
export const uploadFile = async (
  file: FormData,
  params: ParamsFileOther = {}
): Promise<DataOptions<DataBaseFile[]>> => {
  const query = _getFileParams(params)
  return await postForm(`/pc/file/add${query}`, file).catch((err) => err)
}

const _getFileParams = (params: ParamsFileOther) => {
  let query = ''
  if (isPlainObject(params)) {
    for (const key in params) {
      if (query) query += `&${key}=${params[key]}`
      else query += `${key}=${params[key]}`
    }
  }
  return query ? '?' + query : query
}

// 删除文件 多个用逗号隔开
export const deleteFile = async (
  ids: string,
  showErrorMessage: boolean = true
): Promise<DataOptions<null>> => {
  return await post('/pc/file/delete', { ids }, { showErrorMessage }).catch((err) => err)
}

// 获取一个指定的文件
export const getFileById = async (params: ParamsFileById): Promise<DataOptions<DataBaseFile>> => {
  return await get('/pc/file/get/post', params).catch((err) => err)
}

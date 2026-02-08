/**
 * @description 口令相关接口
 * @author cpl
 * @create 2023-03-23 17:44:49
 */

import { post } from '@/utils/api-methods'

/**
 * 新增一个口令
*/
export const addCipher = async (params: ParamsCipherAdd): Promise<DataOptions<string>> => {
  return await post('/pc/cipher/add', params).catch((err) => err)
}

/**
 * 修改一个口令
*/
export const updateCipher = async (params: ParamsCipherAdd): Promise<DataOptions<null>> => {
  return await post('/pc/cipher/update', params).catch((err) => err)
}

/**
 * 删除一个口令
*/
export const deleteCipher = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/cipher/delete', { id }).catch((err) => err)
}

/**
 * 获取一个本人的口令
*/
export const getCipherOneSelf = async (
  id: string,
  isloading?: boolean
): Promise<DataOptions<DataCipherInfo>> => {
  return await post('/pc/cipher/get/one/self', { id }, { isloading }).catch((err) => err)
}

/**
 * 获取本人的口令列表
*/
export const getCipherListSelf = async (
  params: ParamsCipherList = {}
): Promise<DataOptions<DataCipherInfo[]>> => {
  return await post('/pc/cipher/get/list/self', params).catch((err) => err)
}

/**
 * 新增一个口令 code
*/
export const addCipherCode = async (params: ParamsCipherCodeAdd): Promise<DataOptions<string>> => {
  return await post('/pc/cipher-code/add', params).catch((err) => err)
}

/**
 * 修改一个口令 code
*/
export const updateCipherCode = async (params: ParamsCipherCodeUpdate): Promise<DataOptions<null>> => {
  return await post('/pc/cipher-code/update', params).catch((err) => err)
}

/**
 * 检查本人是否存在口令 code
*/
export const existCipherCodeSelf = async (): Promise<DataOptions<boolean>> => {
  return await post('/pc/cipher-code/exist/self').catch((err) => err)
}

/**
 * 校验个人口令code是否正确
*/
export const checkCipherCodeSelf = async (code: string): Promise<DataOptions<boolean>> => {
  return await post('/pc/cipher-code/check/self', { code }).catch((err) => err)
}

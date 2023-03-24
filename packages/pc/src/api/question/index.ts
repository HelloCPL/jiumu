/**
 * @author chen
 * @description 问答相关接口
 * @update 2022-07-04 01:07:21
 */

import { post } from '@/utils/api-methods'

// 新增一个问答
export const addQuestion = async (params: ParamsQuestionAdd): Promise<DataOptions<string>> => {
  return await post('/pc/question/add', params).catch((err) => err)
}

// 修改一个问答
export const updateQuestion = async (params: ParamsQuestionAdd): Promise<DataOptions<null>> => {
  return await post('/pc/question/update', params).catch((err) => err)
}

// 删除一个问答
export const deleteQuestion = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/question/delete', { id }).catch((err) => err)
}

// 获取一个问答
export const getQuestionOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataQuestion>> => {
  return await post('/pc/question/get/one', params, { isloading }).catch((err) => err)
}

// 获取我的问答列表
export const getQuestionListSelf = async (
  params: ParamsQuestionListSelf = {}
): Promise<DataOptions<DataQuestion[]>> => {
  return await post('/pc/question/get/list/self', params).catch((err) => err)
}

// 获取指定用户的问答列表
export const getQuestionListByUserId = async (
  params: ParamsQuestionListByUserId
): Promise<DataOptions<DataQuestion[]>> => {
  return await post('/pc/question/get/list/byuserid', params).catch((err) => err)
}

// 获取所有的问答列表
export const getQuestionList = async (params: ParamsQuestionList): Promise<DataOptions<DataQuestion[]>> => {
  return await post('/pc/question/get/list', params).catch((err) => err)
}

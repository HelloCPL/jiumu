/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

import { post } from '@/utils/api-methods'

/**
 * 新增一个文章
*/
export const addArticle = async (params: ParamsArticleAdd): Promise<DataOptions<string>> => {
  return await post('/pc/article/add', params).catch((err) => err)
}

/**
 * 修改一个文章
*/
export const updateArticle = async (
  params: ParamsArticleAdd | ParamsArticleSave
): Promise<DataOptions<null>> => {
  return await post('/pc/article/update', params).catch((err) => err)
}

/**
 * 删除一个文章
*/
export const deleteArticle = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/article/delete', { id }).catch((err) => err)
}

/**
 * 获取一个文章
*/
export const getArticleOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataArticleInfo>> => {
  return await post('/pc/article/get/one', params, { isloading }).catch((err) => err)
}

/**
 * 获取我的博客文章列表
*/
export const getArticleListSelf = async (
  params: ParamsArticleListSelf = {}
): Promise<DataOptions<DataArticle[]>> => {
  return await post('/pc/article/get/list/self', params).catch((err) => err)
}

/**
 * 获取指定用户非草稿且公开的博客文章列表
*/
export const getArticleListByUserId = async (
  params: ParamsArticleListByUserId
): Promise<DataOptions<DataArticle[]>> => {
  return await post('/pc/article/get/list/byuserid', params).catch((err) => err)
}

/**
 * 获取所有用户非草稿且公开的博客文章列表
*/
export const getArticleList = async (params: ParamsArticleList = {}): Promise<DataOptions<DataArticle[]>> => {
  return await post('/pc/article/get/list', params).catch((err) => err)
}

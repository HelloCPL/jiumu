/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

import { get } from '@/utils/api-methods'

// 获取我的博客文章列表
export const getArticleListSelf = async (
  params: ParamsArticleListSelf = {}
): Promise<DataOptions<DataArticle[]>> => {
  return await get('/pc/article/get/list/self', params).catch((err) => err)
}

// 获取所有文章列表
export const getArticleList = async (params: ParamsArticleList = {}): Promise<DataOptions<DataArticle[]>> => {
  return await get('/pc/article/get/list', params).catch((err) => err)
}

/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

import { get } from '@/utils/api-methods'

export const getArticleList = async (params: ArticleListParams = {}): Promise<DataOptions<ArticleOptions> | void> => {
  const res = await get('/pc/article/get/list', params).catch((err) => err)
  if (res.code === 200) return res
}

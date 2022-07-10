/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

import { get } from '@/utils/api-methods'

// 获取所有文章列表
export const getArticleList = async (
  params: ParamsAriticleList = {}
): Promise<DataOptions<DataAriticle>> => {
  return await get('/pc/article/get/list', params).catch((err) => err)
}

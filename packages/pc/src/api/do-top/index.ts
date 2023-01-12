/**
 * @describe: 问答、资源文件、小说、博客文章 评论 置顶或取消置顶操作
 * @author: cpl
 * @create: 2022-10-23 01:51:57
 */

import { post } from '@/utils/api-methods'

// 问答、资源文件、小说、博客文章 置顶
export const addTop = async (params: ParamsTop): Promise<DataOptions<null>> => {
  return await post('/pc/top/add', params).catch((err) => err)
}

// 问答、资源文件、小说、博客文章 取消置顶
export const deleteTop = async (params: ParamsTop): Promise<DataOptions<null>> => {
  return await post('/pc/top/delete', params).catch((err) => err)
}

// 评论 置顶
export const addTopComment = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/top/comment/add', { id }).catch((err) => err)
}

// 评论 取消置顶
export const deleteTopComment = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/top/comment/delete', { id }).catch((err) => err)
}

/**
 * @author chen
 * @description 用户相关交互接口 点赞 收藏 评论
 * @update 2022-07-10 13:04:18
 */

import { get } from '@/utils/api-methods'

// 点赞
export const addLike = async (params: ParamsInteractionAdd): Promise<DataOptions<null>> => {
  return await get('/pc/like/add', params).catch((err) => err)
}

// 取消点赞
export const deleteLike = async (targetId: string): Promise<DataOptions<null>> => {
  return await get('/pc/like/delete', { targetId }).catch((err) => err)
}

// 我的点赞列表
export const getLikeListSelf = async (
  params: ParamsInteractionList = {}
): Promise<DataOptions<DataLike[]>> => {
  return await get('/pc/like/get/list/self', params).catch((err) => err)
}

// 获取某用户的点赞列表
export const getLikeListByUserId = async (
  params: ParamsLikeListByUserId
): Promise<DataOptions<DataLike[]>> => {
  return await get('/pc/like/get/list', params).catch((err) => err)
}

// 收藏
export const addCollection = async (params: ParamsInteractionAdd): Promise<DataOptions<null>> => {
  return await get('/pc/collection/add', params).catch((err) => err)
}

// 取消收藏
export const deleteCollection = async (targetId: string): Promise<DataOptions<null>> => {
  return await get('/pc/collection/delete', { targetId }).catch((err) => err)
}

// 我的收藏列表
export const getCollectionListSelf = async (
  params: ParamsCollectionList = {}
): Promise<DataOptions<DataCollection[]>> => {
  return await get('/pc/collection/get/list/self', params).catch((err) => err)
}

// 获取某用户的收藏列表
export const getCollectionListByUserId = async (
  params: ParamsCollectionListByUserId
): Promise<DataOptions<DataCollection[]>> => {
  return await get('/pc/collection/get/list', params).catch((err) => err)
}

// 新增评论
export const addComment = async (params: ParamsCommentAdd): Promise<DataOptions<null>> => {
  return await get('/pc/comment/add', params).catch((err) => err)
}

// 删除自己的某条评论
export const deleteCommentSelf = async (id: string): Promise<DataOptions<null>> => {
  return await get('/pc/comment/delete/self', { id }).catch((err) => err)
}

// 删除指定某条评论 仅管理员有效
export const deleteCommentById = async (id: string): Promise<DataOptions<null>> => {
  return await get('/pc/comment/delete/byid', { id }).catch((err) => err)
}

// 获取评论列表（资源或某条评论的子评论列表）
export const getCommentList = async (
  params: ParamsCommentList
): Promise<DataOptions<DataCollectionList[]>> => {
  return await get('/pc/comment/get/list', params).catch((err) => err)
}

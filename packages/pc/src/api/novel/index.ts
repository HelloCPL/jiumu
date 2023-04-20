/**
 * 连载相关接口
 */

import { post } from '@/utils/api-methods'

// 新增一个连载
export const addNovel = async (params: ParamsNovelAdd): Promise<DataOptions<string>> => {
  return await post('/pc/novel/add', params).catch((err) => err)
}

// 编辑一个连载
export const updateNovel = async (params: ParamsNovelAdd): Promise<DataOptions<null>> => {
  return await post('/pc/novel/update', params).catch((err) => err)
}

// 删除一个连载
export const deleteNovel = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/novel/delete', { id }).catch((err) => err)
}

// 获取指定的一个连载
export const getNovelOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataNovel>> => {
  return await post('/pc/novel/get/one', params, { isloading }).catch((err) => err)
}

// 获取我的连载列表
export const getNovelListSelf = async (params: ParamsNovelListSelf): Promise<DataOptions<DataNovel[]>> => {
  return await post('/pc/novel/get/list/self', params).catch((err) => err)
}

// 获取指定用户非草稿且公开的连载列表
export const getNovelListByUserId = async (
  params: ParamsNovelListByUserId
): Promise<DataOptions<DataNovel[]>> => {
  return await post('/pc/novel/get/list/byuserid', params).catch((err) => err)
}

// 获取所有用户非草稿且公开的连载列表
export const getNovelList = async (params: ParamsNovelList): Promise<DataOptions<DataNovel[]>> => {
  return await post('/pc/novel/get/list', params).catch((err) => err)
}

// 新增一个章节
export const addNovelChapter = async (params: ParamsNovelChapterAdd): Promise<DataOptions<string>> => {
  return await post('/pc/novel-chapter/add', params).catch((err) => err)
}

// 编辑一个章节
export const updateNovelChapter = async (
  params: ParamsNovelChapterEdit | ParamsNovelChapterEditSaveContent
): Promise<DataOptions<null>> => {
  return await post('/pc/novel-chapter/update', params).catch((err) => err)
}

// 删除一个章节
export const deleteNovelChapter = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/novel-chapter/delete', { id }).catch((err) => err)
}

// 获取指定的一个章节
export const getNovelChapterOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataNovelChapter>> => {
  return await post('/pc/novel-chapter/get/one', params, { isloading }).catch((err) => err)
}

// 获取指定连载的所有章节
export const getNovelChapterList = async (
  params: ParamsNovelChapterList
): Promise<DataOptions<DataNovelChapter[]>> => {
  return await post('/pc/novel-chapter/get/list', params).catch((err) => err)
}

// 新增一个笔记
export const addNovelNote = async (params: ParamsNovelNoteAdd): Promise<DataOptions<string>> => {
  return await post('/pc/novel-note/add', params).catch((err) => err)
}

// 编辑一个笔记
export const updateNovelNote = async (params: ParamsNovelNoteEdit): Promise<DataOptions<null>> => {
  return await post('/pc/novel-note/update', params).catch((err) => err)
}

// 删除一个笔记
export const deleteNovelNote = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/novel-note/delete', { id }).catch((err) => err)
}

// 获取指定的一个笔记
export const getNovelNoteOne = async (
  params: ParamsOne,
  isloading?: boolean
): Promise<DataOptions<DataNovelNote>> => {
  return await post('/pc/novel-note/get/one', params, { isloading }).catch((err) => err)
}

// 获取指定连载的所有笔记
export const getNovelNoteList = async (
  params: ParamsNovelNoteList
): Promise<DataOptions<DataNovelNote[]>> => {
  return await post('/pc/novel-note/get/list', params).catch((err) => err)
}

// 新增一个笔记关联
export const addNovelNoteLink = async (params: ParamsNovelNoteLinkAdd): Promise<DataOptions<null>> => {
  return await post('/pc/novel-note-link/add', params).catch((err) => err)
}

// 删除一个笔记关联
export const deleteNovelNoteLink = async (
  id: string | ParamsNovelNoteLinkDelete
): Promise<DataOptions<null>> => {
  const params: ObjectAny = {}
  if (typeof id === 'string') {
    params.id = id
  } else {
    params.noteId = id.noteId
    params.targetId = id.targetId
  }
  return await post('/pc/novel-note-link/delete', params).catch((err) => err)
}

// 获取本用户的可共享关联的笔记列表
export const getNovelNoteLinkList = async (
  params: ParamsNovelNoteLinkList
): Promise<DataOptions<DataNovelNoteLink[]>> => {
  return await post('/pc/novel-note-link/get/list/self', params).catch((err) => err)
}

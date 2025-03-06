/**
 * 笔记相关接口
 */

import { post } from '@/utils/api-methods'

/**
 * 新增一个笔记
 */
export const addNote = async (params: ParamsNoteAdd): Promise<DataOptions<string>> => {
  return await post('/pc/note/add', params).catch((err) => err)
}

/**
 * 编辑一个笔记
 */
export const updateNote = async (params: ParamsNoteEdit): Promise<DataOptions<null>> => {
  return await post('/pc/note/update', params).catch((err) => err)
}

/**
 * 删除一个笔记
 */
export const deleteNote = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/note/delete', { id }).catch((err) => err)
}

/**
 * 获取指定的一个笔记
 */
export const getNoteOne = async (params: ParamsOne, isloading?: boolean): Promise<DataOptions<DataNote>> => {
  return await post('/pc/note/get/one', params, { isloading }).catch((err) => err)
}

/**
 * 获取指定节点所有的笔记列表
 */
export const getNoteList = async (params: ParamsNoteList): Promise<DataOptions<DataNote[]>> => {
  return await post('/pc/note/get/list', params).catch((err) => err)
}

/**
 * 新增一个笔记关联
 */
export const addNoteLink = async (params: ParamsNoteLinkAdd): Promise<DataOptions<null>> => {
  return await post('/pc/note-link/add', params).catch((err) => err)
}

/**
 * 删除一个笔记关联
 */
export const deleteNoteLink = async (params: ParamsNoteLinkAdd): Promise<DataOptions<null>> => {
  return await post('/pc/note-link/delete', params).catch((err) => err)
}

/**
 * 获取的相同根节点的其他目标节点的可关联笔记列表
 */
export const getNoteLinkListByRootId = async (
  params: ParamsNoteLinkListByRootId
): Promise<DataOptions<DataNoteLink[]>> => {
  return await post('/pc/note-link/get/list/byrootid', params).catch((err) => err)
}

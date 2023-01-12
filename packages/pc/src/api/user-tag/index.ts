/**
 * @author chen
 * @description 用户-特殊标签关联相关接口
 * @update 2022-07-27 18:18:59
 */

import { post } from '@/utils/api-methods'

// 用户-特殊标签关联新增
export const addUserTag = async (params: ParamsUserTagAdd): Promise<DataOptions<null>> => {
  return await post('/pc/user-tag/add', params).catch((err) => err)
}

// 用户-特殊标签关联删除
export const deleteUserTag = async (id: string | ParamsUserTagAdd): Promise<DataOptions<null>> => {
  const params: ObjectAny = {}
  if (typeof id === 'string') {
    params.id = id
  } else {
    params.userId = id.userId
    params.tagCode = id.tagCode
  }
  return await post('/pc/user-tag/delete', params).catch((err) => err)
}

// 获取指定用户关联的所有特殊标签
export const getTagByUserId = async (params: ParamsTagByUserId): Promise<DataOptions<DataTagInfo[]>> => {
  return await post('/pc/user-tag/get/alltag/byuserid', params).catch((err) => err)
}

// 获取指定特殊标签关联的所有用户
export const getUserByTagCode = async (params: ParamsUserByTagCode): Promise<DataOptions<DataUserInfo[]>> => {
  return await post('/pc/user-tag/get/alluser/bytagcode', params).catch((err) => err)
}

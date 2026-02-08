/**
 * @author chen
 * @description 用户-角色关联相关接口
 * @update 2022-07-27 18:18:59
 */

import { post } from '@/utils/api-methods'

/**
 * 用户-角色关联新增
 */
export const addUserRole = async (params: ParamsUserRoleAdd): Promise<DataOptions<null>> => {
  return await post('/pc/user-role/add', params).catch((err) => err)
}

/**
 * 用户-角色关联删除
 */
export const deleteUserRole = async (id: string | ParamsUserRoleAdd): Promise<DataOptions<null>> => {
  const params: ObjectAny = {}
  if (typeof id === 'string') {
    params.id = id
  } else {
    params.userId = id.userId
    params.roleId = id.roleId
  }
  return await post('/pc/user-role/delete', params).catch((err) => err)
}

/**
 * 获取指定用户关联的所有角色
 */
export const getRoleByUserId = async (params: ParamsRoleByUserId): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/user-role/get/allrole/byuserid', params).catch((err) => err)
}

/**
 * 获取指定角色关联的所有用户
 */
export const getUserByRoleId = async (params: ParamsUserByRoleId): Promise<DataOptions<DataUserInfo[]>> => {
  return await post('/pc/user-role/get/alluser/byroleid', params).catch((err) => err)
}

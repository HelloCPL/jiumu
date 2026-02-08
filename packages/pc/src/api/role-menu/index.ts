/**
 * @author chen
 * @description 角色-菜单关联相关接口
 * @update 2022-07-27 18:18:59
 */

import { post } from '@/utils/api-methods'

/**
 * 角色-菜单关联新增
 */
export const addRoleMenu = async (params: ParamsRoleMenuAdd): Promise<DataOptions<null>> => {
  return await post('/pc/role-menu/add', params).catch((err) => err)
}

/**
 * 角色-菜单关联删除
 */
export const deleteRoleMenu = async (id: string | ParamsRoleMenuAdd): Promise<DataOptions<null>> => {
  const params: ObjectAny = {}
  if (typeof id === 'string') {
    params.id = id
  } else {
    params.menuId = id.menuId
    params.roleId = id.roleId
  }
  return await post('/pc/role-menu/delete', params).catch((err) => err)
}

/**
 * 获取指定角色关联的所有菜单
 */
export const getMenuByRoleId = async (
  params: ParamsMenuByRoleId
): Promise<DataOptions<DataMenuInfo[] | DataMenu[]>> => {
  return await post('/pc/role-menu/get/allmenu/byroleid', params).catch((err) => err)
}

/**
 * 获取指定菜单关联的所有角色
 */
export const getRoleByMenuId = async (params: ParamsRoleByMenuId): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/role-menu/get/allrole/bymenuid', params).catch((err) => err)
}

/**
 * 获取指定用户关联的所有菜单
 */
export const getMenuByUserId = async (
  params: ParamsMenuByUserId
): Promise<DataOptions<DataMenuInfo[] | DataMenu[]>> => {
  return await post('/pc/role-menu/get/allmenu/byuserid', params).catch((err) => err)
}

/**
 * 获取指定菜单关联的所有用户
 */
export const getUserByMenuId = async (params: ParamsUserByMenuId): Promise<DataOptions<DataUserInfo[]>> => {
  return await post('/pc/role-menu/get/alluser/bymenuid', params).catch((err) => err)
}

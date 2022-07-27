/**
 * @author chen
 * @description 角色-权限关联相关接口
 * @update 2022-07-27 18:18:59
 */

import { post } from '@/utils/api-methods'

// 角色-权限关联新增
export const addRolePermission = async (params: ParamsRolePermissionAdd): Promise<DataOptions<null>> => {
  return await post('/pc/role-permission/add', params).catch((err) => err)
}

// 角色-权限关联删除
export const deleteRolePermission = async (id: string): Promise<DataOptions<null>> => {
  return await post('/pc/role-permission/delete', { id }).catch((err) => err)
}

// 获取指定角色关联的所有权限
export const getPermissionByRoleId = async (
  params: ParamsPermissionByRoleId
): Promise<DataOptions<DataPermission[]>> => {
  return await post('/pc/role-permission/get/allpermission/byroleid', params).catch((err) => err)
}

// 获取指定权限关联的所有角色
export const getRoleByPermissionId = async (
  params: ParamsRoleByPermissionId
): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/role-permission/get/allrole/bypermissionid', params).catch((err) => err)
}

// 获取指定用户关联的所有权限
export const getPermissionByUserId = async (
  params: ParamsPermissionByUserId
): Promise<DataOptions<DataPermission[]>> => {
  return await post('/pc/role-permission/get/allpermission/byuserid', params).catch((err) => err)
}

// 获取指定权限关联的所有用户
export const getUserByPermissionId = async (
  params: ParamsUserByPermissionId
): Promise<DataOptions<DataUserInfo[]>> => {
  return await post('/pc/role-permission/get/alluser/bypermissionid', params).catch((err) => err)
}

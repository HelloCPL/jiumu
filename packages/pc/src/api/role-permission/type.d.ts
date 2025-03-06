/**
 * @author chen
 * @description 角色-权限关联相关接口类型
 * @update 2022-07-27 18:18:59
 */

// 角色-权限关联新增参数
interface ParamsRolePermissionAdd {
  roleId: string
  permissionId: string
}

// 获取指定角色关联的所有权限参数
interface ParamsPermissionByRoleId extends ParamsPage {
  roleId: string
}

// 获取指定权限关联的所有角色参数
interface ParamsRoleByPermissionId extends ParamsPage {
  permissionId: StringIterator
}

// 获取指定用户关联的所有权限参数
interface ParamsPermissionByUserId extends ParamsPage {
  userId: StringChain
}

// 获取指定权限关联的所有用户参数
interface ParamsUserByPermissionId extends ParamsPage {
  permissionId: string
  simple?: DataBaseStatus
}


/**
 * @author chen
 * @description 用户-角色关联相关接口类型
 * @update 2022-07-27 18:18:59
*/

// 用户-角色关联新增参数
interface ParamsUserRoleAdd {
  roleId: string
  userId: string
}

// 获取指定用户关联的所有角色参数
interface ParamsRoleByUserId extends ParamsPage {
  userId: string
}

// 获取指定用户关联的所有角色参数
interface ParamsUserByRoleId extends ParamsPage {
  roleId: string
  simple?: DataBaseStatus
}
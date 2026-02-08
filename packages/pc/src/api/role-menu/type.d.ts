/**
 * @author chen
 * @description 角色-菜单关联相关接口类型
 * @update 2022-07-27 18:18:59
 */

// 角色 - 菜单关联新增参数
interface ParamsRoleMenuAdd {
  roleId: string
  menuId: string
}

// 获取指定角色关联的所有菜单参数
interface ParamsMenuByRoleId extends ParamsPage {
  roleId: string
  isTree?: DataBaseStatus
}

// 获取指定菜单关联的所有角色参数
interface ParamsRoleByMenuId extends ParamsPage {
  menuId: string
}

// 获取指定用户关联的所有菜单参数
interface ParamsMenuByUserId extends ParamsPage {
  userId: string
  isTree?: DataBaseStatus
}

// 获取指定菜单关联的所有用户参数
interface ParamsUserByMenuId extends ParamsPage {
  menuId: string
  simple?: DataBaseStatus
}


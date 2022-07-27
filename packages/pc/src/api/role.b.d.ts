/**
 * @author chen
 * @description 角色相关接口类型
 * @update 2022-07-04 01:07:21
 */


// 角色数据接口类型
interface DataRole extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  configurable: string
  checkedUserId?: string
  checkedPermissionId?: string
  checkedMenuId?: string
}

// 获取角色列表接口参数
interface ParamsRoleList extends ParamsPage {
  keyword?: string
  userId?: string
  permissionId?: string
  menuId?: string
}

// 添加角色接口参数
interface ParamsRoleAdd {
  id?: string
  code: string
  label: string
  sort?: number
  remarks?: string
}
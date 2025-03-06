/**
 * @describe: 权限相关接口类型
 * @author: cpl
 * @create: 2022-07-06 11:53:17
 */

// 添加或编辑权限接口参数
interface ParamsPermissionAdd {
  id?: string
  code: string
  label: string
  href?: string
  sort?: number
  remarks?: string
}

// 权限列表接口类型
interface DataPermission extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  configurable?: string
  checkedRoleId?: string
  checkedUserId?: string
  relevanceId?: string
}

// 获取权限列表接口参数
interface ParamsPermissionList extends ParamsPage {
  keyword?: string
  highlight?: DataBaseStatus
  userId?: string
  roleId?: string
}

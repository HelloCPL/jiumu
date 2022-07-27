/**
 * @describe: 权限相关接口类型
 * @author: cpl
 * @create: 2022-07-06 11:53:17
 */

// 权限列表接口类型
interface DataPermission extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  configurable: string
  roleId?: string
  userId?: string
}

// 获取权限列表接口参数
interface ParamsPermissionList extends ParamsPage {
  keyword?: string
  userId?: string
  menuId?: string
}

// 添加权限接口参数
interface ParamsPermissionAdd {
  id?: string
  code: string
  label: string
  href?: string
  sort?: number
  remarks?: string
}
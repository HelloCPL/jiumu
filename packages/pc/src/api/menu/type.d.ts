/**
 * @author chen
 * @description 菜单相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 菜单添加或编辑接口参数
interface ParamsMenuAdd {
  id?: string
  code: string
  label: string
  parentCode?: string
  sort?: number
  remarks?: string
}

// 菜单数据接口类型
interface DataMenuInfo extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  parentCode: string
  parentLabel: string
  configurable: string
  checkedRoleId?: string
  checkedUserId?: string
  relevanceId?: string
}


// 树级菜单数据接口类型
interface DataMenu extends DataMenuInfo {
  children: DataMenu[]
}

interface ParamsMenuByParentCode {
  parentCode?: string
  roleId?: string
  userId?: string
}

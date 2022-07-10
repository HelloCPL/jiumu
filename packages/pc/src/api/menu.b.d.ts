/**
 * @author chen
 * @description 菜单相关接口类型
 * @update 2022-07-04 01:07:21
 */


// 菜单数据接口类型
interface DataMenu extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  parentCode: string
  parentLabel: string
  children?: DataMenu[]
}

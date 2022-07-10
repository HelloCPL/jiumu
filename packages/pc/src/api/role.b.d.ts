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
}

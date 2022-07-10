/**
 * @describe: 权限相关接口类型
 * @author: cpl
 * @create: 2022-07-06 11:53:17
 */

interface DataPermission extends DataBase {
  id: string
  code: string
  label: string
  sort: number
}

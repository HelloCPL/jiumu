/**
 * @author chen
 * @description 标签相关接口类型
 * @update 2022-07-04 01:07:21
 */


// 标签数据接口类型
interface DataTag extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  parentCode: string
  parentLabel: string
}

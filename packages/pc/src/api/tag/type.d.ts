/**
 * @author chen
 * @description 标签相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 标签添加或编辑参数类型
interface ParamsTagAdd {
  id?: string
  code: string
  label: string
  parentCode?: string
  sort?: number
  remarks?: string
}

// 标签数据接口类型
interface DataTagInfo extends DataBase {
  id: string
  code: string
  label: string
  sort: number
  parentCode: string
  parentLabel: string
  checkedUserId?: string
  relevanceId?: string
}

// 树级标签列表接口类型
interface DataTag extends DataTagInfo {
  children: DataTag[]
}

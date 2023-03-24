/**
* @description 口令相关接口类型
* @author cpl
* @create 2023-03-23 17:44:49
*/

// 新增一个口令参数
interface ParamsCipherAdd {
  id?: string
  title: string
  account: string
  cipher: string
  type: string
  classify?: string
  sort?: number
}

// 口令接口类型
interface DataCipherInfo extends DataBase {
  id: string
  title: string
  account: string
  cipher: string
  type: string
  typeLabel: string
  classify: DataBaseClassify[]
  sort: number
  keyStr?: string
  ivStr?: string
}

// 口令列表参数
interface ParamsCipherList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
  type?: string
  classify?: string
}


// 口令code新增参数
interface ParamsCipherCodeAdd {
  code: string
}

// 口令code修改参数
interface ParamsCipherCodeUpdate {
  code: string
  oldCode: string
}
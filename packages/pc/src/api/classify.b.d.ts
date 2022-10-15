/**
 * @describe: 自定义标签相关接口类型
 * @author: cpl
 * @create: 2022-10-13 17:52:21
*/

// 自定义标签返回数据类型
interface DataTagCustom extends DataBase {
  id: string
  label: string
  type: string
  sort: number
  isSelf?: '1' | '0'
  createUser: string
  createUserName: string
}

// 所有自定义标签列表接口参数类型
interface ParamsTagCustomList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
}

// 我的自定义标签列表接口类型
interface ParamsTagCustomListSelf extends ParamsTagCustomList {
  type?: string
}

// 获取指定用户自定义标签列表接口类型
interface ParamsTagCustomListByUserId extends ParamsTagCustomListSelf {
  id: string
}

// 自定义标签类型返回数据类型
interface DataTagCustomType {
  type: string
  total: number
}

// 自定义标签添加参数类型
interface ParamsTagCustomAdd {
  id?: string
  label: string
  sort?: number
  type?: string
}
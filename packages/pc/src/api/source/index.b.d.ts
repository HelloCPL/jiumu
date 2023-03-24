/**
* @description 资源接口相关类型
* @author cpl
* @create 2023-02-22 17:11:12
*/

// 资源新增或编辑参数类型
interface ParamsSourceAdd {
  id?: string
  title: string
  attachment: string
  type: '701' | '702' | '703'
  classify?: string
  isSecret?: '0' | '1'
  sort?: number
  remarks?: string
}

// 资源数据接口类型
interface DataSource extends DataBase {
  id: string
  title: string
  classify: DataBaseClassify[]
  isSecret: '0' | '1'
  isTop: '0' | '1'
  sort: number
  type: '701' | '702' | '703'
  typeLabel: string
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isLike: '0' | '1'
  likeCount: number
  isCollection: '0' | '1'
  collectionCount: number
  isSelf: '0' | '1'
  commentCount: number
}

interface DataSourceInfo extends DataSource {
  attachment: Array<DataBaseFile | DataSourceLink>
}

// 资源的外部资源信息数据接口类型
interface DataSourceLink extends DataBase {
  id: string
  title: string
  link: string
  coverImg1: DataBaseFile | null
  coverImg2: string
  sort: number
  createUser?: string
}

// 获取所有公开的资源列表接口类型
interface ParamsSourceList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
  type?: string
  showUserInfo?: any
}

// 获取我的资源列表参数类型
interface ParamsSourceListSelf extends ParamsSourceList {
  classify?: string
  isSecret?: '1' | '0'
}

// 获取指定用户的资源列表接口类型
interface ParamsSourceListByUserId extends ParamsSourceList {
  userId: string
  classify?: string
}

// 资源的外部资源信息新增或编辑参数类型
interface ParamsSourceLinkAdd extends ObjectAny {
  id?: string
  title: string
  link: string
  coverImg1?: string
  coverImg2?: string
  sort: number
  remarks?: string
}
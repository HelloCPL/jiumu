/*
* 问答相关接口类型
*/

// 问答新增或编辑参数类型
interface ParamsQuestionAdd {
  id?: string
  title: string
  content: string
  isDraft: DataBaseStatus
  classify?: string
  isSecret?: DataBaseStatus
  sort?: number
  remarks?: string
}

interface ParamsQuestionAddSaveContent {
  id: string
  content: string
}

// 问答数据接口类型
interface DataQuestion extends DataBase {
  id: string
  title: string
  content: string
  classify: DataBaseClassify[]
  isDraft: DataBaseStatus
  isSecret: DataBaseStatus
  isTop: DataBaseStatus
  sort: number
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isLike: DataBaseStatus
  likeCount: number
  isCollection: DataBaseStatus
  collectionCount: number
  isSelf: DataBaseStatus
  commentCount: number
}

// 获取所有问答参数类型
interface ParamsQuestionList extends ParamsPage {
  keyword?: string
  highlight?: DataBaseStatus
  showUserInfo?: any
}

// 获取我的问答列表参数类型
interface ParamsQuestionListSelf extends ParamsQuestionList {
  classify?: string
  isDraft?: DataBaseStatus
  isSecret?: DataBaseStatus
}

// 获取指定用户的问答列表参数类型
interface ParamsQuestionListByUserId {
  userId: string
  classify?: string
}

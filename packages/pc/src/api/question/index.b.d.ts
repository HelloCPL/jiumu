/*
* 问答相关接口类型
*/

// 问答新增或编辑参数类型
interface ParamsQuestionAdd {
  id?: string
  title: string
  content: string
  isDraft: '1' | '0'
  classify?: string
  isSecret?: '1' | '0'
  sort?: number
  remarks?: string
}

// 获取一个问答参数类型
interface ParamsQuestionOne {
  id: string
  showUserInfo?: any
}

// 问答数据接口类型
interface DataQuestion extends DataBase {
  id: string
  title: string
  content: string
  classify: DataBaseClassify[]
  isDraft: '0' | '1'
  isSecret: '0' | '1'
  isTop: '0' | '1'
  sort: number
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

// 获取所有问答参数类型
interface ParamsQuestionList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
  showUserInfo?: any
}

// 获取我的问答列表参数类型
interface ParamsQuestionListSelf extends ParamsQuestionList {
  classify?: string
  isDraft?: '1' | '0'
  isSecret?: '1' | '0'
}

// 获取指定用户的问答列表参数类型
interface ParamsQuestionListByUserId {
  userId: string
  classify?: string
}

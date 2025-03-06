/**
 * @author chen
 * @description 文章相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 新增或编辑文章参数
interface ParamsArticleAdd {
  id?: string
  title: string
  content: string
  contentType: '401' | '402' | '403'
  type: string
  isDraft: DataBaseStatus
  coverImg?: string
  attachment?: string
  classify?: string
  isSecret?: DataBaseStatus
  sort?: number
  remarks?: string
}

interface ParamsArticleSave extends ObjectAny {
  id: string
}

// 文章数据接口类型
interface DataArticle extends DataBase {
  id: string
  title: string
  coverImg?: DataBaseFile | null
  type: string
  typeLabel: string
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

// 文章详情数据接口类型
interface DataArticleInfo extends DataArticle {
  content: string
  contentType: '401' | '402' | '403'
  contentTypeLabel: string
  attachment: DataBaseFile[]
}

// 获取所有文章列表接口类型
interface ParamsArticleList extends ParamsPage {
  keyword?: string
  highlight?: DataBaseStatus
  type?: string
  showUserInfo?: any
}

// 获取我的文章列表参数类型
interface ParamsArticleListSelf extends ParamsArticleList {
  classify?: string
  isDraft?: DataBaseStatus
  isSecret?: DataBaseStatus
}

// 获取指定用户的文章列表接口类型
interface ParamsArticleListByUserId extends ParamsArticleList {
  userId: string
  classify?: string
}

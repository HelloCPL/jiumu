/**
 * @author chen
 * @description 文章相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 获取所有文章列表接口类型
interface ParamsArticleList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
  type?: string
}

// 获取指定用户的文章列表接口类型
interface ParamsArticleListByUserId extends ParamsArticleList {
  classify?: string
}

interface ParamsArticleListSelf extends ParamsArticleListByUserId {
  isDraft?: '1' | '0'
  isSecret?: '1' | '0'
}

// 文章数据接口类型
interface DataArticle extends DataBase {
  id: string
  title: string
  coverImg?: DataBaseFile | null
  type: string
  typeLabel: string
  classify: DataBaseClassify[]
  isDraft: '0' | '1'
  isSecret: '0' | '1'
  isTop: '0' | '1'
  sort: number
  createUser: string
  createUserName: string
  isLike: '0' | '1'
  likeCount: number
  isCollection: '0' | '1'
  collectionCount: number
  isSelf: '0' | '1'
  commentCount: number
}

// 文章详情数据接口类型
interface DataArticleInfo extends DataArticle {
  content: string
  contentType: '401' | '402' | '403'
  contentTypeLabel: string
  attachment: DataBaseFile[]
}

// 新增或编辑文章参数
interface ParamsArticleAdd {
  id?: string
  title: string
  content: string
  contentType: '401' | '402' | '403'
  type: string
  isDraft: '1' | '0'
  coverImg?: string
  attachment?: string
  classify?: string
  isSecret?: '1' | '0'
  sort?: number
  remarks?: string
}
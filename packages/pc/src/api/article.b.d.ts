/**
 * @author chen
 * @description 文章相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 获取所有文章列表接口类型
interface ParamsAriticleList {
  pageNo?: number
  pageSize?: number
  keyword?: string
  type?: string
}

// 文章数据接口类型
interface DataAriticle extends DataBase {
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
interface DataAritlcleInfo extends DataAriticle {
  content: string
  contentType: string
  contentTypeLabel: string
  attachment: DataBaseFile[]
}

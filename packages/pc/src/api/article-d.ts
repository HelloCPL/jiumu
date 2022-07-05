/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

interface ParamsAriticleList {
  pageNo?: number
  pageSize?: number
  keyword?: string
  type?: string
}

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

interface DataAritlcleInfo extends DataAriticle {
  content: string
  contentType: string
  contentTypeLabel: string
  attachment: DataBaseFile[]
}

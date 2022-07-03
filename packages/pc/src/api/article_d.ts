/**
 * @author chen
 * @description 文章相关接口
 * @update 2022-07-04 01:07:21
 */

interface ArticleListParams {
  pageNo?: number
  pageSize?: number
  keyword?: string
  type?: string
}

interface ArticleOptions extends BaseOptions {
  id: string
  title: string
  coverImg?: BaseFileOption | null
  type: string
  typeLabel: string
  classify: BaseClassifyOptions[]
  isDraft: BaseTypeOptions
  isSecret: BaseTypeOptions
  isTop: BaseTypeOptions
  sort: number
  createUser: string
  createUserName: string
  isLike: BaseTypeOptions
  likeCount: number
  isCollection: BaseTypeOptions
  collectionCount: number
  isSelf: BaseTypeOptions
  commentCount: number
}

interface ArticleInfoOptions extends ArticleOptions {
  content: string
  contentType: string
  contentTypeLabel: string
  attachment: BaseFileOption[]
}

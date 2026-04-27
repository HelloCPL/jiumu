import { addCollection, addLike, deleteCollection, deleteLike } from '../../api/interaction'

export type InterationProps = {
  modelValue: {
    id: string
    isLike: DataBaseStatus
    isCollection: DataBaseStatus
    isDraft?: DataBaseStatus
    likeCount: number
    collectionCount: number
    [x: string]: any
  }
  type: string
  /**
   * 点赞
   * pc 端有默认
   */
  addLikeApi?: typeof addLike
  /**
   * 取消点赞
   * pc 端有默认
   */
  deleteLikeApi?: typeof deleteLike
  /**
   * 新增收藏
   * pc 端有默认
   */
  addCollectionApi?: typeof addCollection
  /**
   * 取消收藏
   * pc 端有默认
   */
  deleteCollectionApi?: typeof deleteCollection
}

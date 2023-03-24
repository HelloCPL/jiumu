/**
 * @author chen
 * @description 用户相关交互接口 点赞 收藏 评论
 * @update 2022-07-04 01:07:21
 */

// 新增点赞或收藏参数
interface ParamsInteractionAdd {
  targetId: string
  type: string
}

// 我的点赞或收藏列表参数
interface ParamsInteractionList extends ParamsPage {
  showUserInfo?: any
}

// 获取某用户的点赞列表参数
interface ParamsLikeListByUserId extends ParamsInteractionList {
  userId: string
}

// 点赞数据结构
interface DataLike extends DataBase {
  id: string
  targetId: string
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  type: string
  typeLabel: string
}

// 我的收藏列表参数
interface ParamsCollectionList extends ParamsInteractionList {
  type?: string
}

// 获取某用户的收藏列表
interface ParamsCollectionListByUserId extends ParamsCollectionList {
  userId: string
}

// 收藏数据结构
interface DataCollection extends DataLike {
  title: string
}

// 新增评论参数
interface ParamsCommentAdd {
  targetId: string
  content: string
  type: string
}

// 获取评论列表参数
interface ParamsCommentList extends ParamsInteractionList {
  targetId: string
  type: string
}

// 收藏数据结构
interface DataComment extends DataBase {
  id: string
  targetId: string
  targetType: string
  targetTypeLabel: string
  commentFirstId?: string
  content: string
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isTop: '1' | '0'
  isLike: '1' | '0'
  likeCount: number
  commentCount: number
  replyUser: string
  replyUserName: string
  isSelf: '1' | '0'
  isTargetUser: '1' | '0'
  flag: 1 | 2
}

interface DataCommentList extends DataComment {
  children: DataCommentList[]
}
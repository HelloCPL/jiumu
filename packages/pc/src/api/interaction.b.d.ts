/**
 * @author chen
 * @description 用户相关交互接口 点赞 收藏 评论
 * @update 2022-07-04 01:07:21
 */

interface ParamsLikeAdd {
  targetId: string
  type: string
}


interface ParamsLikeListByUserId extends ParamsPage {
  userId: string
}

interface DataLike extends DataBase {
  id: string
  targetId: string
  createUser: string
  createUserName: string
  type: string
  typeLabel: string
}

interface ParamsCollectionList extends ParamsPage {
  type?: string
}

interface ParamsCollectionListByUserId extends ParamsCollectionList {
  userId: string
}

interface DataCollection extends DataLike {
  title: string
}


interface ParamsCommentAdd {
  targetId: string
  content: string
  type: string
}

interface ParamsCommentList extends ParamsPage {
  targetId: string
  type: string
}

interface DataComment extends DataBase {
  id: string
  targetId: string
  targetType: string
  commentFirstId?: string
  content: string
  createUser: string
  createUserName: string
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

interface DataCollectionList extends DataComment {
  children: DataCollectionList[]
}
/**
 * 连载相关接口类型
*/

// 连载新增或编辑参数
interface ParamsNovelAdd {
  id?: string
  name: string
  introduce: string
  author: string
  isDraft: '0' | '1'
  type: string
  classify?: string
  sort?: number
  isSecret?: '0' | '1'
  remarks?: string
}

// 获取一个连载参数类型
interface ParamsNovelOne {
  id: string
  showUserInfo?: any
}

// 连载数据接口类型
interface DataNovel extends DataBase {
  id: string
  name: string
  introduce: string
  classify: DataBaseClassify[]
  type: string
  typeLabel: string
  author: string
  isSecret: '0' | '1'
  isDraft: '0' | '1'
  sort: number
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isLike: '0' | '1'
  likeCount: number
  chapterLikeCount: number
  isCollection: '0' | '1'
  collectionCount: number
  chapterCollectionCount: number
  isSelf: '0' | '1'
  commentCount: number
  chapterCommentCount: number
  chapterCount: number
}

// 获取所有连载列表参数类型
interface ParamsNovelList extends ParamsPage {
  keyword?: string
  highlight?: '0' | '1'
  type?: string
  showUserInfo?: any
}

// 获取我的连载列表参数类型
interface ParamsNovelListSelf extends ParamsNovelList {
  classify?: string
  isDraft?: '1' | '0'
  isSecret?: '1' | '0'
}

// 获取指定用户的连载列表接口类型
interface ParamsNovelListByUserId extends ParamsNovelList {
  userId: string
  classify?: string
}

interface ParamsNovelChapterChange {
  title: string
  content: string
  sort: number
  isDraft: '0' | '1'
  isSecret?: '0' | '1'
  remarks?: string
}

// 章节添加参数类型
interface ParamsNovelChapterAdd extends ParamsNovelChapterChange {
  novelId: string
}

// 章节编辑参数类型
interface ParamsNovelChapterEdit  extends ParamsNovelChapterChange {
  id: string
}

// 章节数据类型
interface DataNovelChapter {
  id: string
  novelId: string
  novelName: string
  novelAuthor: string
  title: string
  content: string
  sort: number
  isTop: '0' | '1'
  isSecret: '0' | '1'
  isDraft: '0' | '1'
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isLike: '0' | '1'
  likeCount: number
  isCollection: '0' | '1'
  collectionCount: number
  isSelf: '0' | '1'
  commentCount: number
  remarks: string
}

// 获取指定连载的所有章节参数类型
interface ParamsNovelChapterList extends ParamsPage {
  novelId: string
  isDraft?: '0' | '1'
  isSecret?: '0' | '1'
  isConcise?: '0' | '1'
  showUserInfo?: any
}

interface ParamsNovelNoteTarget {
  id: string
  type: '502' | '503' | '504' | '505' | '507'
}

interface ParamsNovelNoteTarget2 extends ParamsNovelNoteTarget {
  title: string
  typeLabel: string
}

// 笔记新增或编辑参数类型
interface ParamsNovelNoteAdd {
  id?: string
  target: ParamsNovelNoteTarget[]
  content: string
  title?: string
  classify?: string
  sort?: number
  isSecret?: '0' | '1'
  remarks?: string
}

interface DataNovelNote extends DataBase {
  id: string
  target: ParamsNovelNoteTarget2[]
  title: string
  content: string
  classify: DataBaseClassify[]
  sort: number
  isSecret: '0' | '1'
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isSelf: '0' | '1'
}

// 笔记列表参数类型
interface ParamsNovelNoteList extends ParamsPage {
  targetId: string
  keyword?: string
  highlight?: '0' | '1'
  isSecret?: '0' | '1'
  classify?: string
  showUserInfo?: any
}
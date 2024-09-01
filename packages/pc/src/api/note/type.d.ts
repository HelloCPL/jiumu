
// 笔记新增参数
interface ParamsNoteAdd {
  content: string
  rootId: string
  targetId: string
  title?: string
  classify?: string
  sort?: number
  isSecret?: DataBaseStatus
  linkStatus?: DataBaseStatus
  remarks?: string
}

// 笔记编辑参数
interface ParamsNoteEdit extends Partial<ParamsNoteAdd> {
  id: string
}

// 笔记信息
interface DataNote extends DataBase {
  id: string
  rootId: string
  targetId: string
  title: string
  content: string
  classify: DataBaseClassify[]
  sort: number
  isSecret: DataBaseStatus
  linkStatus: DataBaseStatus
  createUser: string
  createUserName?: string
  createUserAvatar?: DataBaseFile | null
  isSelf: DataBaseStatus
}


interface ParamsNoteList1 {
  keyword?: string
  highlight?: DataBaseStatus
  pageNo?: number
  pageSize?: number
  isSecret?: DataBaseStatus
  classify?: string
  showUserInfo?: DataBaseStatus
}
interface ParamsNoteList2 extends ParamsNoteList1 {
  rootId: string
}
interface ParamsNoteList3 extends ParamsNoteList1 {
  targetId: string
  relevance?: DataBaseStatus
}

// 获取指定节点所有的笔记列表参数
type ParamsNoteList = ParamsNoteList2 | ParamsNoteList3


// 笔记关联新增参数
interface ParamsNoteLinkAdd {
  noteId: string
  targetId: string
}

// 获取的相同根节点的其他目标节点的可关联笔记列表参数
interface ParamsNoteLinkListByRootId {
  rootId: string
  targetId: string
  keyword?: string
  highlight?: DataBaseStatus
  pageNo?: number
  pageSize?: number
  isSecret?: DataBaseStatus
  classify?: string
  showUserInfo?: DataBaseStatus
}

// 可关联笔记列表信息
interface DataNoteLink extends DataNote {
  isTargetRelevance: DataBaseStatus
}
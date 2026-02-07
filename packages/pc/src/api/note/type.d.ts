
// 笔记新增参数
interface ParamsNoteAdd {
  title: string
  content: string
  rootId: string
  targetId: string
  classify?: string
  sort?: number
  isSecret?: DataBaseStatus
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
}

// 获取指定节点所有的笔记列表参数
type ParamsNoteList = ParamsNoteList2 | ParamsNoteList3

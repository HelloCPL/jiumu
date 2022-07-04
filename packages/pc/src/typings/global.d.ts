// import {Code} from '@/enumerations/index'

interface ObjectAny {
  [x:string]: any
}

// 数据接口返回类型
interface DataResponse {
  message: string | string[]
  code: 200 | 500 | 400 | 404 | 403 | 401 | 205 | 206 | 423
  data: any
  total: number
}

// 自定义接口返回类型
interface DataOptions<T = any> {
  message: string | string[]
  code: 200 | 500 | 400 | 404 | 403 | 401 | 205 | 206 | 423
  data: T
  total: number
}

// 数据data结构返回基本类型
interface DataBase extends ObjectAny {
  createTime: string
  remarks?: string
  terminal: string
  updateTime?: string
}

interface DataBaseFile extends DataBase {
  id: string
  filePath: string
  fileName: string
  fileSize: number
  staticPlace: string
  createUser: string
  isSecret: '0' | '1'
  checkValidTime: string
}

interface DataBaseClassify extends DataBase {
  id: string
  label: string
  sort: number
  type: string
}
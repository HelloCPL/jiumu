// import {Code} from '@/enumerations/index'

// 常用类型
interface ObjectAny {
  [x:string]: any
}

interface KeyValue<T = string, U = any> extends ObjectAny {
  key: T,
  value: U
}

interface KeyId<T = string, U = string> extends ObjectAny {
  key: T
  id: U
}

interface ValueLabel<T = string, U = string> extends ObjectAny {
  value: T
  label: U
}

// 数据接口返回类型
interface DataResponse {
  message: string
  code: 200 | 500 | 400 | 404 | 403 | 401 | 205 | 206 | 423
  data: any
  total: number
}

// 自定义接口返回类型
interface DataOptions<T = any> {
  message: string
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

// 文件返回格式类型
interface DataBaseFile extends DataBase {
  id: string
  filePath: string
  fileName: string
  fileSize: number
  staticPlace: string
  suffix: string
  createUser: string
  isSecret: '0' | '1'
  checkValidTime: string
}

// 自定义标签返回类型
interface DataBaseClassify extends DataBase {
  id: string
  label: string
  sort: number
  type: string
}

// 分页参数
interface ParamsPage {
  pageNo?: number
  pageSize?: number
}
// import {Code} from '@/enumerations/index'

interface ObjectAny {
  [x:string]: any
}

// 数据接口返回类型
interface ResponseData {
  message: string | string[]
  code: number
  data: any
  total: number
}

interface DataOptions<T> {
  message: string | string[]
  code: number
  data: T
  total: number
}

// 数据data结构返回基本类型
interface BaseOptions extends ObjectAny {
  createTime: string
  remarks?: string
  terminal: string
  updateTime?: string
}

type BaseTypeOptions = '0' | '1'

interface BaseFileOption extends BaseOptions {
  id: string
  filePath: string
  fileName: string
  fileSize: number
  staticPlace: string
  createUser: string
  isSecret: BaseTypeOptions
  checkValidTime: string
}

interface BaseClassifyOptions extends BaseOptions {
  id: string
  label: string
  sort: number
  type: string
}
/*
* 文件操作参数类型
*/

type ParamsFileStaticPlace = 'files' | 'images' | 'videos' | 'editors' | 'files_big'

// 文件上传额外参数
interface ParamsFileOther extends ObjectAny {
  isSecret?: DataBaseStatus
  staticPlace?: ParamsFileStaticPlace
  remarks?: string
}

// 切片上传参数
interface ParamsFileChunkAdd {
  fileHash: string
  chunkIndex: number
}

// 切片合并参数
interface ParamsFileChunkMerge {
  fileName: string
  fileHash: string
  chunkSize: number
  chunkLength: number
  fileSize?: number
  isSecret?: DataBaseStatus
  staticPlace?: 'files' | 'images' | 'videos' | 'editors' | 'files_big'
  remarks?: string
}

// 校验大文件是否上传参数
interface ParamsFileChunkVerify {
  fileName: string
  fileHash: string
}

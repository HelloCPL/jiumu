/*
* 文件操作参数类型
*/

// 文件上传额外参数
interface ParamsFileOther extends ObjectAny {
  isSecret?: '1' | '0'
  staticPlace?: 'files' | 'images' | 'videos' | 'editors'
  remarks?: string
}

// 获取一个指定的文件参数
interface ParamsFileById {
  id: string
  showUserInfo?: any
}
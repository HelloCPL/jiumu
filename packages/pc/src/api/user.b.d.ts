// 登录参数
interface ParamsLogin {
  phone: string
  password: string
}

// token返回接口类型
interface DataToken {
  token: string
  tokenRefresh: string
}

// 用户接口返回类型
interface DataUserInfo extends DataBase {
  id: string
  phone: string
  username: string
  sex: string
  sexLabel: string
  birthday: string
  avatar: DataBaseFile | null
  professional: string
  address: string
}

// 登录记录列表接口参数
interface ParamsLoginInfo {
  userId: string,
  pageNo?: number
  pageSize?: number
}

// 登录记录接口返回数据类型
interface DataLoginInfo extends DataBase {
  id: string
  userId: string
  username: string
  ip: string
}

// 修改密码参数
interface ParamsUpdatePassword {
  password: string
  newPassword: string
}

// 修改本用户信息参数
interface ParamsUpdateUserBaseSelf {
  username?: string
  sex?: string
  birthday?: string
  avatar?: string
  professional?: string
  address?: string
  remarks?: string
}
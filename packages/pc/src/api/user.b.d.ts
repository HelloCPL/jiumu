interface ParamsLogin {
  phone: string
  password: string
}

interface DataToken {
  token: string
  tokenRefresh: string
}

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
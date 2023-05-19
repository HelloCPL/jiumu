export interface UserState {
  token: string
  userInfo: DataUserInfo | null
  roles: DataRole[]
  permissions: DataPermission[]
  menus: DataMenu[]
  tags: DataTagInfo[]
}

export type UserInfoType = '1' | '2' | '3' | '4' | '5'

export interface UserActions {
  reset: () => void
  setToken: (token: string) => void
  updateUser: (type?: string) => Promise<any>
  getUser: (type: UserInfoType) => Promise<any>
}

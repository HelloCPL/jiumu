export interface UserState {
  token: string
  tokenRefresh: string
  userInfo: DataUserInfo | null
  roles: DataRole[]
  permissions: DataPermission[]
  menus: DataMenu[]
  tags: DataTagInfo[]
}

export interface UserActions {
  reset: () => void
  setToken: (params: DataToken) => void
  getUser: (type?: string) => void
}

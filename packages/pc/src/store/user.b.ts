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
  updateUser: (type?: string) => Promise<any>
  getUser: (type?: string) => Promise<any>
}

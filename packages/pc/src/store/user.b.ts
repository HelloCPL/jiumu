export interface UserState {
  token: string
  tokenRefresh: string
  userInfo: DataUserInfo | null
  roles: DataRole[]
  permissions: DataPermission[]
  menus: DataMenu[]
  tags: DataTag[]
}

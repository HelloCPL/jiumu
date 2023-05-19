export interface TokenRefreshState {
  tokenRefresh: string
}

export interface TokenRefreshActions {
  reset: () => void
  setTokenRefresh: (tokenRefresh: string) => void
}

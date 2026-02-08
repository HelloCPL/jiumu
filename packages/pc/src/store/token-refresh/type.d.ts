 interface TokenRefreshState {
  tokenRefresh: string
}

 interface TokenRefreshActions {
  reset: () => void
  setTokenRefresh: (tokenRefresh: string) => void
}

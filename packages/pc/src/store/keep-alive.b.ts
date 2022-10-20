import { LocationQuery, RouteMeta, RouteParams, RouteRecordName } from 'vue-router'

export interface KeepAliveOption {
  name: RouteRecordName | null | undefined
  path: string
  fullPath: string
  hash: string
  meta: RouteMeta
  params: RouteParams
  query: LocationQuery
}

export interface KeepAliveState {
  includes: KeepAliveOption[]
  excludes: KeepAliveOption[]
  max: number
}

export interface KeepAliveGetters extends ObjectAny {
  include: (state: KeepAliveState) => RouteRecordName[]
  exclude: (state: KeepAliveState) => RouteRecordName[]
}

export interface KeepAliveActions {
  _push: (to: KeepAliveOption) => void
  _pop: (to: KeepAliveOption) => void
  _find: (name: string) => KeepAliveOption | undefined
  reset: () => void
  handleKeepAlive: (to: KeepAliveOption, from: KeepAliveOption) => void
  refreshKeepAlive: (names: string) => void
}

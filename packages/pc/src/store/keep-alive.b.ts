import { LocationQuery, RouteMeta, RouteParams, RouteRecordName } from 'vue-router'

export interface KeepAliveState {
  includes: KeepAliveOption[]
  excludes: KeepAliveOption[]
  max: number
}

export interface KeepAliveOption {
  name: RouteRecordName | null | undefined
  path: string
  fullPath: string
  hash: string
  meta: RouteMeta
  params: RouteParams
  query: LocationQuery
}

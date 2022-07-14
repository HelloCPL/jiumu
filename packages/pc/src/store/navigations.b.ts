import { KeepAliveOption } from './keep-alive.b'
import { RouteRecordName } from 'vue-router'

export interface NavigationState {
  navigations: KeepAliveOption[]
  routerName: RouteRecordName | null | undefined
  isCollapse: boolean
}

import { RouteRecordName } from 'vue-router'

declare global {
  interface NavigationState {
    navigations: KeepAliveOption[]
    routerName: RouteRecordName | null | undefined
    isCollapse: boolean
  }
  
   interface NavigaitonGetters extends ObjectAny {
    routerNameIndex: (state: NavigationState) => number
  }
  
   interface NavigaitonActions {
    _push: (to: KeepAliveOption, routerName?: string) => void
    _pop: (to: KeepAliveOption) => void
    _find: (name: string) => KeepAliveOption | undefined
    reset: () => void
    handleNavigations: (to: KeepAliveOption, from: KeepAliveOption) => void
    refreshNavigations: (names: string) => void
  }
}


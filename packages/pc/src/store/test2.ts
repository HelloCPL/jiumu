import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'

export const useTestStore2: StoreDefinition = defineStore(StoreNames.TEST2, {
  state: () => {
    return {
      fav: ['hah', 1, NaN, false, null, true, undefined, { a: 123 }],
      name: 'xxx'
    }
  },
  getters: {
    newFav: (state) => state.fav + 'new' // 推荐
  },
  actions: {
    setFav(a) {
      if (a > 5) {
        // this.fav = false
        this.name = { ss: 123 }
      } else {
        this.fav.push(a)
        this.name = 'xxx' + a
      }
    }
  },
  storage: {
    enabled: true,
    encrypt: true
  }
})

// 使用
// 1
// Test.current++
// Test.$state.current++
// 2
// Test.$patch({
//     current: 88
//   })
// 3
// Test.$patch((state) => {
//     state.current = 999
//   })
// 4
// Test.$state = { // 不推荐
//     current: 777
//   }
// 5
// Test.setCurrent() // 推荐 通过actions方法修改

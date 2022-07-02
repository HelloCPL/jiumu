import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'

interface User {
  name: string
  age: number
}

const result: User = {
  name: '哈哈',
  age: 18
}

export const useTestStore: StoreDefinition = defineStore(StoreNames.TEST, {
  state: () => {
    return {
      user: <User>{},
      name: 'xxx'
    }
  },
  getters: {
    // newName(): string {
    //   // 不推荐
    //   return this.name + 123
    // },
    newName: (state) => state.name + 'new' // 推荐
  },
  actions: {
    setCurrent() {
      this.user = result
    }
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

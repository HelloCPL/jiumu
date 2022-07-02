/**
 * @author chen
 * @description 自定义pinia插件，用于持久化存储pinia的数据（这里使用sessionStorage）
 * @update 2022-07-02 01:55:44
 */
import { PiniaPluginContext } from 'pinia'

type Options = {
  key?: string
}

// 监听存取方法
export const usePiniaPlugin = (option?: Options) => {
  console.log(option)
  return (ctx: PiniaPluginContext) => {
    const { store } = ctx
    // 订阅 即pinia数据改变时会监听到
    store.$subscribe(() => {
      console.log('store1', store)
    })
    console.log('store2', store)
  }
}

// 获取方法
export const getPiniaStrage = () => {}

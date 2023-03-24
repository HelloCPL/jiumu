/**
 * @author chen
 * @description 自定义pinia插件，用于持久化存储pinia的数据
 * @update 2022-07-02 19:19:08
 */
import { PiniaPluginContext } from 'pinia'
import { StorageOption, storage } from '../../storage'
const { VITE_HOME_EXPIRE } = import.meta.env

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']> // 指定state中key值
type PartialStateKey = keyof Partial<Store['$state']> // 指定state中key值集合

interface PiniaStorageOption extends StorageOption {
  enabled: boolean // 是否缓存
  keys?: PartialStateKey[] // 指定缓存的key
}

declare module 'pinia' {
  // @ts-ignore
  export interface DefineStoreOptionsBase {
    // allow defining a number of ms for any of the actions
    storage?: PiniaStorageOption
  }
}

/**
 * 缓存pinia数据 解决页面更新数据丢失问题
 * 需要缓存的数据在设置 defineStore 时配置 storage
 */
export const usePiniaStoragePlugin = ({ store, options }: PiniaPluginContext) => {
  if (options.storage?.enabled) {
    const defaultKeys: PartialStateKey[] = []
    for (const key in store.$state) {
      defaultKeys.push(key)
    }
    const keys = options.storage?.keys?.length ? options.storage?.keys : defaultKeys
    const config: StorageOption = {
      type: options.storage?.type || 'session',
      expire: options.storage?.expire || VITE_HOME_EXPIRE,
      prefix: options.storage?.prefix || 'pinia',
      encrypt: options.storage?.encrypt
    }

    // 初始化
    _initStorage(keys, store, config)

    // 订阅 即pinia数据改变时会监听到
    store.$subscribe(() => {
      _updateStorage(keys, store, config)
    })
  }
}

// 更新store缓存
function _updateStorage(keys: PartialStateKey[], store: Store, config?: StorageOption) {
  const value: PartialState = {}
  keys.forEach((key) => {
    if (store.$state.hasOwnProperty(key)) {
      // @ts-ignore
      value[key] = store.$state[key]
    }
  })
  storage.setItem(store.$id, value, config)
}
// 初始化store缓存值
function _initStorage(keys: PartialStateKey[], store: Store, config?: StorageOption) {
  const value: PartialState = {}
  const storageValue: PartialState | null = storage.getItem(store.$id, config)
  keys.forEach((key) => {
    if (store.$state.hasOwnProperty(key) && storageValue && storageValue.hasOwnProperty(key)) {
      value[key] = storageValue[key]
    }
  })
  store.$patch(value)
}

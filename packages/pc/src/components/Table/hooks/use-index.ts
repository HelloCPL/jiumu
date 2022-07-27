/**
 * @author chen
 * @description 处理table选择事件
 * @update 2022-07-27 22:34:25
 */

import { ref, onMounted, nextTick, watch } from 'vue'
import { TableV2Instance } from 'element-plus'
import { isPlainObject } from 'lodash-es'

export const useIndex = (props: any, emit: any) => {
  const table = ref<TableV2Instance>()

  // 判断是否全选
  let _isAll = false
  let _all: ObjectAny = {}
  const getAll = () => {
    nextTick(() => {
      const arr = (table.value as TableV2Instance).data
      _all = {}
      if (Array.isArray(arr)) {
        arr.forEach((row) => {
          // @ts-ignore
          _all[row[props.rowKey]] = false
        })
      }
      judgeAll()
    })
  }
  const judgeAll = () => {
    let flag = true
    for (const key in _all) {
      if (!_all[key]) {
        flag = false
        break
      }
    }
    _isAll = flag
  }
  onMounted(() => {
    getAll()
  })
  watch(
    () => props.data,
    (val) => {
      if (val) getAll()
    },
    { deep: true }
  )

  // 全选
  const selectAll = (selection: any) => {
    if (!table.value) return
    if (!_isAll) {
      // 全选
      _selectAll(table.value?.data, true)
    } else {
      // 取消全选
      _selectAll(table.value?.data, false)
    }
    judgeAll()
    emit('selectAll', selection, {
      _isAll,
      _all
    })
  }

  // 手动选择某项
  const select = (selection: any, row: any) => {
    const _selected = selection.length && row && selection.indexOf(row) !== -1
    if (_selected) {
      _selectAll(row, true)
    } else {
      _selectAll(row, false)
    }
    judgeAll()
    emit('select', selection, row, {
      _isAll,
      _all,
      _selected
    })
  }

  // 选择项改变
  const selectionChange = (selection: any) => {
    emit('selectionChange', selection, {
      _isAll,
      _all
    })
  }

  // 执行选择 本身及子项
  const _selectAll = (arr: any, selected: boolean) => {
    if (Array.isArray(arr)) {
      arr.forEach((row) => {
        table.value?.toggleRowSelection(row, selected)
        // @ts-ignore
        _all[row[props.rowKey]] = selected
        if (Array.isArray(row.children) && row.children.length) {
          _selectAll(row.children, selected)
        }
      })
    } else if (isPlainObject(arr)) {
      table.value?.toggleRowSelection(arr, selected)
      // @ts-ignore
      _all[arr[props.rowKey]] = selected
      if (Array.isArray(arr.children) && arr.children.length) {
        _selectAll(arr.children, selected)
      }
    }
  }

  return {
    table,
    selectAll,
    select,
    selectionChange
  }
}

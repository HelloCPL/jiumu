/**
 * 角色-菜单关联逻辑处理
 */
import { RoleInfoProps } from '../components/type'
import { ref, nextTick, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getMenuByParentCode } from '@/api/menu'
import { addRoleMenu, deleteRoleMenu } from '@/api/role-menu'
import { ElTree } from 'element-plus'
import { getText } from '@jiumu/utils'
import { useUserStore } from '@/store'

export const useRoleMenu = (props: RoleInfoProps) => {
  const userStore = useUserStore()

  // 菜单列表
  const dataList = ref<DataMenu[]>([])
  const refTree = ref<InstanceType<typeof ElTree>>()
  const getDataList = debounce(async () => {
    const res = await getMenuByParentCode(
      {
        roleId: props.id
      },
      true
    )
    if (res.code === 200) {
      dataList.value = res.data
      setCheckedKeys()
    }
  }, 300)
  getDataList()

  // 关联交互
  const changeCheck = (info: DataMenuInfo, checked: boolean) => {
    if (checked && !info._checked) {
      _addRelevance(info)
    } else if (!checked && info._checked) {
      deleteRelevance(info)
    }
  }

  // 新增关联
  const _addRelevance = async (info: DataMenuInfo) => {
    const res = await addRoleMenu({
      menuId: info.id,
      roleId: props.id
    })
    if (res.code === 200) {
      info.checkedRoleId = '1'
      info._checked = true
      if (userStore.roles.find((item) => item.id === props.id)) {
        userStore.updateUser('4')
      }
    }
    setCheckedKeys()
  }

  // 删除关联
  const deleteRelevance = async (info: DataMenuInfo) => {
    const res = await deleteRoleMenu({
      menuId: info.id,
      roleId: props.id
    })
    if (res.code === 200) {
      info.checkedRoleId = '0'
      info._checked = false
      userStore.updateUser('4')
    }
    setCheckedKeys()
  }

  // 设置关联
  const setCheckedKeys = () => {
    nextTick(() => {
      const _set = (arr: DataMenu[]) => {
        arr.forEach((item) => {
          const checked = item.checkedRoleId === '1'
          item._checked = checked
          refTree.value?.setChecked(item.id, checked, false)
          if (Array.isArray(item.children) && item.children.length) {
            _set(item.children)
          }
        })
      }
      _set(dataList.value)
    })
  }

  const _label = computed(() => {
    if (!props.label) return ''
    return '（' + getText(props.label) + '）'
  })

  return {
    _label,
    dataList,
    refTree,
    getDataList,
    changeCheck
  }
}

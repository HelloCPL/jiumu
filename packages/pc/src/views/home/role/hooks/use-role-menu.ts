/**
 * 角色-菜单关联逻辑处理
 */
import { RoleInfoProps } from '../components/type'
import { ref, nextTick } from 'vue'
import { debounce } from 'lodash-es'
import { getMenuByParentCode } from '@/api/menu'
import { addRoleMenu, deleteRoleMenu } from '@/api/role-menu'
import { ElTree } from 'element-plus'

export const useRoleMenu = (props: RoleInfoProps) => {
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

  return {
    dataList,
    refTree,
    getDataList,
    changeCheck
  }
}

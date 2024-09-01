/**
 * 笔记新增或编辑逻辑处理
 */

import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { debounce } from 'lodash-es'
import { ref, reactive, onMounted } from 'vue'
import { NoteAddProps, NoteAddEmit } from '../type'
import { addNote, deleteNote, getNoteOne, updateNote } from '@/api/note'

export const useAdd = (props: NoteAddProps, emit: NoteAddEmit) => {
  const btnList = ref<FilterButtonList[]>([
    { name: '发布', key: 'save', type: 'primary' },
    { name: '取消', key: 'delete' }
  ])

  const linkStatusList: ValueLabel[] = [
    { value: '1', label: '全关联' },
    { value: '0', label: '仅目标关联' }
  ]

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsNoteAdd>({
    rootId: <string>props.rootId,
    targetId: <string>props.targetId,
    title: '',
    content: '',
    classify: '',
    isSecret: '1',
    sort: 1,
    linkStatus: '1',
    remarks: ''
  })

  const rules = reactive<FormRules>({
    title: [{ required: true, trigger: 'change', message: '请输入标题' }],
    content: [{ required: true, trigger: 'change', message: '请输入内容' }],
    sort: [{ required: true, trigger: 'change', message: '请输入排序' }]
  })

  // 获取笔记详情
  const _getOne = async () => {
    if (!props.id) return
    const res = await getNoteOne({ id: props.id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.content = data.content
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks

      if (data.classify?.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }

  onMounted(() => {
    if (props.id) {
      btnList.value = [
        { name: '保存', key: 'save', type: 'primary' },
        { name: '删除', key: 'delete' }
      ]
      _getOne()
    }
  })

  // 新增
  const _add = debounce(async (params: ParamsNoteAdd) => {
    const res = await addNote(params)
    handleFinish(res)
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsNoteEdit) => {
    const res = await updateNote(params)
    handleFinish(res)
  }, 300)

  // 删除
  const _delete = debounce(async (id: string) => {
    const res = await deleteNote(id)
    handleFinish(res)
  }, 300)

  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm')
    }
  }

  // 点击下方按钮
  const changeBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'save':
        if (!formRef.value) return
        formRef.value.validate((valid) => {
          if (valid) {
            if (props.id) {
              const params: ParamsNoteEdit = {
                id: props.id,
                ...form
              }
              delete params.rootId
              delete params.targetId
              _update(params)
            } else {
              const params: ParamsNoteAdd = {
                ...form
              }
              _add(params)
            }
          }
        })
        break
      case 'delete':
        Confirm(`确定${item.name}吗？`).then(() => {
          if (props.id) {
            _delete(props.id)
          } else {
            emit('cancel')
          }
        })
        break
    }
  }

  return {
    btnList,
    linkStatusList,
    formRef,
    form,
    rules,
    changeBtn
  }
}

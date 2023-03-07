/**
 * 笔记新增或编辑逻辑处理
 */

import { addNovelNote, deleteNovelNote, getNovelNoteOne, updateNovelNote } from '@/api/novel'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { debounce } from 'lodash-es'
import { ref, reactive, onMounted } from 'vue'
import { NovelNoteAddProps, NovelNoteEmit } from '../type'

export const useAdd = (props: NovelNoteAddProps, emit: NovelNoteEmit) => {
  // 控制显隐
  const isShow = ref(true)
  const beforeClose = () => {
    isShow.value = false
    setTimeout(() => {
      emit('close', 'close')
    }, 500)
  }

  const btnList = ref<FilterButtonList[]>([
    { name: '发布', key: 'save', type: 'primary' },
    { name: '取消', key: 'delete' }
  ])

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsNovelNoteAdd>({
    title: '',
    content: '',
    classify: '',
    isSecret: '0',
    sort: 1,
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
    const res = await getNovelNoteOne({ id: props.id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.content = data.content
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks

      if (data.classify.length) {
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
  const _add = debounce(async (params: ParamsNovelNoteAdd) => {
    const res = await addNovelNote(params)
    handleFinish(res, 'add')
  })

  // 编辑
  const _update = debounce(async (params: ParamsNovelNoteEdit) => {
    const res = await updateNovelNote(params)
    handleFinish(res, 'update')
  })

  // 删除
  const _delete = debounce(async (id: string) => {
    const res = await deleteNovelNote(id)
    handleFinish(res, 'delete')
  })

  // 处理回调
  const handleFinish = (res: DataOptions<null | string>, type: string) => {
    if (res.code === 200) {
      // 更新指定页面
      Message({
        message: res.message,
        type: 'success'
      })
      emit('close', type)
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
            const params: ParamsNovelNoteEdit = {
              id: props.id,
              ...form
            }
            _update(params)
          } else {
            const params: ParamsNovelNoteAdd = {
              ...form
            }
            if (props.targetId) {
              params.targetId = props.targetId
              params.targetType = props.targetType
              params.targetShare = props.targetShare
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
          emit('close', 'close')
        }
      })
      break
    }
  }

  return {
    isShow,
    beforeClose,
    btnList,
    formRef,
    form,
    rules,
    changeBtn
  }
}

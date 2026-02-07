/*
 * 章节新增或编辑逻辑处理
 */
import { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import {
  addNovelChapter,
  deleteNovelChapter,
  getNovelChapterMaxSort,
  getNovelChapterOne,
  updateNovelChapter
} from '@/api/novel'
import { debounce } from 'lodash-es'
import { useKeepAliveStore } from '@/store'
import { Message, Confirm } from '@/utils/interaction'
import { FilterButtonList } from '@/components/FilterButton/type'
import { validateContent } from '@/components/Editor'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const id = ref<string>('')
  const novelId = ref<string>('')

  const formRef = ref<FormInstance>()
  const form = reactive<ParamsNovelChapterChange>({
    title: '',
    content: '',
    sort: 1,
    isDraft: '0',
    isSecret: '0',
    remarks: ''
  })

  const rules = reactive<FormRules>({
    title: [{ required: true, trigger: 'change', message: '请输入标题' }],
    content: [
      { required: true, trigger: 'change', message: '请输入内容' },
      { validator: validateContent, trigger: 'change' }
    ],
    sort: [{ required: true, trigger: 'change', message: '请输入排序' }]
  })

  // 处理内容
  let lock = true
  setTimeout(() => {
    lock = false
  }, 2000)

  const handleChangeContent = (val: string) => {
    if (lock) return
    if (val.length < 15) formRef.value?.validateField('content').catch(() => {})
  }

  const _getOne = async (_id: string) => {
    id.value = _id
    const res = await getNovelChapterOne({ id: _id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.content = data.content
      form.sort = data.sort
      form.isDraft = data.isDraft
      form.isSecret = data.isSecret
      form.remarks = data.remarks
    }
  }

  const getMaxSort = async () => {
    if (!novelId.value) return
    const res = await getNovelChapterMaxSort(novelId.value)
    if (res.code === 200) {
      form.sort = res.data + 1
    }
  }

  onMounted(() => {
    if (route.query?.novelId) {
      novelId.value = route.query?.novelId as string
    }
    if (route.query?.id) {
      _getOne(route.query?.id as string)
    } else {
      getMaxSort()
    }
  })

  // 新增
  const _add = debounce(async (params: ParamsNovelChapterAdd) => {
    const res = await addNovelChapter(params)
    handleFinish(res)
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsNovelChapterEdit) => {
    const res = await updateNovelChapter(params)
    handleFinish(res)
  }, 300)

  // 删除
  const _delete = debounce(async (id) => {
    const res = await deleteNovelChapter(id)
    handleFinish(res)
  }, 300)

  const keepAliveStore = useKeepAliveStore()
  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      keepAliveStore.refreshKeepAlive('Novel,NovelMe,NovelMeDraft,NovelChapter')
      Message({
        message: res.message,
        type: 'success'
      })
      router.replace({
        name: 'NovelChapter',
        query: { _refreshOne: '1', id: novelId.value }
      })
    }
  }

  // 点击下方按钮
  const changeBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'save':
        if (!formRef.value) return
        formRef.value.validate((valid) => {
          if (valid) {
            form.isDraft = '0'
            if (id.value) {
              _update({
                id: id.value,
                ...form
              })
            } else {
              _add({
                novelId: novelId.value,
                ...form
              })
            }
          }
        })
        break
      case 'draft':
        if (!formRef.value) return
        formRef.value.validate((valid) => {
          if (valid) {
            form.isDraft = '1'
            if (id.value) {
              _update({
                id: id.value,
                ...form
              })
            } else {
              _add({
                novelId: novelId.value,
                ...form
              })
            }
          }
        })
        break
      case 'delete':
        Confirm(`确定${item.name}吗？`).then(() => {
          _delete(id.value)
        })
        break
      case 'cancel':
        Confirm(`确定${item.name}吗？`).then(() => {
          router.back()
        })
        break
    }
  }

  // 仅保存文本
  const handleSaveContent = debounce(async () => {
    if (!id.value) {
      Message('请保存为草稿或发布后才能保存文本')
      return
    } else {
      const params = {
        id: id.value,
        content: form.content
      }
      const res = await updateNovelChapter(params)
      if (res.code === 200) {
        Message({
          message: '文本保存成功',
          type: 'success'
        })
      }
    }
  }, 300)

  return {
    id,
    novelId,
    formRef,
    form,
    rules,
    handleChangeContent,
    changeBtn,
    handleSaveContent
  }
}

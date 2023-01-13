/*
 * 问答新增或编辑
 */
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { validateContent } from '@/components/Editor'
import { getQuestionOne, addQuestion, updateQuestion, deleteQuestion } from '@/api/question'
import { debounce } from 'lodash-es'
import { useKeepAliveStore } from '@/store'
import { Confirm, Message } from '@/utils/interaction'
import { FilterButtonList } from '@/components/FilterButton/type'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsQuestionAdd>({
    id: '',
    title: '',
    content: '',
    isDraft: '0',
    classify: '',
    isSecret: '0',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    title: [{ required: true, trigger: 'change', message: '请输入标题' }],
    content: [
      { required: true, trigger: 'change', message: '请输入内容' },
      { validator: validateContent, trigger: 'change' }
    ]
  })

  // 处理内容
  const handleChangeContent = (val: string) => {
    if (val.length < 15) formRef.value?.validateField('content')
  }

  // 获取问答详情
  const _getOne = async (id: string) => {
    const res = await getQuestionOne({ id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.content = data.content
      form.isDraft = data.isDraft
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks
      if (data.classify.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }
  onMounted(() => {
    form.id = <string | undefined>route.params.id
    if (form.id) _getOne(form.id)
  })

  // 新增
  const _add = debounce(async (params: ParamsQuestionAdd) => {
    const res = await addQuestion(params)
    handleFinish(res)
  })

  // 编辑
  const _update = debounce(async (params: ParamsQuestionAdd) => {
    const res = await updateQuestion(params)
    handleFinish(res)
  })

  // 删除
  const _delete = debounce(async (id) => {
    const res = await deleteQuestion(id)
    handleFinish(res)
  })

  const keepAliveStore = useKeepAliveStore()
  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      keepAliveStore.refreshKeepAlive('Question,QuestionMe,QuestionMeDraft')
      Message({
        message: res.message,
        type: 'success'
      })
      let name = 'QuestionMe'
      if (form.isDraft === '1') name = 'QuestionMeDraft'
      router.replace({
        name,
        params: { _refreshOne: '1' }
      })
    } else {
      Message({
        message: res.message,
        type: 'error'
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
            if (form.id) {
              _update(form)
            } else {
              _add(form)
            }
          }
        })
        return
      case 'draft':
        if (!formRef.value) return
        formRef.value.validate((valid) => {
          if (valid) {
            form.isDraft = '1'
            if (form.id) {
              _update(form)
            } else {
              _add(form)
            }
          }
        })
        return
      case 'delete':
        Confirm('确定删除吗？').then(() => {
          if (form.id) {
            _delete(form.id)
          } else {
            router.back()
          }
        })
        return
    }
  }

  return {
    formRef,
    form,
    rules,
    handleChangeContent,
    changeBtn
  }
}

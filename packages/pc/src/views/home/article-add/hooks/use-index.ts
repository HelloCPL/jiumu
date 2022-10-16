/**
 * @describe: 文章新增处理逻辑
 * @author: cpl
 * @create: 2022-10-15 19:31:42
 */

import { FilterButtonList } from '@/components/FilterButton/type'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateContent } from '@/components/Editor/index'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { addArticle } from '@/api/article'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const id = ref<string | undefined>()
  id.value = <string | undefined>route.params.id

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsArticleAdd>({
    title: '',
    content: '',
    contentType: '402',
    type: '',
    isDraft: '0',
    coverImg: '',
    attactment: '',
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
    ],
    type: [{ required: true, trigger: 'change', message: '请选择类型' }]
  })

  // 处理内容
  const handleChangeContent = (val: string) => {
    if (val.length < 15) formRef.value?.validateField('content')
  }

  // 处理封面图
  const coverImgList = ref<DataBaseFile[]>([])
  const handleChangeCoverImg = (files: DataBaseFile[]) => {
    coverImgList.value = coverImgList.value.concat(files)
    form.coverImg = coverImgList.value.map((item) => item.id).join(',')
  }

  // 处理附件
  const attactmentList = ref<DataBaseFile[]>([])
  const handleChangeAttachment = (files: DataBaseFile[]) => {
    attactmentList.value = attactmentList.value.concat(files)
    form.attactment = attactmentList.value.map((item) => item.id).join(',')
  }

  const _add = debounce(async (params: ParamsArticleAdd) => {
    const res = await addArticle(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      let name = 'ArticleMe'
      if (params.isDraft === '1') name = 'ArticleMeDraft'
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
  })

  // 点击下方按钮
  const changeBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'save':
        if (!formRef.value) return
        formRef.value.validate((valid) => {
          if (valid) {
            form.isDraft = '0'
            if (id.value) {
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
            if (id.value) {
            } else {
              _add(form)
            }
          }
        })
        return
      case 'delete':
        if (id.value) {
        } else {
          Confirm('确定取消吗？').then(() => {
            router.back()
          })
        }
        return
    }
  }

  return {
    id,
    formRef,
    form,
    rules,
    handleChangeContent,
    coverImgList,
    handleChangeCoverImg,
    attactmentList,
    handleChangeAttachment,
    changeBtn
  }
}

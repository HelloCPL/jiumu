/**
 * @describe: 文章新增处理逻辑
 * @author: cpl
 * @create: 2022-10-15 19:31:42
 */

import { FilterButtonList } from '@/components/FilterButton/type'
import { FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateContent } from '@/components/Editor/index'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { addArticle, deleteArticle, getArticleOne, updateArticle } from '@/api/article'
import { useKeepAliveStore } from '@/store'
import { getDataDiff } from '@jiumu/utils'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsArticleAdd>({
    id: '',
    title: '',
    content: '',
    contentType: '402',
    type: '',
    isDraft: '0',
    coverImg: '',
    attachment: '',
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
    if (val.length < 15) formRef.value?.validateField('content').catch(() => {})
  }

  // 处理封面图
  const coverImgList = ref<DataBaseFile[]>([])
  const handleChangeCoverImg = (files: DataBaseFile[]) => {
    if (files?.length) coverImgList.value = [files[0]]
    else coverImgList.value = []
    form.coverImg = coverImgList.value.map((item) => item.id).join(',')
    handleSaveCoverImg()
  }
  const handleDeleteCoverImg = () => {
    form.coverImg = coverImgList.value.map((item) => item.id).join(',')
    handleSaveCoverImg()
  }
  const handleSaveCoverImg = async () => {
    if (form.id) {
      const params = {
        id: form.id,
        coverImg: form.coverImg
      }
      const res = await updateArticle(params)
      if (res.code === 200) {
        Message({
          message: '封面图保存成功',
          type: 'success'
        })
      }
    }
  }

  // 处理附件
  const attachmentList = ref<DataBaseFile[]>([])
  const handleChangeAttachment = (files: DataBaseFile[]) => {
    attachmentList.value = getDataDiff(attachmentList.value, files)
    form.attachment = attachmentList.value.map((item) => item.id).join(',')
    handleSaveAttachmentList()
  }
  const handleDeleteAttachment = () => {
    form.attachment = attachmentList.value.map((item) => item.id).join(',')
    handleSaveAttachmentList()
  }
  const handleSaveAttachmentList = async () => {
    if (form.id) {
      const params = {
        id: form.id,
        attachment: form.attachment
      }
      const res = await updateArticle(params)
      if (res.code === 200) {
        Message({
          message: '附件保存成功',
          type: 'success'
        })
      }
    }
  }

  // 获取文章详情
  const _getOne = async (id: string) => {
    const res = await getArticleOne({ id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.content = data.content
      form.contentType = data.contentType
      form.type = data.type
      form.isDraft = data.isDraft
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks
      if (data.coverImg) {
        form.coverImg = data.coverImg.id
        coverImgList.value = [data.coverImg]
      }
      if (data.attachment?.length) {
        form.attachment = data.attachment.map((item) => item.id).join(',')
        attachmentList.value = data.attachment
      }
      if (data.classify?.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }
  onMounted(() => {
    form.id = <string | undefined>route.params.id
    if (form.id) _getOne(form.id)
  })

  // 新增
  const _add = debounce(async (params: ParamsArticleAdd) => {
    const res = await addArticle(params)
    handleFinish(res)
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsArticleAdd) => {
    const res = await updateArticle(params)
    handleFinish(res)
  }, 300)

  // 删除
  const _delete = debounce(async (id) => {
    const res = await deleteArticle(id)
    handleFinish(res)
  }, 300)

  const keepAliveStore = useKeepAliveStore()
  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      keepAliveStore.refreshKeepAlive('Article,ArticleMe,ArticleMeDraft')
      Message({
        message: res.message,
        type: 'success'
      })
      let name = 'ArticleMe'
      if (form.isDraft === '1') name = 'ArticleMeDraft'
      router.replace({
        name,
        params: { _refreshOne: '1' }
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
        break
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
        break
      case 'delete':
        Confirm(`确定${item.name}吗？`).then(() => {
          if (form.id) {
            _delete(form.id)
          } else {
            router.back()
          }
        })
        break
    }
  }

  // 仅保存文本
  const handleSaveContent = debounce(async () => {
    if (!form.id) {
      Message('请保存为草稿或发布后才能保存文本')
      return
    } else {
      const params = {
        id: form.id,
        content: form.content,
        contentType: form.contentType
      }
      const res = await updateArticle(params)
      if (res.code === 200) {
        Message({
          message: '文本保存成功',
          type: 'success'
        })
      }
    }
  }, 300)

  return {
    formRef,
    form,
    rules,
    handleChangeContent,
    coverImgList,
    handleChangeCoverImg,
    handleDeleteCoverImg,
    attachmentList,
    handleChangeAttachment,
    handleDeleteAttachment,
    changeBtn,
    handleSaveContent
  }
}

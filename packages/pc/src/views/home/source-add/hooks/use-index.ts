/**
 * @description 资源新增或编辑页面逻辑处理
 * @author cpl
 * @create 2023-02-23 14:46:22
 */

import { addSource, deleteSource, getSourceOne, updateSource } from '@/api/source'
import { FilterButtonList } from '@/components/FilterButton/type'
import { useKeepAliveStore } from '@/store'
import { Confirm, Message } from '@/utils/interaction'
import { getDataDiff } from '@jiumu/utils'
import { FormInstance, FormRules } from 'element-plus'
import { debounce } from 'lodash-es'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const btnList = ref<FilterButtonList[]>([
    { name: '发布', key: 'save', type: 'primary' },
    { name: '取消', key: 'delete' }
  ])

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsSourceAdd>({
    id: '',
    title: '',
    attachment: '',
    type: '701',
    classify: '',
    isSecret: '0',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    title: [{ required: true, trigger: 'change', message: '请输入标题' }],
    attachment: [{ required: true, trigger: 'change', message: '请上传资源' }]
  })

  // 处理附件
  // 内部文件
  const attachmentList1 = ref<Array<DataBaseFile>>([])
  // 外部文件/图片链接来源
  const attachmentList2 = ref<Array<DataSourceLink>>([])
  // 外部网站链接来源
  const attachmentList3 = ref<Array<DataSourceLink>>([])

  const handleChangeType = () => {
    if (form.type === '701') {
      resetAttachment(attachmentList1.value)
    } else if (form.type === '702') {
      resetAttachment(attachmentList2.value)
    } else if (form.type === '703') {
      resetAttachment(attachmentList3.value)
    }
  }
  const resetAttachment = (data: Array<DataBaseFile | DataSourceLink>) => {
    form.attachment = data
      .filter((item) => item.id)
      .map((item) => item.id)
      .join(',')
    formRef.value?.validateField('attachment').catch(() => {})
  }
  const handleChangeAttachment1 = (files: Array<DataBaseFile>) => {
    attachmentList1.value = getDataDiff(attachmentList1.value, files)
    resetAttachment(attachmentList1.value)
  }
  const handleChangeAttachment2 = (files: Array<DataSourceLink>) => {
    attachmentList2.value = files
    resetAttachment(attachmentList2.value)
  }
  const handleChangeAttachment3 = (files: Array<DataSourceLink>) => {
    attachmentList3.value = files
    resetAttachment(attachmentList3.value)
  }

  // 获取文章详情
  const _getOne = async (id: string) => {
    const res = await getSourceOne({ id })
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.type = data.type
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks
      if (data.attachment?.length) {
        form.attachment = data.attachment.map((item) => item.id).join(',')
        if (form.type === '701') attachmentList1.value = <DataBaseFile[]>data.attachment
        else if (form.type === '702') attachmentList2.value = <DataSourceLink[]>data.attachment
        else if (form.type === '703') attachmentList3.value = <DataSourceLink[]>data.attachment
      }
      if (data.classify?.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }
  onMounted(() => {
    form.id = <string | undefined>route.params.id
    if (form.id) {
      btnList.value = [
        { name: '保存', key: 'save', type: 'primary' },
        { name: '删除', key: 'delete' }
      ]
      _getOne(form.id)
    }
  })

  // 新增
  const _add = debounce(async (params: ParamsSourceAdd) => {
    const res = await addSource(params)
    handleFinish(res)
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsSourceAdd) => {
    const res = await updateSource(params)
    handleFinish(res)
  }, 300)

  // 删除
  const _delete = debounce(async (id) => {
    const res = await deleteSource(id)
    handleFinish(res)
  }, 300)

  const keepAliveStore = useKeepAliveStore()
  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      keepAliveStore.refreshKeepAlive('Source,SourceMe')
      Message({
        message: res.message,
        type: 'success'
      })
      router.replace({
        name: 'SourceMe',
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

  return {
    btnList,
    formRef,
    form,
    rules,
    attachmentList1,
    attachmentList2,
    attachmentList3,
    handleChangeType,
    resetAttachment,
    handleChangeAttachment1,
    handleChangeAttachment2,
    handleChangeAttachment3,
    changeBtn
  }
}

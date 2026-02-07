/**
 * 连载新增或编辑逻辑处理
 */
import { FormInstance, FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { getNovelOne, addNovel, updateNovel, deleteNovel } from '@/api/novel'
import { debounce } from 'lodash-es'
import { useKeepAliveStore } from '@/store'
import { Message, Confirm } from '@/utils/interaction'
import { FilterButtonList } from '@/components/FilterButton/type'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  // 表单
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsNovelAdd>({
    id: '',
    name: '',
    introduce: '',
    author: '',
    isDraft: '0',
    classify: '',
    type: '',
    isSecret: '0',
    sort: 1,
    remarks: ''
  })

  const validLength = (maxLength: number) => {
    return (rule: any, value: string, callback: any) => {
      if (value.length > maxLength) {
        callback(new Error(`长度不能超过${maxLength}个字符`))
      } else {
        callback()
      }
    }
  }
  const rules = reactive<FormRules>({
    name: [
      { required: true, trigger: 'change', message: '请输入名称' },
      { validator: validLength(64), trigger: 'change', message: '名称长度不能超过64个字符' }
    ],
    introduce: [
      { required: true, trigger: 'change', message: '请输入简介' },
      { validator: validLength(255), trigger: 'change', message: '简介长度不能超过255个字符' }
    ],
    author: [{ required: true, trigger: 'change', message: '请输入作者名称' }]
  })

  // 获取连载详情
  const _getOne = async (id: string) => {
    form.id = id
    const res = await getNovelOne({ id })
    if (res.code === 200) {
      const data = res.data
      form.name = data.name
      form.introduce = data.introduce
      form.author = data.author
      form.type = data.type
      form.isDraft = data.isDraft
      form.isSecret = data.isSecret
      form.sort = data.sort
      form.remarks = data.remarks
      if (data.classify?.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }
  onMounted(() => {
    if (route.query?.id) {
      _getOne(route.query?.id as string)
    }
  })

  // 新增
  const _add = debounce(async (params: ParamsNovelAdd) => {
    const res = await addNovel(params)
    handleFinish(res)
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsNovelAdd) => {
    const res = await updateNovel(params)
    handleFinish(res)
  }, 300)

  // 删除
  const _delete = debounce(async (id) => {
    const res = await deleteNovel(id)
    handleFinish(res)
  }, 300)

  const keepAliveStore = useKeepAliveStore()
  // 处理回调
  const handleFinish = (res: DataOptions<null | string>) => {
    if (res.code === 200) {
      // 更新指定页面
      keepAliveStore.refreshKeepAlive('Novel,NovelMe,NovelMeDraft')
      Message({
        message: res.message,
        type: 'success'
      })
      let name = 'NovelMe'
      if (form.isDraft === '1') name = 'NovelMeDraft'
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
          }
        })
        break
      case 'cancel':
        Confirm(`确定${item.name}吗？`).then(() => {
          router.back()
        })
        break
    }
  }

  return {
    formRef,
    form,
    rules,
    changeBtn
  }
}

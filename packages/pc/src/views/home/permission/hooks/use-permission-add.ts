/**
 * @author chen
 * @description 权限新增或编辑处理方法
 * @update 2022-07-25 16:54:50
 */

import { addPermission, getPermissionOne, updatePermission } from '@/api/permission'
import { Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { debounce } from 'lodash-es'
import { PermissionAddEmits } from '../components/type'

export const usePermissionAdd = (props: any, emit: PermissionAddEmits) => {
  const title = ref<string>('权限新增')

  const formRef = ref<FormInstance>()
  const form = reactive<ParamsPermissionAdd>({
    code: '',
    label: '',
    href: '',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    code: [{ required: true, trigger: 'change', message: '请输入code' }],
    label: [{ required: true, trigger: 'change', message: '请输入描述' }]
  })

  // 获取权限
  const _getOne = async (id: string) => {
    const res = await getPermissionOne(id, true)
    if (res.code === 200) {
      form.code = res.data.code
      form.label = res.data.label
      form.href = res.data.href
      form.sort = res.data.sort
      form.remarks = res.data.remarks
    }
  }

  // 添加权限
  const _add = debounce(async (params: ParamsPermissionAdd) => {
    const res = await addPermission(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'add')
    }
  }, 300)

  // 修改权限
  const _update = debounce(async (params: ParamsPermissionAdd) => {
    const res = await updatePermission(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'update')
    }
  }, 300)

  const confirm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
      if (valid) {
        const params: ParamsPermissionAdd = {
          code: form.code,
          label: form.label,
          href: form.href,
          sort: form.sort,
          remarks: form.remarks
        }
        if (props.id) {
          params.id = props.id
          _update(params)
        } else {
          _add(params)
        }
      }
    })
  }

  if (props.id) {
    title.value = '权限编辑'
    _getOne(props.id)
  }

  return {
    title,
    formRef,
    form,
    rules,
    confirm
  }
}

/**
 * 权限输入智能提示
 */
export const usePermissionTip = (form: ParamsPermissionAdd) => {
  const words: ObjectAny = {
    pc: 'pc管理端',
    mobile: '移动端',
    web: 'web端',
    user: '用户',
    role: '角色',
    tag: '标签',
    menu: '菜单',
    permission: '权限',
    view: '查看',
    get: '获取',
    base: '某个',
    one: '某个',
    bycode: '某个',
    list: '列表',
    byparent: '所有',
    byparentcode: '所有',
    add: '新增',
    update: '修改',
    delete: '删除',
    self: '我的',
    public: '公开',
    all: '所有',
    draft: '草稿箱',
    custom: '自定义',
    top: '置顶',
    export: '导出',
    import: '导入',
    info: '详情',
    relevant: '关联',
    btn: '按钮',
    page: '页面',
    child: '子级',
    me: '我的',
    link: '链接',
    detail: '详情',
    code: '密码'
  }

  const list = ['list:self']

  const modules = {
    article: '文章',
    source: '资源',
    question: '问答',
    novel: '连载',
    chapter: '章节',
    note: '笔记',
    classify: '自定义标签',
    collection: '收藏',
    cipher: '口令',
    'classify-me': '我的自定义标签'
  }

  const init = () => {
    Object.entries(modules).forEach((item) => {
      list.push(`${item[0]}:public`)
      list.push(`${item[0]}:all`)
      list.push(`${item[0]}:me`)
      words[item[0]] = item[1]
    })
  }
  init()

  // 交换指定位置
  const interchange = (str: string) => {
    const _do = (index: number) => {
      const value = list[index].split(':').reverse().join(':')
      str = str.replace(list[index], value)
    }
    list.forEach((value, i) => {
      if (str.includes(value)) {
        _do(i)
      }
    })
    return str
  }

  const translate = (keys: string) => {
    const arr = keys.split(':')
    let str: string = ''
    arr.forEach((key) => {
      if (words[key]) str += words[key]
      else str += key
    })
    return str
  }

  const handleLabel = () => {
    if (form.code.includes(':')) {
      const code = form.code
      const label = translate(interchange(code))
      if (code.endsWith(':btn')) {
        form.label = `[${label}]`
      } else if (code.endsWith(':page')) {
        form.label = label
      } else {
        // 默认 API
        form.label = `(${label})`
      }
    }
  }

  const handleRemarks = () => {
    if (form.code.includes(':')) {
      form.remarks = translate(interchange(form.code)) + '权限'
    }
  }

  const handleHref = () => {
    if (form.code.includes(':') && !form.href) {
      const code = form.code
      const flag1 = code.includes(':btn')
      const flag2 = code.includes(':page')
      if (flag1 || flag2) {
        form.href = '#'
      } else {
        const href = code.replace(/:/g, '/')
        form.href = href.startsWith('/') ? href : '/' + href
      }
    }
  }

  const handleBlurCode = () => {
    if (!form.label) {
      handleLabel()
    }
    if (!form.remarks) {
      handleRemarks()
    }
    handleHref()
  }
  const handleKeyupCode = (e) => {
    if (e.keyCode === 13) {
      handleLabel()
      handleRemarks()
      handleHref()
    }
  }

  return {
    handleBlurCode,
    handleKeyupCode
  }
}

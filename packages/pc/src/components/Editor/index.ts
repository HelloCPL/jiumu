// form表单校验content值
export const validateContent = (rule: any, value: any, cb: any) => {
  if (value === '<p><br></p>') {
    cb('请输入内容')
  } else cb()
}

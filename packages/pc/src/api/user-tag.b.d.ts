/**
 * @author chen
 * @description 用户-特殊标签关联相关接口类型
 * @update 2022-07-27 18:18:59
 */

// 用户-特殊标签关联新增参数
interface ParamsUserTagAdd {
  tagCode: string
  userId: string
}

// 获取指定用户关联的所有特殊标签参数
interface ParamsTagByUserId extends ParamsPage {
  userId: string
}

// 获取指定特殊标签关联的所有用户
interface ParamsUserByTagCode extends ParamsPage {
  tagCode: string
  simple?: '1' | '0'
}
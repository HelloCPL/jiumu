/**
 * @author chen
 * @description 问答、资源文件、小说、博客文章 评论 置顶或取消置顶操作相关接口类型
 * @update 2022-07-04 01:07:21
 */

// 获取所有文章列表接口类型
interface ParamsTop {
  id: string
  type: '502' | '503' | '504' | '505'
}
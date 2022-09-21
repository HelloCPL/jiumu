/*
 * wangEditor 自定义上传
 */
import { uploadFile } from '@/api/file'

type InsertFnType = (url: string, alt: string, href?: string | null) => void
type InsertFnVideoType = (url: string, poster?: string) => void

export const editorWangCustom = () => {
  // 原始图片数据
  const originFiles: DataBaseFile[] = []

  // 自定义上传图片
  const customUploadImage = async (file: File, insertFn: InsertFnType) => {
    const params: FormData = new FormData()
    params.append('file', file)
    const res = await uploadFile(params, {
      staticPlace: 'editors'
    })
    if (res.code === 200) {
      res.data.forEach((item) => {
        insertFn(item.filePath, item.fileName, null)
        originFiles.push(item)
      })
    }
  }

  // 自定义上传视频
  const customUploadVideo = async (file: File, insertFn: InsertFnVideoType) => {
    const params: FormData = new FormData()
    params.append('file', file)
    const res = await uploadFile(params, {
      staticPlace: 'editors'
    })
    if (res.code === 200) {
      res.data.forEach((item) => {
        insertFn(item.filePath)
        originFiles.push(item)
      })
    }
  }

  return {
    originFiles,
    customUploadImage,
    customUploadVideo
  }
}

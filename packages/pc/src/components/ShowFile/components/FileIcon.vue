<!--
  @describe: 根据文件名称显示对应图标
  @author cpl
  @update 2022-08-07 12:13:00
-->

<template>
  <img :src="icon" alt="" class="w-5 h-5 object-cover" v-if="icon" />
</template>

<script lang="ts" setup>
import { getSuffix } from '@jiumu/utils'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { getFileType } from '../hooks/use-index'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
const { $STATIC_URL } = getCurrentInstance()?.appContext?.config?.globalProperties as any
const icon = ref<any>()
const getIcon = () => {
  const suffix = getFileType(getSuffix(props.value))
  switch (suffix) {
    case 'pdf':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_pdf.png`
      break
    case 'word':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_word.png`
      break
    case 'image':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_img.png`
      break
    case 'ppt':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_p.png`
      break
    case 'rar':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_rar.png`
      break
    case 'txt':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_txt.png`
      break
    case 'excel':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_xls.png`
      break
    case 'zip':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_zip.png`
      break
    case 'video':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_video.png`
    case 'md':
      icon.value = `${$STATIC_URL}pc/icons/icon_file_md.png`
      break
    default:
      icon.value = `${$STATIC_URL}pc/icons/icon_file_why.png`
  }
}
onMounted(getIcon)
</script>

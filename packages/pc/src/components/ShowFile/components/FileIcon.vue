<!--
  @describe: 根据文件名称显示对应图标
  @author cpl
  @update 2022-08-07 12:13:00
-->

<template>
  <img :src="icon" alt="" class="w-8 h-8 object-cover" v-if="icon" />
</template>

<script lang="ts" setup>
import { getSuffix } from '@jiumu/utils'
import { ref, onMounted } from 'vue'
import { getIconType } from '../hooks/utils'
import pdfIcon from '@/assets/icons/icon_file_pdf.png'
import wordIcon from '@/assets/icons/icon_file_word.png'
import imgIcon from '@/assets/icons/icon_file_img.png'
import pptIcon from '@/assets/icons/icon_file_p.png'
import rarIcon from '@/assets/icons/icon_file_rar.png'
import txtIcon from '@/assets/icons/icon_file_txt.png'
import excelIcon from '@/assets/icons/icon_file_xls.png'
import zipIcon from '@/assets/icons/icon_file_zip.png'
import videoIcon from '@/assets/icons/icon_file_video.png'
import mdIcon from '@/assets/icons/icon_file_md.png'
import fileIcon from '@/assets/icons/icon_file.png'

const icons: any = {
  image: imgIcon,
  pdf: pdfIcon,
  word: wordIcon,
  excel: excelIcon,
  ppt: pptIcon,
  markdown: mdIcon,
  text: txtIcon,
  rar: rarIcon,
  zip: zipIcon,
  video: videoIcon
}

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
const icon = ref<any>()
const getIcon = () => {
  const suffix = getIconType(getSuffix(props.value))
  icon.value = icons[suffix] || fileIcon
}
onMounted(getIcon)
</script>

<!--
  @describe: markdown 预览
  @author: cpl
  @create: 2022-10-07 19:49:51
-->

<template>
  <v-md-preview :text="text" class="bg-white"></v-md-preview>
</template>

<script lang="ts" setup>
import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import { xss } from '@jiumu/utils'

useMarkdownInit()

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const handleShowTitle = (text: string) => {
  // console.log(11, text);

  const arr = text
    .split('\n')
    .filter((value) => value.search(/#{1,5}\s+/gi) !== -1)
    .map((value) => {
      let _value = value
      if (value.search(/#{5}\s+/gi) !== -1) {
        _value = '<h5>' + value.replace(/#{5}\s+/gi, '') + '</h5>'
      } else if (value.search(/#{4}\s+/gi) !== -1) {
        console.log('h4', value)
        _value = '<h4>' + value.replace(/#{4}\s+/gi, '') + '</h4>'
      } else if (value.search(/#{3}\s+/gi) !== -1) {
        console.log('h3', value)
        _value = '<h3>' + value.replace(/#{3}\s+/gi, '') + '</h3>'
      } else if (value.search(/#{2}\s+/gi) !== -1) {
        console.log('h2', value)
        _value = '<h2>' + value.replace(/#{2}\s+/gi, '') + '</h2>'
      } else if (value.search(/#{1}\s+/gi) !== -1) {
        console.log('h1', value)
        _value = '<h1>' + value.replace(/#{1}\s+/gi, '') + '</h1>'
      }
      return {
        value,
        _value: xss.process(_value)
      }
    })

  console.log(22, arr)
}

handleShowTitle(props.text)
</script>

<style lang="scss">
@import '@/components/Editor/components/EditorMd/index.scss';
</style>

/*
 * aomao 编辑器配置
 */
import { CardEntry, EngineInterface, PluginEntry, PluginOptions, RangeInterface } from '@aomao/engine'
import { GroupItemProps, fontFamilyDefaultData } from '@aomao/toolbar-vue'
// 引入插件
import Redo from '@aomao/plugin-redo'
import Undo from '@aomao/plugin-undo'
import Hr, { HrComponent } from '@aomao/plugin-hr'
import Tasklist, { CheckboxComponent } from '@aomao/plugin-tasklist'
import Codeblock, { CodeBlockComponent } from '@aomao/plugin-codeblock-vue'
import Image, { ImageComponent, ImageUploader } from '@aomao/plugin-image'
import Table, { TableComponent } from '@aomao/plugin-table'
import File, { FileComponent, FileUploader } from '@aomao/plugin-file'
import Video, { VideoComponent, VideoUploader } from '@aomao/plugin-video'
import Math, { MathComponent } from '@aomao/plugin-math'
import { ToolbarPlugin, ToolbarComponent, fontFamilyDefaultData } from '@aomao/toolbar-vue'
import Status, { StatusComponent } from '@aomao/plugin-status'
import { Ref } from 'vue'
import MarkRange from '@aomao/plugin-mark-range'
import Italic from '@aomao/plugin-italic'
import Fontsize from '@aomao/plugin-fontsize'
import Fontfamily from '@aomao/plugin-fontfamily'
import LineHeight from '@aomao/plugin-line-height'

type ToolbarAoMaoConfig = {
  items: GroupItemProps[]
}
export const handleToolbarConfig = (): ToolbarAoMaoConfig => {
  return {
    items: [['undo', 'redo']]
  }
}

type EditorAoMaoConfig = {
  plugins: PluginEntry[]
  cards: CardEntry[]
  config: { [key: string]: PluginOptions }
}
type StringParams = {
  [key: string]: string[]
}
export const handleEditorAoMapConfig = (engine: Ref<EngineInterface | null>): EditorAoMaoConfig => {
  return {
    plugins: [Redo, Undo, MarkRange, Italic, Fontsize, Fontfamily, LineHeight], // 引入的插件
    // 引入的card组件
    cards: [
      HrComponent,
      CheckboxComponent,
      CodeBlockComponent,
      ImageComponent,
      TableComponent,
      FileComponent,
      VideoComponent,
      MathComponent,
      ToolbarComponent,
      StatusComponent
    ],
    // 编辑器配置
    config: {
      // 光标区域
      [MarkRange.pluginName]: {
        keys: ['mark'],
        onChange(addIds: StringParams, removeIds: StringParams) {
          // 新增的标记
          const commentAddIds = addIds['comment'] || []
          // 删除的标记
          const commentRemoveIds = removeIds['comment'] || []
          console.log('commentAddIds', commentAddIds)
          console.log('commentRemoveIds', commentRemoveIds)
        },
        onSelect(rang: RangeInterface, selectInfo?: KeyId) {
          const { key, id } = selectInfo || {}
          // 移除预览标记
          engine.value?.command.executeMethod('mark-range', 'action', 'comment', 'revoke')
          if (key === 'mark' && id) {
            engine.value?.command.executeMethod('mark-range', 'action', key, 'preview', id)
          }
        }
      },
      // 斜体
      [Italic.pluginName]: {
        // 默认为 _ 下划线，这里修改为单个 * 号
        markdown: '*'
      },
      //配置粘贴后需要过滤的字体大小
      [Fontsize.pluginName]: {
        filter: (fontSize: string) => {
          return (
            ['12px', '14px', '16px', '18px', '21px', '24px', '29px', '32px', '34px'].indexOf(fontSize) > -1
          )
        }
      },
      [Fontfamily.pluginName]: {
        //配置粘贴后需要过滤的字体
        filter: (fontfamily: string) => {
          const item = fontFamilyDefaultData.find((item) =>
            fontfamily
              .split(',')
              .some((name) => item.value.toLowerCase().indexOf(name.replace(/"/, '').toLowerCase()) > -1)
          )
          return item ? item.value : false
        }
      },
      //配置粘贴后需要过滤的行高
      [LineHeight.pluginName]: {
        filter: (lineHeight: string) => {
          switch (lineHeight) {
            case '12px':
            case '14px':
              return '1'
            case '16px':
            case '18px':
              return '1.2'
            case '21px':
            case '24px':
              return '1.5'
            case '29px':
            case '32px':
            case '34px':
              return '2'
            default:
              return ['1', '1.2', '1.5', '2'].indexOf(lineHeight) > -1
          }
        }
      }
    }
  }
}

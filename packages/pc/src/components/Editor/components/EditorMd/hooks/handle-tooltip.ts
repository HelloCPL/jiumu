/**
 * markdown 编辑器自定义提示
 */

export function handleTooltip() {
  return {
    customTip: {
      title: '插入提示',
      icon: 'v-md-icon-tip',
      menus: [
        {
          text: '提示',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: tip\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '注意',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: warning\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '警告',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: danger\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '详细信息',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: details\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '左对齐',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: align-left\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '居中对齐',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: align-center\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '右对齐',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `::: align-right\n  ${content}\n:::\n`,
                selected: content
              }
            })
          }
        },
        {
          text: '任务列表',
          action(editor: any) {
            editor.insert(function (selected: string) {
              const content = selected || '在此输入内容'
              return {
                text: `- [x] ${content}\n`,
                selected: content
              }
            })
          }
        }
        // {
        //   text: '流程图',
        //   action(editor: any) {
        //     editor.insert(function () {
        //       return {
        //         text: '```mermaid\n graph LR\nA --- B\nB -->C[提示]\nB -->D(内容)\n```\n'
        //       }
        //     })
        //   }
        // }
      ]
    }
  }
}

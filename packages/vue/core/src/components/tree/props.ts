import type { TreeViewRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts } from '@rark-ui/vue/providers'
import type { HTMLAttributes } from 'vue'

/** 将 TreeNode 默认字段映射到节点数据中的实际字段名，用于自定义数据结构 */
export interface TreeKeyMap {
  id?: string
  name?: string
  children?: string
  icon?: string
}

/** 树节点数据，支持任意结构的对象（配合 keyMap 使用） */
export type TreeNodeData = Record<string, unknown>

export interface TreeProps<T> extends TreeViewRootBaseProps<T>, ThemeCrafts<'tvTree'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    tree?: HTMLAttributes['class']
  }
}

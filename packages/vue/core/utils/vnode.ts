import type { VNode, VNodeChild } from 'vue'
import { camelCase } from 'lodash-es'

export function someVNode(
  children: VNodeChild | VNodeChild[] | undefined,
  pred: (v: VNode) => boolean,
): boolean {
  const arr = Array.isArray(children)
    ? children
    : children != null
      ? [children]
      : []
  for (const n of arr) {
    if (n && typeof n === 'object') {
      const v = n as VNode
      if (pred(v))
        return true
      // 只递归“数组 children”（最常见：Fragment 的 children）
      if (Array.isArray(v.children) && someVNode(v.children, pred))
        return true
    }
  }
  return false
}

export function findVNodeByName(
  nodes: VNode[] | undefined,
  name: string,
): VNode | undefined {
  if (!nodes)
    return undefined
  return nodes.find((n) => {
    const _type = n.type as any
    if (!_type)
      return false
    const _tName = _type.name || _type.__name
    if (!_tName)
      return false
    return camelCase(_tName) === camelCase(name)
  })
}

export function contextVNodeWarning(
  nodes: VNode[] | undefined,
  contextName: string,
  componentName?: string,
) {
  if (!nodes)
    return
  if (nodes.length === 1) {
    const _targetName = camelCase(contextName)
    const _srcName = camelCase(
      (nodes[0].type as any).name || (nodes[0].type as any).__name,
    )
    _srcName === _targetName
    && console.warn(
      `\<${contextName}\> can not be a direct child of \<${componentName}\>, it may cause unexpected style behavior, consider lift it up or use it closer to where you want to use it `,
    )
  }
}

import type { VNode, VNodeChild } from 'vue'

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
  return nodes.find(n => (n.type as any).__name === name)
}

import type { UseToastContext } from '@ark-ui/vue/toast'
import type { MessageVariants } from '@rui-ark/themes/crafts/message'
import type * as toast from '@zag-js/toast'
import type { UnwrapRef, VNode, VNodeChild } from 'vue'

export { default as Message } from './Message.vue'
export { default as Messager } from './Messager.vue'
export { ToastDescription as MessageDescription } from '@ark-ui/vue/toast'

export interface MessageOptions<T = any>
  extends Omit<toast.Options<T>, 'title' | 'description'> {
  size?: MessageVariants['size']
  unstyled?: boolean
  description?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  render?: (context: UnwrapRef<UseToastContext>) => any
}

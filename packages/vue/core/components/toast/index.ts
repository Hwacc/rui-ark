import type { CreateToasterReturn, UseToastContext } from '@ark-ui/vue'
import type { ToastVariants } from '@rui-ark/themes/crafts/toast'

export { default as Toast } from './Toast.vue'
export { default as Toaster } from './Toaster.vue'
export { default as ToasterManager } from './ToasterManager.vue'
export { useToast } from './use-toast'
export { ToastActionTrigger, ToastCloseTrigger, ToastDescription, ToastTitle } from '@ark-ui/vue/toast'
export interface ToasterWrap {
  uniqueId?: string
  toaster: CreateToasterReturn
}

import type * as toast from '@zag-js/toast'
import type { UnwrapRef, VNode, VNodeChild } from 'vue'

export interface ToastOptions<T = any>
  extends Omit<toast.Options<T>, 'title' | 'description'> {
  placement?: toast.Placement
  size?: ToastVariants['size']
  unstyled?: boolean
  title?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  description?: VNodeChild | ((context: UnwrapRef<UseToastContext>) => VNode)
  render?: (context: UnwrapRef<UseToastContext>) => any
}

export const DEFAULT_TOASTER_UNIQUE = 'default-toaster'

<script lang="ts">
/**
 * deal with ts-2742
 */
import type * as toast from '@zag-js/toast'
import type {
  ComputedRef,
  CSSProperties,
  HTMLAttributes,
  NativeElements,
  ReservedProps,
  UnwrapRef,
} from 'vue'
import { tvMessage } from '@rui-ark/themes/crafts/message'

type Attrs<T> = T & ReservedProps
type PropTypes = NativeElements & {
  element: Attrs<HTMLAttributes>
  style: CSSProperties
}
interface UseToastContext extends ComputedRef<toast.Api<PropTypes>> {}

export interface MessageProps extends ToastRootBaseProps, Theme {
  options: MessageOptions
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    description?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ToastRootBaseProps } from '@ark-ui/vue/toast'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { MessageOptions } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Toast, useToastContext } from '@ark-ui/vue/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle, X } from 'lucide-vue-next'
import { computed, h } from 'vue'

const { class: propsClass, theme: propsTheme, options, ui, ...props } = defineProps<MessageProps>()
defineSlots<{
  default: (props: UnwrapRef<typeof slotBindings>) => any
  icon: (props: UnwrapRef<typeof slotBindings>) => any
  inner: (props: UnwrapRef<typeof slotBindings>) => any
  close: (props: UnwrapRef<typeof slotBindings>) => any
}>()
const forwarded = useForwardProps(props)
const messageContext: UseToastContext = useToastContext()
const slotBindings = computed(() => ({
  options,
  context: messageContext.value,
}))

const theme = useTheme(() => Object.assign({}, propsTheme, options?.theme))
const { root, content, icon, close, description } = tvMessage({
  class: [ui?.root, propsClass],
  ...theme,
})
const iconVNode = computed(() => {
  const className = icon({ class: ui?.icon, ...theme.value })
  switch (messageContext.value.type) {
    case 'info':
      return h(Info, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'success':
      return h(CircleCheck, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'error':
      return h(CircleX, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'warning':
      return h(CircleAlert, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    case 'loading':
      return h(LoaderCircle, {
        'class': className,
        'data-type': messageContext.value.type,
      })
    default:
      return h(Info, {
        'class': className,
        'data-type': messageContext.value.type,
      })
  }
})
</script>

<template>
  <Toast.Root v-bind="forwarded" :class="root({ class: [ui?.root, propsClass], ...theme })">
    <ark.div
      :class="content({ class: ui?.content, ...theme })"
      data-scope="toast"
      data-part="content"
      :data-placement="messageContext.placement"
      :data-type="messageContext.type"
    >
      <component :is="options?.render(messageContext)" v-if="options?.render" />
      <slot v-else name="default" v-bind="slotBindings">
        <slot name="icon" v-bind="slotBindings">
          <component :is="iconVNode" />
        </slot>
        <slot name="inner" v-bind="slotBindings">
          <template v-if="typeof options?.description === 'function'">
            <component :is="options?.description(messageContext)" />
          </template>
          <template v-else>
            <Toast.Description :class="description({ class: ui?.description, ...theme })">
              {{ options?.description }}
            </Toast.Description>
          </template>
        </slot>
        <slot v-if="options?.showClose" name="close" v-bind="slotBindings">
          <Toast.CloseTrigger>
            <X
              v-if="messageContext.type !== 'loading'"
              :class="close({ class: ui?.close, ...theme })"
            />
            <ark.div v-else :class="close({ class: ui?.close, ...theme })" />
          </Toast.CloseTrigger>
        </slot>
      </slot>
    </ark.div>
  </Toast.Root>
</template>

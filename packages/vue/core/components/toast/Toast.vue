<script lang="ts">
export interface ToastProps extends ToastRootBaseProps {
  class?: HTMLAttributes['class']
  options?: ToastOptions
  unstyled?: boolean
  size?: ToastVariants['size']
  ui?: {
    root?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    description?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ToastRootBaseProps } from '@ark-ui/vue/toast'
import type { ToastVariants } from '@rui-ark/themes/crafts/toast'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { ToastOptions } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Toast, useToastContext } from '@ark-ui/vue/toast'
import { tvToast } from '@rui-ark/themes/crafts/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  LoaderCircle,
  X,
} from 'lucide-vue-next'
import { computed, h } from 'vue'

const {
  class: propsClass,
  options,
  ui,
  size,
  unstyled,
  ...props
} = defineProps<ToastProps>()
defineSlots<{
  default: (props: UnwrapRef<typeof slotBindings>) => any
  icon: (props: UnwrapRef<typeof slotBindings>) => any
  inner: (props: UnwrapRef<typeof slotBindings>) => any
  close: (props: UnwrapRef<typeof slotBindings>) => any
}>()
const forwarded = useForwardProps(props)
const toastContext = useToastContext()
const slotBindings = computed(() => ({
  options,
  api: toastContext.value,
}))

const theme = useTheme({
  size: size ?? options?.size,
  unstyled: unstyled ?? options?.unstyled,
})
const { root, content, inner, icon, close, title, description } = tvToast({
  class: [ui?.root, propsClass],
  ...theme,
})
const iconVNode = computed(() => {
  const className = icon({ class: ui?.icon, ...theme.value })
  switch (toastContext.value.type) {
    case 'info':
      return h(Info, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'success':
      return h(CircleCheck, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'error':
      return h(CircleX, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'warning':
      return h(CircleAlert, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    case 'loading':
      return h(LoaderCircle, {
        'class': className,
        'data-type': toastContext.value.type,
      })
    default:
      return h(Info, {
        'class': className,
        'data-type': toastContext.value.type,
      })
  }
})
</script>

<template>
  <Toast.Root
    v-bind="forwarded"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ark.div
      :class="content({ class: ui?.content, ...theme })"
      data-scope="toast"
      data-part="content"
      :data-placement="toastContext.placement"
      :data-type="toastContext.type"
    >
      <component :is="options?.render(toastContext)" v-if="options?.render" />
      <slot v-else name="default" v-bind="slotBindings">
        <slot name="icon" v-bind="slotBindings">
          <component :is="iconVNode" />
        </slot>
        <ark.div
          :class="inner({ class: ui?.inner, ...theme })"
          data-part="inner"
          data-scope="toast"
        >
          <slot name="inner" v-bind="slotBindings">
            <template v-if="typeof options?.title === 'function'">
              <component :is="options?.title(toastContext)" />
            </template>
            <template v-else>
              <Toast.Title :class="title({ class: ui?.title, ...theme })">
                {{ options?.title }}
              </Toast.Title>
            </template>
            <template v-if="typeof options?.description === 'function'">
              <component :is="options?.description(toastContext)" />
            </template>
            <template v-else>
              <Toast.Description
                :class="description({ class: ui?.description, ...theme })"
              >
                {{ options?.description }}
              </Toast.Description>
            </template>
          </slot>
        </ark.div>
        <slot name="close" v-bind="slotBindings">
          <Toast.CloseTrigger>
            <X
              v-if="toastContext.type !== 'loading'"
              :class="close({ class: ui?.close, ...theme })"
            />
            <ark.div v-else :class="close({ class: ui?.close, ...theme })" />
          </Toast.CloseTrigger>
        </slot>
      </slot>
    </ark.div>
  </Toast.Root>
</template>

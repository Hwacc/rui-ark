<script lang="ts">
export interface DialogCloseTriggerProps extends ArkDialogCloseTriggerProps {
  from?: DialogTriggerFrom
}
</script>

<script setup lang="ts">
import type { DialogCloseTriggerProps as ArkDialogCloseTriggerProps } from '@ark-ui/vue/dialog'
import type { DialogTriggerFrom } from './dialog-intercept-context'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { merge } from 'lodash-es'
import { computed } from 'vue'
import {
  injectDialogInterceptContext,
  TriggerFrom,
} from './dialog-intercept-context'

const {
  from = TriggerFrom.CLOSE_TRIGGER,
  asChild,
  ...props
} = defineProps<DialogCloseTriggerProps>()
const forwarded = useForwardProps<DialogCloseTriggerProps, any>(props)
const context = useDialogContext()
const interceptContext = injectDialogInterceptContext()
const triggerProps = computed(() => {
  const contextProps = context.value.getCloseTriggerProps()
  return merge({}, contextProps, forwarded.value, {
    onClick: (e: PointerEvent) => {
      interceptContext.value.triggerFrom.value = from
      contextProps.onClick?.(e)
    },
  })
})
useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>

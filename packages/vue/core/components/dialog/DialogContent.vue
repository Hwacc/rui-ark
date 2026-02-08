<script lang="ts">
export interface DialogContentProps extends Theme {
  class?: HTMLAttributes['class']
  ui?: {
    backdrop?: HTMLAttributes['class']
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
  showClose?: boolean
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { tvDialog } from '@rui-ark/themes/crafts/core/dialog'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { hasChildVNodeByName } from '@rui-ark/vue/utils/vnode'
import { X } from 'lucide-vue-next'
import { computed, useAttrs, useSlots, watch } from 'vue'
import { DialogCloseTrigger } from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  showClose = true,
} = defineProps<DialogContentProps>()

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
console.log('defaultSlots', defaultSlots.value)
const hasDialogHeader = computed(() => hasChildVNodeByName(defaultSlots.value, 'DialogHeader'))
watch(hasDialogHeader, (value: boolean) => {
  console.log('hasDialogHeader', value)
})

const showContentClose = computed(() => showClose && !hasDialogHeader.value)

const attrs = useAttrs()
const theme = useTheme(() => propsTheme)
const { backdrop, positioner, content, close } = tvDialog()
</script>

<template>
  <Teleport to="body">
    <Dialog.Backdrop :class="backdrop({ class: ui?.backdrop, ...theme })" />
    <Dialog.Positioner :class="positioner({ class: ui?.positioner, ...theme })">
      <Dialog.Content
        v-bind="attrs"
        :class="content({ class: [ui?.content, propsClass], ...theme })"
      >
        <slot />
        <slot name="close">
          <DialogCloseTrigger
            v-if="showContentClose"
            as-child
          >
            <ark.button
              :class="cn(['absolute', 'top-0', 'right-0'], close({ class: ui?.close, ...theme }))"
              data-variant="content-close"
            >
              <X :style="{ width: '1lh', height: '1lh' }" />
              <span class="sr-only">Close</span>
            </ark.button>
          </DialogCloseTrigger>
        </slot>
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>

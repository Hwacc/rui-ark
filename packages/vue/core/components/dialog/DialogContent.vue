<script lang="ts">
export interface DialogContentProps extends ThemeProps {
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
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { someVNode } from '@rui-ark/vue-core/utils/vnode'
import { X } from 'lucide-vue-next'
import { computed, useAttrs, useSlots } from 'vue'
import { DialogBackdrop, DialogCloseTrigger } from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  ui,
  unstyled,
  size,
  showClose = true,
} = defineProps<DialogContentProps>()

const slots = useSlots()
const hasDialogHeader = computed(() =>
  someVNode(
    slots.default?.(),
    v => (v.type as any)?.__name === 'DialogHeader',
  ),
)
const showContentClose = computed(() => showClose && !hasDialogHeader.value)

const attrs = useAttrs()
const theme = useTheme(computed(() => ({ size, unstyled })))
const { positioner, content, close } = tvDialog()
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop :class="ui?.backdrop" :unstyled="theme.unstyled" />
    <Dialog.Positioner :class="positioner({ class: ui?.positioner, ...theme })">
      <Dialog.Content
        v-bind="attrs"
        :class="content({ class: [ui?.content, propsClass], ...theme })"
      >
        <slot />
        <slot name="close">
          <DialogCloseTrigger v-if="showContentClose" as-child>
            <ark.button
              :class="
                cn(
                  ['absolute', 'top-0', 'right-0'],
                  close({ class: ui?.close, ...theme }),
                )
              "
              data-variant="content-close"
            >
              <X />
              <span class="sr-only">Close</span>
            </ark.button>
          </DialogCloseTrigger>
        </slot>
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>

<script lang="ts">
export interface DialogHeaderProps extends ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    close?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { X } from 'lucide-vue-next'
import { useId } from 'vue'
import { DialogCloseTrigger } from '.'

const { class: propsClass, unstyled, size } = defineProps<DialogHeaderProps>()

const id = useId()
const theme = useTheme(() => ({ size, unstyled }))
const { header, title, close } = tvDialog()
</script>

<template>
  <ark.div
    :id="`dialog:${id}:header`"
    data-scope="dialog"
    data-part="header"
    :class="header({ class: [ui?.root, propsClass], ...theme })"
  >
    <Dialog.Title :class="title({ class: ui?.title, ...theme })">
      <slot />
    </Dialog.Title>
    <DialogCloseTrigger as-child>
      <ark.button :class="close({ class: ui?.close, ...theme })">
        <X />
        <span class="sr-only">Close</span>
      </ark.button>
    </DialogCloseTrigger>
  </ark.div>
</template>
